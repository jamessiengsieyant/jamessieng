"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import * as THREE from "three";
import { CLIMB_END, DOCK_END, PAD_END, lerp, smooth, spanFor, waypointFor } from "./journey";

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
  const pathRef = useRef("/vast");
  const scrollTRef = useRef(0);
  const pathname = usePathname();

  /* Navigation only moves the target; the loop below eases toward it.
     scrollT is forced to 0 here rather than waiting for the browser's own
     scroll-to-top-on-navigate to be observed by the next onScroll poll. The
     new page hasn't painted yet, so for a frame or two after the click,
     target/span have already updated to the NEW route while scrollT still
     holds the OLD route's value (often ~1, from having scrolled to the
     bottom to get here). That combination briefly computes a goal on the far
     side of the new route's own span, and cur ticks toward it before
     snapping back down once the real scroll position of 0 is read — which is
     the "overshoots, then rewinds" glitch right at the moment of transition. */
  useEffect(() => {
    targetRef.current = waypointFor(pathname);
    pathRef.current = pathname;
    scrollTRef.current = 0;
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
    const skyMesh = new THREE.Mesh(new THREE.SphereGeometry(400, 40, 28), skyMat);
    /* Both the dome and the ground plane are centred on the origin, so three.js
       sorts them by centre distance — about a metre from the camera — and draws
       them LAST of all the transparent objects. Anything transparent that does
       not write depth (the exhaust) is then repainted over by the sky. Pinning
       the backdrop to the front of the queue is what makes the flame visible at
       all. */
    skyMesh.renderOrder = -100;
    groundGroup.add(skyMesh);

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
    ground.renderOrder = -90;
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

    /* Split into two groups that separate later: the booster (falls away,
       tumbles) and the upper stack (stays controlled, carries the fairing
       and — hidden inside it — Haven-1). Both start at local (0,0,0), so the
       existing camera-relative positioning of `rocket` itself as a whole is
       untouched; only what happens LOCALLY, once they come apart, is new. */
    const boosterGroup = new THREE.Group();
    const upperGroup = new THREE.Group();
    rocket.add(boosterGroup, upperGroup);

    const firstStage = new THREE.Mesh(new THREE.CylinderGeometry(R_R, R_R, R_H * 0.68, 28), whiteMat);
    firstStage.position.y = R_H * 0.34;
    boosterGroup.add(firstStage);

    const interstage = new THREE.Mesh(new THREE.CylinderGeometry(R_R, R_R, R_H * 0.06, 28), blackMat);
    interstage.position.y = R_H * 0.71;
    upperGroup.add(interstage);

    const secondStage = new THREE.Mesh(new THREE.CylinderGeometry(R_R, R_R, R_H * 0.2, 28), whiteMat);
    secondStage.position.y = R_H * 0.84;
    upperGroup.add(secondStage);

    /* The fairing is two clamshell halves, not one solid nose — so they can
       peel open and fall away, which is the moment Haven-1 becomes visible
       for the first time. A "half cone" is the same ConeGeometry with
       thetaLength cut to π; each half keeps the full cone's own central axis
       as its local origin, so rotating it about that axis reads as a hinge
       opening rather than the geometry pivoting from the wrong point. */
    const fairingMat = whiteMat.clone();
    fairingMat.transparent = true;
    const fairingGeo = (start: number) =>
      new THREE.ConeGeometry(R_R, R_H * 0.12, 28, 1, true, start, Math.PI);
    const fairingLeft = new THREE.Mesh(fairingGeo(0), fairingMat);
    const fairingRight = new THREE.Mesh(fairingGeo(Math.PI), fairingMat);
    for (const half of [fairingLeft, fairingRight]) {
      half.position.y = R_H * 1.0;
      upperGroup.add(half);
    }

    for (let i = 0; i < 4; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(R_R * 0.75, R_R * 0.9, 0.06), blackMat);
      const a = (i / 4) * Math.PI * 2;
      fin.position.set(Math.cos(a) * R_R * 1.15, R_H * 0.66, Math.sin(a) * R_R * 1.15);
      fin.rotation.y = -a;
      boosterGroup.add(fin);
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, R_H * 0.1, 8), blackMat);
      leg.position.set(Math.cos(a) * R_R * 0.9, R_H * 0.03, Math.sin(a) * R_R * 0.9);
      leg.rotation.z = Math.cos(a) * 0.28;
      leg.rotation.x = -Math.sin(a) * 0.28;
      boosterGroup.add(leg);
    }

    /* the exhaust.
       Three stacked cones rather than one. There is no bloom pass here — a
       post-processing chain for a single bright object would cost more than the
       rest of the scene put together — so the glow is faked the old way, by
       stacking additive shells that get wider, longer and fainter outward. The
       eye reads the pile-up as bloom. */
    const plumeShader = (widthMul: number, lenMul: number, gain: number) =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        /* Depth testing stays ON. The reason the flame was invisible was never
           depth — it was that the backdrop sorted last and repainted over it
           (see the renderOrder note on the sky dome). With that fixed, keeping
           the test means the ground correctly cuts the plume off at the horizon
           instead of the beam appearing to pass through the planet. */
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        uniforms: { uTime: { value: 0 }, uThrust: { value: 0 }, uGain: { value: gain } },
        vertexShader: `
          varying vec2 vUv;
          varying float vFres;
          void main(){
            vUv = uv;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vec3 n = normalize(normalMatrix * normal);
            vec3 vd = normalize(-mv.xyz);
            // 1 at the silhouette, 0 face-on: makes a hollow shell read as volume
            vFres = 1.0 - abs(dot(n, vd));
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: `
          varying vec2 vUv;
          varying float vFres;
          uniform float uTime; uniform float uThrust; uniform float uGain;

          float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
          float noise(vec2 p){
            vec2 i = floor(p), f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            return mix(mix(hash(i), hash(i+vec2(1,0)), f.x),
                       mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
          }

          void main(){
            float v = vUv.y;   // 0 at the nozzle, 1 at the tail

            /* NB: on a cone's side uv.x runs around the circumference, not
               across the radius, so it cannot be used for a radial falloff —
               doing that fades the plume by angle and leaves a sliver. The
               cross-sectional softness comes from the fresnel term instead. */

            // turbulence scrolling away from the engine
            float n = noise(vec2(vUv.x * 9.0, v * 7.0 - uTime * 8.0));

            // white-hot for most of its length, only going orange at the very
            // tail — a night launch is a white column, not an orange one
            vec3 col = mix(vec3(1.0,1.0,0.99), vec3(1.0,0.94,0.76), smoothstep(0.0, 0.45, v));
            col = mix(col, vec3(1.0,0.62,0.26), smoothstep(0.55, 0.95, v));

            // shock diamonds — the standing bright bands just past the nozzle
            float dia = 0.5 + 0.5 * sin(v * 48.0);
            col += vec3(0.7,0.55,0.35) * dia * (1.0 - smoothstep(0.0, 0.26, v)) * 0.55;

            float len = pow(1.0 - v, 0.55);          // fade down the length
            float body = 0.55 + 0.45 * vFres;        // brighter at the edges
            float a = len * body * (0.55 + 0.45 * n) * uThrust * uGain;
            gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
          }`,
      });

    const plumeMats: THREE.ShaderMaterial[] = [];
    const plumes: THREE.Mesh[] = [];
    for (const [w, l, g] of [[0.80, 1.7, 1.25], [1.15, 2.3, 0.72], [1.75, 3.0, 0.36]]) {
      const m = plumeShader(w, l, g);
      const len = R_H * 0.55 * l;

      /* The transform is baked into the vertices rather than set on the mesh.
         A cone is centred on its own middle, so scaling the mesh grows it in
         both directions — which drives the bright wide end up inside the first
         stage, leaving only the faint tail poking out below. Moving the origin
         to the mouth means scale.y only ever stretches the flame downward,
         away from the engines. */
      const geo = new THREE.ConeGeometry(R_R * w, len, 24, 1, true);
      geo.rotateX(Math.PI);        // apex points down
      geo.translate(0, -len / 2, 0); // mouth at y=0, apex at y=-len

      const mesh = new THREE.Mesh(geo, m);
      mesh.position.y = 0;         // the engine plane
      mesh.renderOrder = 20;       // after the backdrop, over the pad hardware
      boosterGroup.add(mesh);      // the engines are on the booster
      plumeMats.push(m);
      plumes.push(mesh);
    }

    // light so the exhaust actually throws colour onto the pad and the ground
    const plumeLight = new THREE.PointLight(0xffa23d, 0, 160, 2);
    plumeLight.position.y = -2;
    boosterGroup.add(plumeLight);

    /* The vehicle stands on a mount rather than on the dirt. This is not
       decoration: the exhaust is modelled as cones hanging below the engines,
       and with the base at y=0 all of it is buried under the ground plane and
       nothing is ever seen. Lifting it clears the flame, and the ground then
       does something useful — it crops the bottom of the plume the way a flame
       trench actually does. */
    const PAD_H = 5;
    // Close enough that the vehicle and its flame fill the frame. At the old
    // 46 units the whole launch played out about an inch tall.
    const PAD_X = -4.5, PAD_Z = -27;
    rocket.position.set(PAD_X, PAD_H, PAD_Z);
    scene.add(rocket);

    /* A ring on legs, not a plinth. A solid mount occupies exactly the volume
       the exhaust needs and hides the whole plume inside itself — which is why
       real pads hold the vehicle at its skirt and leave the space underneath
       open. Same reason here. */
    const mount = new THREE.Group();
    // transparent so the dock can fade out smoothly rather than snapping
    // off — it needs to still be standing at the end of /vast and only let
    // go gradually into the first part of the climb
    const steelMat = new THREE.MeshPhongMaterial({
      color: 0x2a2e36, shininess: 6, transparent: true, opacity: 1,
    });

    const collar = new THREE.Mesh(
      new THREE.CylinderGeometry(R_R * 1.35, R_R * 1.35, 0.35, 14, 1, true),
      steelMat
    );
    collar.position.y = PAD_H - 0.2;
    mount.add(collar);

    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const leg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.07, PAD_H, 6),
        steelMat
      );
      leg.position.set(Math.cos(a) * R_R * 1.35, PAD_H / 2, Math.sin(a) * R_R * 1.35);
      mount.add(leg);
    }

    // the tower alongside, so the pad reads as a pad
    const tower = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, PAD_H * 2.6, 0.5),
      steelMat
    );
    tower.position.set(R_R * 3.4, PAD_H * 1.3, 0);
    mount.add(tower);

    mount.position.set(PAD_X, 0, PAD_Z);
    scene.add(mount);

    /* ignition: the flash, and the cloud it leaves behind.
       Both stay at the pad in world space rather than parented to the vehicle,
       because the whole point is that the rocket leaves and the smoke does not. */
    function softTexture(inner: string, outer: string): THREE.Texture {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const x = c.getContext("2d")!;
      const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, inner);
      g.addColorStop(0.45, outer);
      g.addColorStop(1, "rgba(0,0,0,0)");
      x.fillStyle = g;
      x.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    }

    const PAD = new THREE.Vector3(PAD_X, 0, PAD_Z);

    const flashMat = new THREE.SpriteMaterial({
      map: softTexture("rgba(255,248,230,1)", "rgba(255,150,40,0.55)"),
      transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const flash = new THREE.Sprite(flashMat);
    // at the engines, not on the deck — at ground level it disappears into the
    // sunset band, which is the brightest thing on screen at that moment
    flash.position.set(PAD.x, PAD_H * 0.55, PAD.z);
    scene.add(flash);

    /* The cloud rolls outward across the ground rather than lifting with the
       vehicle — that spreading sheet at the pad is most of what sells the scale
       of a launch, and it is still there long after the rocket has gone. */
    const smokeTex = softTexture("rgba(232,229,222,0.95)", "rgba(150,145,136,0.42)");
    const smoke: THREE.Sprite[] = [];
    const SMOKE_N = 30;
    for (let i = 0; i < SMOKE_N; i++) {
      const m = new THREE.SpriteMaterial({
        map: smokeTex, transparent: true, opacity: 0, depthWrite: false,
      });
      const s = new THREE.Sprite(m);
      // two rings: a dense billow at the pad, and a thinner sheet running out
      // across the terrain behind it
      const outer = i >= SMOKE_N * 0.45;
      s.userData = {
        a: (i / SMOKE_N) * Math.PI * 2 + Math.random() * 0.9,
        spd: outer ? 2.4 + Math.random() * 3.2 : 0.6 + Math.random() * 1.1,
        rise: outer ? 0.05 + Math.random() * 0.25 : 0.3 + Math.random() * 0.9,
        size: outer ? 9 + Math.random() * 14 : 4 + Math.random() * 7,
        lag: Math.random() * 0.22,
      };
      scene.add(s);
      smoke.push(s);
    }

    /* ───────── Haven-1 ─────────
       Not a separate destination — the cargo. It rides hidden inside the
       fairing the whole climb, tucked small, and is only ever REVEALED — it
       never has to be flown to, because it was there the entire time. It
       starts as a child of upperGroup (so it travels with the stack while
       hidden) and gets handed to `rocket` directly, world-transform intact,
       the moment the second stage lets go of it. */
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
    // tucked where the fairing sits, and small — it unfolds to full size as
    // part of the reveal rather than simply appearing at full scale
    station.position.y = R_H * 0.97;
    station.scale.setScalar(0.001);
    upperGroup.add(station);

    // a steady indicator light on the hull once revealed — not a distant
    // blip to be approached, since Haven-1 never has to be flown to
    const beaconMat = new THREE.SpriteMaterial({
      map: softTexture("rgba(255,255,255,1)", "rgba(180,214,255,0.5)"),
      transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const beacon = new THREE.Sprite(beaconMat);
    beacon.renderOrder = 15;
    beacon.position.set(0, 0.6, 0.9);
    beacon.scale.setScalar(0.35);
    station.add(beacon);

    /* ───────── input ───────── */
    function onScroll() {
      const max = document.body.scrollHeight - innerHeight;
      scrollTRef.current = max > 40 ? Math.min(1, scrollY / max) : 0;
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

    // flips once, the moment the second stage lets go of Haven-1 — guards
    // the one-time reparent from firing again on every subsequent frame
    let stageAttached = false;

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

      /* Ease toward the waypoint; scroll nudges within the current segment so
         the picture keeps moving even when nobody is navigating.

         The nudge is scaled by THIS ROUTE's own span, not a flat constant.
         /vast only owns t:[0, PAD_END] — scrolling all the way through its own
         page content must land exactly on the ignition whiteout and never
         carry through into deep climb. A flat multiplier here previously let
         scrollT alone push t well past the boundary the route was supposed to
         own, which is why the pad page was showing a rocket already high in a
         dark sky instead of still on the mount. */
      const goal = Math.min(1, targetRef.current + scrollTRef.current * spanFor(pathRef.current));
      cur += (goal - cur) * (reduced ? 1 : 0.035);
      const t = cur;

      /* which representation is on screen.
         Both resolve BEFORE CLIMB_END (0.4) rather than straddling it — by the
         moment the engines cut off, the ground is fully gone and Earth is
         fully in, so "proper orbit" and "engines shut down" read as the same
         instant instead of two things half-finished at once. */
      const groundFade = 1 - smooth(0.13, 0.34, t);   // plane + dome
      const spaceFade = smooth(0.16, 0.37, t);        // sphere
      skyMat.uniforms.uFade.value = groundFade;
      groundMat.uniforms.uFade.value = groundFade;
      groundGroup.visible = groundFade > 0.01;
      skyMat.uniforms.uLift.value = smooth(0.04, 0.44, t);
      groundMat.uniforms.uLift.value = smooth(0.04, 0.44, t);

      (earth.material as THREE.MeshPhongMaterial).opacity = spaceFade;
      atmoMat.uniforms.uFade.value = spaceFade;
      earthGroup.visible = spaceFade > 0.01;

      starMat.uniforms.uTime.value = clock;
      starMat.uniforms.uOpacity.value = smooth(0.20, 0.50, t) * 0.95;
      stars.rotation.y = clock * 0.0007;

      earth.rotation.y = clock * 0.012;

      /* the launch */
      // squared rather than linear so it leaves slowly and then goes — a rocket
      // that rises at constant speed reads as an elevator
      const liftoff = smooth(0.015, 0.33, t);
      const alt = Math.pow(liftoff, 2.1) * 300;
      /* Engine cutoff is the scene boundary, not an incidental detail — the
         jets going dark IS the transition from Introduction into Topic 1, so
         it has to land exactly on CLIMB_END rather than drift on into the
         next scene's territory. */
      const thrust = smooth(0.008, 0.05, t) * (1 - smooth(CLIMB_END - 0.06, CLIMB_END, t));
      rocket.visible = t < 0.66;

      // two beat frequencies so the flicker never falls into an obvious loop
      const flicker = 1 + Math.sin(clock * 31) * 0.05 + Math.sin(clock * 17.3) * 0.035;
      for (let i = 0; i < plumeMats.length; i++) {
        plumeMats[i].uniforms.uTime.value = clock;
        plumeMats[i].uniforms.uThrust.value = thrust * flicker;
        /* It leaves the pad as a tight column and only opens out with height —
           thinner air lets the exhaust expand, which is why a launch looks
           like a pencil at the tower and a cone by staging. */
        const spread = 1 + smooth(0.03, 0.33, t) * 1.6;
        plumes[i].scale.set(spread, (0.5 + thrust * 1.2) * flicker, spread);
      }
      plumeLight.intensity = thrust * flicker * 260;

      /* ignition — a hard flash, then a cloud that stays on the pad */
      const ignite = smooth(0.006, 0.032, t);
      const flashOut = 1 - smooth(0.028, 0.095, t);
      flashMat.opacity = ignite * flashOut * 0.95;
      flash.scale.setScalar(3 + ignite * 26);

      const age = smooth(0.008, 0.15, t);
      const smokeOut = 1 - smooth(0.30, 0.48, t);
      for (const s of smoke) {
        const u = s.userData as {
          a: number; spd: number; rise: number; size: number; lag: number;
        };
        // each puff starts a little later than the last, so the cloud unrolls
        // instead of every sprite expanding in lockstep
        const own = Math.max(0, (age - u.lag) / (1 - u.lag));
        s.position.set(
          PAD.x + Math.cos(u.a) * u.spd * own * 30,
          PAD.y + u.rise * own * 14 + 1.2,
          PAD.z + Math.sin(u.a) * u.spd * own * 30
        );
        s.scale.setScalar(u.size * (0.35 + own * 1.5));
        (s.material as THREE.SpriteMaterial).opacity = ignite * smokeOut * own * 0.28;
        s.visible = own > 0.01 && ignite * smokeOut > 0.01;
      }

      /* The dock fades on a clock, not on altitude. Tying it to alt made it
         let go within the first couple of seconds of ignition — long before
         /vast even finishes scrolling — which is why the tower had already
         vanished by the time anyone reached the bottom of the page. It now
         stays fully solid through the end of /vast (PAD_END) and only lets
         go gradually over the first stretch of the climb that follows —
         the "still rising, dock quietly dropping away" beat that plays right
         after Launch is pressed. */
      const dockFade = 1 - smooth(PAD_END, PAD_END + 0.09, t);
      steelMat.opacity = dockFade;
      mount.visible = dockFade > 0.01;

      if (t < 0.30) {
        rocket.position.set(PAD_X, PAD_H + alt, PAD_Z);
        rocket.rotation.set(0, 0, liftoff * 0.16); // starts to pitch downrange
        // standing on the pad, craning to follow it — the 0.55 makes the head
        // lag the vehicle, which is what actually happens
        camera.position.set(0, 1.6, 0);
        camera.up.set(0, 1, 0);
        camera.lookAt(PAD_X * 0.6, PAD_H * 0.7 + alt * 0.55, PAD_Z * 0.6);
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
        // Spread across almost the whole rest of the journey rather than
        // finishing inside Introduction alone — the vehicle should still read
        // as present and climbing right up to engine cutoff, not have already
        // shrunk to a speck with a third of the scene still to go.
        const away = smooth(0.32, 0.85, t);
        const roff = new THREE.Vector3(
          -(14 + away * 30),
          16 + away * 60,
          -(95 + away * 320)
        ).applyQuaternion(camera.quaternion);
        rocket.position.copy(camera.position).add(roff);
        rocket.quaternion.copy(camera.quaternion);
        rocket.rotateX(-0.22);
        rocket.rotateZ(0.12);

        /* ── staging, in order: booster falls away, the fairing opens and
           reveals Haven-1, then the spent second stage lets go of it too.
           Every rotation and drift below is a function of t alone — bounded
           and deterministic — never of raw elapsed clock time. The previous
           version called rotateZ/rotateX with a value keyed on clock every
           single frame, which is a RELATIVE rotation compounding forever —
           the longer the tab happened to sit open, the faster it spun,
           entirely unrelated to scroll position. That's the "random
           spinning." Using rotation.set() with a value computed purely from
           t fixes it: reload the page at the same t and it looks identical. */

        // 1 — booster separation, right at engine cutoff
        const boosterSep = smooth(CLIMB_END, CLIMB_END + 0.07, t);
        const boosterFall = Math.max(0, t - CLIMB_END); // bounded: t itself never exceeds 1
        boosterGroup.position.set(
          0,
          -boosterSep * 3 - boosterFall * 5,
          -boosterSep * 1.5 - boosterFall * 2.5
        );
        boosterGroup.rotation.set(
          boosterSep * 1.1 + boosterFall * 14,
          boosterFall * 9,
          boosterSep * 0.7 + boosterFall * 11
        );

        // 2 — the fairing peels open, which is the moment Haven-1 first
        // becomes visible at all — it was never flown TO, only revealed
        const fairingOpen = smooth(CLIMB_END + 0.06, CLIMB_END + 0.16, t);
        const fairingGone = 1 - smooth(CLIMB_END + 0.14, CLIMB_END + 0.20, t);
        fairingLeft.position.set(fairingOpen * 2.2, R_H * 1.0, fairingOpen * 0.8);
        fairingRight.position.set(-fairingOpen * 2.2, R_H * 1.0, -fairingOpen * 0.8);
        fairingLeft.rotation.z = -fairingOpen * 1.3;
        fairingRight.rotation.z = fairingOpen * 1.3;
        fairingMat.opacity = fairingGone;
        fairingLeft.visible = fairingGone > 0.01;
        fairingRight.visible = fairingGone > 0.01;

        // Haven-1 unfolds from tucked-tiny to full size as the fairing opens
        const reveal = smooth(CLIMB_END + 0.05, CLIMB_END + 0.18, t);
        station.scale.setScalar(Math.max(0.001, reveal));
        hull.opacity = reveal;
        panelMat.opacity = reveal * 0.95;
        station.visible = reveal > 0.01;
        // solar panels unfold once, on a fixed schedule — not a spin that
        // never stops, the same fix as the booster's rotation above
        panelPivot.rotation.x = lerp(-1.15, 0, smooth(CLIMB_END + 0.10, CLIMB_END + 0.30, t));

        // 3 — the spent second stage lets go of Haven-1, once the fairing is
        // clear of it. attach() (not add()) preserves world transform, so
        // Haven-1 does not jump the instant it changes parents.
        if (!stageAttached && t > CLIMB_END + 0.16) {
          rocket.attach(station);
          stageAttached = true;
        }
        const stageSep = smooth(CLIMB_END + 0.18, CLIMB_END + 0.26, t);
        const stageDrift = Math.max(0, t - (CLIMB_END + 0.18));
        upperGroup.position.set(0, stageSep * 2.4 + stageDrift * 3.5, stageSep * 1.2 + stageDrift * 2);
        upperGroup.rotation.set(stageDrift * 6, stageSep * 0.6, stageDrift * 5);

        // 4 — Haven-1 settles into a fixed presentation attitude. Nothing
        // further animates once revealed — the stillness IS the arrival,
        // rather than a rendezvous that has to be flown.
        station.rotation.set(0.08, 0.4, 0);

        // a steady indicator light on the hull, once there is a hull to sit on
        beaconMat.opacity = reveal * (0.6 + 0.4 * Math.sin(clock * 2.3));
      }

      /* arrival: the cabin fades in during the tail of Topic 1's own scroll, so
         it is fully in by DOCK_END — Topic 2's waypoint. Landing there via the
         "Entering →" button (or scrolling to it directly) means Topic 2 opens
         already inside, rather than starting the reveal from scratch. */
      const aboard = smooth(DOCK_END - 0.10, DOCK_END, t);
      if (cabinRef.current) {
        const el = cabinRef.current;
        el.style.opacity = String(aboard);
        // the opening widens with scroll once you are actually in the cabin —
        // walking up to the glass rather than arriving pressed against it
        const holeR = 26 + scrollTRef.current * 20 + aboard * 4;
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
          scrollT: +scrollTRef.current.toFixed(3),
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
