"use client";

import type { Item, Visual } from "../deck-types";

export const fieldStyle: React.CSSProperties = {
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

const labelStyle: React.CSSProperties = { fontSize: 12, color: "var(--muted)" };

function Field({
  label,
  value,
  onChange,
  rows,
  bold,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  bold?: boolean;
}) {
  return (
    <label style={labelStyle}>
      {label}
      {rows ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          style={{ ...fieldStyle, marginTop: 4, ...(bold ? { fontWeight: 600 } : {}) }}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...fieldStyle, marginTop: 4, ...(bold ? { fontWeight: 600 } : {}) }}
        />
      )}
    </label>
  );
}

/**
 * Edits what the room sees on a slide. The slide's type is fixed — changing a
 * statement into a table mid-rehearsal is a redesign, not an edit.
 */
export default function VisualEditor({
  visual,
  onChange,
}: {
  visual: Visual;
  onChange: (v: Visual) => void;
}) {
  const wrap: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: "14px 16px",
    border: "1px solid var(--line)",
    borderLeft: "3px solid var(--accent)",
    borderRadius: 8,
    background: "rgba(255,255,255,0.02)",
  };

  if (visual.t === "title") {
    return (
      <div style={{ ...wrap, color: "var(--muted)", fontSize: 13 }}>
        The title slide is fixed — name and role only.
      </div>
    );
  }

  const header = (
    <div className="mono" style={{ fontSize: 11, color: "var(--accent)", opacity: 0.85 }}>
      On screen — {visual.t}
    </div>
  );

  if (visual.t === "statement") {
    return (
      <div style={wrap}>
        {header}
        <Field label="Kicker" value={visual.kick} onChange={(kick) => onChange({ ...visual, kick })} />
        <Field
          label="Headline — Enter for a line break"
          value={visual.title}
          onChange={(title) => onChange({ ...visual, title })}
          rows={2}
          bold
        />
        <Field
          label="Sub-line"
          value={visual.sub ?? ""}
          onChange={(sub) => onChange({ ...visual, sub })}
          rows={2}
        />
      </div>
    );
  }

  if (visual.t === "list") {
    const setItem = (i: number, patch: Partial<Item>) =>
      onChange({
        ...visual,
        items: visual.items.map((it, j) => (j === i ? { ...it, ...patch } : it)),
      });
    const addItem = () =>
      onChange({ ...visual, items: [...visual.items, { lead: "New point", sub: "" }] });
    const removeItem = (i: number) =>
      onChange({ ...visual, items: visual.items.filter((_, j) => j !== i) });
    const moveItem = (i: number, dir: -1 | 1) => {
      const to = i + dir;
      if (to < 0 || to >= visual.items.length) return;
      const items = [...visual.items];
      [items[i], items[to]] = [items[to], items[i]];
      onChange({ ...visual, items });
    };

    return (
      <div style={wrap}>
        {header}
        <Field label="Kicker" value={visual.kick} onChange={(kick) => onChange({ ...visual, kick })} />
        <Field
          label="Headline"
          value={visual.title}
          onChange={(title) => onChange({ ...visual, title })}
          bold
        />
        <div style={labelStyle}>Bullets</div>
        {visual.items.map((it, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              paddingLeft: 10,
              borderLeft: "1px solid var(--line)",
            }}
          >
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <input
                value={it.lead}
                onChange={(e) => setItem(i, { lead: e.target.value })}
                style={{ ...fieldStyle, flex: 1, fontWeight: 600 }}
                aria-label={`Bullet ${i + 1} lead`}
              />
              <button className="btn" onClick={() => moveItem(i, -1)} disabled={i === 0} title="Move up">
                ↑
              </button>
              <button
                className="btn"
                onClick={() => moveItem(i, 1)}
                disabled={i === visual.items.length - 1}
                title="Move down"
              >
                ↓
              </button>
              <button
                className="btn"
                onClick={() => removeItem(i)}
                disabled={visual.items.length === 1}
                title="Delete bullet"
              >
                ×
              </button>
            </div>
            <input
              value={it.sub ?? ""}
              onChange={(e) => setItem(i, { sub: e.target.value })}
              placeholder="supporting line"
              style={{ ...fieldStyle, fontSize: 13 }}
              aria-label={`Bullet ${i + 1} sub`}
            />
          </div>
        ))}
        <button className="btn" onClick={addItem} style={{ alignSelf: "flex-start", fontSize: 13 }}>
          + bullet
        </button>
        <Field
          label="Callout box (leave blank for none)"
          value={visual.callout ?? ""}
          onChange={(callout) => onChange({ ...visual, callout: callout || undefined })}
          rows={2}
        />
      </div>
    );
  }

  if (visual.t === "cards") {
    return (
      <div style={wrap}>
        {header}
        <Field label="Kicker" value={visual.kick} onChange={(kick) => onChange({ ...visual, kick })} />
        <Field
          label="Headline"
          value={visual.title}
          onChange={(title) => onChange({ ...visual, title })}
          rows={2}
          bold
        />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {(["a", "b"] as const).map((side) => (
            <div key={side} style={{ flex: "1 1 240px", display: "flex", flexDirection: "column", gap: 8 }}>
              <Field
                label={`${side === "a" ? "Left" : "Right"} card — heading`}
                value={visual[side].h}
                onChange={(h) => onChange({ ...visual, [side]: { ...visual[side], h } })}
                bold
              />
              <Field
                label="Lines — Enter between each"
                value={visual[side].lines}
                onChange={(lines) => onChange({ ...visual, [side]: { ...visual[side], lines } })}
                rows={4}
              />
            </div>
          ))}
        </div>
        <Field
          label="Tail line"
          value={visual.tail ?? ""}
          onChange={(tail) => onChange({ ...visual, tail })}
          rows={2}
        />
      </div>
    );
  }

  if (visual.t === "chain") {
    const setLink = (i: number, patch: Partial<{ from: string; to: string }>) =>
      onChange({
        ...visual,
        links: visual.links.map((l, j) => (j === i ? { ...l, ...patch } : l)),
      });
    return (
      <div style={wrap}>
        {header}
        <Field label="Kicker" value={visual.kick} onChange={(kick) => onChange({ ...visual, kick })} />
        <Field
          label="Headline"
          value={visual.title}
          onChange={(title) => onChange({ ...visual, title })}
          rows={2}
          bold
        />
        <Field
          label="Subline"
          value={visual.sub ?? ""}
          onChange={(sub) => onChange({ ...visual, sub })}
          rows={2}
        />
        {visual.links.map((l, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <div style={{ flex: 1 }}>
              <Field label={`Link ${i + 1} — from`} value={l.from} onChange={(from) => setLink(i, { from })} />
            </div>
            <span style={{ color: "var(--accent)", padding: "0 2px 9px" }}>→</span>
            <div style={{ flex: 1 }}>
              <Field label="to" value={l.to} onChange={(to) => setLink(i, { to })} />
            </div>
            <button
              className="btn"
              onClick={() => onChange({ ...visual, links: visual.links.filter((_, j) => j !== i) })}
              disabled={visual.links.length === 1}
              style={{ marginBottom: 1 }}
              title={visual.links.length === 1 ? "Keep at least one link" : "Remove link"}
            >
              ×
            </button>
          </div>
        ))}
        <button
          className="btn"
          onClick={() => onChange({ ...visual, links: [...visual.links, { from: "", to: "" }] })}
          style={{ alignSelf: "flex-start", fontSize: 13 }}
        >
          + link
        </button>
        <Field
          label="Tail line"
          value={visual.tail ?? ""}
          onChange={(tail) => onChange({ ...visual, tail })}
          rows={2}
        />
      </div>
    );
  }

  // flow — the diagram steps are drawn in code; only the framing text is text
  return (
    <div style={wrap}>
      {header}
      <Field label="Kicker" value={visual.kick} onChange={(kick) => onChange({ ...visual, kick })} />
      <Field label="Headline" value={visual.title} onChange={(title) => onChange({ ...visual, title })} bold />
      <Field label="Tail line" value={visual.tail} onChange={(tail) => onChange({ ...visual, tail })} rows={2} />
      <div style={{ ...labelStyle, fontStyle: "italic" }}>
        The Ramp → NetSuite boxes are drawn in code, not editable here.
      </div>
    </div>
  );
}
