"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Scene 1 — the ground, before launch.
 *
 * You are standing on Earth at first light, looking at the horizon. Scrolling
 * tilts your head up: the sky drains from dawn to near-vacuum, the stars come
 * out, and a single moving point crosses overhead. That point is where the rest
 * of the presentation happens.
 *
 * Deliberately cheap to render — no textures, no post-processing, three meshes
 * and a point cloud — because this is the first thing that loads and it may be
 * loading on a conference-room laptop.
 */
export default function GroundScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.1, 900);
    camera.position.set(0, 1.6, 0); // standing eye height

    /* ---- sky dome: dawn at the horizon, vacuum at the zenith ---- */
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: { uLift: { value: 0 } },
      vertexShader: `
        varying vec3 vPos;
        void main(){
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }`,
      // uLift 0 = standing in dawn light, 1 = high enough that the air has thinned out
      fragmentShader: `
        varying vec3 vPos;
        uniform float uLift;
        void main(){
          float h = clamp(normalize(vPos).y, -1.0, 1.0);

          vec3 dawnLow  = vec3(0.98, 0.62, 0.36);
          vec3 dawnMid  = vec3(0.29, 0.42, 0.68);
          vec3 dawnHigh = vec3(0.04, 0.07, 0.17);

          vec3 spaceLow  = vec3(0.16, 0.26, 0.46);
          vec3 spaceMid  = vec3(0.02, 0.04, 0.10);
          vec3 spaceHigh = vec3(0.005, 0.008, 0.02);

          vec3 low  = mix(dawnLow,  spaceLow,  uLift);
          vec3 mid  = mix(dawnMid,  spaceMid,  uLift);
          vec3 high = mix(dawnHigh, spaceHigh, uLift);

          // warm band is deliberately shallow — it has to sit under the page
          // content without bleaching it, so the colour is spent by ~12° up
          float a = smoothstep(-0.02, 0.075, h);
          float b = smoothstep(0.055, 0.42, h);
          vec3 col = mix(mix(low, mid, a), high, b);

          // sun still below the horizon — warm bloom on one side only
          float az = normalize(vPos).x;
          float glow = pow(max(0.0, 1.0 - abs(h - 0.005) * 26.0), 3.0)
                     * smoothstep(-0.9, 0.5, az) * (1.0 - uLift * 0.9);
          col += vec3(1.0, 0.5, 0.22) * glow * 0.42;

          gl_FragColor = vec4(col, 1.0);
        }`,
    });
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(400, 40, 28), skyMat));

    /* ---- stars: invisible in dawn light, out by the time you're looking up ---- */
    const N = 1800;
    const pos = new Float32Array(N * 3);
    const phase = new Float32Array(N);
    const size = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      // upper hemisphere only — nothing below the horizon
      const th = Math.acos(Math.random() * 0.98);
      const ph = Math.random() * Math.PI * 2;
      const r = 300;
      pos[i * 3] = r * Math.sin(th) * Math.cos(ph);
      pos[i * 3 + 1] = r * Math.cos(th);
      pos[i * 3 + 2] = r * Math.sin(th) * Math.sin(ph);
      phase[i] = Math.random() * Math.PI * 2;
      size[i] = 0.7 + Math.random() * 1.9;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    starGeo.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
    starGeo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    const starMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 } },
      vertexShader: `
        attribute float aPhase; attribute float aSize;
        varying float vTw;
        uniform float uTime;
        void main(){
          vTw = 0.65 + 0.35 * sin(uTime * 1.4 + aPhase);
          vec4 mv = modelViewMatrix * vec4(position,1.0);
          gl_PointSize = aSize * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying float vTw;
        uniform float uOpacity;
        void main(){
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float a = (1.0 - d * 2.0) * vTw * uOpacity;
          gl_FragColor = vec4(0.86, 0.91, 1.0, a);
        }`,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    /* ---- ground: dark plane that dissolves into haze before it reaches the sky ---- */
    const groundMat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: { uLift: { value: 0 } },
      // distance is computed per fragment, not per vertex: the plane is two
      // triangles, so a varying would interpolate between four corners that are
      // all equally far away and fade the whole surface out at once
      vertexShader: `
        varying vec3 vWorld;
        void main(){
          vec4 world = modelMatrix * vec4(position,1.0);
          vWorld = world.xyz;
          gl_Position = projectionMatrix * viewMatrix * world;
        }`,
      fragmentShader: `
        varying vec3 vWorld;
        uniform float uLift;
        void main(){
          float d = length(vWorld.xz);
          // solid underfoot, dissolving into haze before the geometric horizon
          float fade = 1.0 - smoothstep(45.0, 190.0, d);
          vec3 col = mix(vec3(0.045,0.043,0.055), vec3(0.015,0.015,0.025), uLift);
          gl_FragColor = vec4(col, fade);
        }`,
    });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(900, 900, 1, 1), groundMat);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    /* ---- one moving point overhead: the thing you are about to go to ---- */
    const havenMat = new THREE.SpriteMaterial({
      color: 0xfff0d8,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const haven = new THREE.Sprite(havenMat);
    haven.scale.setScalar(2.4);
    scene.add(haven);

    /* ---- input ---- */
    let scrollT = 0;
    function onScroll() {
      const max = document.body.scrollHeight - innerHeight;
      scrollT = max > 0 ? Math.min(1, scrollY / max) : 0;
    }
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });

    let mx = 0;
    function onMove(e: PointerEvent) {
      mx = (e.clientX / innerWidth - 0.5) * 2;
    }
    addEventListener("pointermove", onMove, { passive: true });

    function resize() {
      renderer.setSize(innerWidth, innerHeight, false);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    }
    resize();
    addEventListener("resize", resize);

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    let prog = 0;
    let raf = 0;

    function tick() {
      const t = (performance.now() - t0) / 1000;
      const target = reduced ? 0.35 : scrollT;
      prog += (target - prog) * 0.05;

      // scrolling raises your eyeline from the horizon toward the zenith
      const pitch = -0.04 + prog * 0.72;
      camera.rotation.set(pitch, mx * -0.09, 0, "YXZ");

      skyMat.uniforms.uLift.value = prog;
      groundMat.uniforms.uLift.value = prog;
      starMat.uniforms.uTime.value = t;
      starMat.uniforms.uOpacity.value = Math.pow(prog, 0.7) * 0.95;

      // slow pass across the sky, only visible once the sky is dark enough to see it
      const a = t * 0.045;
      haven.position.set(Math.cos(a) * 120, 90 + Math.sin(a * 0.6) * 18, -Math.sin(a) * 120);
      havenMat.opacity = Math.max(0, prog - 0.25) * 1.1;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("pointermove", onMove);
      removeEventListener("resize", resize);
      starGeo.dispose();
      starMat.dispose();
      skyMat.dispose();
      groundMat.dispose();
      havenMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0 }} />;
}
