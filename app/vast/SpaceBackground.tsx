"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SpaceBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070d);
    const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 400);
    camera.position.set(0, 1.2, 26);

    function makeStars(count: number, spread: number, size: number, hue: number) {
      const g = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * spread;
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      return new THREE.Points(
        g,
        new THREE.PointsMaterial({ color: hue, size, sizeAttenuation: true, transparent: true, opacity: 0.9, depthWrite: false })
      );
    }
    const starsFar = makeStars(4200, 280, 0.22, 0xbfd0ff);
    const starsNear = makeStars(1200, 160, 0.36, 0xfff2dd);
    scene.add(starsFar, starsNear);

    const hole = new THREE.Group();
    hole.add(new THREE.Mesh(new THREE.SphereGeometry(3.1, 48, 48), new THREE.MeshBasicMaterial({ color: 0x000000 })));

    const ringMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `varying vec2 vUv; uniform float uTime;
        void main(){
          float d = distance(vUv, vec2(.5));
          float ring = smoothstep(.5,.34,d) * smoothstep(.20,.30,d);
          float flicker = .9 + .1*sin(uTime*.4 + d*18.0);
          vec3 col = mix(vec3(1.,.55,.18), vec3(1.,.85,.55), smoothstep(.25,.42,d));
          gl_FragColor = vec4(col, ring*flicker);
        }`,
    });
    const ring = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), ringMat);
    ring.rotation.x = -1.15;
    hole.add(ring);

    const N = 2600;
    const diskGeo = new THREE.BufferGeometry();
    const dp = new Float32Array(N * 3);
    const ang = new Float32Array(N);
    const rad = new Float32Array(N);
    const spd = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      rad[i] = 3.8 + Math.pow(Math.random(), 1.6) * 6.5;
      ang[i] = Math.random() * Math.PI * 2;
      spd[i] = 0.16 / Math.sqrt(rad[i]);
    }
    diskGeo.setAttribute("position", new THREE.BufferAttribute(dp, 3));
    const disk = new THREE.Points(
      diskGeo,
      new THREE.PointsMaterial({ color: 0xffc07a, size: 0.09, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    disk.rotation.x = -1.15;
    hole.add(disk);

    const jetMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `varying vec2 vUv; uniform float uTime;
        void main(){
          float core = smoothstep(.5,.16,abs(vUv.x-.5));
          float fade = pow(1.0-vUv.y, 1.7);
          float pulse = .85 + .15*sin(uTime*.35 + vUv.y*9.0);
          vec3 col = mix(vec3(.42,.68,1.), vec3(.86,.94,1.), core);
          gl_FragColor = vec4(col, core*fade*pulse*.42);
        }`,
    });
    const jets = new THREE.Group();
    jets.rotation.x = -1.15;
    for (const dir of [1, -1]) {
      const j = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 22), jetMat);
      j.rotation.x = Math.PI / 2;
      j.position.z = dir * 12.2;
      if (dir < 0) j.rotation.z = Math.PI;
      jets.add(j);
      const j2 = j.clone();
      j2.rotation.y = Math.PI / 2;
      jets.add(j2);
    }
    hole.add(jets);
    hole.position.set(9, 2.5, -20);
    scene.add(hole);

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

    let raf: number;
    let scrollT = 0;
    function onScroll() {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      scrollT = max > 0 ? h.scrollTop / max : 0;
    }
    addEventListener("scroll", onScroll, { passive: true });

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    let prog = 0;

    function tick() {
      const t = clock.getElapsedTime();
      ringMat.uniforms.uTime.value = t;
      jetMat.uniforms.uTime.value = t;

      const arr = diskGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < N; i++) {
        const a = ang[i] + t * spd[i];
        arr[i * 3] = Math.cos(a) * rad[i];
        arr[i * 3 + 1] = Math.sin(a) * rad[i];
        arr[i * 3 + 2] = Math.sin(a * 3 + i) * 0.12;
      }
      diskGeo.attributes.position.needsUpdate = true;

      starsFar.rotation.y = t * 0.0012;
      starsNear.rotation.y = -t * 0.002;

      const target = reduced ? 0 : scrollT;
      prog += (target - prog) * 0.04;
      const narrow = innerWidth < 820;
      hole.position.x = (narrow ? 1.5 : 9) - prog * (narrow ? 9 : 22);
      hole.position.y = (narrow ? 6 : 3.5) - prog * 3;

      camera.position.x = mx * 1.1;
      camera.position.y = 1.2 - my * 0.7;
      camera.lookAt(0, 0, -14);

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
