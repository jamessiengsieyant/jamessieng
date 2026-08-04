// Replaces the brilliant-idea section of Topic 2.
//
// "Instrument the close" was a philosophy. This is a control with a name, a
// test case, a threshold and a failure mode — and its test case is the spray
// booth from Topic 1, which closes the loop on James's own audit. The lesson
// there was "there was a rule, it was just keyed on who sent the invoice
// instead of what was on it," so the fix is not a better single key. It is
// requiring independent signals to agree.
//
// Instrumenting survives as the method underneath rather than the headline.
import { readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const deckPath = path.join(import.meta.dirname, "..", "app", "vast", "deck.json");
const deck = JSON.parse(await readFile(deckPath, "utf8"));

const T2 = "Part 03 — Topic 2";
const T2T = "The first ninety days";
const S = (visual, beats) => ({ section: T2, sectionTitle: T2T, visual, beats });

// everything from "the brilliant idea" through the old flow slide goes
const startIdx = deck.findIndex((s) => String(s.visual.kick || "").includes("brilliant idea"));
const flowIdx = deck.findIndex((s) => s.visual.t === "flow");
if (startIdx < 0 || flowIdx < 0) throw new Error("Could not locate the idea section — aborting.");
const removeCount = flowIdx - startIdx + 1;

const replacement = [
  S(
    {
      t: "statement",
      kick: "The brilliant idea",
      title: "Don't let it\ncode itself.",
      sub: "AI categorization is a control. Nobody tests it.",
    },
    [
      {
        cue: "The idea",
        opener: "So here's the one idea I was asked to bring. It comes straight out of that spray booth.",
        rest:
          "Ramp categorizes with AI. Most companies switch that on and treat it as a productivity feature.\n\nBut it isn't a feature. It's a control. Something is deciding what account a transaction lands in, thousands of times a month, and nothing is testing whether it was right.\n\nIf I walked into a business and asked what their detective control is over automated coding, most of them wouldn't have an answer.\n\nSo I'd build one.",
        marks:
          "\"It's a control\" is the sentence. Slow there. You are the person who audits the output of these systems — say it like someone who has seen it fail.",
      },
    ]
  ),

  S(
    {
      t: "list",
      kick: "How it works",
      title: "Three signals. One invoice.",
      items: [
        { lead: "The vendor default says repair" },
        { lead: "The amount says fifty times this vendor's median" },
        { lead: "The line items say equipment, freight, installation" },
      ],
      callout: "Two of the three disagree with the default. That's the flag.",
    },
    [
      {
        cue: "The disagreement rule",
        opener: "Here's how it would have caught my spray booth, the day it landed.",
        rest:
          "Three independent signals look at the same invoice.\n\nThe vendor default says repair, because that's what that vendor always sends. The amount says this is about fifty times that vendor's own median. The line items say equipment, freight, and installation.\n\nTwo of the three disagree with the default.\n\nAnd that's the rule. You don't flag on any single signal. You flag when they disagree — because the failure in my audit wasn't a bad rule. It was one rule, with nothing to check it against.",
        marks: "This is the loop closing on Topic 1. Let them make the connection before you spell it out.",
      },
    ]
  ),

  S(
    {
      t: "flow",
      kick: "What it looks like",
      title: "A rules layer in front of NetSuite.",
      tail: "The flag happens the moment the invoice lands — not three weeks later at close, and not three years later with me sitting across the table.",
    },
    [
      {
        cue: "The flow",
        opener: "In practice it sits between Ramp and NetSuite, and it's boring, which is the point.",
        rest:
          "The transaction lands. The AI assigns a category. Then three checks run against it — the vendor's usual account, the amount against that vendor's own history, and what the line items actually say.\n\nIf they agree, it posts. Nobody's day gets slower.\n\nIf they disagree, it routes to a short review queue where a person looks at it, once, while the invoice is still fresh and somebody still remembers what it was for.",
        marks: "Say \"and not three years later with me sitting across the table\" dry. Don't lean on it.",
      },
    ]
  ),

  S(
    {
      t: "list",
      kick: "What would make it fail",
      title: "And I'd rather say it than have you find it.",
      items: [
        {
          lead: "A new vendor has no history",
          sub: "So there's no median to compare against. The first few invoices from anyone always route to review.",
        },
        {
          lead: "Too few invoices to have a baseline",
          sub: "Below about five, the statistic is noise. Fall back to a flat threshold instead of pretending.",
        },
        {
          lead: "Flagging everything is worse than flagging nothing",
          sub: "A queue nobody works is a control that only looks like one. Tie the threshold to performance materiality — flag what could matter, not what's merely unusual.",
        },
        {
          lead: "It has to cut both ways",
          sub: "It should catch things wrongly capitalized too. Same discipline as the repairs I left alone.",
        },
      ],
    },
    [
      {
        cue: "Failure modes",
        opener: "And here's what would make it fail, because I'd rather say it than have you find it.",
        rest:
          "A new vendor has no history, so there's nothing to compare against — those always go to review until there's a baseline. Below about five invoices the statistic is just noise, so it falls back to a flat threshold rather than pretending to know something.\n\nOne technical note. It compares against the median, not the average, because an average gets wrecked by exactly the outlier you're hunting for. One big purchase last year and the average stops flagging anything.\n\nAnd the real risk isn't statistical, it's human. If it flags two hundred things a month, everybody ignores it, and now you have something worse than no control — because people believe something is watching. So the threshold ties to materiality.\n\nLast one: it has to catch things wrongly capitalized too, not just wrongly expensed. Same discipline as the repairs I left alone.",
        marks:
          "This is the credibility slide. Naming the failure modes yourself is worth more than the idea. Unhurried.",
      },
    ]
  ),

  S(
    {
      t: "list",
      kick: "Then keep going",
      title: "Remove one manual step a month.",
      items: [
        {
          lead: "Measure the close first",
          sub: "Where do the hours actually go? Nobody can answer that, because nobody has had a reason to write it down.",
        },
        {
          lead: "Then a package pre-check",
          sub: "Automated completeness and tie-out on subsidiary packages, before a human opens them.",
        },
        { lead: "Every build ships with a before-and-after number", sub: "Measured, not claimed." },
      ],
    },
    [
      {
        cue: "The method underneath",
        opener: "And that's the first one, not the only one. The method underneath is the same every month.",
        rest:
          "Measure where the hours actually go, then remove exactly one manual step. Small builds, each shipped with a before-and-after number.\n\nMost closes never get faster. Not because anyone's bad at their job — because everybody owns their piece, their piece works, and nobody owns \"faster.\"\n\nI'm offering to own faster.",
        marks: "PAUSE before \"I'm offering to own faster.\" That's the line you want them repeating afterwards.",
      },
    ]
  ),
];

deck.splice(startIdx, removeCount, ...replacement);

await copyFile(deckPath, `${deckPath}.pre-idea.bak`);
await writeFile(deckPath, `${JSON.stringify(deck, null, 2)}\n`, "utf8");

const t2 = deck.filter((s) => s.section.startsWith("Part 03"));
console.log(`removed ${removeCount} slides, added ${replacement.length}`);
console.log(`Topic 2: ${t2.length} slides, ${t2.reduce((n, s) => n + s.beats.length, 0)} beats`);
console.log(`total: ${deck.length}`);
