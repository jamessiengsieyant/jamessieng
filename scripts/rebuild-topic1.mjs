// Topic 1, cut down. Was 13 slides and ~17 beats; now 8 slides and 8 beats —
// one beat per slide, so the deck is the only cue you need.
// Notes are written to be said out loud: short sentences, one idea each.
import { readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const deckPath = path.join(import.meta.dirname, "..", "app", "vast", "deck.json");
const deck = JSON.parse(await readFile(deckPath, "utf8"));

const before = deck.filter((s) => !s.section.startsWith("Part 02"));
const intro = before.filter((s) => s.section.startsWith("Part 01"));
const topic2 = before.filter((s) => s.section.startsWith("Part 03"));

const T1 = "Part 02 — Topic 1";

const topic1 = [
  {
    section: T1,
    sectionTitle: "Capitalize, or expense?",
    visual: {
      t: "list",
      kick: "Topic 1",
      title: "Capitalize, or expense?",
      items: [
        { lead: "What the rule wanted" },
        { lead: "What I did" },
        { lead: "How it came out" },
        { lead: "What I'd change" },
      ],
      callout: "Two calls. One I caught. One I missed.",
    },
    beats: [
      {
        cue: "Topic 1 setup",
        opener: "Topic one. Capitalize, or expense.",
        rest:
          "Two calls I've made. Same four things for each one: what the rule wanted, what I did, how it came out, what I'd change.\n\nOne of them I made from the audit chair. The other one I'll get to.\n\nQuick thing first, so it's not sitting there. I've never kept a fixed asset subledger. What I've done is make this call from the return, from the audit, and on my own work. The judgment I have. The posting is the part I'd learn.",
        marks:
          "Say the last paragraph evenly and then go straight into Example 1. No pause. You're sizing it, not apologizing.",
      },
    ],
  },

  // ---------- Example 1 ----------
  {
    section: T1,
    sectionTitle: "Example 1 — the audit chair",
    visual: {
      t: "statement",
      kick: "Example 1 · the audit chair",
      title: "It was filed\nunder repairs.",
      sub: "A field audit. Details disguised.",
    },
    beats: [
      {
        cue: "The find",
        opener: "First one's from a field audit. Details are disguised.",
        rest:
          "People think a sales tax audit only looks at sales. It doesn't. We look at what you bought too.\n\nSo I'm in repairs and maintenance, going line by line. That's where I always spend my time. Assets hide in there. Not because anyone's cheating. An invoice shows up, it sounds like a repair, it gets filed with the repairs.\n\nAnd there's a twenty thousand dollar invoice. Out-of-state vendor, no tax charged. Equipment, freight, and installation, all on one line.\n\nIt's a spray booth. And it wasn't on their depreciation schedule.",
        marks: "Slow down on the last line.",
      },
    ],
  },
  {
    section: T1,
    sectionTitle: "Example 1 — the audit chair",
    visual: {
      t: "list",
      kick: "What the rule wanted · what I did",
      title: "Repair, or asset?",
      items: [
        { lead: "It added capability" },
        { lead: "It lasts years" },
        { lead: "Cost includes freight and install" },
      ],
      callout: "Their own books already said asset. It just wasn't coded like one.",
    },
    beats: [
      {
        cue: "The call",
        opener: "Now I have to make a call, and I have to defend it.",
        rest:
          "If it's an asset, it belonged on their books. And use tax was due on it, which nobody paid.\n\nIt added capability. They weren't fixing a booth, they were buying one. It lasts years. And the cost includes freight and installation, because that's what it took to make it work.\n\nOne more thing, and this is the part I'd want you to hold me to. That same account had real repairs in it. Compressor service, filters. I left those alone. If it only ever goes one way, it isn't judgment.",
        marks: "Say the repairs line plainly. The restraint is the point.",
      },
    ],
  },
  {
    section: T1,
    sectionTitle: "Example 1 — the audit chair",
    visual: {
      t: "statement",
      kick: "How it came out · what I'd change",
      title: "It held.",
      sub: "And nobody was cheating. The call got made at data entry, by the person with the least context.",
    },
    beats: [
      {
        cue: "How it came out",
        opener: "I walked the owner and their CPA through it at the exit conference. It held.",
        rest:
          "But nobody was cheating. The invoice sounded like a repair, so it went where repairs go, and it sat there three years.\n\nThat call got made at data entry. By the person with the least context. With no rule to follow.\n\nSo that's what I'd change. Not the audit. The moment it happened. Hold onto that, I'm going to build it in Topic 2.",
      },
    ],
  },

  // ---------- Example 2 ----------
  {
    section: T1,
    sectionTitle: "Example 2 — the other chair",
    visual: {
      t: "cards",
      kick: "Example 2 · the other chair",
      title: "The other chair\nwas mine.",
      a: { h: "Capitalize", lines: "Configuration\nCoding\nTesting" },
      b: { h: "Expense", lines: "Subscription\nTraining\nData conversion" },
      tail: "ASC 350-40. And internal payroll counts — \"we didn't hire anyone\" isn't an answer.",
    },
    beats: [
      {
        cue: "It was mine",
        opener: "Second one. Same question. This time the work was mine.",
        rest:
          "PMify and Survey Builder, the two things I built at ForensisGroup. About four months.\n\nNobody sent us an invoice for that. The invoice was me.\n\nThe rule is ASC 350-40. A subscription is never an asset, that's rent. But the setup can be capitalized. Configuration, coding, testing. Training and data conversion get expensed either way.\n\nAnd internal payroll counts. So \"we didn't hire anyone\" isn't an answer.",
        marks: "Let \"the invoice was me\" sit for a beat.",
      },
    ],
  },
  {
    section: T1,
    sectionTitle: "Example 2 — the other chair",
    visual: {
      t: "statement",
      kick: "What I did",
      title: "Nothing.\nNobody asked.",
      sub: "Including me.",
    },
    beats: [
      {
        cue: "The honest part",
        opener: "So what did I do about it at the time? Nothing.",
        rest:
          "It ran through payroll and got expensed as incurred. No analysis. No memo. Nobody raised it.\n\nIncluding me. And I'm the one who knew both sides of it.",
        marks: "Flat. Don't soften it and don't rush out of it.",
      },
    ],
  },
  {
    section: T1,
    sectionTitle: "Example 2 — the other chair",
    visual: {
      t: "list",
      kick: "How it came out · what I'd change",
      title: "Expense was right. I got there wrong.",
      items: [
        { lead: "Track the hours while it's happening" },
        { lead: "Write the memo even when the answer is expense" },
        { lead: "Watch for scale — same rule, different answer" },
      ],
    },
    beats: [
      {
        cue: "Right answer, wrong way",
        opener: "I went back and worked it like I'd work someone else's file.",
        rest:
          "No time records, so any number I give you now is a guess. The work was mostly scoping and training, and those get expensed anyway. And it was too small to matter.\n\nSo expense was right. But I didn't conclude that. I defaulted to it and got lucky.\n\nThree things I'd change. Track the hours while it's happening, not to force capitalization, just to keep the option. Write the memo even when the answer is expense. And watch for scale, because the same rule gives you a different answer at a different size.",
        marks: "\"I defaulted to it and got lucky\" is the line. Slow there.",
      },
    ],
  },
  {
    section: T1,
    sectionTitle: "Topic 1 close",
    visual: {
      t: "statement",
      kick: "Topic 1 close",
      title: "One I caught.\nOne I missed.",
      sub: "Both got made by whoever was closest, with nothing to follow.",
    },
    beats: [
      {
        cue: "The close",
        opener: "Two calls. Both got made by whoever was closest to the transaction, with nothing to follow.",
        rest:
          "One I caught. One I missed.\n\nI picked those two on purpose. I could have shown you two wins.\n\nI did the job by hand, and I know exactly where it hurts. So let me tell you what I'd build.",
        marks: "Through-line, pass 2. Go straight into Topic 2 — no pause at the end.",
      },
    ],
  },
];

const next = [...intro, ...topic1, ...topic2];
await copyFile(deckPath, `${deckPath}.pre-t1cut.bak`);
await writeFile(deckPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");

const beats = topic1.reduce((n, s) => n + s.beats.length, 0);
console.log(`Topic 1: ${topic1.length} slides, ${beats} beats (was 13 slides, 17 beats)`);
console.log(`total deck: ${next.length}`);
