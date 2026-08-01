"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Variant = "orbit" | "closeup";

/* ---- procedural textures (no external assets/network calls) ---- */

function blob(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, pts: number) {
  ctx.beginPath();
  for (let i = 0; i <= pts; i++) {
    const a = (i / pts) * Math.PI * 2;
    const rr = r * (0.68 + Math.random() * 0.58);
    const x = cx + Math.cos(a) * rr;
    const y = cy + Math.sin(a) * rr * 0.75;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

// lon/lat (degrees, standard equirectangular) -> fractional [0..1] uv
function ll(lon: number, lat: number): [number, number] {
  return [(lon + 180) / 360, (90 - lat) / 180];
}

// smooth closed path through control points (Catmull-Rom-ish via midpoint quadratics)
function smoothPath(ctx: CanvasRenderingContext2D, pts: [number, number][]) {
  if (pts.length < 3) return;
  const mid = (a: [number, number], b: [number, number]): [number, number] => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const m0 = mid(pts[0], pts[pts.length - 1]);
  ctx.beginPath();
  ctx.moveTo(m0[0], m0[1]);
  for (let i = 0; i < pts.length; i++) {
    const cur = pts[i];
    const next = pts[(i + 1) % pts.length];
    const m = mid(cur, next);
    ctx.quadraticCurveTo(cur[0], cur[1], m[0], m[1]);
  }
  ctx.closePath();
}

type BiomeBlob = { lon: number; lat: number; r: number; color: string; alpha?: number };

function drawLandmass(
  ctx: CanvasRenderingContext2D, w: number, h: number,
  points: [number, number][], baseColor: string, biomes: BiomeBlob[] = []
) {
  const pts = points.map(([lon, lat]) => {
    const [fx, fy] = ll(lon, lat);
    return [fx * w, fy * h] as [number, number];
  });
  ctx.save();
  smoothPath(ctx, pts);
  ctx.fillStyle = baseColor;
  ctx.fill();
  ctx.clip();
  for (const b of biomes) {
    const [fx, fy] = ll(b.lon, b.lat);
    ctx.globalAlpha = b.alpha ?? 0.6;
    ctx.fillStyle = b.color;
    blob(ctx, fx * w, fy * h, b.r, 12);
  }
  ctx.globalAlpha = 1;
  ctx.restore();
  // coastline
  smoothPath(ctx, pts);
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function island(ctx: CanvasRenderingContext2D, w: number, h: number, lon: number, lat: number, r: number, color: string) {
  const [fx, fy] = ll(lon, lat);
  ctx.fillStyle = color;
  blob(ctx, fx * w, fy * h, r, 10);
}

const GREEN = "#4a6b3c";
const GREEN_DARK = "#2e4a28";
const GREEN_MED = "#5c7a45";
const TAN = "#c2a06a";
const TAN_DARK = "#a0854f";
const ICE = "#e8eef2";

function makeEarthTexture(): THREE.Texture {
  const w = 1536, h = 768;
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0a2f52";
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = `rgba(22,78,132,${0.05 + Math.random() * 0.08})`;
    blob(ctx, Math.random() * w, Math.random() * h, 50 + Math.random() * 130, 12);
  }

  // North America
  drawLandmass(ctx, w, h, [
    [-168, 65], [-140, 70], [-95, 73], [-80, 63], [-65, 50], [-68, 45],
    [-75, 35], [-80, 26], [-90, 29], [-97, 26], [-105, 20], [-92, 15],
    [-83, 9], [-87, 13], [-105, 22], [-115, 28], [-117, 33], [-124, 42],
    [-130, 50], [-150, 60],
  ], GREEN, [
    { lon: -110, lat: 33, r: 95, color: TAN },
    { lon: -100, lat: 60, r: 120, color: GREEN_DARK },
    { lon: -80, lat: 42, r: 70, color: GREEN_MED },
  ]);

  // Greenland
  drawLandmass(ctx, w, h, [
    [-58, 60], [-45, 60], [-22, 70], [-25, 80], [-45, 83], [-60, 76], [-56, 66],
  ], ICE);

  // South America
  drawLandmass(ctx, w, h, [
    [-77, 8], [-60, 10], [-51, 0], [-35, -6], [-38, -13], [-43, -23],
    [-48, -27], [-57, -35], [-62, -40], [-68, -50], [-70, -55], [-73, -45],
    [-72, -33], [-71, -18], [-81, -6], [-80, 2],
  ], GREEN_DARK, [
    { lon: -68, lat: -45, r: 75, color: TAN },
    { lon: -70, lat: -22, r: 45, color: TAN },
    { lon: -50, lat: -15, r: 90, color: GREEN_MED },
  ]);

  // Africa
  drawLandmass(ctx, w, h, [
    [-17, 15], [-10, 33], [10, 37], [25, 32], [35, 31], [43, 12], [51, 12],
    [43, -1], [40, -15], [35, -25], [20, -34], [15, -25], [12, -6], [9, 4], [-8, 5],
  ], TAN, [
    { lon: 20, lat: 2, r: 95, color: GREEN_DARK },
    { lon: 30, lat: 8, r: 90, color: GREEN_MED },
    { lon: 25, lat: -28, r: 65, color: GREEN_MED },
    { lon: 20, lat: 22, r: 100, color: TAN_DARK },
  ]);

  // Arabian peninsula
  drawLandmass(ctx, w, h, [
    [35, 32], [48, 30], [56, 26], [59, 22], [51, 13], [43, 13], [35, 20],
  ], TAN_DARK);

  // Eurasia (Europe + Asia)
  drawLandmass(ctx, w, h, [
    [-9, 43], [2, 51], [11, 55], [18, 60], [30, 68], [60, 68], [90, 72],
    [140, 73], [170, 68], [178, 63], [160, 55], [140, 45], [130, 40],
    [122, 30], [108, 12], [103, 2], [98, 10], [90, 22], [80, 8], [72, 21],
    [67, 24], [56, 26], [48, 30], [35, 37], [28, 42], [15, 45], [7, 44],
  ], GREEN, [
    { lon: 90, lat: 62, r: 170, color: GREEN_DARK },
    { lon: 65, lat: 46, r: 100, color: TAN },
    { lon: 105, lat: 44, r: 75, color: TAN },
    { lon: 90, lat: 24, r: 75, color: GREEN_DARK },
    { lon: 25, lat: 55, r: 70, color: GREEN_MED },
  ]);

  // small islands
  island(ctx, w, h, -3, 54, 22, GREEN_MED);   // Britain/Ireland
  island(ctx, w, h, 138, 37, 30, GREEN_MED);  // Japan
  island(ctx, w, h, 47, -19, 26, GREEN_MED);  // Madagascar
  island(ctx, w, h, 107, -3, 26, GREEN_DARK); // Sumatra
  island(ctx, w, h, 115, -2, 22, GREEN_DARK); // Borneo
  island(ctx, w, h, 122, 12, 16, GREEN_MED);  // Philippines
  island(ctx, w, h, 147, -42, 14, GREEN_MED); // Tasmania
  island(ctx, w, h, 172, -41, 26, GREEN_MED); // New Zealand

  // Australia
  drawLandmass(ctx, w, h, [
    [122, -14], [132, -11], [142, -11], [146, -19], [153, -28], [151, -34],
    [147, -38], [140, -38], [131, -32], [115, -34], [113, -26], [114, -20],
  ], TAN, [
    { lon: 148, lat: -35, r: 55, color: GREEN_MED },
    { lon: 132, lat: -13, r: 55, color: GREEN_DARK },
    { lon: 133, lat: -25, r: 110, color: TAN_DARK },
  ]);

  // fine speckle for surface texture
  for (let i = 0; i < 3000; i++) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.05})`;
    ctx.fillRect(Math.random() * w, Math.random() * h, 1.4, 1.4);
  }

  const capGrad = ctx.createLinearGradient(0, 0, 0, h * 0.1);
  capGrad.addColorStop(0, "rgba(255,255,255,.96)");
  capGrad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = capGrad;
  ctx.fillRect(0, 0, w, h * 0.1);
  const capGrad2 = ctx.createLinearGradient(0, h, 0, h * 0.9);
  capGrad2.addColorStop(0, "rgba(255,255,255,.96)");
  capGrad2.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = capGrad2;
  ctx.fillRect(0, h * 0.9, w, h * 0.1);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function cloudPuff(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(255,255,255,${alpha})`);
  g.addColorStop(0.6, `rgba(255,255,255,${alpha * 0.5})`);
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function cloudSpiral(ctx: CanvasRenderingContext2D, cx: number, cy: number, maxR: number, turns: number) {
  const steps = 70;
  for (let i = 0; i < steps; i++) {
    const t = i / steps;
    const r = maxR * (1 - t * 0.92);
    const a = t * turns * Math.PI * 2;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r * 0.62;
    cloudPuff(ctx, x, y, 7 + (1 - t) * 20, 0.35 + Math.random() * 0.35);
  }
}

function makeCloudTexture(): THREE.Texture {
  const w = 1536, h = 768;
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);

  // banded weather patterns — denser near the equator and mid-latitude storm tracks
  for (let i = 0; i < 190; i++) {
    const band = Math.random();
    let y: number;
    if (band < 0.35) y = h * (0.46 + (Math.random() - 0.5) * 0.22); // equatorial (ITCZ)
    else if (band < 0.68) y = h * (0.22 + (Math.random() - 0.5) * 0.16); // N mid-lat
    else y = h * (0.74 + (Math.random() - 0.5) * 0.16); // S mid-lat
    const x = Math.random() * w;
    cloudPuff(ctx, x, y, 20 + Math.random() * 60, 0.2 + Math.random() * 0.35);
  }

  // a handful of cyclone-style swirls for recognizable weather-map character
  for (let i = 0; i < 5; i++) {
    cloudSpiral(ctx, Math.random() * w, h * (0.18 + Math.random() * 0.64), 55 + Math.random() * 45, 2.2 + Math.random() * 1.4);
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

/* ---- twinkling round-point starfield (shader, no square sprites) ---- */
function makeStars(count: number, spread: number, size: number, hue: THREE.Color) {
  const g = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const phase = new Float32Array(count);
  const sizes = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * spread;
    pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
    pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
    phase[i] = Math.random() * Math.PI * 2;
    sizes[i] = size * (0.6 + Math.random() * 0.8);
  }
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
  g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uColor: { value: hue } },
    vertexShader: `
      attribute float aPhase;
      attribute float aSize;
      uniform float uTime;
      varying float vAlpha;
      void main(){
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float twinkle = 0.55 + 0.45 * sin(uTime * 1.6 + aPhase);
        vAlpha = twinkle;
        gl_PointSize = aSize * twinkle * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }`,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vAlpha;
      void main(){
        float d = length(gl_PointCoord - vec2(0.5));
        float a = smoothstep(0.5, 0.05, d);
        gl_FragColor = vec4(uColor, a * vAlpha);
      }`,
  });
  return new THREE.Points(g, mat);
}

export default function SpaceBackground({ variant = "orbit" }: { variant?: Variant }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x03050a);
    const fov = variant === "closeup" ? 36 : 58;
    const camera = new THREE.PerspectiveCamera(fov, innerWidth / innerHeight, 0.1, 500);

    const sun = new THREE.DirectionalLight(0xffffff, 2.2);
    sun.position.set(-12, 6, 8);
    scene.add(sun, new THREE.AmbientLight(0x30405c, 1.1));

    const starsFar = makeStars(3600, 320, 1.15, new THREE.Color(0xcfe0ff));
    const starsNear = makeStars(900, 180, 1.9, new THREE.Color(0xfff2dd));
    scene.add(starsFar, starsNear);

    /* ---- Earth ---- */
    const EARTH_R = 6.2;
    const earthGroup = new THREE.Group();
    earthGroup.position.set(0, -7, -9);

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_R, 64, 64),
      new THREE.MeshPhongMaterial({ map: makeEarthTexture(), shininess: 22, specular: 0x224466 })
    );
    earthGroup.add(earth);

    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_R * 1.008, 64, 64),
      new THREE.MeshStandardMaterial({
        map: makeCloudTexture(), transparent: true, roughness: 1, depthWrite: false,
        emissive: 0xffffff, emissiveIntensity: 0.22,
      })
    );
    earthGroup.add(clouds);

    const atmoMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
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
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf1f3f6, roughness: 0.25, metalness: 0.4 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 2.6, 32), bodyMat);
    body.rotation.z = Math.PI / 2;
    station.add(body);

    const ringMat = new THREE.MeshStandardMaterial({ color: 0xd8dce2, roughness: 0.4, metalness: 0.5 });
    for (const rx of [-1.05, 1.05]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.86, 0.05, 12, 32), ringMat);
      ring.rotation.y = Math.PI / 2;
      ring.position.x = rx;
      station.add(ring);
    }

    const domeMat = new THREE.MeshStandardMaterial({ color: 0x0a1a2c, roughness: 0.06, metalness: 0.65, emissive: 0x143454, emissiveIntensity: 0.5 });
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.62, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2), domeMat);
    dome.rotation.z = -Math.PI / 2;
    dome.position.x = 1.35;
    station.add(dome);

    // solar arrays sit on their own rotary joint and track independently of station attitude —
    // this is the thing that's actually "rotating" here, not the station itself
    const panelTex = makePanelTexture();
    const panelMat = new THREE.MeshStandardMaterial({ map: panelTex, roughness: 0.35, metalness: 0.5, side: THREE.DoubleSide });
    const panelPivot = new THREE.Group();
    const joint = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.3, 12), bodyMat);
    joint.rotation.x = Math.PI / 2;
    panelPivot.add(joint);
    for (const dir of [1, -1]) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.1, 3.2), panelMat);
      panel.position.set(0, 0, dir * 2.3);
      panelPivot.add(panel);
    }
    station.add(panelPivot);
    station.scale.setScalar(variant === "closeup" ? 1.05 : 0.85);
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

    // we're behind the dome glass, not circling the planet: the camera holds roughly
    // still (a little lean-in as you scroll) and Earth's surface scrolls past because
    // the station is translating along its orbit — same as a real nadir-pointing window
    const baseY = variant === "closeup" ? -0.4 : -1.0;
    const baseZ = variant === "closeup" ? 3.6 : 2.6;
    const lookY = earthGroup.position.y + (variant === "closeup" ? 2.6 : 1.2);
    const stationOffset = variant === "closeup"
      ? new THREE.Vector3(1.6, -0.5, -2.9)
      : new THREE.Vector3(3.2, -1.6, -6.4);

    function tick() {
      const t = (performance.now() - startTime) / 1000;

      earth.rotation.y = t * 0.018;
      clouds.rotation.y = t * 0.025;
      (starsFar.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
      (starsNear.material as THREE.ShaderMaterial).uniforms.uTime.value = t;

      const target = reduced ? 0 : scrollT;
      prog += (target - prog) * 0.045;

      camera.position.set(mx * 0.3, baseY - my * 0.2 - prog * 0.6, baseZ - prog * 0.9);
      camera.lookAt(earthGroup.position.x, lookY, earthGroup.position.z);

      // station body/dome hold a fixed attitude relative to the window view — no tumbling
      const off = stationOffset.clone().applyQuaternion(camera.quaternion);
      station.position.copy(camera.position).add(off);
      station.quaternion.copy(camera.quaternion);
      station.rotateY(Math.PI * 0.15);

      // the solar array rotates on its own joint to track the sun — independent of the station
      panelPivot.rotation.z = t * (variant === "closeup" ? 0.22 : 0.11);

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
  }, [variant]);

  return (
    <>
      <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0 }} />
      {/* the porthole: a real circular cutout onto the canvas, box-shadow fills the "cabin wall" outside it */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "min(80vmin, 900px)",
            height: "min(80vmin, 900px)",
            borderRadius: "50%",
            boxShadow: [
              "0 0 0 9999px #0b0d12",
              "inset 0 0 46px 16px rgba(0,0,0,0.6)",
              "inset 0 0 0 3px rgba(215,224,236,0.4)",
              "inset 0 0 0 9px rgba(20,24,32,0.9)",
              "inset 0 0 0 13px rgba(170,182,200,0.28)",
              "0 0 0 15px rgba(40,45,54,0.95)",
              "0 0 0 17px rgba(190,200,214,0.18)",
              "0 30px 90px rgba(0,0,0,0.7)",
            ].join(", "),
          }}
        />
      </div>
    </>
  );
}
