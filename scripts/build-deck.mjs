// Builds the PowerPoint backup from app/vast/deck.json — the same file the
// live site and /vast/script editor read from. One source of truth in,
// slides + speaker notes out, so the deck and the site cannot drift apart.
import { readFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import PptxGenJS from "pptxgenjs";

const BG = "05070D";
const CARD = "141B2B";
const LINE = "2A3347";
const LIGHT = "F2F4F8";
const MUTED = "98A2B3";
const ACCENT = "FFB25E";
const BLUE = "7DB2FF";

const repoRoot = path.join(import.meta.dirname, "..");
const deckPath = path.join(repoRoot, "app", "vast", "deck.json");
const outPath = path.join(os.homedir(), "Desktop", "James-Sieng-Vast-FinalRound.pptx");

function notesFor(slide) {
  return slide.beats
    .map((b) => [b.opener, b.rest].filter(Boolean).join(" "))
    .join("\n\n");
}

const slides = JSON.parse(await readFile(deckPath, "utf8"));

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "VAST", width: 13.333, height: 7.5 });
pptx.layout = "VAST";
pptx.author = "James Sieng";
pptx.title = "Vast Space — Final Round";

const PAD_X = 0.9;

for (const slide of slides) {
  const s = pptx.addSlide();
  s.background = { color: BG };
  const v = slide.visual;

  if (v.t === "title") {
    s.addText("FINAL ROUND · VAST SPACE", {
      x: PAD_X, y: 2.3, w: 11.5, h: 0.4,
      fontSize: 13, color: ACCENT, bold: true, charSpacing: 3,
    });
    s.addText("James Sieng", {
      x: PAD_X, y: 2.75, w: 11.5, h: 1.3,
      fontSize: 54, color: LIGHT, bold: true,
    });
    s.addText("Staff Accountant — International Accounting & Accounting Operations", {
      x: PAD_X, y: 4.05, w: 11.5, h: 0.5,
      fontSize: 16, color: MUTED,
    });
  } else if (v.t === "statement") {
    s.addText(v.kick.toUpperCase(), {
      x: PAD_X, y: 1.5, w: 11.5, h: 0.4,
      fontSize: 12, color: ACCENT, bold: true, charSpacing: 3,
    });
    s.addText(v.title.replace(/\n/g, "\v"), {
      x: PAD_X, y: 2.0, w: 11.5, h: 2.2,
      fontSize: 38, color: LIGHT, bold: true, lineSpacingMultiple: 1.05,
    });
    if (v.sub) {
      s.addText(v.sub, {
        x: PAD_X, y: 4.3, w: 10.2, h: 1.0,
        fontSize: 15, italic: true, color: MUTED,
      });
    }
  } else if (v.t === "list") {
    s.addText(v.kick.toUpperCase(), {
      x: PAD_X, y: 0.7, w: 11.5, h: 0.4,
      fontSize: 12, color: ACCENT, bold: true, charSpacing: 3,
    });
    s.addText(v.title, {
      x: PAD_X, y: 1.15, w: 11.5, h: 0.7,
      fontSize: 26, color: LIGHT, bold: true,
    });
    let y = 2.1;
    for (const it of v.items) {
      s.addText(it.lead, {
        x: PAD_X, y, w: 11.0, h: 0.4,
        fontSize: 16, color: LIGHT, bold: true,
      });
      y += 0.42;
      if (it.sub) {
        s.addText(it.sub, {
          x: PAD_X + 0.15, y, w: 10.8, h: 0.4,
          fontSize: 12, color: MUTED,
        });
        y += 0.4;
      }
      y += 0.18;
    }
    if (v.callout) {
      s.addText(v.callout, {
        x: PAD_X, y: Math.min(y + 0.1, 6.5), w: 10.8, h: 0.8,
        fontSize: 12, color: LIGHT, fill: { color: "1F1A12" },
        line: { color: ACCENT, width: 1 }, margin: 10,
      });
    }
  } else if (v.t === "cards") {
    s.addText(v.kick.toUpperCase(), {
      x: PAD_X, y: 0.7, w: 11.5, h: 0.4,
      fontSize: 12, color: ACCENT, bold: true, charSpacing: 3,
    });
    s.addText(v.title.replace(/\n/g, "\v"), {
      x: PAD_X, y: 1.15, w: 11.5, h: 1.0,
      fontSize: 24, color: LIGHT, bold: true, lineSpacingMultiple: 1.1,
    });
    const cardY = 2.5, cardW = 5.3, cardH = 2.3, gap = 0.4;
    [[v.a, ACCENT], [v.b, BLUE]].forEach(([c, col], idx) => {
      const x = PAD_X + idx * (cardW + gap);
      s.addShape("roundRect", {
        x, y: cardY, w: cardW, h: cardH, rectRadius: 0.08,
        fill: { color: CARD }, line: { color: LINE, width: 1 },
      });
      s.addText(c.h.toUpperCase(), {
        x: x + 0.3, y: cardY + 0.25, w: cardW - 0.6, h: 0.4,
        fontSize: 12, color: col, bold: true, charSpacing: 2,
      });
      s.addText(c.lines, {
        x: x + 0.3, y: cardY + 0.75, w: cardW - 0.6, h: cardH - 1.0,
        fontSize: 14, color: LIGHT, lineSpacingMultiple: 1.3,
      });
    });
    if (v.tail) {
      s.addText(v.tail, {
        x: PAD_X, y: cardY + cardH + 0.3, w: 11.0, h: 0.6,
        fontSize: 13, italic: true, color: MUTED,
      });
    }
  } else if (v.t === "chain") {
    s.addText(v.kick.toUpperCase(), {
      x: PAD_X, y: 1.0, w: 11.5, h: 0.4,
      fontSize: 12, color: ACCENT, bold: true, charSpacing: 3,
    });
    s.addText(v.title.replace(/\n/g, "\v"), {
      x: PAD_X, y: 1.45, w: 11.5, h: 1.2,
      fontSize: 32, color: LIGHT, bold: true, lineSpacingMultiple: 1.05,
    });
    let y = 2.8;
    if (v.sub) {
      s.addText(v.sub, { x: PAD_X, y, w: 10.5, h: 0.5, fontSize: 14, color: MUTED });
      y += 0.65;
    }
    for (const l of v.links) {
      s.addShape("roundRect", {
        x: PAD_X, y, w: 3.2, h: 0.5, rectRadius: 0.06,
        fill: { color: CARD }, line: { color: LINE, width: 1 },
      });
      s.addText(l.from, {
        x: PAD_X + 0.15, y, w: 2.9, h: 0.5, valign: "middle", fontSize: 13, color: LIGHT,
      });
      s.addText("→", {
        x: PAD_X + 3.35, y, w: 0.5, h: 0.5, valign: "middle",
        fontSize: 16, color: ACCENT, bold: true,
      });
      s.addShape("roundRect", {
        x: PAD_X + 3.95, y, w: 3.8, h: 0.5, rectRadius: 0.06,
        fill: { color: CARD }, line: { color: ACCENT, width: 1 },
      });
      s.addText(l.to, {
        x: PAD_X + 4.1, y, w: 3.5, h: 0.5, valign: "middle", fontSize: 13, color: ACCENT,
      });
      y += 0.68;
    }
    if (v.tail) {
      s.addText(v.tail, {
        x: PAD_X, y: y + 0.2, w: 10.5, h: 0.6, fontSize: 13, italic: true, color: MUTED,
      });
    }
  } else if (v.t === "flow") {
    s.addText(v.kick.toUpperCase(), {
      x: PAD_X, y: 0.7, w: 11.5, h: 0.4,
      fontSize: 12, color: ACCENT, bold: true, charSpacing: 3,
    });
    s.addText(v.title, {
      x: PAD_X, y: 1.15, w: 11.5, h: 0.6,
      fontSize: 24, color: LIGHT, bold: true,
    });
    const steps = [
      { t: "Transaction hits Ramp" },
      { t: "↓ AI category + rules", plain: true },
      { t: "Below threshold, routine → auto-code as expense", indent: true },
      { t: "Above threshold → route to capex review queue", indent: true, hit: true },
      { t: "CCA/SaaS vendor → split capitalize vs. expense", indent: true },
      { t: "↓", plain: true },
      { t: "Approved coding syncs to NetSuite" },
    ];
    let y = 2.0;
    for (const step of steps) {
      const x = PAD_X + (step.indent ? 0.6 : 0);
      if (step.plain) {
        s.addText(step.t, { x, y, w: 6, h: 0.35, fontSize: 13, color: BLUE });
        y += 0.4;
        continue;
      }
      s.addShape("roundRect", {
        x, y, w: 6.5, h: 0.5, rectRadius: 0.06,
        fill: { color: CARD },
        line: { color: step.hit ? ACCENT : LINE, width: 1 },
      });
      s.addText(step.t, {
        x: x + 0.2, y, w: 6.1, h: 0.5, valign: "middle",
        fontSize: 13, color: step.hit ? ACCENT : LIGHT,
      });
      y += 0.58;
    }
    if (v.tail) {
      s.addText(v.tail, {
        x: PAD_X, y: y + 0.15, w: 11.0, h: 0.5,
        fontSize: 13, italic: true, color: MUTED,
      });
    }
  }

  s.addNotes(notesFor(slide));
}

try {
  await pptx.writeFile({ fileName: outPath });
  console.log(`Deck written: ${outPath}`);
} catch (err) {
  if (err && err.code === "EBUSY") {
    console.error(
      `\nCould not write — the file is open. Close ${outPath} and run "npm run deck" again.\n`
    );
    process.exitCode = 1;
  } else {
    throw err;
  }
}
