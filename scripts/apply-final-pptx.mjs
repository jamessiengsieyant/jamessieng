// Propagates the final hand-designed deck (Desktop\James Sieng - Presentation
// - Staff Accountant.pptx) into deck.json. That file is James's finished
// on-slide content — no speaker notes, he's writing those separately today —
// so this touches only each slide's `visual`, never `beats`, `section`, or
// `sectionTitle`.
import { readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const deckPath = path.join(import.meta.dirname, "..", "app", "vast", "deck.json");
const deck = JSON.parse(await readFile(deckPath, "utf8"));

if (deck.length !== 30) throw new Error(`expected 30 slides, found ${deck.length}`);

const visuals = [
  { t: "title" },
  {
    t: "cards",
    kick: "Before we start",
    title: "Mostly\nnot accounting.",
    a: { h: "UC Irvine", lines: "B.S. Biomedical Engineering\nB.A. Business Economics" },
    b: {
      h: "Certifications",
      lines:
        "7× Salesforce Certified (Advanced Admin)\n3x CompTIA Certified (A+, Network+, Security+)\nAWS Certified Cloud Practitioner\nISC2 Certified in Cybersecurity and CISSP exam passed",
    },
    tail: "No particular strategy, just a love of learning.",
  },
  {
    t: "statement",
    kick: "Where it started",
    title: "Not the typing.\nThe spreadsheet.",
    sub: "Brainstorming ways to increase efficiency.",
  },
  {
    t: "chain",
    kick: "Amgen",
    title: "They brought me in\nfor one project.",
    sub: "Years of historical preclinical data — structured differently based on a variety of things. A puzzle.",
    links: [
      { from: "Excel", to: "VBA" },
      { from: "VBA", to: "Relational database" },
    ],
    tail: "I really excelled.",
  },
  {
    t: "list",
    kick: "The CRO",
    title: "I built the system with my previous experience in mind",
    items: [
      { lead: "I volunteered to administer their Salesforce", sub: "Six months later I was the department." },
      {
        lead: "LIMS — laboratory information management",
        sub: "Sample intake · chain of custody · what has been run on what",
      },
      {
        lead: "I'd used the big ones as a tech",
        sub: "They're built for the person signing the purchase order — not the person at the bench with a sample in one hand and a barcode gun in the other.",
      },
    ],
    callout: "And I could only build it because I'd been the one using it.",
  },
  {
    t: "chain",
    kick: "The pattern",
    title: "I keep automating\nthe job I just did.",
    links: [
      { from: "Bench tech", to: "Built the lab system" },
      { from: "Data entry", to: "Configured the database" },
    ],
    tail: "Do the job by hand first. Feel exactly where it hurts. Then build the thing that makes it hurt less.",
  },
  {
    t: "list",
    kick: "ForensisGroup",
    title: "Same move. Bigger.",
    items: [
      { lead: "PMify", sub: "Project management built within Salesforce" },
      { lead: "Survey Builder", sub: "Custom survey sends triggered by record statuses" },
      { lead: "QuickBooks ↔ Salesforce", sub: "Automated AR/AP payment sync, and a single source of truth" },
    ],
    callout: "Eliminating pain points felt by myself and my colleagues.",
  },
  {
    t: "list",
    kick: "The pivot",
    title: "I wanted skills that could help anyone.",
    items: [
      { lead: "WGU — B.S. Accounting, 2024", sub: "My third bachelor's degree." },
      {
        lead: "Enrolled Agent — admitted to practice before the IRS",
        sub: "Business returns through Form 1120. Trial balance to Schedule L, book-to-tax on the M-1.",
      },
      { lead: "CPA — all four exams passed", sub: "Completing the experience requirement." },
    ],
    callout: "Applying the skills throughout the days, nights, and even weekends.",
  },
  {
    t: "statement",
    kick: "H&R Block / CDTFA",
    title: "Tax filing and auditing from the same books",
    sub: "Top performing tax preparer and sales & use tax auditor.",
  },
  {
    t: "statement",
    kick: "For fun",
    title: "I sing.\nI play guitar.",
    sub: "Sometimes simultaneously.",
  },
  {
    t: "statement",
    kick: "Topic 1 · example 1",
    title: "Invoice came from\na repair vendor",
    sub: "A sales and use tax audit.",
  },
  {
    t: "cards",
    kick: "What the rule wanted",
    title: "Two rules.\nOne invoice.",
    a: { h: "Use tax measure", lines: "Purchase price.\nInstallation labor is\nexcluded — Reg 1546." },
    b: {
      h: "Book basis · ASC 360",
      lines: "Price plus freight\nplus installation —\nwhatever it took to\nget it working.",
    },
    tail: "Same invoice, two different numbers.",
  },
  {
    t: "list",
    kick: "What I did",
    title: "Expense or capitalize?",
    items: [
      { lead: "The use tax was due either way" },
      { lead: "But it added capability and increased useful life" },
      { lead: "Expensed to repairs & maintenance" },
    ],
    callout: "That same vendor's other invoices were genuine repairs. I left those alone.",
  },
  {
    t: "statement",
    kick: "How it came out",
    title: "It held.",
    sub: "The taxpayer concurred.",
  },
  {
    t: "statement",
    kick: "What I'd change",
    title: "The purchase\ncoded itself.",
    sub: "There was a rule. It was based on who sent the invoice, not what was on it.",
  },
  {
    t: "cards",
    kick: "Topic 1 · example 2",
    title: "Tax strategy consultation",
    sub: "Construction. S-corp. Keeps his own books.",
    a: { h: "Route 1 · safe harbor", lines: "$2,500 an invoice.\nExpense it. No analysis." },
    b: { h: "Route 2 · the test", lines: "Better, different, restored?\nCapitalize. Pick a useful life." },
    tail: "Same invoice. Two routes.",
  },
  {
    t: "statement",
    kick: "Advice 1 · timing",
    title: "Take it in the high year.",
    sub: "One contract. Income spikes, then drops back. A deduction is worth whatever rate you're in.",
  },
  {
    t: "statement",
    kick: "Advice 2 · who keeps it",
    title: "He maintains the schedule.",
    sub: "Capitalize and every item needs a life and a class. No controller. No fixed asset system. Just him.",
  },
  {
    t: "statement",
    kick: "Advice 3 · one set of numbers",
    title: "The books and the return agree.",
    sub: "The election requires book conformity. So there is no book-to-tax difference to carry.",
  },
  {
    t: "statement",
    kick: "What I'd change · Topic 1 close",
    title: "One found after.\nOne decided before.",
    sub: "Classify on purpose, at the source, in writing.",
  },
  {
    t: "statement",
    kick: "Topic 2 · the first ninety days",
    title: "I haven't done\ninternational accounting.",
    sub: "I understand the concepts in theory. I just don't have the reps — yet.",
  },
  {
    t: "list",
    kick: "The study map",
    title: "Four things I'd have to practice.",
    items: [
      { lead: "Currency translation — ASC 830", sub: "And whether it is translation at all, or remeasurement." },
      { lead: "Consolidation and eliminations", sub: "Intercompany, investment, minority interest" },
      {
        lead: "Transfer pricing",
        sub: "Set price charged for goods, services, or intellectual property exchanged between related business entities",
      },
      { lead: "Indirect tax", sub: "Tokyo and Paris" },
    ],
    callout: "My first question isn't how to book it. It's which determination was already made.",
  },
  {
    t: "list",
    kick: "Days 1–30 · Observe",
    title: "Do the job by hand.",
    items: [
      {
        lead: "Walk one full closing cycle manually",
        sub: "Japan's package through translation and eliminations, into the consolidated statements.",
      },
      {
        lead: "Sit through one audit request cycle",
        sub: "Not to fix anything. To see what gets asked for, and of whom.",
      },
      { lead: "Map the NetSuite config", sub: "Entities, currencies, elimination rules, subsidiary hierarchy." },
    ],
    callout: "Slowly, once, by hand. Know the current processes inside and out.",
  },
  {
    t: "list",
    kick: "Days 30–60 · Find the cost",
    title: "Feel where it hurts.",
    items: [
      { lead: "Own real close tasks, under review", sub: "Reconciliations and translation entries that are mine." },
      { lead: "Time the close", sub: "Where do the hours go?" },
      {
        lead: "Trace one PBC item end to end",
        sub: "From the request to the document that satisfies it. How long did finding it take?",
      },
    ],
    callout: "Identify possible KPIs that could be easily automated and reported.",
  },
  {
    t: "list",
    kick: "Days 60–90 · Ship",
    title: "Build the thing that removes it.",
    items: [
      { lead: "My slice of the close, fully owned", sub: "No training wheels." },
      {
        lead: "The first automation live",
        sub: "With a before-and-after number attached — not a claim, a measurement.",
      },
      {
        lead: "Documented well enough to survive me",
        sub: "If it only works while I'm in the room, I built a dependency.",
      },
    ],
  },
  {
    t: "chain",
    kick: "The pattern",
    title: "You've seen this\nplan before.",
    links: [
      { from: "Bench tech", to: "Built the lab system" },
      { from: "Data entry", to: "Built the database" },
      { from: "Your close, by hand", to: "The thing that removes it" },
    ],
    tail: "It isn't a plan I wrote for this interview. It's the only way I've ever worked.",
  },
  {
    t: "chain",
    kick: "The brilliant idea",
    title: "I built it before.\nSubstitute project with audit.",
    sub: "Supporting the audit came up as a pain point.",
    links: [
      { from: "Project", to: "Audit" },
      { from: "Task", to: "PBC item" },
      { from: "Owner", to: "Preparer" },
      { from: "Dependency", to: "Blocker" },
      { from: "Approver", to: "Auditor" },
      { from: "Hours", to: "Time logged" },
    ],
    tail: "Every field already exists. Only the labels change.",
  },
  {
    t: "list",
    kick: "How it works",
    title: "PMify, pointed at the audit.",
    items: [
      { lead: "One item per request", sub: "Owner, due date, status, entity." },
      { lead: "Evidence attaches to the item", sub: "Not to an email thread. The answer lives with the question." },
      {
        lead: "Permissions per entity",
        sub: "US, Japan, France — three statutory audits, three lists, one structure.",
      },
      {
        lead: "A full trail",
        sub: "Who uploaded it, when, and who approved it. In security that's called non-repudiation.",
      },
      { lead: "It rolls forward", sub: "This year's list is next year's starting point." },
    ],
    callout: "The second audit costs less than the first. The third costs less than the second.",
  },
  {
    t: "list",
    kick: "The payoff",
    title: "Measured, not asserted.",
    items: [
      {
        lead: "Fewer round trips per request",
        sub: "Re-requests: how often the auditor has asked more than once. That's the quality number, not speed.",
      },
      { lead: "Hours out of the close, not just moved", sub: "Baseline the first cycle. Compare the second." },
      { lead: "Roll forward rate", sub: "How much of this year's list survives." },
      {
        lead: "Evidence filed once, used three times",
        sub: "Requests satisfied across US, Japan, and France from the same attachment — count the overlap.",
      },
    ],
  },
  {
    t: "statement",
    kick: "Close",
    title: "I perform it.\nThen improve it.",
    sub: "Requested, reviewed, approved, baselined, then implemented. Ninety days: close tasks owned · one automation live · improved audit support. Auditor's skepticism. Builder's toolkit.",
  },
];

if (visuals.length !== 30) throw new Error(`expected 30 visuals, built ${visuals.length}`);

for (let i = 0; i < 30; i++) {
  deck[i] = { ...deck[i], visual: visuals[i] };
}

await copyFile(deckPath, `${deckPath}.pre-final-pptx.bak`);
await writeFile(deckPath, `${JSON.stringify(deck, null, 2)}\n`, "utf8");

console.log(`Updated ${deck.length} slide visuals. Beats, section, sectionTitle untouched.`);
