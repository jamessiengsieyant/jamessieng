"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Beat, DeckSlide } from "../deck-types";

const LEVELS = [
  { name: "Full script", desc: "Read it all. First passes." },
  { name: "Openers", desc: "Opening lines only — recite the rest." },
  { name: "Cues", desc: "Beat titles only — recite everything." },
  { name: "Test", desc: "Numbers only. Perform it." },
];
// visibility tiers: 0 = hidden, 1 = cue, 2 = cue+opener, 3 = full
const BASE_TIER = [3, 2, 1, 0];

const EMPTY_BEAT: Beat = { cue: "New beat", opener: "", rest: "" };

const fieldStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid var(--line)",
  borderRadius: 8,
  color: "var(--text)",
  padding: "8px 10px",
  fontSize: 14,
  lineHeight: 1.55,
  fontFamily: "inherit",
  resize: "vertical",
};

function headlineOf(v: DeckSlide["visual"]): string {
  if (v.t === "title") return "James Sieng";
  return v.title.replace(/\n/g, " ");
}

export default function ScriptRehearsal({
  slides,
  canEdit,
}: {
  slides: DeckSlide[];
  canEdit: boolean;
}) {
  const router = useRouter();
  const [level, setLevel] = useState(0);
  const [peek, setPeek] = useState<Record<string, number>>({});
  const [showPrompt, setShowPrompt] = useState(false);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<DeckSlide[]>(slides);
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const dirty = JSON.stringify(draft) !== JSON.stringify(slides);
  const view = editing ? draft : slides;

  // consecutive slides sharing a section header group together
  const sections = useMemo(() => {
    const out: {
      section: string;
      sectionTitle: string;
      slides: { slide: DeckSlide; si: number }[];
    }[] = [];
    view.forEach((slide, si) => {
      const last = out[out.length - 1];
      if (last && last.section === slide.section) last.slides.push({ slide, si });
      else
        out.push({
          section: slide.section,
          sectionTitle: slide.sectionTitle,
          slides: [{ slide, si }],
        });
    });
    return out;
  }, [view]);

  function tierFor(key: string) {
    return Math.min(3, BASE_TIER[level] + (peek[key] ?? 0));
  }
  function bump(key: string) {
    if (editing) return;
    setPeek((p) => {
      const cur = Math.min(3, BASE_TIER[level] + (p[key] ?? 0));
      if (cur >= 3) {
        const { [key]: _drop, ...restP } = p;
        return restP; // collapse back to the level's baseline
      }
      return { ...p, [key]: (p[key] ?? 0) + 1 };
    });
  }

  function editBeat(si: number, bi: number, patch: Partial<Beat>) {
    setDraft((d) =>
      d.map((s, i) =>
        i !== si ? s : { ...s, beats: s.beats.map((b, j) => (j === bi ? { ...b, ...patch } : b)) }
      )
    );
  }
  function addBeat(si: number, at: number) {
    setDraft((d) =>
      d.map((s, i) => {
        if (i !== si) return s;
        const beats = [...s.beats];
        beats.splice(at, 0, { ...EMPTY_BEAT });
        return { ...s, beats };
      })
    );
  }
  function removeBeat(si: number, bi: number) {
    setDraft((d) =>
      d.map((s, i) =>
        i !== si || s.beats.length === 1 ? s : { ...s, beats: s.beats.filter((_, j) => j !== bi) }
      )
    );
  }
  function moveBeat(si: number, bi: number, dir: -1 | 1) {
    const to = bi + dir;
    setDraft((d) =>
      d.map((s, i) => {
        if (i !== si || to < 0 || to >= s.beats.length) return s;
        const beats = [...s.beats];
        [beats[bi], beats[to]] = [beats[to], beats[bi]];
        return { ...s, beats };
      })
    );
  }

  async function save() {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/vast/script/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setStatus(json.error ?? `Save failed (${res.status}).`);
      } else {
        setStatus("Saved. Run npm run deck to rebuild the PowerPoint.");
        router.refresh();
      }
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="band">
      <div className="wrap narrow">
        <div className="mono">For James — not for the screen</div>
        <h1 style={{ marginTop: 12 }}>The script</h1>
        <p className="lede" style={{ color: "var(--muted)", fontSize: 16 }}>
          Beats, not words. Memorize each beat&apos;s <strong>opening line word-perfect</strong> and
          let the rest flex — then fade the cues until you can run it from bare numbers.
        </p>

        <div className="card" style={{ marginTop: 24 }}>
          <button
            onClick={() => setShowPrompt(!showPrompt)}
            className="mono"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}
          >
            The assignment — verbatim from Vast {showPrompt ? "▾" : "▸"}
          </button>
          {showPrompt && (
            <div style={{ marginTop: 14, fontSize: 14, color: "var(--text)", lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>
                &ldquo;Please put together a 30-45 min. presentation that goes over the following:
              </p>
              <ul style={{ margin: "10px 0 0 18px", padding: 0 }}>
                <li style={{ marginBottom: 8 }}>
                  Your background/career with history/projects or programs worked on. Education,
                  what you like to do for fun, etc.
                </li>
                <li style={{ marginBottom: 8 }}>
                  Topic 1: Walk us through 2 examples of times when you had to decide whether
                  something should be capitalized as a fixed asset vs expensed, and why you believe
                  the treatment for that transaction was done appropriately.
                  <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
                    <li>
                      The walk through should include the goals/requirements, your direct
                      contributions, results, and lessons learned/what you&apos;d do differently.
                    </li>
                  </ul>
                </li>
                <li>
                  Topic 2: Give a 30/60/90 day plan of what you would do if you were hired at Vast.
                  Please include one brilliant idea that you believe would benefit Vast!&rdquo;
                </li>
              </ul>
              <p style={{ margin: "12px 0 0", color: "var(--muted)" }}>
                Send 24–48 hours before the onsite to Kimani Glass, Andre Carbajal, and
                guest@vastspace.com · Accepted formats: PDF, PowerPoint.
              </p>
            </div>
          )}
        </div>

        <div className="note" style={{ marginTop: 18 }}>
          <strong>The method.</strong> ① Each beat is one idea anchored to one slide — the deck is
          your memory palace. ② Openers are sacred; everything else is yours to rephrase. ③ Rehearse
          out loud, standing, and fade: Full → Openers → Cues → Test. Stuck? Click a beat to peek one
          layer. ④ Three 15-minute passes a day beat one two-hour grind. Record a pass on your phone;
          listen back on the drive.
        </div>

        {canEdit && (
          <div
            className="card"
            style={{
              marginTop: 18,
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              borderColor: editing ? "var(--accent)" : undefined,
            }}
          >
            <button
              className="btn"
              onClick={() => {
                setStatus(null);
                if (editing && dirty && !confirm("Discard unsaved edits?")) return;
                setDraft(slides);
                setEditing(!editing);
              }}
              style={
                editing
                  ? { background: "var(--accent)", borderColor: "var(--accent)", color: "var(--ink)", fontWeight: 600 }
                  : undefined
              }
            >
              {editing ? "Done editing" : "Edit script"}
            </button>
            {editing && (
              <>
                <button className="btn" onClick={save} disabled={!dirty || saving}>
                  {saving ? "Saving…" : "Save to file"}
                </button>
                <button className="btn" onClick={() => setDraft(slides)} disabled={!dirty}>
                  Revert
                </button>
              </>
            )}
            <span style={{ color: "var(--muted)", fontSize: 13 }}>
              {status ??
                (editing
                  ? dirty
                    ? "Unsaved changes."
                    : "Writes app/vast/deck.json — the same file the PowerPoint is built from."
                  : "Local dev only. The deployed site is read-only.")}
            </span>
          </div>
        )}

        {!editing && (
          <>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "28px 0 8px" }}>
              {LEVELS.map((l, i) => (
                <button
                  key={l.name}
                  onClick={() => { setLevel(i); setPeek({}); }}
                  className="btn"
                  style={
                    i === level
                      ? { background: "var(--accent)", borderColor: "var(--accent)", color: "var(--ink)", fontWeight: 600 }
                      : undefined
                  }
                >
                  {l.name}
                </button>
              ))}
            </div>
            <p style={{ color: "var(--muted)", fontSize: 13, margin: "4px 0 8px" }}>{LEVELS[level].desc}</p>
          </>
        )}

        {sections.map((sec, seci) => {
          let beatNo = 0;
          return (
            <div key={seci} style={{ marginTop: 48 }}>
              <div className="mono">{sec.section}</div>
              <h2 style={{ fontSize: 24, marginTop: 8, marginBottom: 6 }}>{sec.sectionTitle}</h2>

              {sec.slides.map(({ slide, si }) => (
                <div key={si}>
                  <div
                    className="mono"
                    style={{
                      marginTop: 22,
                      fontSize: 11,
                      color: "var(--accent)",
                      opacity: 0.85,
                    }}
                  >
                    slide {si + 1} — {headlineOf(slide.visual)}
                  </div>

                  {slide.beats.map((b, bi) => {
                    const n = ++beatNo;
                    const key = `${si}-${bi}`;

                    if (editing) {
                      return (
                        <div key={key} style={{ borderTop: "1px solid var(--line)", padding: "16px 0" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                            <span className="mono" style={{ color: "var(--muted)", minWidth: 22 }}>
                              {n}
                            </span>
                            <input
                              value={b.cue}
                              onChange={(e) => editBeat(si, bi, { cue: e.target.value })}
                              style={{ ...fieldStyle, flex: 1, fontWeight: 600 }}
                              aria-label={`Beat ${n} cue`}
                            />
                            <button className="btn" onClick={() => moveBeat(si, bi, -1)} disabled={bi === 0} title="Move up">
                              ↑
                            </button>
                            <button
                              className="btn"
                              onClick={() => moveBeat(si, bi, 1)}
                              disabled={bi === slide.beats.length - 1}
                              title="Move down"
                            >
                              ↓
                            </button>
                            <button
                              className="btn"
                              onClick={() => confirm(`Delete beat ${n}?`) && removeBeat(si, bi)}
                              disabled={slide.beats.length === 1}
                              title={slide.beats.length === 1 ? "Every slide needs a beat" : "Delete beat"}
                            >
                              ×
                            </button>
                          </div>
                          <div style={{ marginLeft: 34, display: "flex", flexDirection: "column", gap: 8 }}>
                            <label style={{ fontSize: 12, color: "var(--muted)" }}>
                              Opener — memorize this word-perfect
                              <textarea
                                value={b.opener}
                                onChange={(e) => editBeat(si, bi, { opener: e.target.value })}
                                rows={2}
                                style={{ ...fieldStyle, marginTop: 4, color: "var(--white)", fontWeight: 600 }}
                              />
                            </label>
                            <label style={{ fontSize: 12, color: "var(--muted)" }}>
                              Rest — blank line between paragraphs
                              <textarea
                                value={b.rest}
                                onChange={(e) => editBeat(si, bi, { rest: e.target.value })}
                                rows={Math.min(16, Math.max(4, b.rest.split("\n").length + 2))}
                                style={{ ...fieldStyle, marginTop: 4 }}
                              />
                            </label>
                            <label style={{ fontSize: 12, color: "var(--accent)" }}>
                              Delivery marks — private, never written to the PowerPoint
                              <textarea
                                value={b.marks ?? ""}
                                onChange={(e) => editBeat(si, bi, { marks: e.target.value })}
                                rows={2}
                                style={{ ...fieldStyle, marginTop: 4, borderColor: "var(--accent)" }}
                              />
                            </label>
                            <button
                              className="btn"
                              onClick={() => addBeat(si, bi + 1)}
                              style={{ alignSelf: "flex-start", fontSize: 13 }}
                            >
                              + beat on this slide
                            </button>
                          </div>
                        </div>
                      );
                    }

                    const tier = tierFor(key);
                    return (
                      <div
                        key={key}
                        onClick={() => bump(key)}
                        style={{
                          borderTop: "1px solid var(--line)",
                          padding: "14px 0",
                          cursor: level > 0 ? "pointer" : "default",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                          <span
                            className="mono"
                            style={{ color: "var(--muted)", minWidth: 22, flexShrink: 0 }}
                          >
                            {n}
                          </span>
                          {tier >= 1 ? (
                            <span className="mono">{b.cue}</span>
                          ) : (
                            <span style={{ color: "var(--muted)", fontSize: 13 }}>· · ·</span>
                          )}
                        </div>
                        {tier >= 2 && (
                          <p style={{ margin: "10px 0 0 34px", color: "var(--white)", fontWeight: 600 }}>
                            {b.opener}
                          </p>
                        )}
                        {tier >= 3 &&
                          b.rest.split("\n\n").map((para, pi) => (
                            <p key={pi} style={{ margin: "10px 0 0 34px", color: "var(--text)" }}>
                              {para}
                            </p>
                          ))}
                        {tier >= 3 && b.marks && (
                          <p
                            style={{
                              margin: "12px 0 0 34px",
                              padding: "8px 12px",
                              borderLeft: "2px solid var(--accent)",
                              background: "rgba(255,178,94,0.07)",
                              color: "var(--accent)",
                              fontSize: 13,
                              lineHeight: 1.5,
                            }}
                          >
                            {b.marks}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })}

        <div className="note" style={{ marginTop: 40 }}>
          <strong>Delivery marks.</strong> Slow down on: &ldquo;fourteen years, that sat there&rdquo;
          · &ldquo;their own records told on them&rdquo; · &ldquo;it cuts both ways&rdquo; ·
          &ldquo;the right answer reached the wrong way.&rdquo; Full stop after &ldquo;Yet.&rdquo; —
          that silence is doing more work than the sentence around it.
        </div>
      </div>
    </article>
  );
}
