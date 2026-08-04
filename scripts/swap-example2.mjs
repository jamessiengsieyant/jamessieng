// Replaces Example 2 (ForensisGroup software / ASC 350-40) with the client
// advisory story: construction client, S-corp question, equipment purchases.
// Same slide count. Lands on the written-policy requirement, which is the
// thesis of the whole talk stated by the regulation itself.
import { readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const deckPath = path.join(import.meta.dirname, "..", "app", "vast", "deck.json");
const deck = JSON.parse(await readFile(deckPath, "utf8"));

const keep = deck.filter((s) => s.sectionTitle !== "Example 2 — the other chair");
const at = keep.findIndex((s) => s.sectionTitle === "Topic 1 close");
if (at < 0) throw new Error("Topic 1 close not found — aborting.");

const T1 = "Part 02 — Topic 1";
const E2 = "Example 2 — the other chair";

const example2 = [
  {
    section: T1,
    sectionTitle: E2,
    visual: {
      t: "statement",
      kick: "Example 2 · the other chair",
      title: "He asked me about\nan S-corp.",
      sub: "A construction client. Fixer-uppers. He'd just landed a contract bigger than anything he'd done.",
    },
    beats: [
      {
        cue: "The question behind the question",
        opener: "Second one. Different chair. Nobody's books were on trial this time — somebody just asked me a question.",
        rest:
          "Construction client of mine. Does fixer-uppers. He'd landed a contract bigger than anything he'd handled, and he wanted to know if he should elect S-corp.\n\nThe honest answer wasn't about the election. It was about what the election was going to cost him.\n\nOnce his receipts or his assets cross two hundred fifty thousand, he's filing a Schedule L and an M-1. That's a real balance sheet, and a reconciliation between his books and his return. Which means his books have to actually tie.\n\nHe was running a checkbook and a folder of receipts. That's a different business than the one he was asking about.",
        marks: "This is the slide that shows you advise on books. Don't rush it.",
      },
    ],
  },
  {
    section: T1,
    sectionTitle: E2,
    visual: {
      t: "list",
      kick: "What the rule wanted · what I did",
      title: "Then he started buying equipment.",
      items: [
        { lead: "Better, different, or brought back? Any one — capitalize" },
        { lead: "Or the safe harbor: $2,500 an invoice, no analysis" },
        { lead: "But only with a written policy, in place before the year starts" },
      ],
    },
    beats: [
      {
        cue: "My call now",
        opener: "Then the equipment started coming. And now the call is mine, because I'm the one signing the return.",
        rest:
          "Same test as the spray booth, different rulebook. Did it make the thing better, change what it does, or bring it back from broken? Any one of those and you capitalize it. None of them and it's a repair.\n\nThere's also a shortcut. The de minimis safe harbor lets you expense anything under twenty-five hundred an invoice and skip the analysis entirely.\n\nBut it has a condition. You need a written accounting policy, and it has to be in place before the tax year starts.",
      },
    ],
  },
  {
    section: T1,
    sectionTitle: E2,
    visual: {
      t: "statement",
      kick: "How it came out · what I'd change",
      title: "Nobody had\nwritten it down.",
      sub: "So we capitalized things we could have expensed. And he'd been my client the year before.",
    },
    beats: [
      {
        cue: "The honest part",
        opener: "He didn't have one. So we couldn't use it.",
        rest:
          "We capitalized a pile of small stuff that could have been deducted the day he bought it. Not because the rule said so. Because nobody had written one paragraph the previous December.\n\nAnd I'll own my part of that. He'd been my client the year before. I never told him to write it.\n\nSo here's the lesson, and it's the same one as the spray booth. You don't get to decide at the end of the year and justify it backwards. The policy has to exist before the transaction does.\n\nClassify on purpose, at the source, in writing. That's not my opinion. That's the regulation.",
        marks: "Land the last line and stop. It's the thesis of the whole talk, and the IRS is saying it, not you.",
      },
    ],
  },
];

keep.splice(at, 0, ...example2);

// close now points at two missing-rule failures rather than two chairs
const close = keep.find((s) => s.sectionTitle === "Topic 1 close");
close.visual.sub = "Neither one had a rule behind it when it mattered.";
close.beats = [
  {
    cue: "The close",
    opener: "Two calls. Neither one had a rule behind it when it mattered.",
    rest:
      "The first one, a bookkeeper filed an asset under repairs because nobody had given her a threshold to check. The second one, my client lost a deduction because nobody wrote a policy in December. Including me.\n\nOne I caught. One I missed. I picked those two on purpose — I could have shown you two wins.\n\nI did the job by hand, and I know exactly where it hurts. So let me tell you what I'd build.",
    marks: "Through-line, pass 2. Straight into Topic 2, no pause.",
  },
];

await copyFile(deckPath, `${deckPath}.pre-ex2swap.bak`);
await writeFile(deckPath, `${JSON.stringify(keep, null, 2)}\n`, "utf8");

const t1 = keep.filter((s) => s.section.startsWith("Part 02"));
console.log(`Topic 1: ${t1.length} slides, ${t1.reduce((n, s) => n + s.beats.length, 0)} beats`);
console.log(`total deck: ${keep.length}`);
