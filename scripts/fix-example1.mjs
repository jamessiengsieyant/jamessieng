// Example 1, rewritten. Three changes:
//
// 1. The misclassification now has a mechanism — a vendor default account in
//    the books — instead of a vague "assets hide in R&M." The rule existed; it
//    was keyed on who sent the invoice instead of what was on it. That is a
//    much better setup for build 3 in Topic 2.
//
// 2. Accuracy. Use tax was due regardless of the classification: out-of-state
//    tangible personal property used in California owes it whether it sits in
//    R&M or on the depreciation schedule. The earlier draft implied the
//    capitalization call drove the assessment. It did not.
//
// 3. The two-rules beat. Installation labor is excluded from the measure of
//    tax (Reg 1546), but freight and installation go into basis under ASC 360.
//    Same invoice, two numbers — which is James's actual expertise and the
//    strongest technical moment available to him.
import { readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const deckPath = path.join(import.meta.dirname, "..", "app", "vast", "deck.json");
const deck = JSON.parse(await readFile(deckPath, "utf8"));

const E1 = "Example 1 — the audit chair";
const first = deck.findIndex((s) => s.sectionTitle === E1);
const count = deck.filter((s) => s.sectionTitle === E1).length;
if (first < 0) throw new Error("Example 1 slides not found — aborting.");

const T1 = "Part 02 — Topic 1";

const slides = [
  {
    section: T1,
    sectionTitle: E1,
    visual: {
      t: "statement",
      kick: "Example 1 · the audit chair",
      title: "It came in from\nthe repair guy.",
      sub: "A field audit. Details disguised.",
    },
    beats: [
      {
        cue: "The find",
        opener: "First one's from a field audit. Details are disguised.",
        rest:
          "People think a sales tax audit only looks at sales. It doesn't. We test what you bought too.\n\nSo I'm working the repairs and maintenance ledger. One vendor keeps showing up — small amounts, a few hundred at a time. Compressor service, filter changes, booth maintenance. All consistent with the account.\n\nThen one entry from that same vendor is twenty thousand dollars.\n\nOut-of-state. No tax charged. Equipment, freight, and installation on one invoice.\n\nIt's a spray booth. They bought the booth from the company that services their booths.",
        marks: "Slow on the last line. Let them get there a half-second before you say it.",
      },
    ],
  },
  {
    section: T1,
    sectionTitle: E1,
    visual: {
      t: "cards",
      kick: "What the rule wanted",
      title: "Two rules.\nOne invoice.",
      a: {
        h: "Use tax measure",
        lines: "Purchase price.\nInstallation labor is\nexcluded — Reg 1546.",
      },
      b: {
        h: "Book basis · ASC 360",
        lines: "Price plus freight\nplus installation —\nwhatever it took to\nget it working.",
      },
      tail: "Same invoice, two different numbers. The rules are asking different questions.",
    },
    beats: [
      {
        cue: "Two rules, one invoice",
        opener: "And this is the part of the job I actually like. That one invoice gets measured twice, two different ways.",
        rest:
          "For my purposes, the use tax measure starts with the purchase price. But installation labor is excluded under Regulation 1546.\n\nFor their books, under ASC 360, it's the opposite instruction. Freight and installation go into the asset's basis, because basis is whatever it took to get it in place and working.\n\nSame invoice. Two different numbers. Not because anyone's wrong. Mine is asking what was purchased for use in California. Theirs is asking what the asset cost.",
        marks: "This is your credibility slide with Galvan. Unhurried, and don't apologize for the detail.",
      },
    ],
  },
  {
    section: T1,
    sectionTitle: E1,
    visual: {
      t: "list",
      kick: "What I did",
      title: "Repair, or asset?",
      items: [
        { lead: "The use tax was due either way" },
        { lead: "But it added capability, and it lasts years" },
        { lead: "Expensed to R&M, and never on the depreciation schedule" },
      ],
      callout: "That same vendor's other invoices were genuine repairs. I left those alone.",
    },
    beats: [
      {
        cue: "What I actually decided",
        opener: "Now, what did I actually decide? It's narrower than you'd think, and I want to be precise about it.",
        rest:
          "The use tax didn't depend on the classification. Out-of-state tangible property, used in California, no tax paid to the vendor — use tax is due. Repair or asset, that doesn't move.\n\nBut the classification was wrong, and I raised it anyway, because it was their books. It added capability. They weren't fixing a booth, they were buying one. It lasts years. And it was expensed to repairs and never appeared on the depreciation schedule.\n\nOne more thing, and hold me to this. That same vendor's other invoices were real repairs. I left every one of them alone. If it only ever goes one way, it isn't judgment.",
        marks: "Say the repairs line plainly. The restraint is the point.",
      },
    ],
  },
  {
    section: T1,
    sectionTitle: E1,
    visual: {
      t: "statement",
      kick: "How it came out · what I'd change",
      title: "It held.",
      sub: "The vendor had a default account. The bill coded itself.",
    },
    beats: [
      {
        cue: "How it came out",
        opener: "At the exit conference I walked the owner and their CPA through both pieces — what they owed, and separately, what their books had wrong. It held.",
        rest:
          "And nobody was cheating. That vendor was set up with a default account in their books, and the default was repairs and maintenance — because for years, that's all that vendor had ever sent them. The bill came in, it coded itself, and nobody overrode it.\n\nSo there was a rule. It was just keyed on who sent the invoice instead of what was on it.\n\nAnd that's why it sat for three years. Additions to the depreciation schedule get reviewed — by their CPA, by their lender, by me. Costs buried in repairs don't get reviewed by anyone. The coding didn't create the liability. It hid it.\n\nSo that's what I'd change. Not the audit. The rule that coded it. Hold onto that, I'll build it in Topic 2.",
        marks:
          "\"Keyed on who sent the invoice instead of what was on it\" is the setup for build 3. Land it.",
      },
    ],
  },
];

deck.splice(first, count, ...slides);

// close: the two failures are now different in a way worth naming
const close = deck.find((s) => s.sectionTitle === "Topic 1 close");
close.visual.sub = "One had the wrong rule. One had no rule at all.";
close.beats = [
  {
    cue: "The close",
    opener: "Two calls. Neither one had the right rule behind it when it mattered.",
    rest:
      "The first one had a rule. It was just keyed on the vendor instead of the invoice. The second one had no rule at all, because nobody wrote it. Including me.\n\nOne I caught. One I missed. I picked those two on purpose — I could have shown you two wins.\n\nI did the job by hand, and I know exactly where it hurts. So let me tell you what I'd build.",
    marks: "Through-line, pass 2. Straight into Topic 2, no pause.",
  },
];

await copyFile(deckPath, `${deckPath}.pre-ex1fix.bak`);
await writeFile(deckPath, `${JSON.stringify(deck, null, 2)}\n`, "utf8");
console.log(`replaced ${count} Example 1 slides with ${slides.length}`);
console.log(`deck total: ${deck.length}`);
