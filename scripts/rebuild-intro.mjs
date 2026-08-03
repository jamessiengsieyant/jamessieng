// One-off: replace Part 01 in deck.json with the v2 intro narrative,
// keeping the existing Topic 1 / Topic 2 slides untouched.
import { readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const deckPath = path.join(import.meta.dirname, "..", "app", "vast", "deck.json");
const old = JSON.parse(await readFile(deckPath, "utf8"));

const SEC = "Part 01 — ~10 min";
const TITLE = "Introduction — how I got here";

const intro = [
  {
    section: SEC,
    sectionTitle: TITLE,
    visual: { t: "title" },
    beats: [
      {
        cue: "Title card — silence",
        opener: "",
        rest: "",
        marks:
          "Say nothing here. This is up while you are being introduced and getting settled. Do not talk over your own title card.",
      },
    ],
  },
  {
    section: SEC,
    sectionTitle: TITLE,
    visual: {
      t: "cards",
      kick: "Before we start",
      title: "None of this\nis accounting.",
      a: {
        h: "UC Irvine",
        lines: "B.S. Biomedical Engineering\nB.A. Business Economics",
      },
      b: {
        h: "Certifications",
        lines:
          "7× Salesforce Certified · AWS CCP\nCompTIA A+, Network+, Security+\nISC2 — CISSP exam passed",
      },
      tail: "Let me tell you why it's all the same job.",
    },
    beats: [
      {
        cue: "Name the objection",
        opener: "Before I get into anything, I want to name the obvious thing about my resume.",
        rest:
          "I have a degree in biomedical engineering. I have seven Salesforce certifications and I passed the CISSP exam.\n\nNone of that is accounting.",
        marks: "PAUSE — two beats. Hands still. Let the objection land before you answer it.",
      },
      {
        cue: "But I double majored",
        opener: "But I also double majored. Business economics, same four years.",
        rest:
          "And that major had accounting classes in it, which at nineteen I did not think much about at all.\n\nSo the honest version is: I picked both halves of this job when I was nineteen. Engineering, which is how you build the system. And economics, which is what's moving through it. Then I spent about a decade finding out why.\n\nLet me walk you through that decade.",
      },
    ],
  },
  {
    section: SEC,
    sectionTitle: TITLE,
    visual: {
      t: "statement",
      kick: "Where it started",
      title: "I was the guy\nentering the data.",
      sub: "Lab tech. Bench work. Somebody else's software.",
    },
    beats: [
      {
        cue: "Lab tech — the unglamorous part",
        opener: "My first job out of school was as a lab tech.",
        rest:
          "And I'll be honest about that job, because it matters later — it was not the interesting part. I did bench work. Collected samples, ran assays, and typed numbers into somebody else's software.\n\nI was the guy entering the data.\n\nHold onto that. Almost everything I've done since comes back to it.",
        marks: "Plant. Say \"I was the guy entering the data\" plainly — no emphasis. It pays off on the CDTFA slide.",
      },
    ],
  },
  {
    section: SEC,
    sectionTitle: TITLE,
    visual: {
      t: "chain",
      kick: "Amgen",
      title: "Then I touched Excel.",
      sub: "Years of historical preclinical data — toxicology and pharmacology.",
      links: [
        { from: "Excel", to: "VBA" },
        { from: "VBA", to: "Relational database" },
      ],
      tail: "Data that had a shape — and a shape that was enforced.",
    },
    beats: [
      {
        cue: "The spreadsheet problem",
        opener: "Then I got to Amgen, and the actual work turned out to be Excel.",
        rest:
          "They had years of historical preclinical data — drug toxicology and pharmacology studies — sitting in spreadsheets. And a spreadsheet will let you type anything into any cell. Nothing enforces that the number in the box is the right kind of number, or that it belongs to the study you think it belongs to.\n\nSo I wrote VBA to pull all of it out and move it into a relational database. Where the data had a shape, and the shape was enforced.",
      },
      {
        cue: "What I actually liked",
        opener: "That's the first time I understood what I actually liked. It wasn't the science.",
        rest: "It was that the data was in the wrong shape, and somebody had to fix that.",
        marks:
          "Do NOT say this is what Vast is going through. Let it sit. Cash it in during Topic 2.",
      },
    ],
  },
  {
    section: SEC,
    sectionTitle: TITLE,
    visual: {
      t: "statement",
      kick: "The CRO",
      title: "Nobody plans to become\na Salesforce admin.",
      sub: "Contract research organization — sample collection and processing. I volunteered once. Six months later I was the department.",
    },
    beats: [
      {
        cue: "Accidental admin",
        opener: "Next was a CRO — a contract research organization. We collected and processed samples for other people's studies.",
        rest:
          "They ran on Salesforce and they needed somebody to administer it. I raised my hand, mostly out of curiosity.\n\nThat's how you become a Salesforce admin, by the way. Nobody applies for it. You volunteer once, and six months later you are the department.",
        marks:
          "FIRST LAUGH. Say it flat and dry — do not sell it. Then hold. Do not walk on the laugh.",
      },
    ],
  },
  {
    section: SEC,
    sectionTitle: TITLE,
    visual: {
      t: "list",
      kick: "The build",
      title: "I built the system I used to hate using.",
      items: [
        {
          lead: "LIMS — laboratory information management, on Salesforce",
          sub: "Sample intake · chain of custody · what has been run on what",
        },
        {
          lead: "I'd used the big ones as a tech",
          sub: "They're built for the person signing the purchase order — not the person at the bench with a sample in one hand and a barcode gun in the other.",
        },
      ],
      callout: "And I could only build it because I'd been the one using it.",
    },
    beats: [
      {
        cue: "The LIMS",
        opener: "The main thing I built there was a LIMS — laboratory information management system.",
        rest:
          "Sample intake, chain of custody, where every sample is, what's been run on it.\n\nHere's the part that matters. I had already used LIMS systems — at Amgen, in the lab, as a tech. I knew exactly what they felt like from the entry side. And the big ones are built for the person who signs the purchase order, not for the person standing at the bench with a sample in one hand and a barcode gun in the other.\n\nSo I built the simplified version that fit how the work actually happened.",
      },
      {
        cue: "The line",
        opener: "I built the system I used to hate using.",
        rest: "And I could only do that because I had been the one using it.",
        marks:
          "PAUSE after the first line. This is one of the two lines carrying the whole section.",
      },
    ],
  },
  {
    section: SEC,
    sectionTitle: TITLE,
    visual: {
      t: "chain",
      kick: "The pattern",
      title: "I keep automating\nthe job I just did.",
      links: [
        { from: "Bench tech", to: "Built the lab system" },
        { from: "Data entry", to: "Built the database" },
      ],
      tail: "Do the job by hand first. Feel where it hurts. Then build the thing that removes it.",
    },
    beats: [
      {
        cue: "The through-line",
        opener: "If you've been keeping score, there's a pattern here, and I didn't notice it for years.",
        rest:
          "I did the bench work, then I built the lab system. I did the data entry, then I built the database.\n\nEvery time, the sequence is identical. Do the job by hand first. Feel exactly where it hurts. Then build the thing that takes it away.\n\nI'm going to come back to this at the very end, when I tell you what I'd do in my first ninety days here. Because that plan isn't a theory I came up with for this interview.\n\nIt's just the only way I've ever worked.",
        marks: "THROUGH-LINE, pass 1 of 3. Returns at the end of Topic 1, and again at the close.",
      },
    ],
  },
  {
    section: SEC,
    sectionTitle: TITLE,
    visual: {
      t: "list",
      kick: "ForensisGroup",
      title: "Same move. Bigger.",
      items: [
        { lead: "PMify", sub: "Project management for a live practice" },
        { lead: "Survey Builder", sub: "Custom survey platform, written in Apex" },
        { lead: "QuickBooks ↔ Salesforce", sub: "Automated AR/AP payment sync" },
      ],
      callout: "The last one is the one that changed everything.",
    },
    beats: [
      {
        cue: "Three builds",
        opener: "Then ForensisGroup — an expert witness referral firm that ran its whole practice on Salesforce. Same move, bigger scale.",
        rest:
          "I built PMify, project management for live cases. Survey Builder, a custom survey platform in Apex. And an automated AR/AP payment sync between Salesforce and QuickBooks.",
      },
      {
        cue: "Accounting plumbing",
        opener: "That last one changed my life and I had no idea at the time.",
        rest:
          "Because to build it, I had to learn what actually happens to a payment. Not the button — the entry. What gets debited, what gets credited, when it's recognized, and what breaks downstream in the books if I get any of it wrong.\n\nI was building accounting plumbing.\n\nAnd somewhere in there I noticed I cared more about what was moving through the pipe than about the pipe.",
        marks: "Slow down on \"than about the pipe.\" That's the turn of the whole talk.",
      },
    ],
  },
  {
    section: SEC,
    sectionTitle: TITLE,
    visual: {
      t: "statement",
      kick: "The pivot",
      title: "I wanted a skill\nI could use on anybody.",
      sub: "Everyone has a return. Everyone has books. I came for the practical part — I stayed for the puzzle.",
    },
    beats: [
      {
        cue: "Why accounting — the real reason",
        opener: "So — why accounting. I'll give you the real reason, and it's less romantic than it sounds.",
        rest:
          "I wanted a skill I could use on anybody.\n\nBiomedical engineering, I can help you if you're building a device. Salesforce, I can help you if you run Salesforce. Both of those come with conditions attached — you have to already be a certain kind of person before I'm any use to you.\n\nEverybody files a return. Every business has books. So I went for the most practical version of that I could find.",
      },
      {
        cue: "Then I got curious",
        opener: "And then I started studying for the CPA exams, and something happened that I didn't plan on.",
        rest:
          "I got curious.\n\nNot about the rules — about the shape of them. Why is it written this way. What was somebody trying to prevent when they drafted this. Who got burned before this existed.\n\nI came for the practical part. I stayed because it turned out to be the most interesting rule system I've ever taken apart.",
        marks:
          "PAUSE two full beats before \"I got curious\" — longer than comfortable. RATE: say the cert list fast, say \"I got curious\" slow. The change IS the emphasis.",
      },
    ],
  },
  {
    section: SEC,
    sectionTitle: TITLE,
    visual: {
      t: "list",
      kick: "The rulebook",
      title: "So I went and got it.",
      items: [
        { lead: "WGU — B.S. Accounting, 2024", sub: "My third bachelor's degree." },
        {
          lead: "Enrolled Agent — admitted to practice before the IRS",
          sub: "Business returns through Form 1120. Trial balance to Schedule L, book-to-tax on the M-1.",
        },
        { lead: "CPA — all four exams passed", sub: "Completing the experience requirement." },
      ],
      callout: "Nobody needs a CISSP to reconcile a bank account. I sat for it anyway.",
    },
    beats: [
      {
        cue: "The credentials",
        opener: "So I went and got the rulebook.",
        rest:
          "Bachelor's in accounting from WGU, 2024. Enrolled Agent — admitted to practice before the IRS. I prepare business returns up through Form 1120, which means I read small-business books for a living. Trial balance to Schedule L, book-to-tax on the M-1. Books to returns is my normal commute.\n\nAnd all four CPA exams passed. I'm finishing the experience requirement now.",
      },
      {
        cue: "Two exams, two waiting rooms",
        opener: "Full disclosure on this slide, though. That accounting degree is my third bachelor's.",
        rest:
          "And I passed the CISSP exam — which, same as the CPA, I don't get to put after my name until somebody endorses the experience.\n\nSo I'm currently sitting on two exams and two waiting rooms.\n\nNobody needs a CISSP to reconcile a bank account. I sat for it anyway.",
        marks:
          "SECOND LAUGH. Deadpan. No smile until after they react. Never say \"I love learning\" — the slide makes the point for you.",
      },
    ],
  },
  {
    section: SEC,
    sectionTitle: TITLE,
    visual: {
      t: "statement",
      kick: "CDTFA",
      title: "Now I'm the one\nasking to see it.",
      sub: "Sales & use tax auditor, State of California — capital purchases · use tax · audit procedure.",
    },
    beats: [
      {
        cue: "The audit chair",
        opener: "Which brings me to now. I'm a sales and use tax auditor for the State of California.",
        rest:
          "The work is what it sounds like. I go into a business, I pull their records, and I test them. Capital equipment purchases are a standing part of what I test. So is use tax — which is the tax almost nobody self-reports correctly.",
      },
      {
        cue: "The payoff",
        opener: "Here's the part I didn't expect about this job.",
        rest:
          "I spent about a decade building the systems that produce these records. So now I open somebody's QuickBooks, or their ERP, and I can usually tell how an entry got made. Who made it. What screen they were looking at. Whether anyone ever looked at it again.\n\nI know what it looks like from the inside, because I used to build the inside.",
        marks:
          "PAUSE — do not rush this. The section has walked ten minutes to get here. This is the payoff of slide 2: \"none of this is accounting\" — turns out all of it was.",
      },
    ],
  },
  {
    section: SEC,
    sectionTitle: TITLE,
    visual: {
      t: "statement",
      kick: "For fun",
      title: "I sing.\nI play guitar.",
      sub: "Sometimes both at the same time.",
    },
    beats: [
      {
        cue: "Music — constraints are the point",
        opener: "Last thing before I get into the topics. Outside of work I sing, and I play guitar. Sometimes both at the same time.",
        rest:
          "And there's a reason I didn't skip this slide. Music is the only other thing I do where the constraints are the entire point. There's a key. There's a time signature. Nobody has ever written a better song by deciding those didn't apply to them. The structure isn't in the way of the interesting part — the structure is what makes the interesting part possible.\n\nThat's more or less how I feel about accounting rules. Which I recognize is a strange sentence to say out loud.\n\nSo let's talk about one.",
        marks: "PAUSE before \"So let's talk about one.\" That's the transition into Topic 1 — no dead air after it.",
      },
    ],
  },
  {
    section: "Part 02 — Topic 1",
    sectionTitle: "Capitalize, or expense?",
    visual: {
      t: "list",
      kick: "Topic 1",
      title: "Capitalize, or expense?",
      items: [
        { lead: "The requirement", sub: "What the rule actually asked for" },
        { lead: "What I did", sub: "My own contribution, specifically" },
        { lead: "How it came out", sub: "The result, and whether it held" },
        { lead: "What I'd change", sub: "Lessons — said honestly" },
      ],
      callout: "Two calls. One from the audit chair. One from the other chair.",
    },
    beats: [
      {
        cue: "Topic 1 setup",
        opener: "Topic one. Capitalize, or expense.",
        rest:
          "I'm going to walk you through two calls I've made. For each one I'll give you the same four things: what the requirement actually was, what I personally did about it, how it came out, and what I'd do differently.\n\nThe first call I made from the audit chair. Somebody else's books, and I was the one asking the questions.\n\nThe second one I made from the other chair.\n\nSame question, both times. They did not feel remotely the same.",
        marks:
          "\"The other chair\" stays vague. Do not clarify, do not gesture, do not smile knowingly. You're planting something you won't pay off for ten minutes.",
      },
    ],
  },
];

// keep everything from the old deck that isn't Part 01 or the old Topic 1 title card
const kept = old.filter(
  (s) => !s.section.startsWith("Part 01") && s.sectionTitle !== "The spray booth in the repairs account"
);
const sprayBooth = old.filter((s) => s.sectionTitle === "The spray booth in the repairs account");
// drop the old "Capitalize or expense?" opener — the new slide 13 replaces it
const sprayBoothBody = sprayBooth.filter(
  (s) => !(s.visual.t === "statement" && String(s.visual.title).includes("Capitalize"))
);

const next = [...intro, ...sprayBoothBody, ...kept];

await copyFile(deckPath, `${deckPath}.pre-v2.bak`);
await writeFile(deckPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
console.log(`intro slides: ${intro.length}`);
console.log(`carried over: ${sprayBoothBody.length + kept.length}`);
console.log(`total: ${next.length}`);
