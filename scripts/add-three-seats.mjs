// Inserts the "three seats" slide after the Topic 1 title card, and adds a
// closing beat that converts the gap. Same move as intro slide 2: name the
// objection out loud, then take it apart.
import { readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const deckPath = path.join(import.meta.dirname, "..", "app", "vast", "deck.json");
const deck = JSON.parse(await readFile(deckPath, "utf8"));

const at = deck.findIndex(
  (s) => s.visual?.t === "list" && String(s.visual.title).includes("Capitalize, or expense")
);
if (at < 0) throw new Error("Could not find the Topic 1 title card — aborting.");

const threeSeats = {
  section: "Part 02 — Topic 1",
  sectionTitle: "Where I've made this call",
  visual: {
    t: "list",
    kick: "Before the examples",
    title: "I've made this call from three seats.",
    items: [
      {
        lead: "On the return",
        sub: "Business returns through the 1120 — depreciation schedules, Form 4562, Section 179 and bonus elections, and book-to-tax depreciation on the M-1.",
      },
      {
        lead: "In the audit",
        sub: "Every field exam tests whether capital purchases were identified correctly. That isn't adjacent to this decision — it is this decision, graded after the fact.",
      },
      {
        lead: "In the build",
        sub: "My own implementation costs, under ASC 350-40. That one is Example 2.",
      },
    ],
    callout:
      "What I haven't done is post the month-end entry and run the rollforward. That's the part that's new — and it's the smallest part.",
  },
  beats: [
    {
      cue: "Three seats — name the gap first",
      opener:
        "Before the two examples, let me tell you where I've made this call before — because it probably isn't where you'd guess.",
      rest:
        "I have not maintained a fixed asset subledger. I'd rather say that now than have it sitting under the next twenty minutes.\n\nWhat I have done is make the capitalize-or-expense determination from three different seats.\n\nOn the return. I prepare business returns up through the 1120, which means depreciation schedules, Form 4562, Section 179 and bonus elections, and reconciling book depreciation to tax depreciation on the M-1. That reconciliation is the fixed asset question, restated in a different vocabulary.\n\nIn the audit. Every field exam I run tests whether capital purchases got identified correctly in the first place. That isn't adjacent to this decision — it is this decision, graded after the fact, by me.\n\nAnd in the build, where the cost was my own. That's the second example.",
      marks:
        "Even and unhurried. You are sizing a gap, not confessing to one. Same energy as \"none of this is accounting.\"",
    },
    {
      cue: "Size the gap honestly",
      opener: "So here's the honest shape of it.",
      rest:
        "I know the rule. I've applied it, and I've tested other people's application of it — which is a harder version of the same skill, because I have to defend my answer to someone who disagrees.\n\nWhat's new is the posting and the rollforward. That's a week, not a quarter.\n\nAnd I'd much rather you know exactly which part is new than find out in March.",
      marks:
        "Then MOVE. Do not pause for reassurance — going straight into Example 1 is what makes it read as sized rather than apologized for.",
    },
  ],
};

deck.splice(at + 1, 0, threeSeats);

// convert it at the close, where the two examples have just proven the point
const close = deck.find((s) => s.sectionTitle === "Topic 1 close");
if (close) {
  close.beats.splice(1, 0, {
    cue: "What the two examples were for",
    opener: "And that's why I picked those two.",
    rest:
      "Not because they were the biggest numbers I've touched. Because one of them I caught, and one of them I missed — and I'd rather show you both than show you two wins.\n\nThe judgment is the part that transfers. The posting is the part I learn.",
    marks: "This is the sentence that answers the bookkeeping question without ever restating it.",
  });
}

await copyFile(deckPath, `${deckPath}.pre-seats.bak`);
await writeFile(deckPath, `${JSON.stringify(deck, null, 2)}\n`, "utf8");
console.log(`inserted at slide ${at + 2} of ${deck.length}`);
console.log(close ? "close beat added" : "WARNING: Topic 1 close not found");
