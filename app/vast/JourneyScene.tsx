"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import * as THREE from "three";
import { lerp, smooth, waypointFor } from "./journey";

/**
 * One scene, one timeline. See journey.ts for why.
 *
 * Mounted in the layout so it survives navigation — if this lived in a page,
 * Next would tear down the WebGL context on every route change and the
 * continuity the whole idea depends on would be replaced by a flash.
 *
 * The one honest cheat is between t≈0.18 and t≈0.34. Standing on the ground
 * and orbiting are geometrically different setups — one is a plane under your
 * feet, the other a sphere below you — and rendering both from a single
 * planet-scale scene means coordinates large enough to lose float precision
 * where it matters. So the two representations cross-fade through the altitude
 * band where they look alike anyway: sky above, curved ground below.
 */
export default function JourneyScene() {
  const ref = useRef<HTMLCanvasElement>(null);
  const cabinRef = useRef<HTMLDivElement>(null);
  const rimRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);
  const pathname = usePathname();

  // navigation only moves the target; the loop below eases toward it
  useEffect(() => {
    targetRef.current = waypointFor(pathname);
  }, [pathname]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    // Most of this audience arrives by scanning a code, so the common device is
    // a phone: cap the buffer harder on small screens, where a 3x ratio buys
    // nothing visible and costs heat and battery.
    const dprCap = innerWidth < 820 ? 1.75 : 2;
    renderer.setPixelRatio(Math.min(devicePixelRatio, dprCap));
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x03050a);
    const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 4000);

    scene.add(new THREE.AmbientLight(0x39496b, 1.15));
    const sun = new THREE.DirectionalLight(0xffffff, 2.3);
    sun.position.set(-14, 7, 9);
    scene.add(sun);

    /* ───────── ground half: sky dome, ground plane ───────── */
    const groundGroup = new THREE.Group();

    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      transparent: true,
      uniforms: { uLift: { value: 0 }, uFade: { value: 1 } },
      vertexShader: `
        varying vec3 vPos;
        void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `
        varying vec3 vPos; uniform float uLift; uniform float uFade;
        void main(){
          float h = clamp(normalize(vPos).y, -1.0, 1.0);
          vec3 low  = mix(vec3(0.98,0.62,0.36), vec3(0.10,0.20,0.40), uLift);
          vec3 mid  = mix(vec3(0.29,0.42,0.68), vec3(0.01,0.03,0.08), uLift);
          vec3 high = mix(vec3(0.04,0.07,0.17), vec3(0.003,0.005,0.014), uLift);
          float a = smoothstep(-0.02, 0.075, h);
          float b = smoothstep(0.055, 0.42, h);
          vec3 col = mix(mix(low, mid, a), high, b);
          float az = normalize(vPos).x;
          float glow = pow(max(0.0, 1.0 - abs(h - 0.005) * 26.0), 3.0)
                     * smoothstep(-0.9, 0.5, az) * (1.0 - uLift * 0.9);
          col += vec3(1.0,0.5,0.22) * glow * 0.42;
          gl_FragColor = vec4(col, uFade);
        }`,
    });
    groundGroup.add(new THREE.Mesh(new THREE.SphereGeometry(400, 40, 28), skyMat));

    const groundMat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: { uLift: { value: 0 }, uFade: { value: 1 } },
      vertexShader: `
        varying vec3 vW;
        void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz;
          gl_Position = projectionMatrix * viewMatrix * w; }`,
      // distance per fragment, not per vertex: the plane is two triangles whose
      // corners are all equally far away, so a varying fades it out all at once
      fragmentShader: `
        varying vec3 vW; uniform float uLift; uniform float uFade;
        void main(){
          float d = length(vW.xz);
          float f = 1.0 - smoothstep(45.0, 190.0, d);
          vec3 col = mix(vec3(0.045,0.043,0.055), vec3(0.015,0.015,0.025), uLift);
          gl_FragColor = vec4(col, f * uFade);
        }`,
    });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), groundMat);
    ground.rotation.x = -Math.PI / 2;
    groundGroup.add(ground);
    scene.add(groundGroup);

    /* ───────── stars ───────── */
    const N = 2600;
    const sp = new Float32Array(N * 3);
    const sph = new Float32Array(N);
    const ssz = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const th = Math.acos(2 * Math.random() - 1);
      const ph = Math.random() * Math.PI * 2;
      const r = 900;
      sp[i * 3] = r * Math.sin(th) * Math.cos(ph);
      sp[i * 3 + 1] = r * Math.cos(th);
      sp[i * 3 + 2] = r * Math.sin(th) * Math.sin(ph);
      sph[i] = Math.random() * Math.PI * 2;
      ssz[i] = 1.1 + Math.random() * 2.6;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(sp, 3));
    starGeo.setAttribute("aPhase", new THREE.BufferAttribute(sph, 1));
    starGeo.setAttribute("aSize", new THREE.BufferAttribute(ssz, 1));
    const starMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 } },
      vertexShader: `
        attribute float aPhase; attribute float aSize; varying float vTw; uniform float uTime;
        void main(){
          vTw = 0.62 + 0.38 * sin(uTime * 1.3 + aPhase);
          vec4 mv = modelViewMatrix * vec4(position,1.0);
          gl_PointSize = aSize * (620.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying float vTw; uniform float uOpacity;
        void main(){
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          gl_FragColor = vec4(0.87,0.92,1.0, (1.0 - d*2.0) * vTw * uOpacity);
        }`,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    /* ───────── orbital half: Earth ───────── */
    function earthTexture(): THREE.Texture {
      const c = document.createElement("canvas");
      c.width = 2048; c.height = 1024;
      const x = c.getContext("2d")!;
      const g = x.createLinearGradient(0, 0, 0, 1024);
      g.addColorStop(0, "#0a2d5e"); g.addColorStop(0.5, "#0d4b86"); g.addColorStop(1, "#0a2d5e");
      x.fillStyle = g; x.fillRect(0, 0, 2048, 1024);
      // land: coarse blobs, deliberately not a map — it reads as a planet at
      // this distance and costs nothing to generate
      const land = ["#1f4d33", "#2c5c3a", "#3d6b41", "#5a6b3d"];
      for (let i = 0; i < 46; i++) {
        x.fillStyle = land[i % land.length];
        x.globalAlpha = 0.55 + Math.random() * 0.4;
        const cx = Math.random() * 2048;
        const cy = 180 + Math.random() * 664;
        const rw = 60 + Math.random() * 190;
        const rh = 40 + Math.random() * 110;
        x.beginPath();
        for (let a = 0; a <= Math.PI * 2 + 0.01; a += Math.PI / 9) {
          const j = 0.62 + Math.random() * 0.7;
          const px = cx + Math.cos(a) * rw * j;
          const py = cy + Math.sin(a) * rh * j;
          a === 0 ? x.moveTo(px, py) : x.lineTo(px, py);
        }
        x.closePath(); x.fill();
      }
      x.globalAlpha = 1;
      // poles
      x.fillStyle = "#e8f2ff";
      x.fillRect(0, 0, 2048, 46); x.fillRect(0, 978, 2048, 46);
      // cloud bands
      x.globalAlpha = 0.30; x.fillStyle = "#ffffff";
      for (let i = 0; i < 220; i++) {
        const cx = Math.random() * 2048, cy = Math.random() * 1024;
        const r = 18 + Math.random() * 70;
        x.beginPath(); x.ellipse(cx, cy, r * 1.7, r * 0.55, 0, 0, Math.PI * 2); x.fill();
      }
      x.globalAlpha = 1;
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    }

    const EARTH_R = 60;
    const earthGroup = new THREE.Group();
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_R, 72, 72),
      new THREE.MeshPhongMaterial({ map: earthTexture(), shininess: 18, specular: 0x1b3a5c, transparent: true, opacity: 0 })
    );
    earthGroup.add(earth);

    const atmoMat = new THREE.ShaderMaterial({
      transparent: true, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
      uniforms: { uFade: { value: 0 } },
      vertexShader: `
        varying vec3 vN;
        void main(){ vN = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `
        varying vec3 vN; uniform float uFade;
        void main(){
          float rim = pow(max(0.0, 0.66 - dot(vN, vec3(0.0,0.0,1.0))), 2.1);
          gl_FragColor = vec4(0.36,0.66,1.0, clamp(rim,0.0,1.0) * 0.9 * uFade);
        }`,
    });
    earthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(EARTH_R * 1.045, 64, 64), atmoMat));
    scene.add(earthGroup);

    /* ───────── Falcon 9 ─────────
       Proportioned off the real thing: about nineteen times taller than it is
       wide, black interstage band roughly two thirds up, grid fins near the
       top, legs at the base. Read as a silhouette against the dawn, so the
       band and the fins do more work than any surface detail would. */
    const rocket = new THREE.Group();
    const R_H = 15, R_R = 0.4;
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xeef1f5, roughness: 0.55, metalness: 0.12 });
    const blackMat = new THREE.MeshStandardMaterial({ color: 0x14161b, roughness: 0.8, metalness: 0.1 });

    const firstStage = new THREE.Mesh(new THREE.CylinderGeometry(R_R, R_R, R_H * 0.68, 28), whiteMat);
    firstStage.position.y = R_H * 0.34;
    rocket.add(firstStage);

    const interstage = new THREE.Mesh(new THREE.CylinderGeometry(R_R, R_R, R_H * 0.06, 28), blackMat);
    interstage.position.y = R_H * 0.71;
    rocket.add(interstage);

    const secondStage = new THREE.Mesh(new THREE.CylinderGeometry(R_R, R_R, R_H * 0.2, 28), whiteMat);
    secondStage.position.y = R_H * 0.84;
    rocket.add(secondStage);

    const nose = new THREE.Mesh(new THREE.ConeGeometry(R_R, R_H * 0.12, 28), whiteMat);
    nose.position.y = R_H * 1.0;
    rocket.add(nose);

    for (let i = 0; i < 4; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(R_R * 0.75, R_R * 0.9, 0.06), blackMat);
      const a = (i / 4) * Math.PI * 2;
      fin.position.set(Math.cos(a) * R_R * 1.15, R_H * 0.66, Math.sin(a) * R_R * 1.15);
      fin.rotation.y = -a;
      rocket.add(fin);
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, R_H * 0.1, 8), blackMat);
      leg.position.set(Math.cos(a) * R_R * 0.9, R_H * 0.03, Math.sin(a) * R_R * 0.9);
      leg.rotation.z = Math.cos(a) * 0.28;
      leg.rotation.x = -Math.sin(a) * 0.28;
      rocket.add(leg);
    }

    // plume: additive cone, scaled by thrust, plus a light so the exhaust
    // actually throws colour onto the ground during the first moments
    const plumeMat = new THREE.MeshBasicMaterial({
      color: 0xffd08a, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const plume = new THREE.Mesh(new THREE.ConeGeometry(R_R * 0.95, R_H * 0.5, 20, 1, true), plumeMat);
    plume.rotation.x = Math.PI;
    plume.position.y = -R_H * 0.24;
    rocket.add(plume);
    const plumeLight = new THREE.PointLight(0xffa94d, 0, 90, 2);
    plumeLight.position.y = -1;
    rocket.add(plumeLight);

    rocket.position.set(-7, 0, -46);
    scene.add(rocket);

    /* ───────── Haven-1 ───────── */
    const station = new THREE.Group();
    const hull = new THREE.MeshStandardMaterial({ color: 0xf2f4f7, roughness: 0.3, metalness: 0.45, transparent: true, opacity: 0 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 2.6, 32), hull);
    body.rotation.z = Math.PI / 2;
    station.add(body);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.56, 28, 20, 0, Math.PI * 2, 0, Math.PI / 2), hull);
    dome.rotation.z = -Math.PI / 2; dome.position.x = 1.3;
    station.add(dome);
    const panelMat = new THREE.MeshStandardMaterial({ color: 0x1b3358, roughness: 0.35, metalness: 0.6, side: THREE.DoubleSide, transparent: true, opacity: 0 });
    const panelPivot = new THREE.Group();
    for (const s of [-1, 1]) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.02, 0.9), panelMat);
      p.position.z = s * 1.5;
      panelPivot.add(p);
    }
    station.add(panelPivot);
    scene.add(station);

    /* ───────── input ───────── */
    let scrollT = 0;
    function onScroll() {
      const max = document.body.scrollHeight - innerHeight;
      scrollT = max > 40 ? Math.min(1, scrollY / max) : 0;
    }
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });

        function resize() {
      // CSS owns the display size (see the style prop — 100%/100% inside a
      // fixed inset:0 box) and three.js owns only the drawing buffer, so the
      // two cannot disagree. Letting three.js write the style instead bakes in
      // whatever innerWidth was at that instant and ends up a scrollbar short;
      // leaving both unset lets the buffer size become the display size, which
      // on a 3x phone shows a third of the scene.
      const w = canvas!.clientWidth || innerWidth;
      const h = canvas!.clientHeight || innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    addEventListener("resize", resize);

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    let cur = targetRef.current; // start where we land, don't animate in on load
    let raf = 0;

    // stop rendering when the tab is not on screen — otherwise a backgrounded
    // phone keeps a WebGL loop warm for no reason
    let hidden = document.hidden;
    function onVisibility() {
      const nowHidden = document.hidden;
      if (hidden && !nowHidden) {
        hidden = false;
        raf = requestAnimationFrame(tick);
      } else {
        hidden = nowHidden;
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    function tick() {
      if (document.hidden) { hidden = true; return; }
      const clock = (performance.now() - t0) / 1000;

      // ease toward the waypoint; scroll nudges within the current segment so
      // the picture keeps moving even when nobody is navigating
      const goal = Math.min(1, targetRef.current + scrollT * 0.34);
      cur += (goal - cur) * (reduced ? 1 : 0.035);
      const t = cur;

      /* which representation is on screen */
      const groundFade = 1 - smooth(0.16, 0.32, t);   // plane + dome
      const spaceFade = smooth(0.18, 0.36, t);        // sphere
      skyMat.uniforms.uFade.value = groundFade;
      groundMat.uniforms.uFade.value = groundFade;
      groundGroup.visible = groundFade > 0.01;
      skyMat.uniforms.uLift.value = smooth(0, 0.3, t);
      groundMat.uniforms.uLift.value = smooth(0, 0.3, t);

      (earth.material as THREE.MeshPhongMaterial).opacity = spaceFade;
      atmoMat.uniforms.uFade.value = spaceFade;
      earthGroup.visible = spaceFade > 0.01;

      starMat.uniforms.uTime.value = clock;
      starMat.uniforms.uOpacity.value = smooth(0.04, 0.42, t) * 0.95;
      stars.rotation.y = clock * 0.0007;

      earth.rotation.y = clock * 0.012;

      /* the launch */
      // squared rather than linear so it leaves slowly and then goes — a rocket
      // that rises at constant speed reads as an elevator
      const liftoff = smooth(0.015, 0.33, t);
      const alt = Math.pow(liftoff, 2.1) * 300;
      const thrust = smooth(0.008, 0.05, t) * (1 - smooth(0.5, 0.64, t));
      rocket.visible = t < 0.66;
      plumeMat.opacity = thrust * 0.95;
      // a little jitter in the flame; steady exhaust looks like a lamp
      plume.scale.set(1, 0.55 + thrust * 1.9 + Math.sin(clock * 26) * 0.06 * thrust, 1);
      plumeLight.intensity = thrust * 900;

      if (t < 0.30) {
        rocket.position.set(-7, alt, -46);
        rocket.rotation.set(0, 0, liftoff * 0.16); // starts to pitch downrange
        // standing on the pad, craning to follow it — the 0.55 makes the head
        // lag the vehicle, which is what actually happens
        camera.position.set(0, 1.6, 0);
        camera.up.set(0, 1, 0);
        camera.lookAt(-3.5, 1.6 + alt * 0.55, -27.6);
      } else {
        // Pull back along a line that keeps Earth's limb in frame the whole
        // way: near enough that the horizon curves hard at first, far enough
        // for the whole disc by the end. Aiming is done with lookAt rather than
        // hand-set angles — at these distances a couple of degrees of pitch is
        // the difference between a planet and an empty black screen.
        const climb = smooth(0.3, 1, t);
        const d = lerp(1.3, 2.7, climb);
        earthGroup.position.set(0, -EARTH_R * 1.3 * d, -EARTH_R * 2.4 * d);

        const drift = clock * 0.02;
        camera.position.set(0, 0, 0);
        camera.up.set(0, 1, 0);
        camera.lookAt(
          Math.sin(drift) * 6,
          earthGroup.position.y + EARTH_R + lerp(7, 3, climb),
          earthGroup.position.z
        );

        // still ahead of you, pulling away — placed relative to the camera so
        // it stays in shot while the camera itself is swinging
        // Well downrange by the time the planet appears. Held far enough out
        // that a fifteen-unit vehicle reads as a vehicle rather than a girder
        // laid across the headline, and offset left so it clears the text.
        const away = smooth(0.30, 0.64, t);
        const roff = new THREE.Vector3(
          -(14 + away * 30),
          16 + away * 60,
          -(95 + away * 320)
        ).applyQuaternion(camera.quaternion);
        rocket.position.copy(camera.position).add(roff);
        rocket.quaternion.copy(camera.quaternion);
        rocket.rotateX(-0.22);
        rocket.rotateZ(0.12);
      }

      /* the station arrives late, then you are inside it */
      const near = smooth(0.62, 1, t);
      hull.opacity = near;
      panelMat.opacity = near * 0.95;
      station.visible = near > 0.01;
      // Positioned relative to the camera rather than in world space: the
      // camera swings a long way between waypoints, and a station parked at
      // fixed coordinates leaves the frame and never comes back.
      // Far enough that it reads as a craft rather than a white shape pressed
      // against the glass, and held high and right so it clears the headlines.
      const sd = lerp(70, 21, near);
      // Lateral offset is scaled by aspect. Horizontal field of view is derived
      // from the vertical one, so a fixed sideways distance that frames nicely
      // on a laptop is far outside the frustum on a phone held upright — which
      // is how most of this audience will arrive.
      const lateral = sd * 0.22 * Math.min(1.8, camera.aspect);
      const off = new THREE.Vector3(
        lateral + Math.cos(clock * 0.05) * 0.6,
        sd * 0.26 + Math.sin(clock * 0.04) * 0.4,
        -sd
      ).applyQuaternion(camera.quaternion);
      station.position.copy(camera.position).add(off);
      station.quaternion.copy(camera.quaternion);
      station.rotateY(0.55);
      station.rotateX(0.12);
      station.scale.setScalar(lerp(2.4, 1, near));
      panelPivot.rotation.x = clock * 0.14;

      /* arrival: you are inside Haven-1, and the window opens as you approach */
      const aboard = smooth(0.80, 1, t);
      if (cabinRef.current) {
        const el = cabinRef.current;
        el.style.opacity = String(aboard);
        // the opening widens with scroll once you are actually in the cabin —
        // walking up to the glass rather than arriving pressed against it
        const holeR = 26 + scrollT * 20 + aboard * 4;
        const m = `radial-gradient(circle at 50% 50%, transparent ${holeR}vmin, rgba(0,0,0,1) ${holeR + 1.1}vmin)`;
        el.style.maskImage = m;
        el.style.setProperty("-webkit-mask-image", m);
        if (rimRef.current) {
          rimRef.current.style.width = `${holeR * 2}vmin`;
          rimRef.current.style.height = `${holeR * 2}vmin`;
          rimRef.current.style.opacity = String(aboard);
        }
      }

      if (process.env.NODE_ENV !== "production") {
        (window as unknown as { __j?: unknown }).__j = {
          t: +t.toFixed(3),
          target: targetRef.current,
          scrollT: +scrollT.toFixed(3),
          earth: earthGroup.position.toArray().map((n) => Math.round(n)),
          earthVisible: earthGroup.visible,
          earthOpacity: +(earth.material as THREE.MeshPhongMaterial).opacity.toFixed(2),
          cam: camera.position.toArray().map((n) => +n.toFixed(1)),
          station: station.position.toArray().map((n) => Math.round(n)),
          stationVisible: station.visible,
          hullOpacity: +hull.opacity.toFixed(2),
        };
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      starGeo.dispose(); starMat.dispose(); skyMat.dispose(); groundMat.dispose();
      atmoMat.dispose(); hull.dispose(); panelMat.dispose();
      renderer.dispose();
    };
  }, []);

  const maskInit = "radial-gradient(circle at 50% 50%, transparent 26vmin, rgba(0,0,0,1) 27.1vmin)";

  return (
    <>
      <canvas
        ref={ref}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />

      {/* Haven-1's cabin — cream dome ceiling, diagonal LED strips, wood-slat
          arch — masked with a circular opening. Kept as DOM rather than
          geometry because it is a flat backdrop the camera never moves through,
          and CSS gradients cost nothing next to another pass of shading. */}
      <div
        ref={cabinRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
          opacity: 0,
          maskImage: maskInit,
          WebkitMaskImage: maskInit,
          background:
            "radial-gradient(ellipse 85% 65% at 50% 12%, #ddd3c1 0%, #beb29b 32%, #93876f 60%, #5f5646 88%, #46402f 100%)",
        }}
      >
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: "36%", width: 1, background: "rgba(0,0,0,0.16)" }} />
        <div
          style={{
            position: "absolute", left: "-4%", top: "20%", width: "44%", height: 3,
            background: "linear-gradient(90deg, transparent, #fff3d6 55%, transparent)",
            boxShadow: "0 0 16px 3px rgba(255,224,160,0.5)",
            transform: "rotate(-26deg)", transformOrigin: "right center",
          }}
        />
        <div
          style={{
            position: "absolute", right: "-4%", top: "20%", width: "44%", height: 3,
            background: "linear-gradient(90deg, transparent, #fff3d6 55%, transparent)",
            boxShadow: "0 0 16px 3px rgba(255,224,160,0.5)",
            transform: "rotate(26deg)", transformOrigin: "left center",
          }}
        />
        <div
          style={{
            position: "absolute", left: "50%", bottom: "-32%", width: "130%", height: "60%",
            transform: "translateX(-50%)",
            borderTop: "6px solid rgba(232,226,212,0.55)",
            borderRadius: "50% 50% 0 0 / 22% 22% 0 0",
            background: "repeating-linear-gradient(90deg, #8a6338 0 16px, #6f4d29 16px 18px)",
            boxShadow: "0 -30px 70px rgba(0,0,0,0.45) inset",
          }}
        />
      </div>

      {/* metal rim and glass sheen, sized each frame to track the opening */}
      <div
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div
          ref={rimRef}
          style={{
            position: "relative", width: "52vmin", height: "52vmin", borderRadius: "50%", opacity: 0,
            boxShadow: [
              "inset 0 0 46px 16px rgba(0,0,0,0.6)",
              "inset 0 0 0 3px rgba(215,224,236,0.4)",
              "inset 0 0 0 9px rgba(20,24,32,0.9)",
              "inset 0 0 0 13px rgba(170,182,200,0.28)",
              "0 0 0 6px rgba(40,45,54,0.95)",
              "0 0 0 8px rgba(190,200,214,0.18)",
              "0 30px 90px rgba(0,0,0,0.7)",
            ].join(", "),
          }}
        >
          <div
            style={{
              position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden",
              background: "radial-gradient(circle at 30% 24%, rgba(255,255,255,0.24), rgba(255,255,255,0.06) 28%, transparent 52%)",
              mixBlendMode: "screen",
            }}
          />
        </div>
      </div>
    </>
  );
}
