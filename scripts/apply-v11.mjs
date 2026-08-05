// Applies James's v11 hand-edits back into deck.json, the single source of
// truth read by /vast/script, /vast/powerpoint, and the PPTX generator.
// Diffed precisely against the v11 file's extracted text/notes — only 4 of
// 30 slides actually changed content; everything else is untouched.
import { readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const deckPath = path.join(import.meta.dirname, "..", "app", "vast", "deck.json");
const deck = JSON.parse(await readFile(deckPath, "utf8"));

function must(cond, msg) {
  if (!cond) throw new Error("apply-v11: " + msg);
}

// Slide 2 — title + tail softened
{
  const s = deck[1];
  must(s.visual.title === "None of this\nis accounting.", "slide 2 title mismatch");
  s.visual.title = "Mostly\nnot accounting.";
  must(s.visual.tail === "That's the whole strategy. There wasn't one.", "slide 2 tail mismatch");
  s.visual.tail = "No particular strategy, just the love of learning.";
}

// Slide 3 — sub, and notes revised (cancer diagnostics lab, funnier Excel line)
{
  const s = deck[2];
  must(s.visual.sub === "Lab tech. Mostly testing. About an hour a day in Excel.", "slide 3 sub mismatch");
  s.visual.sub = "Brainstorming ways to increase efficiency.";
  const b = s.beats[0];
  must(b.opener.startsWith("My first job out of school was as a lab tech."), "slide 3 opener mismatch");
  b.opener = "My first job out of college was in a lab doing cancer diagnostics. Mostly testing.";
  b.rest =
    "Maybe an hour a day was entering results in an excel.\n\nThat hour was the part I liked. Not the typing — the spreadsheet. The validations, the formulas, the infinite chains of \"if\" statements until excel broke.\n\nI was already trying to automate the job.";
}

// Slide 4 — tail: "I really excelled." (the Excel pun)
{
  const s = deck[3];
  must(s.visual.tail === "Data that had a shape — and a shape that was enforced.", "slide 4 tail mismatch");
  s.visual.tail = "I really excelled.";
}

// Slide 10 — sub, and notes replaced with the John Mayer line
{
  const s = deck[9];
  must(s.visual.sub === "Sometimes both at the same time.", "slide 10 sub mismatch");
  s.visual.sub = "Sometimes simultaneously.";
  const b = s.beats[0];
  must(b.opener.includes("I sing, and I play guitar"), "slide 10 opener mismatch");
  b.opener = "Last thing before the topics. Outside of work I sing, and I play guitar. Sometimes both.";
  b.rest = "Til this day, I'm still trying to get on John Mayer's level.";
  delete b.marks; // the old mark was written for the cut "constraints are the point" riff
}

// Slide 20 — title line 2, sub shortened, notes wording
{
  const s = deck[19];
  must(s.visual.title === "One had the wrong rule.\nOne had none.", "slide 20 title mismatch");
  s.visual.title = "One had the wrong rule.\nOne had no rules.";
  must(
    s.visual.sub ===
      "Classify on purpose, at the source, in writing. That's not my opinion — that's the regulation.",
    "slide 20 sub mismatch"
  );
  s.visual.sub = "Classify on purpose, at the source, in writing.";
  const b = s.beats[0];
  b.opener =
    "The lesson learned - you don't get to decide at the end of the year and justify it backwards. The policy must exist before the transaction does.";
  b.rest =
    "Classify on purpose, at the source, in writing. That's not my opinion. That's the regulation.\n\nTwo calls. The first one had a rule — it was just keyed on the vendor instead of the invoice. The second one had no rule at all, because nobody wrote it. Including me.\n\nI picked those two on purpose. I could have shown you two wins.\n\nI did the job by hand, and I know exactly where it hurts. So let me tell you what I'd build.";
}

await copyFile(deckPath, `${deckPath}.pre-v11.bak`);
await writeFile(deckPath, `${JSON.stringify(deck, null, 2)}\n`, "utf8");
console.log("Applied v11 edits to slides 2, 3, 4, 10, 20.");
