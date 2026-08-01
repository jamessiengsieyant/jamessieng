"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ---- procedural textures (no external assets/network calls) ---- */

function makeDotSprite(): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,.9)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

function blob(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, pts: number) {
  ctx.beginPath();
  for (let i = 0; i <= pts; i++) {
    const a = (i / pts) * Math.PI * 2;
    const rr = r * (0.72 + Math.random() * 0.5);
    const x = cx + Math.cos(a) * rr;
    const y = cy + Math.sin(a) * rr * 0.75;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

function makeEarthTexture(): THREE.Texture {
  const w = 1024, h = 512;
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0d3a63";
  ctx.fillRect(0, 0, w, h);

  // subtle ocean depth variation
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = `rgba(20,70,120,${0.08 + Math.random() * 0.1})`;
    blob(ctx, Math.random() * w, Math.random() * h, 40 + Math.random() * 90, 10);
  }

  const land = ["#3c6b3a", "#4d7a42", "#8a7a4e", "#6b8a4a"];
  const spots: [number, number, number][] = [
    [0.20, 0.32, 95], [0.16, 0.55, 60], [0.28, 0.62, 40], // Americas-ish
    [0.50, 0.28, 70], [0.53, 0.45, 110], [0.58, 0.62, 55], // Africa/Europe-ish
    [0.72, 0.30, 130], [0.80, 0.50, 60], // Asia-ish
    [0.86, 0.72, 45], // Australia-ish
  ];
  for (const [fx, fy, r] of spots) {
    ctx.fillStyle = land[Math.floor(Math.random() * land.length)];
    blob(ctx, fx * w, fy * h, r, 14);
    // scatter smaller detail blobs around each landmass
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = land[Math.floor(Math.random() * land.length)];
      blob(ctx, fx * w + (Math.random() - 0.5) * r, fy * h + (Math.random() - 0.5) * r, r * 0.35, 10);
    }
  }

  // polar caps
  const capGrad = ctx.createLinearGradient(0, 0, 0, h * 0.12);
  capGrad.addColorStop(0, "rgba(255,255,255,.95)");
  capGrad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = capGrad;
  ctx.fillRect(0, 0, w, h * 0.12);
  const capGrad2 = ctx.createLinearGradient(0, h, 0, h * 0.88);
  capGrad2.addColorStop(0, "rgba(255,255,255,.95)");
  capGrad2.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = capGrad2;
  ctx.fillRect(0, h * 0.88, w, h * 0.12);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function makeCloudTexture(): THREE.Texture {
  const w = 1024, h = 512;
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);
  for (let i = 0; i < 70; i++) {
    const x = Math.random() * w, y = Math.random() * h * 0.85 + h * 0.05;
    const r = 20 + Math.random() * 70;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(255,255,255,${0.25 + Math.random() * 0.35})`);
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

function makePanelTexture(): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0c1a33";
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = "rgba(140,180,255,.55)";
  ctx.lineWidth = 2;
  for (let i = 0; i <= 128; i += 16) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 128); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(128, i); ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

export default function SpaceBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x03050a);
    const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 500);

    const sun = new THREE.DirectionalLight(0xffffff, 2.2);
    sun.position.set(-12, 6, 8);
    scene.add(sun, new THREE.AmbientLight(0x30405c, 1.1));

    /* ---- stars: round sprites, not squares ---- */
    const dot = makeDotSprite();
    function makeStars(count: number, spread: number, size: number, hue: number) {
      const g = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * spread;
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      return new THREE.Points(
        g,
        new THREE.PointsMaterial({
          color: hue, size, map: dot, alphaMap: dot, transparent: true,
          sizeAttenuation: true, opacity: 0.95, depthWrite: false,
        })
      );
    }
    const starsFar = makeStars(3600, 320, 1.1, 0xcfe0ff);
    const starsNear = makeStars(900, 180, 1.7, 0xfff2dd);
    scene.add(starsFar, starsNear);

    /* ---- Earth ---- */
    const EARTH_R = 6.2;
    const earthGroup = new THREE.Group();
    earthGroup.position.set(0, -6.5, -34);

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_R, 64, 64),
      new THREE.MeshStandardMaterial({ map: makeEarthTexture(), roughness: 0.85, metalness: 0.05 })
    );
    earthGroup.add(earth);

    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_R * 1.008, 64, 64),
      new THREE.MeshStandardMaterial({ map: makeCloudTexture(), transparent: true, roughness: 1, depthWrite: false })
    );
    earthGroup.add(clouds);

    const atmoMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {},
      vertexShader: `
        varying vec3 vNormal;
        void main(){
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }`,
      fragmentShader: `
        varying vec3 vNormal;
        void main(){
          float rim = pow(0.62 - dot(vNormal, vec3(0.0,0.0,1.0)), 2.2);
          gl_FragColor = vec4(0.35,0.65,1.0, clamp(rim,0.0,1.0)*0.9);
        }`,
    });
    const atmo = new THREE.Mesh(new THREE.SphereGeometry(EARTH_R * 1.06, 64, 64), atmoMat);
    earthGroup.add(atmo);
    scene.add(earthGroup);

    /* ---- Haven-1 (stylized): white cylinder, dome window, solar wings ---- */
    const station = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf1f3f6, roughness: 0.28, metalness: 0.35 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 2.6, 32), bodyMat);
    body.rotation.z = Math.PI / 2;
    station.add(body);

    const domeMat = new THREE.MeshStandardMaterial({ color: 0x0a1a2c, roughness: 0.08, metalness: 0.6, emissive: 0x0e2a44, emissiveIntensity: 0.4 });
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.62, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2), domeMat);
    dome.rotation.z = -Math.PI / 2;
    dome.position.x = 1.35;
    station.add(dome);

    const panelTex = makePanelTexture();
    const panelMat = new THREE.MeshStandardMaterial({ map: panelTex, roughness: 0.35, metalness: 0.5, side: THREE.DoubleSide });
    for (const dir of [1, -1]) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.1, 3.2), panelMat);
      panel.position.set(0, 0, dir * 2.3);
      station.add(panel);
      const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.7, 8), bodyMat);
      strut.rotation.x = Math.PI / 2;
      strut.position.set(0, 0, dir * 0.7);
      station.add(strut);
    }
    station.scale.setScalar(0.85);
    scene.add(station);

    function resize() {
      renderer.setSize(innerWidth, innerHeight, false);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
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
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      scrollT = max > 0 ? h.scrollTop / max : 0;
    }
    addEventListener("scroll", onScroll, { passive: true });

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startTime = performance.now();
    let prog = 0;
    let raf: number;

    function tick() {
      const t = (performance.now() - startTime) / 1000;

      earth.rotation.y = t * 0.02;
      clouds.rotation.y = t * 0.028;

      const target = reduced ? 0 : scrollT;
      prog += (target - prog) * 0.045;

      // camera rides an orbital arc around Earth, driven by scroll
      const orbitA = -0.35 + prog * 2.5 + t * 0.008;
      const radius = EARTH_R * 3.1;
      const cx = Math.sin(orbitA) * radius;
      const cz = earthGroup.position.z + Math.cos(orbitA) * radius;
      const cy = earthGroup.position.y + 4.5 - prog * 2.5;
      camera.position.set(cx + mx * 0.8, cy - my * 0.5, cz);
      camera.lookAt(earthGroup.position.x, earthGroup.position.y + 1, earthGroup.position.z);

      // station sits near-camera, as if we're aboard it looking out
      const off = new THREE.Vector3(3.0, -1.3, -5.8).applyQuaternion(camera.quaternion);
      station.position.copy(camera.position).add(off);
      station.quaternion.copy(camera.quaternion);
      station.rotateY(Math.PI * 0.15);
      station.rotateX(Math.sin(t * 0.06) * 0.05);

      starsFar.rotation.y = t * 0.0008;
      starsNear.rotation.y = -t * 0.0014;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
      removeEventListener("scroll", onScroll);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0 }} />;
}
