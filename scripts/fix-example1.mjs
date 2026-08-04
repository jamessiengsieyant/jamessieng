// Example 1, corrected.
//
// The old version implied the capitalization call drove the use tax
// assessment. It did not — use tax is due on out-of-state tangible personal
// property used in California regardless of which account it lands in. It also
// used "price + freight + installation" as the tax measure, which is the GAAP
// basis under ASC 360; under Reg 1546 separately stated installation labor is
// excluded from the measure of tax, and under Reg 1628 separately stated
// delivery to the purchaser generally is too.
//
// Corrected, the story is better: two rules asking different questions of the
// same invoice, and a misclassification that did not create the liability —
// it hid it for three years.
import { readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const deckPath = path.join(import.meta.dirname, "..", "app", "vast", "deck.json");
const deck = JSON.parse(await readFile(deckPath, "utf8"));

const E1 = "Example 1 — the audit chair";
const first = deck.findIndex((s) => s.sectionTitle === E1);
const count = deck.filter((s) => s.sectionTitle === E1).length;
if (first < 0) throw new Error("Example 1 slides not found — aborting.");

const slides = [
  {
    section: "Part 02 — Topic 1",
    sectionTitle: E1,
    visual: {
      t: "statement",
      kick: "Example 1 · the audit chair",
      title: "It was filed\nunder repairs.",
      sub: "A field audit at CDTFA. Details disguised — no names, nothing identifying.",
    },
    beats: [
      {
        cue: "Setup — inside a real audit",
        opener: "The first call I made from the audit chair. Let me take you inside a real one.",
        rest:
          "This is from my CDTFA work, so the details are disguised — no names, nothing identifying. But the decision is real, and it's one I make regularly.\n\nAnd I want to start with what most people get wrong about a sales tax audit. Everyone assumes we only look at sales. We don't. Every field audit examines what the business bought, too.",
        marks: "Plain and unhurried. You are inviting them somewhere, not performing.",
      },
    ],
  },
  {
    section: "Part 02 — Topic 1",
    sectionTitle: E1,
    visual: {
      t: "cards",
      kick: "The requirement · where a purchase exam looks",
      title: "Two piles. Only one of them\nis any work.",
      a: {
        h: "Fixed asset additions",
        lines: "A list of things\nsomebody already\ndecided were assets",
      },
      b: {
        h: "Expense accounts",
        lines: "Repairs, supplies,\nconsumables — and\nwhatever got misfiled",
      },
      tail: "The schedule is the easy pile. The expense accounts are where you earn the day.",
    },
    beats: [
      {
        cue: "Where the work is",
        opener: "A purchase exam starts by splitting what the business bought into two piles: fixed asset additions, and expense accounts.",
        rest:
          "The fixed asset schedule is the easy pile. It's a list of things somebody already decided were assets, and it's the first place any auditor looks — a taxable equipment purchase sitting on the depreciation schedule is not hiding from anybody.\n\nThe expense accounts are where you actually earn the day. And of those, repairs and maintenance is where I spend my time — because that is where assets go to hide.\n\nNot from tax. From detection.",
        marks:
          "\"Not from tax. From detection.\" — this correction is doing real work. Say it as a clarification, not a punchline.",
      },
    ],
  },
  {
    section: "Part 02 — Topic 1",
    sectionTitle: E1,
    visual: {
      t: "list",
      kick: "What I did · the find",
      title: "In repairs and maintenance:",
      items: [
        { lead: "A ~$20,000 invoice, coded to R&M", sub: "Line-by-line through the account, which is most of the job." },
        { lead: "Out-of-state vendor, no tax charged", sub: "So nothing was collected at the register — which makes it a use tax question." },
        { lead: "Equipment, freight, and installation on one invoice", sub: "A spray booth for an auto body shop." },
        { lead: "Nowhere on the depreciation schedule", sub: "Which is exactly why it had never been looked at." },
      ],
    },
    beats: [
      {
        cue: "The find",
        opener: "So I'm going through repairs and maintenance line by line, which is most of the job, and there it is.",
        rest:
          "About twenty thousand dollars. Out-of-state vendor, so no tax was collected at the point of sale. Equipment, freight, and installation, all on one invoice — a spray booth.\n\nCoded to repairs. And nowhere on the depreciation schedule.",
        marks: "Let the last line sit. Do not explain it yet — the next two slides are the explanation.",
      },
    ],
  },
  {
    section: "Part 02 — Topic 1",
    sectionTitle: E1,
    visual: {
      t: "cards",
      kick: "The interesting part",
      title: "Two rules. One invoice.\nTwo different numbers.",
      a: {
        h: "Use tax measure",
        lines: "Purchase price.\nSeparately stated\ninstallation labor is\nexcluded — Reg 1546.",
      },
      b: {
        h: "GAAP basis · ASC 360",
        lines: "Price plus freight\nplus installation —\neverything to get it\nin place and working.",
      },
      tail: "The two rules are asking different questions, so they don't produce the same number.",
    },
    beats: [
      {
        cue: "Two rules, one invoice",
        opener: "And here is the part I find genuinely interesting, because this one invoice gets measured twice, two different ways.",
        rest:
          "For my purposes — the use tax measure — the starting point is the purchase price. But separately stated charges for installation labor are excluded from the measure of tax under Regulation 1546, and separately stated delivery to the purchaser generally is too.\n\nFor their books, under ASC 360, it's the opposite instruction. Freight and installation go into the asset's basis, because basis is everything required to get it in place and working.\n\nSame invoice. Two different numbers. Not because anyone is wrong — because the two rules are answering different questions. Mine is asking what was purchased for use in California. Theirs is asking what the asset cost.",
        marks:
          "This is your credibility slide with the technical interviewer. Unhurried, and do not apologize for the detail.",
      },
    ],
  },
  {
    section: "Part 02 — Topic 1",
    sectionTitle: E1,
    visual: {
      t: "list",
      kick: "The call I make — and the one I don't",
      title: "Use tax never depended on the pile.",
      items: [
        {
          lead: "The tax was due either way",
          sub: "Tangible personal property, bought out of state, used in California, no tax paid to the vendor. Which account it sat in changes nothing about that.",
        },
        {
          lead: "But it was misclassified, and I said so",
          sub: "Added capability rather than restoring it, useful life in years, expensed to R&M and missing from the schedule for three years. That's a books problem, not a tax problem — and not my assessment to make.",
        },
        {
          lead: "And the misclassification is why nobody had caught it",
          sub: "Additions on the depreciation schedule get reviewed. Costs buried in R&M don't. The coding didn't create the liability. It hid it.",
        },
      ],
      callout: "Which is the actual reason this story belongs in a capitalization presentation.",
    },
    beats: [
      {
        cue: "The honest scope of my call",
        opener: "Now — I want to be precise about what I actually decided, because it's narrower than you might expect.",
        rest:
          "The use tax did not depend on the classification at all. Tangible personal property, purchased out of state, used in California, no tax paid to the vendor. Use tax is due. Whether they called it a repair or an asset changes nothing about that conclusion, and I want to say that plainly because it would be easy to overclaim here.",
      },
      {
        cue: "The part that wasn't my job",
        opener: "But the classification was wrong, and I raised it anyway — because it wasn't my assessment, it was their books.",
        rest:
          "It added capability rather than restoring it. Its useful life is measured in years. It was expensed to repairs and missing from the depreciation schedule for three years running.\n\nSo their own two records disagreed with each other. Their own records told on them.",
        marks: "PAUSE after \"told on them.\" Add nothing to it.",
      },
      {
        cue: "Why the pile mattered anyway",
        opener: "And here's why the pile mattered, even though the tax didn't turn on it.",
        rest:
          "It's the reason nobody had ever caught it. Additions on the depreciation schedule get reviewed — by their CPA, by their lender, by me. Costs buried in repairs and maintenance don't get reviewed by anyone.\n\nThe misclassification didn't create the liability. It hid it, for three years.\n\nWhich is the actual reason this story belongs in a capitalization presentation.",
        marks: "This is the beat that answers \"why does an auditor care about capitalization.\" Land it deliberately.",
      },
    ],
  },
  {
    section: "Part 02 — Topic 1",
    sectionTitle: E1,
    visual: {
      t: "statement",
      kick: "The discipline",
      title: "It has to cut\nboth ways.",
      sub: "The genuine repairs in that same account — compressor service, filter changes — I left alone.",
    },
    beats: [
      {
        cue: "Cuts both ways",
        opener: "One more thing about that account, and this is the part I'd want you to hold me to.",
        rest:
          "That same account had real repairs in it. Compressor service. Filter changes. I left every one of them alone.\n\nBecause if the call only ever goes one direction, it isn't judgment — it's a shakedown. A position I can defend is one that would have gone the other way if the facts had.",
        marks: "Say \"shakedown\" evenly. No edge on it. The restraint is the point.",
      },
    ],
  },
  {
    section: "Part 02 — Topic 1",
    sectionTitle: E1,
    visual: {
      t: "list",
      kick: "How it came out · what I'd change",
      title: "It held. And nobody was cheating.",
      items: [
        { lead: "The assessment held at the exit conference", sub: "Walked the owner and their CPA through both pieces — what they owed, and separately, what their books had wrong." },
        { lead: "Nobody was cheating", sub: "The invoice sounded like a repair vendor, so it went where repair invoices go, and sat there for three years." },
        { lead: "The call got made at data entry", sub: "By default, by the person with the least context, with no threshold to check against." },
      ],
      callout: "Which is the lesson: that decision belongs at the point of entry, on purpose, under a written policy. Hold that thought.",
    },
    beats: [
      {
        cue: "How it came out",
        opener: "At the exit conference I walked the owner and their CPA through both pieces — what they owed me, and separately, what their books had wrong. The assessment held.",
        rest:
          "And here's what I actually took away from it, which isn't about tax at all.\n\nNobody was cheating. The invoice sounded like a repair vendor, so it got filed where repair invoices go, and it sat there wrong for three years. Nobody ever revisited it.\n\nThat classification was made at data entry, by default, by the person with the least context, with no threshold to check against.",
      },
      {
        cue: "What I'd change — point of entry",
        opener: "So what would I change? Not the audit. The moment the decision happened.",
        rest:
          "That call belongs at the point of entry — on purpose, under a written policy, by someone who knows what the threshold is.\n\nHold onto that. I'm going to build it in Topic 2.",
        marks: "PLANT for Topic 2, build 3. Say it lightly — do not oversell the setup.",
      },
    ],
  },
];

deck.splice(first, count, ...slides);

await copyFile(deckPath, `${deckPath}.pre-ex1fix.bak`);
await writeFile(deckPath, `${JSON.stringify(deck, null, 2)}\n`, "utf8");
console.log(`replaced ${count} Example 1 slides with ${slides.length}`);
console.log(`deck total: ${deck.length}`);
