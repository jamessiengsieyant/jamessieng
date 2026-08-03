"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Schwarzschild black hole, integrated per pixel.
 *
 * Rather than faking the halo with a texture, each pixel's ray is traced
 * backward along a null geodesic using the exact Schwarzschild orbit equation
 *
 *     d²u/dφ² + u = (3/2) r_s u²        where u = 1/r
 *
 * so the disk really does bend over and under the shadow, and the starfield
 * behind it really does smear into an Einstein ring. Units are chosen with
 * r_s = 1, which puts the photon sphere at 1.5, the shadow edge at 3√3/2 ≈ 2.6,
 * and the innermost stable circular orbit at 3.
 */

const FRAG = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform vec2  uRes;
uniform float uTime;
uniform vec3  uCamPos;
uniform mat3  uCamBasis;
uniform float uOffsetX;
uniform float uExposure;
uniform float uBeta;      // infall speed relative to a static observer here
uniform int   uSteps;

const float RS      = 1.0;          // Schwarzschild radius
const float R_ISCO  = 3.0 * RS;     // innermost stable circular orbit
const float R_OUT   = 15.0 * RS;    // outer edge of the disk
const float R_SKY   = 90.0;         // treat as escaped past here
const int   MAX_STEPS = 200;

// ---------------------------------------------------------------- noise
float hash31(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float noise3(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash31(i + vec3(0,0,0)), hash31(i + vec3(1,0,0)), f.x),
        mix(hash31(i + vec3(0,1,0)), hash31(i + vec3(1,1,0)), f.x), f.y),
    mix(mix(hash31(i + vec3(0,0,1)), hash31(i + vec3(1,0,1)), f.x),
        mix(hash31(i + vec3(0,1,1)), hash31(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm(vec3 p) {
  return 0.5 * noise3(p) + 0.25 * noise3(p * 2.03) + 0.125 * noise3(p * 4.01);
}

// ---------------------------------------------------------------- starfield
vec3 stars(vec3 dir) {
  vec3 acc = vec3(0.0);
  for (int i = 0; i < 3; i++) {
    float scale = 42.0 + float(i) * 68.0;
    vec3 p  = dir * scale;
    vec3 id = floor(p);
    vec3 f  = fract(p) - 0.5;
    float h = hash31(id + float(i) * 31.7);
    if (h > 0.972) {
      vec3 jitter = vec3(hash31(id + 5.0), hash31(id + 9.0), hash31(id + 17.0)) - 0.5;
      float d  = length(f - jitter * 0.6);
      float mag = (h - 0.972) / 0.028;
      float tw = 0.75 + 0.25 * sin(uTime * 1.4 + h * 90.0);
      // slightly varied stellar colours
      vec3 tint = mix(vec3(0.72, 0.82, 1.0), vec3(1.0, 0.9, 0.76), hash31(id + 3.0));
      acc += tint * smoothstep(0.45, 0.0, d) * mag * tw * 0.9;
    }
  }
  // faint galactic haze so the lensing has something continuous to distort
  float band = exp(-abs(dir.y * 2.4)) * (0.35 + 0.65 * fbm(dir * 3.0));
  acc += vec3(0.05, 0.06, 0.10) * band;
  return acc;
}

// ---------------------------------------------------------------- disk
vec3 blackbody(float t) {
  vec3 cool = vec3(1.00, 0.26, 0.05);
  vec3 mid  = vec3(1.00, 0.70, 0.32);
  vec3 hot  = vec3(0.72, 0.84, 1.00);
  return t < 0.5 ? mix(cool, mid, t * 2.0) : mix(mid, hot, (t - 0.5) * 2.0);
}

// Emission from the disk at radius r, accounting for the relativistic
// Doppler factor of the orbiting gas and gravitational redshift.
vec3 diskColor(vec3 pos, vec3 marchDir) {
  float r = length(pos.xz);
  if (r < R_ISCO || r > R_OUT) return vec3(0.0);

  // Shakura-Sunyaev thin disk: T ~ r^(-3/4), so brightness falls steeply.
  float x    = (r - R_ISCO) / (R_OUT - R_ISCO);
  float temp = pow(R_ISCO / r, 0.75);
  float emis = pow(R_ISCO / r, 3.0);

  // sheared turbulence: inner gas laps the outer gas, smearing knots into lanes
  float ang   = atan(pos.z, pos.x);
  float omega = pow(r, -1.5) * 5.0;
  float turb  = fbm(vec3(cos(ang) * r, sin(ang) * r, 0.0) * 0.55
                    + vec3(0.0, 0.0, uTime * 0.35)
                    - vec3(omega * uTime * 0.6));
  emis *= 0.55 + 0.9 * turb;

  // soft inner and outer edges
  emis *= smoothstep(0.0, 0.06, x) * (1.0 - smoothstep(0.72, 1.0, x));

  // orbital velocity: v = sqrt(M/r), with M = r_s/2
  float beta  = sqrt(0.5 * RS / r);
  vec3  vdir  = normalize(cross(vec3(0.0, 1.0, 0.0), pos));
  vec3  nObs  = -marchDir;                       // we trace backward, so flip
  float gamma = 1.0 / sqrt(1.0 - beta * beta);
  float delta = 1.0 / (gamma * (1.0 - beta * dot(vdir, nObs)));

  // gravitational redshift climbing out of the well
  float grav  = sqrt(max(1.0 - RS / r, 0.02));
  float shift = delta * grav;

  // specific intensity boosts as the fourth power of the total shift
  float boost = pow(clamp(shift, 0.05, 4.0), 4.0);

  vec3 col = blackbody(clamp(temp * 1.55 * shift, 0.0, 1.0));
  return col * emis * boost * 4.2;
}

// ---------------------------------------------------------------- jets
// Collimated outflow along the spin axis. The approaching jet is beamed
// toward us and the receding one away, so they are wildly asymmetric.
vec3 jetColor(vec3 pos, vec3 marchDir) {
  float ay = abs(pos.y);
  if (ay < 1.1 * RS || ay > 70.0) return vec3(0.0);

  float d = length(pos.xz);
  float R = 0.30 * RS + 0.05 * ay;
  float rr   = d / R;
  float halo = exp(-rr * rr);
  float core = exp(-rr * rr * 4.0);

  float fade = exp(-ay / 30.0);
  float wisp = 0.6 + 0.8 * fbm(vec3(pos.xz * 1.6, pos.y * 0.35 - uTime * 0.7));

  float beta  = 0.82;
  float gamma = 1.0 / sqrt(1.0 - beta * beta);
  vec3  vdir  = vec3(0.0, sign(pos.y), 0.0);
  vec3  nObs  = -marchDir;
  float delta = 1.0 / (gamma * (1.0 - beta * dot(vdir, nObs)));
  float boost = pow(clamp(delta, 0.05, 3.0), 3.0);

  vec3 col = mix(vec3(0.30, 0.52, 1.00), vec3(0.88, 0.94, 1.00), core);
  return col * (halo * 0.5 + core * 1.5) * fade * wisp * boost * 0.32;
}

// ---------------------------------------------------------------- geodesic
vec2 deriv(vec2 s) {
  // s = (u, du/dphi)
  return vec2(s.y, 1.5 * RS * s.x * s.x - s.x);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  uv.x -= uOffsetX;

  vec3 rayCam = normalize(vec3(uv, -1.25));
  vec3 dir    = normalize(uCamBasis * rayCam);
  vec3 cam    = uCamPos;

  // Relativistic aberration. We are falling inward at uBeta, so the direction a
  // pixel looks in our frame is not the direction that light travelled in the
  // static frame the geodesic is written in. Converting observer -> static
  // swings rays outward, which is why an infalling observer measures a SMALLER
  // shadow than someone hovering at the same radius: our own speed sweeps more
  // of the sky into the forward cone.
  float gam  = 1.0 / sqrt(max(1.0 - uBeta * uBeta, 1e-4));
  vec3  mdir = normalize(-cam);                 // direction we are falling
  float cA   = dot(dir, mdir);
  vec3  perp = dir - cA * mdir;
  float sA   = length(perp);
  float den  = max(1.0 - uBeta * cA, 1e-4);
  float csA  = (cA - uBeta) / den;
  float ssA  = sA / (gam * den);
  if (sA > 1e-6) dir = normalize(csA * mdir + ssA * (perp / sA));

  // Light met head-on is blueshifted and brightened as we fall into it.
  float dopp = 1.0 / (gam * max(1.0 - uBeta * csA, 1e-4));

  float r0 = length(cam);

  // Basis for the plane containing the camera and the ray: the photon's
  // whole trajectory stays in it, so the problem collapses to two dimensions.
  vec3 e1 = cam / r0;
  vec3 e2 = dir - dot(dir, e1) * e1;
  float e2len = length(e2);
  if (e2len < 1e-6) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); return; }
  e2 /= e2len;

  float u  = 1.0 / r0;
  float du = -(1.0 / r0) * (dot(dir, e1) / e2len);

  vec2  s   = vec2(u, du);
  float phi = 0.0;

  vec3  accum   = vec3(0.0);
  vec3  prevPos = cam;
  bool  done    = false;
  bool  fell    = false;
  vec3  outDir  = dir;

  for (int i = 0; i < MAX_STEPS; i++) {
    if (i >= uSteps || done) break;

    float r = 1.0 / s.x;

    // step finer near the hole where the bending is violent
    float h = clamp(0.055 * r / (r + 2.0) + 0.012, 0.012, 0.09);

    vec2 k1 = deriv(s);
    vec2 k2 = deriv(s + 0.5 * h * k1);
    vec2 k3 = deriv(s + 0.5 * h * k2);
    vec2 k4 = deriv(s + h * k3);
    s   += (h / 6.0) * (k1 + 2.0 * k2 + 2.0 * k3 + k4);
    phi += h;

    if (s.x <= 0.0) { done = true; break; }          // numerically escaped
    float rNew = 1.0 / s.x;

    if (rNew <= RS * 1.02) { fell = true; done = true; break; }   // horizon

    vec3 pos = rNew * (cos(phi) * e1 + sin(phi) * e2);

    // tangent of the path, used for both Doppler terms
    vec3 dpos = (-s.y / (s.x * s.x)) * (cos(phi) * e1 + sin(phi) * e2)
              + rNew * (-sin(phi) * e1 + cos(phi) * e2);
    vec3 tang = normalize(dpos);

    // jets are volumetric: accumulate as we pass through them
    float ds = length(pos - prevPos);
    accum += jetColor(pos, tang) * ds;

    // equatorial plane crossing => disk hit
    if (prevPos.y * pos.y < 0.0) {
      float t   = prevPos.y / (prevPos.y - pos.y);
      vec3  hit = mix(prevPos, pos, clamp(t, 0.0, 1.0));
      vec3 c = diskColor(hit, tang);
      if (c != vec3(0.0)) {
        accum += c;
        // the disk is optically thick: stop here
        done = true;
        prevPos = pos;
        outDir = tang;
        break;
      }
    }

    if (rNew > R_SKY) { outDir = tang; done = true; prevPos = pos; break; }

    prevPos = pos;
    outDir  = tang;
  }

  vec3 col = accum;
  if (!fell) {
    // whatever light did not hit the disk comes from the lensed sky
    float r = 1.0 / max(s.x, 1e-6);
    if (r > R_SKY * 0.5) col += stars(outDir);
  }

  col *= pow(clamp(dopp, 0.25, 3.0), 2.0);
  col *= uExposure;

  // tone map + gamma
  col = col / (1.0 + col);
  col = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2));

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export default function BlackHole() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = innerWidth < 820;

    const uniforms = {
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uCamPos: { value: new THREE.Vector3(0, 3, 24) },
      uCamBasis: { value: new THREE.Matrix3() },
      uOffsetX: { value: small ? 0.0 : 0.24 },
      uExposure: { value: 1.45 },
      uBeta: { value: 0.0 },
      uSteps: { value: small ? 110 : 165 },
    };

    const quad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms })
    );
    scene.add(quad);

    function resize() {
      const dpr = Math.min(devicePixelRatio, small ? 1.0 : 1.4);
      renderer.setPixelRatio(dpr);
      renderer.setSize(innerWidth, innerHeight, false);
      uniforms.uRes.value.set(innerWidth * dpr, innerHeight * dpr);
      uniforms.uOffsetX.value = innerWidth < 820 ? 0.0 : 0.24;
    }
    addEventListener("resize", resize);
    resize();

    let mx = 0, my = 0;
    function onMove(e: PointerEvent) {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
    }
    addEventListener("pointermove", onMove);

    let scrollT = 0;
    function onScroll() {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      scrollT = max > 0 ? el.scrollTop / max : 0;
    }
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const start = performance.now();
    let raf = 0;
    let inclination = 0.10;
    const R0 = 24.0; // released from rest here, at the top of the page
    const R1 = 8.6;  // closest approach, at the bottom
    let dist = R0;
    const camPos = new THREE.Vector3();
    const basis = new THREE.Matrix3();
    const fwd = new THREE.Vector3();
    const right = new THREE.Vector3();
    const upv = new THREE.Vector3();
    const worldUp = new THREE.Vector3(0, 1, 0);

    function frame() {
      const t = reduced ? 0 : (performance.now() - start) / 1000;
      uniforms.uTime.value = t;

      // Slow orbit. Viewed nearly edge-on the lensing is at its most dramatic,
      // so the camera starts there and tilts upward as the page scrolls.
      const azimuth = 0.62 + t * 0.021 + mx * 0.22;
      const targetInc = 0.085 + scrollT * 0.34 - my * 0.06;
      inclination += (targetInc - inclination) * 0.05;

      // Scroll is the fall. Easing in matches the shape of real infall: slow to
      // let go, then accelerating as the well steepens.
      const e = scrollT * scrollT * (3.0 - 2.0 * scrollT);
      dist += (R0 + (R1 - R0) * e - dist) * 0.06;

      // Speed a static observer at this radius would clock us falling past, for
      // a body released from rest at R0 (r_s = 1 in these units).
      const beta = Math.sqrt(Math.max(0, (1 / dist - 1 / R0) / (1 - 1 / R0)));
      uniforms.uBeta.value = Math.min(beta, 0.86);
      uniforms.uExposure.value = 1.45 * (1.0 - 0.20 * e);

      camPos.set(
        Math.sin(azimuth) * Math.cos(inclination) * dist,
        Math.sin(inclination) * dist,
        Math.cos(azimuth) * Math.cos(inclination) * dist
      );
      uniforms.uCamPos.value.copy(camPos);

      // orthonormal camera basis looking at the origin
      fwd.copy(camPos).negate().normalize();
      right.crossVectors(fwd, worldUp).normalize();
      upv.crossVectors(right, fwd).normalize();
      basis.set(
        right.x, upv.x, -fwd.x,
        right.y, upv.y, -fwd.y,
        right.z, upv.z, -fwd.z
      );
      uniforms.uCamBasis.value.copy(basis);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
      removeEventListener("scroll", onScroll);
      quad.geometry.dispose();
      (quad.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, display: "block" }}
    />
  );
}
