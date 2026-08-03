"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { DeckSlide, Visual } from "../deck-types";
import { notesFor } from "../deck-types";

const BG = "#05070d";
const CARD = "#141b2b";
const LINE = "#2a3347";
const LIGHT = "#f2f4f8";
const MUTED = "#98a2b3";
const ACCENT = "#ffb25e";
const BLUE = "#7db2ff";

function Kicker({ children }: { children: string }) {
  return (
    <div style={{ letterSpacing: "0.28em", textTransform: "uppercase", fontSize: "0.62em", color: ACCENT, fontWeight: 700 }}>
      {children}
    </div>
  );
}

function SlideView({ v }: { v: Visual }) {
  const pad = "7% 8%";
  if (v.t === "title") {
    return (
      <div style={{ padding: pad, display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
        <Kicker>Final Round · Vast Space</Kicker>
        <div style={{ fontSize: "3.6em", fontWeight: 800, color: LIGHT, lineHeight: 1.02, margin: "0.25em 0 0.2em" }}>James Sieng</div>
        <div style={{ fontSize: "1.05em", color: MUTED }}>Staff Accountant — International Accounting &amp; Accounting Operations</div>
      </div>
    );
  }
  if (v.t === "statement") {
    return (
      <div style={{ padding: pad, display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
        <Kicker>{v.kick}</Kicker>
        <div style={{ fontSize: "2.6em", fontWeight: 800, color: LIGHT, lineHeight: 1.05, whiteSpace: "pre-line", margin: "0.35em 0" }}>
          {v.title}
        </div>
        {v.sub && <div style={{ fontSize: "0.95em", fontStyle: "italic", color: MUTED, maxWidth: "80%" }}>{v.sub}</div>}
      </div>
    );
  }
  if (v.t === "list") {
    return (
      <div style={{ padding: pad, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Kicker>{v.kick}</Kicker>
        <div style={{ fontSize: "1.7em", fontWeight: 800, color: LIGHT, margin: "0.4em 0 0.7em" }}>{v.title}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85em" }}>
          {v.items.map((it, i) => (
            <div key={i} style={{ display: "flex", gap: "0.7em", alignItems: "baseline" }}>
              <span style={{ width: "0.42em", height: "0.42em", borderRadius: "50%", background: ACCENT, flexShrink: 0, transform: "translateY(-0.1em)" }} />
              <div>
                <div style={{ fontSize: "1.0em", fontWeight: 700, color: LIGHT, lineHeight: 1.25 }}>{it.lead}</div>
                {it.sub && <div style={{ fontSize: "0.74em", color: MUTED, lineHeight: 1.4, marginTop: "0.15em" }}>{it.sub}</div>}
              </div>
            </div>
          ))}
        </div>
        {v.callout && (
          <div style={{ marginTop: "1.1em", border: `1px solid ${ACCENT}`, borderRadius: "0.5em", padding: "0.6em 0.9em", fontSize: "0.72em", color: LIGHT, background: "#1f1a12" }}>
            {v.callout}
          </div>
        )}
      </div>
    );
  }
  if (v.t === "cards") {
    return (
      <div style={{ padding: pad, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Kicker>{v.kick}</Kicker>
        <div style={{ fontSize: "1.55em", fontWeight: 800, color: LIGHT, whiteSpace: "pre-line", margin: "0.4em 0 0.8em", lineHeight: 1.15 }}>{v.title}</div>
        <div style={{ display: "flex", gap: "1em", flexWrap: "wrap" }}>
          {[{ c: v.a, col: ACCENT }, { c: v.b, col: BLUE }].map(({ c, col }, i) => (
            <div key={i} style={{ flex: "1 1 12em", background: CARD, border: `1px solid ${LINE}`, borderRadius: "0.6em", padding: "1em 1.2em" }}>
              <div style={{ fontSize: "0.66em", letterSpacing: "0.22em", textTransform: "uppercase", color: col, fontWeight: 700, marginBottom: "0.8em" }}>{c.h}</div>
              <div style={{ fontSize: "0.88em", color: LIGHT, whiteSpace: "pre-line", lineHeight: 1.5 }}>{c.lines}</div>
            </div>
          ))}
        </div>
        {v.tail && <div style={{ marginTop: "1em", fontSize: "0.85em", fontStyle: "italic", color: MUTED }}>{v.tail}</div>}
      </div>
    );
  }
  if (v.t === "chain") {
    return (
      <div style={{ padding: pad, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Kicker>{v.kick}</Kicker>
        <div style={{ fontSize: "2.1em", fontWeight: 800, color: LIGHT, whiteSpace: "pre-line", margin: "0.35em 0 0.4em", lineHeight: 1.08 }}>
          {v.title}
        </div>
        {v.sub && <div style={{ fontSize: "0.9em", color: MUTED, marginBottom: "1.1em", maxWidth: "82%" }}>{v.sub}</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6em" }}>
          {v.links.map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.7em", flexWrap: "wrap" }}>
              <span style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: "0.4em", padding: "0.4em 0.9em", fontSize: "0.85em", color: LIGHT }}>
                {l.from}
              </span>
              <span style={{ color: ACCENT, fontSize: "1.05em", fontWeight: 700 }}>→</span>
              <span style={{ background: CARD, border: `1px solid ${ACCENT}`, borderRadius: "0.4em", padding: "0.4em 0.9em", fontSize: "0.85em", color: ACCENT }}>
                {l.to}
              </span>
            </div>
          ))}
        </div>
        {v.tail && <div style={{ marginTop: "1.1em", fontSize: "0.85em", fontStyle: "italic", color: MUTED, maxWidth: "84%" }}>{v.tail}</div>}
      </div>
    );
  }
  // flow
  const box = (txt: string, hit?: boolean, indent?: boolean) => (
    <div style={{
      background: CARD, border: `1px solid ${hit ? ACCENT : LINE}`, borderRadius: "0.4em",
      padding: "0.45em 0.9em", fontSize: "0.74em", color: hit ? ACCENT : LIGHT,
      marginLeft: indent ? "2em" : 0, width: "fit-content",
    }}>{txt}</div>
  );
  return (
    <div style={{ padding: pad, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Kicker>{v.kick}</Kicker>
      <div style={{ fontSize: "1.55em", fontWeight: 800, color: LIGHT, margin: "0.4em 0 0.7em" }}>{v.title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.42em" }}>
        {box("Transaction hits Ramp")}
        <div style={{ color: BLUE, fontSize: "0.66em", marginLeft: "1em" }}>↓ AI category + rules</div>
        {box("Below threshold, routine → auto-code as expense", false, true)}
        {box("Above threshold → route to capex review queue", true, true)}
        {box("CCA/SaaS vendor → split capitalize vs. expense", false, true)}
        <div style={{ color: BLUE, fontSize: "0.66em", marginLeft: "1em" }}>↓</div>
        {box("Approved coding syncs to NetSuite")}
      </div>
      <div style={{ marginTop: "0.9em", fontSize: "0.8em", fontStyle: "italic", color: MUTED }}>{v.tail}</div>
    </div>
  );
}

const PACES = [
  { label: "Manual", sec: 0 },
  { label: "60s", sec: 60 },
  { label: "90s", sec: 90 },
  { label: "2 min", sec: 120 },
];
const TARGET_MIN = 40; // midpoint of the 30–45 minute ask

function clock(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function PowerPointClient({ slides }: { slides: DeckSlide[] }) {
  const [i, setI] = useState(0);
  const [notes, setNotes] = useState(false);
  const [pace, setPace] = useState(0); // index into PACES
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const last = slides.length - 1;

  const go = useCallback(
    (fn: (n: number) => number) => {
      setI((n) => Math.max(0, Math.min(last, fn(n))));
    },
    [last]
  );

  // keyboard: arrows to move, F fullscreen, N notes, T start/stop the clock
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        go((n) => n + 1);
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        go((n) => n - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        go(() => 0);
      } else if (e.key === "End") {
        e.preventDefault();
        go(() => last);
      } else if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        const el = stageRef.current;
        if (!document.fullscreenElement) el?.requestFullscreen?.();
        else document.exitFullscreen?.();
      } else if (e.key.toLowerCase() === "n") {
        e.preventDefault();
        setNotes((v) => !v);
      } else if (e.key.toLowerCase() === "t") {
        e.preventDefault();
        setRunning((v) => !v);
      }
    }
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [go, last]);

  // the talk clock
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  // hands-off advance, if a pace is chosen
  useEffect(() => {
    const sec = PACES[pace].sec;
    if (!sec) return;
    const id = setInterval(() => {
      setI((n) => (n >= last ? n : n + 1));
    }, sec * 1000);
    return () => clearInterval(id);
  }, [pace, last]);

  const slide = slides[i];

  // where the clock says we should be by now, versus where we are
  const expectedSlide = Math.min(last, (elapsed / (TARGET_MIN * 60)) * last);
  const drift = i - expectedSlide;
  const paceNote =
    !running || elapsed < 20
      ? `target ${TARGET_MIN} min`
      : Math.abs(drift) < 1.2
        ? "on pace"
        : drift > 0
          ? `${Math.round(drift)} slides ahead`
          : `${Math.abs(Math.round(drift))} slides behind`;

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "28px 16px 60px", maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
        <div className="mono">← → to move · F fullscreen · N notes · T timer</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <button className="btn" onClick={() => setRunning((v) => !v)} style={{ fontSize: 13, padding: "6px 12px" }}>
            {running ? "⏸" : "▶"} {clock(elapsed)}
          </button>
          <span className="mono" style={{ color: Math.abs(drift) < 1.2 || !running ? "var(--muted)" : "var(--accent)", fontSize: 12 }}>
            {paceNote}
          </span>
          <button className="btn" onClick={() => { setElapsed(0); setRunning(false); }} style={{ fontSize: 13, padding: "6px 12px" }}>
            Reset
          </button>
        </div>
      </div>

      <div
        ref={stageRef}
        style={{
          position: "relative", width: "100%", aspectRatio: "16 / 9", background: BG,
          border: `1px solid ${LINE}`, borderRadius: 10, overflow: "hidden",
          fontSize: "clamp(9px, 1.55vw, 18px)", boxShadow: "0 30px 90px rgba(0,0,0,0.6)",
          userSelect: "none",
        }}
      >
        <SlideView v={slide.visual} />
        <div style={{ position: "absolute", right: "3%", bottom: "3.5%", fontSize: "0.66em", color: MUTED }}>
          {i + 1}
        </div>
        {/* click zones: left third = back, rest = forward */}
        <div onClick={() => go((n) => n - 1)} style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "33%", cursor: i > 0 ? "w-resize" : "default" }} />
        <div onClick={() => go((n) => n + 1)} style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "67%", cursor: i < last ? "e-resize" : "default" }} />
        {/* progress */}
        <div style={{ position: "absolute", left: 0, bottom: 0, height: 2, width: `${(i / last) * 100}%`, background: ACCENT, transition: "width .35s ease" }} />
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, gap: 12, flexWrap: "wrap" }}>
        <button className="btn" onClick={() => go((n) => n - 1)} disabled={i === 0} style={{ opacity: i === 0 ? 0.35 : 1 }}>
          ← Prev
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          <span className="mono" style={{ color: "var(--muted)", fontSize: 12 }}>Advance</span>
          {PACES.map((p, idx) => (
            <button
              key={p.label}
              onClick={() => setPace(idx)}
              className="btn"
              style={{
                fontSize: 12,
                padding: "5px 11px",
                ...(idx === pace
                  ? { background: "var(--accent)", borderColor: "var(--accent)", color: "var(--ink)", fontWeight: 600 }
                  : {}),
              }}
            >
              {p.label}
            </button>
          ))}
          <span className="mono" style={{ color: "var(--muted)", marginLeft: 6 }}>{i + 1} / {slides.length}</span>
        </div>

        <button className="btn" onClick={() => go((n) => n + 1)} disabled={i === last} style={{ opacity: i === last ? 0.35 : 1 }}>
          Next →
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button className="btn" onClick={() => setNotes((v) => !v)} style={{ fontSize: 13, padding: "6px 14px" }}>
          {notes ? "Hide" : "Show"} speaker notes
        </button>
        <button
          className="btn"
          onClick={() => {
            const el = stageRef.current;
            if (!document.fullscreenElement) el?.requestFullscreen?.();
            else document.exitFullscreen?.();
          }}
          style={{ fontSize: 13, padding: "6px 14px" }}
        >
          Fullscreen
        </button>
      </div>

      {notes && (
        <div className="note" style={{ marginTop: 18 }}>
          <span className="mono" style={{ display: "block", marginBottom: 8 }}>Speaker notes — slide {i + 1}</span>
          {notesFor(slide)}
        </div>
      )}
    </div>
  );
}
