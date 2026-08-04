// Adopts James's v4 intro — slides AND speaker notes — as the source of truth.
//
// v4 (Downloads) is where his rewrite lives: v3 carried the slide edits but its
// notes were byte-identical to the generated ones. Taking v4 into deck.json
// rather than merging PowerPoint files means the website, the script page and
// every future build carry it too, instead of it being overwritten next time.
//
// His bracketed cues become `marks`, so they render on /vast/script for
// rehearsal and stay out of the PPTX that gets emailed to the panel.
import { readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const deckPath = path.join(import.meta.dirname, "..", "app", "vast", "deck.json");
const deck = JSON.parse(await readFile(deckPath, "utf8"));

const SEC = "Part 01 — ~10 min";
const TITLE = "Introduction — how I got here";
const S = (visual, beats) => ({ section: SEC, sectionTitle: TITLE, visual, beats });

const intro = [
  S({ t: "title" }, [
    {
      cue: "Title card — silence",
      opener: "",
      rest: "",
      marks:
        "Say nothing here. This is up while you're being introduced and getting settled. Do not talk over your own title card.",
    },
  ]),

  S(
    {
      t: "cards",
      kick: "Before we start",
      title: "None of this\nis accounting.",
      a: { h: "UC Irvine", lines: "B.S. Biomedical Engineering\nB.A. Business Economics" },
      b: {
        h: "Certifications",
        lines:
          "7× Salesforce Certified (Advanced Admin)\n3x CompTIA Certified (A+, Network+, Security+)\nAWS Certified Cloud Practitioner\nISC2 Certified in Cybersecurity and CISSP exam passed",
      },
      tail: "That's the whole strategy. There wasn't one.",
    },
    [
      {
        cue: "Name the obvious",
        opener: "Before I get into anything, I want to point out the obvious here.",
        rest:
          "A biomedical engineering degree from UC Irvine. Seven Salesforce certifications. A passed CISSP exam — among other things.\n\nNone of that is accounting.",
        marks: "PAUSE — two beats. Hands still. Let them agree with the objection.",
      },
      {
        cue: "There wasn't a strategy",
        opener: "I also double majored — business economics, same four years.",
        rest:
          "Which, it turns out, had accounting classes in it. I couldn't have told you at the time why that mattered.\n\nAnd I'll be honest about how those got picked. Biomedical engineering was my high school counselor's idea. Business economics I picked because it looked interesting.\n\nThat's the whole strategy. There wasn't one.\n\nI liked the math. Most of the rest I just got through. Nothing in school ever really grabbed me.\n\nThat happened at a job.",
        marks:
          "PAUSE before \"That happened at a job.\" That line is the hinge into slide 3 — don't hurry it.",
      },
    ]
  ),

  S(
    {
      t: "statement",
      kick: "Where it started",
      title: "Not the typing.\nThe spreadsheet.",
      sub: "Lab tech. Mostly testing. About an hour a day in Excel.",
    },
    [
      {
        cue: "The hour I liked",
        opener: "My first job out of school was as a lab tech. Mostly testing.",
        rest:
          "Maybe an hour a day was entering results and running reports.\n\nThat hour was the part I liked. Not the typing — the spreadsheet. The validations, the formulas, what happened to the number after I put it in.\n\nI was already trying to automate my own job. I didn't know that was something you could do for a living.",
        marks: "Last line lands better dry than wry. Don't push it.",
      },
    ]
  ),

  S(
    {
      t: "chain",
      kick: "Amgen",
      title: "They brought me in\nfor one project.",
      sub: "Years of historical preclinical data — never structured the same way twice.",
      links: [
        { from: "Excel", to: "VBA" },
        { from: "VBA", to: "Relational database" },
      ],
      tail: "Data that had a shape — and a shape that was enforced.",
    },
    [
      {
        cue: "How Amgen happened",
        opener: "Somewhere in there I got good at Excel. Not impressively — just genuinely useful. Enough that people started bringing me things.",
        rest:
          "And that's what got me to Amgen. They brought me in as a contractor for one project. Years of historical preclinical data — drug toxicology, pharmacology, real-time measurement — and they needed it out of spreadsheets and into a real database.\n\nIt is still the largest volume of data I have ever worked with.",
      },
      {
        cue: "What made it hard",
        opener: "And what made it hard wasn't the volume.",
        rest:
          "No two of those spreadsheets were structured the same way. Same study type, same measurements, completely different layouts — because different people collected it, over years, and every one of them had their own way of doing it. There was no standard, so everybody invented one.\n\nSo the program couldn't just move data. It had to account for all of that variation. Read what somebody meant, not just what they typed, and land it in the same place every time.\n\nThat's the first time I understood what I actually liked. It wasn't the science.\n\nIt was that the data was in the wrong shape. And nobody had done anything wrong — a lot of reasonable people had each just done it slightly differently.",
        marks:
          "Do NOT say this is what Vast is going through. Let it sit. It gets cashed in during Topic 2.",
      },
    ]
  ),

  S(
    {
      t: "statement",
      kick: "The CRO",
      title: "Nobody plans to become\na Salesforce admin.",
      sub: "Contract research organization — sample collection and processing. I volunteered once. Six months later I was the department.",
    },
    [
      {
        cue: "Accidental admin",
        opener: "Next was a CRO — a contract research organization.",
        rest:
          "We collected and processed samples for other people's studies. They ran on Salesforce and they needed somebody to administer it. I raised my hand, mostly out of curiosity.",
        marks:
          "The slide says \"six months later I was the department.\" Let them read it — don't say it, and don't sell the joke.",
      },
    ]
  ),

  S(
    {
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
    [
      {
        cue: "The LIMS",
        opener: "The main thing I built there was a LIMS — laboratory information management system.",
        rest:
          "Sample intake, chain of custody, where every sample is, what's been run on it.",
        marks: "The callout is the line. Let the slide say it — then pause before moving on.",
      },
    ]
  ),

  S(
    {
      t: "chain",
      kick: "The pattern",
      title: "I keep automating\nthe job I just did.",
      links: [
        { from: "Bench tech", to: "Built the lab system" },
        { from: "Data entry", to: "Built the database" },
      ],
      tail: "Do the job by hand first. Feel exactly where it hurts. Then build the thing that takes it away.",
    },
    [
      {
        cue: "The through-line",
        opener: "There's a pattern here, and I didn't notice it for years.",
        rest:
          "I did the bench work, then I built the lab system. I did the data entry, then I built the database.\n\nEvery time, the sequence is identical. Do the job by hand first. Feel exactly where it hurts. Then build the thing that mitigates the pain point.",
        marks:
          "THROUGH-LINE, pass 1 of 3. Do NOT point forward to the 90-day plan — it gets paid off there, looking backward.",
      },
    ]
  ),

  S(
    {
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
    [
      {
        cue: "Three builds",
        opener: "Then ForensisGroup — an expert witness referral firm that ran its whole practice on Salesforce.",
        rest:
          "Same move, bigger scale. I built PMify, project management for live cases. Survey Builder, a custom survey platform in Apex. And an automated AR/AP payment sync between Salesforce and QuickBooks.",
      },
    ]
  ),

  S(
    {
      t: "statement",
      kick: "The pivot",
      title: "I wanted a skill\nI could use on anybody.",
      sub: "I wanted to be doing the work, not reading about it.",
    },
    [
      {
        cue: "Why accounting — and the detour",
        opener: "So — why accounting. The real reason.",
        rest:
          "I wanted a skill I could use on anybody. So I went and got the accounting degree at WGU.\n\nThen I bought the CPA study materials, started in — and stopped. I went and passed the three Enrolled Agent exams first instead.\n\nThat was on purpose. The CPA is the longer road. The EA is the one that gets you hired to prepare returns. I wanted to be doing the work, not reading about it. So I took the detour, got admitted to practice before the IRS, and started preparing returns while I finished the rest.\n\nThen all four CPA exams. I'm planning to sit for the CIA next.",
      },
      {
        cue: "Say the tenure thing out loud",
        opener: "I'll be direct about why I did it this way.",
        rest:
          "I don't have twenty years in accounting, and I'm not going to stand up here and imply I do. What I have is that I went and took every piece of it, deliberately, while working full time.",
        marks: "Even and unhurried. This is a statement of fact, not a defence.",
      },
    ]
  ),

  S(
    {
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
      callout: "Books to returns is my normal commute.",
    },
    [
      {
        cue: "The credentials",
        opener: "So I went and got the rulebook.",
        rest:
          "Bachelor's in accounting from WGU in 2024 — my third bachelor's degree. All four CPA exams passed, finishing the experience requirement now.\n\nAnd Enrolled Agent. Admitted to practice before the IRS, which means I prepare business returns up through Form 1120. Trial balance to Schedule L, book-to-tax on the M-1.\n\nBooks to returns is my normal commute.",
        marks:
          "CISSP stays on slide 2 only — do not talk about it here. The security material lands in Part 3.",
      },
    ]
  ),

  S(
    {
      t: "statement",
      kick: "CDTFA",
      title: "Now I'm the one\nasking to see it.",
      sub: "Sales & use tax auditor, State of California — capital purchases · use tax · audit procedure.",
    },
    [
      {
        cue: "The audit chair",
        opener: "Which brings me to now. I'm a sales and use tax auditor for the State of California.",
        rest:
          "The work is what it sounds like. I go into a business, I pull their records, and I test them. Capital equipment purchases are a standing part of what I test. So is use tax — which is the tax almost nobody self-reports correctly.",
      },
    ]
  ),

  S(
    {
      t: "statement",
      kick: "For fun",
      title: "I sing.\nI play guitar.",
      sub: "Sometimes both at the same time.",
    },
    [
      {
        cue: "Music — constraints are the point",
        opener: "Last thing before I get into the topics. Outside of work I sing, and I play guitar. Sometimes both at the same time.",
        rest:
          "And there's a reason I didn't skip this slide. Music is the only other thing I do where the constraints are the entire point. There's a key. There's a time signature. Nobody has ever written a better song by deciding those didn't apply to them. The structure isn't in the way of the interesting part — the structure is what makes the interesting part possible.",
        marks: "Go straight into the Topic 1 card from here. No dead air.",
      },
    ]
  ),
];

const rest = deck.filter((s) => !s.section.startsWith("Part 01"));
const next = [...intro, ...rest];

await copyFile(deckPath, `${deckPath}.pre-v4intro.bak`);
await writeFile(deckPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
console.log(`intro: ${intro.length} slides, ${intro.reduce((n, s) => n + s.beats.length, 0)} beats`);
console.log(`total: ${next.length}`);
