// Rebuilds the deck to exactly 30 slides with exactly one beat each, in three
// blocks of ten: intro 1-10, Topic 1 11-20 (five slides per example), Topic 2
// 21-30. One beat per slide means the slide itself is the only cue — there is
// never a second thing to remember on the same picture.
//
// Merges, not deletions: the CRO and the LIMS build were one story told twice;
// the pivot and the rulebook were both "why accounting, and what I went and
// got"; Topic 2's title card, the CIA beat (already said in the intro) and the
// standalone pitch slide were folded into their neighbours. The three-signals
// slide is gone because the flow diagram already draws the three checks.
import { readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const deckPath = path.join(import.meta.dirname, "..", "app", "vast", "deck.json");
await copyFile(deckPath, `${deckPath}.pre-30.bak`);

const P1 = { section: "Part 01 — ~10 min", sectionTitle: "Introduction — how I got here" };
const P2A = { section: "Part 02 — Topic 1", sectionTitle: "Example 1 — the audit chair" };
const P2B = { section: "Part 02 — Topic 1", sectionTitle: "Example 2 — the other chair" };
const P3 = { section: "Part 03 — Topic 2", sectionTitle: "The first ninety days" };

const S = (p, visual, cue, opener, rest, marks) => ({
  ...p,
  visual,
  beats: [{ cue, opener, rest, ...(marks ? { marks } : {}) }],
});

const deck = [
  // ───────────────────────── INTRO · 1–10 ─────────────────────────
  S(P1, { t: "title" },
    "Title card — silence", "", "",
    "Say nothing here. This is up while you're being introduced and getting settled. Do not talk over your own title card."),

  S(P1, {
    t: "cards",
    kick: "Before we start",
    title: "None of this\nis accounting.",
    a: { h: "UC Irvine", lines: "B.S. Biomedical Engineering\nB.A. Business Economics" },
    b: { h: "Certifications", lines: "7× Salesforce Certified (Advanced Admin)\n3x CompTIA Certified (A+, Network+, Security+)\nAWS Certified Cloud Practitioner\nISC2 Certified in Cybersecurity and CISSP exam passed" },
    tail: "That's the whole strategy. There wasn't one.",
  },
    "Name the obvious",
    "Before I get into anything, I want to point out the obvious here.",
    "A biomedical engineering degree from UC Irvine. Seven Salesforce certifications. A passed CISSP exam — among other things.\n\nNone of that is accounting.\n\nI also double majored — business economics, same four years. Which, it turns out, had accounting classes in it. I couldn't have told you at the time why that mattered.\n\nAnd I'll be honest about how those got picked. Biomedical engineering was my high school counselor's idea. Business economics I picked because it looked interesting. That's the whole strategy. There wasn't one.\n\nI liked the math. Most of the rest I just got through. Nothing in school ever really grabbed me.\n\nThat happened at a job.",
    "PAUSE two beats after \"None of that is accounting\" — hands still, let them agree with the objection. PAUSE again before \"That happened at a job.\""),

  S(P1, {
    t: "statement",
    kick: "Where it started",
    title: "Not the typing.\nThe spreadsheet.",
    sub: "Lab tech. Mostly testing. About an hour a day in Excel.",
  },
    "The hour I liked",
    "My first job out of school was as a lab tech. Mostly testing.",
    "Maybe an hour a day was entering results and running reports.\n\nThat hour was the part I liked. Not the typing — the spreadsheet. The validations, the formulas, what happened to the number after I put it in.\n\nI was already trying to automate my own job. I didn't know that was something you could do for a living.",
    "Last line lands better dry than wry. Don't push it."),

  S(P1, {
    t: "chain",
    kick: "Amgen",
    title: "They brought me in\nfor one project.",
    sub: "Years of historical preclinical data — never structured the same way twice.",
    links: [{ from: "Excel", to: "VBA" }, { from: "VBA", to: "Relational database" }],
    tail: "Data that had a shape — and a shape that was enforced.",
  },
    "The wrong shape",
    "Somewhere in there I got good at Excel. Not impressively — just genuinely useful. Enough that people started bringing me things.",
    "And that's what got me to Amgen. They brought me in as a contractor for one project. Years of historical preclinical data — drug toxicology, pharmacology, real-time measurement — out of spreadsheets and into a real database. It is still the largest volume of data I have ever worked with.\n\nAnd what made it hard wasn't the volume. No two of those spreadsheets were structured the same way. Same study, same measurements, completely different layouts — different people collected it over years, and every one of them had their own way of doing it. There was no standard, so everybody invented one.\n\nSo the program couldn't just move data. It had to read what somebody meant, not just what they typed, and land it in the same place every time.\n\nThat's the first time I understood what I actually liked. It wasn't the science. It was that the data was in the wrong shape — and nobody had done anything wrong. A lot of reasonable people had each just done it slightly differently.",
    "Do NOT say this is what Vast is going through. Let it sit. It gets cashed in during Topic 2."),

  S(P1, {
    t: "list",
    kick: "The CRO",
    title: "I built the system I used to hate using.",
    items: [
      { lead: "I volunteered to administer their Salesforce", sub: "Six months later I was the department." },
      { lead: "LIMS — laboratory information management", sub: "Sample intake · chain of custody · what has been run on what" },
      { lead: "I'd used the big ones as a tech", sub: "They're built for the person signing the purchase order — not the person at the bench with a sample in one hand and a barcode gun in the other." },
    ],
    callout: "And I could only build it because I'd been the one using it.",
  },
    "The accidental admin, and the build",
    "Next was a CRO — a contract research organization. We collected and processed samples for other people's studies.",
    "They ran on Salesforce and needed somebody to administer it. I raised my hand, mostly out of curiosity.\n\nThe main thing I built there was a LIMS — laboratory information management system. Sample intake, chain of custody, where every sample is, what's been run on it.",
    "The slide says \"six months later I was the department\" — let them read it, don't say it. Then let the callout land before moving on."),

  S(P1, {
    t: "chain",
    kick: "The pattern",
    title: "I keep automating\nthe job I just did.",
    links: [
      { from: "Bench tech", to: "Built the lab system" },
      { from: "Data entry", to: "Built the database" },
    ],
    tail: "Do the job by hand first. Feel exactly where it hurts. Then build the thing that takes it away.",
  },
    "The through-line",
    "There's a pattern here, and I didn't notice it for years.",
    "I did the bench work, then I built the lab system. I did the data entry, then I built the database.\n\nEvery time, the sequence is identical. Do the job by hand first. Feel exactly where it hurts. Then build the thing that mitigates the pain point.",
    "THROUGH-LINE, pass 1 of 3. Do NOT point forward to the 90-day plan — it gets paid off there, looking backward."),

  S(P1, {
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
    "Three builds",
    "Then ForensisGroup — an expert witness referral firm that ran its whole practice on Salesforce.",
    "Same move, bigger scale. I built PMify, project management for live cases. Survey Builder, a custom survey platform in Apex. And an automated AR/AP payment sync between Salesforce and QuickBooks.\n\nThat last one changed my life and I had no idea at the time. To build it I had to learn what actually happens to a payment. Not the button — the entry. What gets debited, what gets credited, and what breaks downstream if I get it wrong.\n\nI was building accounting plumbing. And somewhere in there I noticed I cared more about what was moving through the pipe than about the pipe.",
    "Slow down on \"than about the pipe.\" That's the turn of the whole talk."),

  S(P1, {
    t: "list",
    kick: "The pivot",
    title: "I wanted a skill I could use on anybody.",
    items: [
      { lead: "WGU — B.S. Accounting, 2024", sub: "My third bachelor's degree." },
      { lead: "Enrolled Agent — admitted to practice before the IRS", sub: "Business returns through Form 1120. Trial balance to Schedule L, book-to-tax on the M-1." },
      { lead: "CPA — all four exams passed", sub: "Completing the experience requirement." },
    ],
    callout: "Books to returns is my normal commute.",
  },
    "Why accounting, and the detour",
    "So — why accounting. The real reason. I wanted a skill I could use on anybody.",
    "So I went and got the accounting degree at WGU. My third bachelor's.\n\nThen I bought the CPA study materials, started in — and stopped. I went and passed the three Enrolled Agent exams first instead.\n\nThat was on purpose. The CPA is the longer road. The EA is the one that gets you hired to prepare returns. I wanted to be doing the work, not reading about it. So I took the detour, got admitted to practice before the IRS, and started preparing returns while I finished the rest. Books to returns is my normal commute.\n\nThen all four CPA exams. I'm planning to sit for the CIA next.\n\nAnd I'll be direct about why I did it this way. I don't have twenty years in accounting, and I'm not going to stand up here and imply I do. What I have is that I went and took every piece of it, deliberately, while working full time.",
    "Last paragraph even and unhurried. It's a statement of fact, not a defence. CISSP stays on slide 2 — don't mention it here."),

  S(P1, {
    t: "statement",
    kick: "CDTFA",
    title: "Now I'm the one\nasking to see it.",
    sub: "Sales & use tax auditor, State of California — capital purchases · use tax · audit procedure.",
  },
    "The audit chair",
    "Which brings me to now. I'm a sales and use tax auditor for the State of California.",
    "The work is what it sounds like. I go into a business, I pull their records, and I test them. Capital equipment purchases are a standing part of what I test. So is use tax — which is the tax almost nobody self-reports correctly.\n\nAnd here's the part I didn't expect. I spent a decade building the systems that produce these records. So now I open somebody's books and I can usually tell how an entry got made. Who made it. What screen they were looking at. Whether anyone ever looked at it again.",
    "PAUSE before the last paragraph. This is the payoff of slide 2 — \"none of this is accounting\" turns out to be all of it."),

  S(P1, {
    t: "statement",
    kick: "For fun",
    title: "I sing.\nI play guitar.",
    sub: "Sometimes both at the same time.",
  },
    "Music — constraints are the point",
    "Last thing before the topics. Outside of work I sing, and I play guitar. Sometimes both at the same time.",
    "And there's a reason I didn't skip this slide. Music is the only other thing I do where the constraints are the entire point. There's a key. There's a time signature. Nobody has ever written a better song by deciding those didn't apply to them.\n\nThe structure isn't in the way of the interesting part. The structure is what makes the interesting part possible.",
    "Go straight into Example 1 from here. No dead air."),

  // ─────────────────── TOPIC 1 · EXAMPLE 1 · 11–15 ───────────────────
  S(P2A, {
    t: "statement",
    kick: "Topic 1 · example 1",
    title: "It came in from\nthe repair guy.",
    sub: "A field audit. Details disguised.",
  },
    "The find",
    "Topic one. Capitalize, or expense. Two calls — and for each one: what the rule wanted, what I did, how it came out, what I'd change.",
    "Quick thing first so it isn't sitting there. I've never kept a fixed asset subledger. What I've done is make this call from the return, from the audit, and on my own clients' books. The judgment I have. The posting is the part I'd learn.\n\nFirst one's from a field audit, details disguised. People think a sales tax audit only looks at sales. It doesn't — we test what you bought too.\n\nSo I'm working the repairs and maintenance ledger. One vendor keeps showing up. Small amounts, a few hundred at a time. Compressor service, filter changes, booth maintenance. All consistent with the account.\n\nThen one entry from that same vendor is twenty thousand dollars. Out-of-state, no tax charged. Equipment, freight, and installation on one invoice.\n\nIt's a spray booth. They bought the booth from the company that services their booths.",
    "Say the bookkeeping line evenly and move — you're sizing it, not apologising. Slow on the last line."),

  S(P2A, {
    t: "cards",
    kick: "What the rule wanted",
    title: "Two rules.\nOne invoice.",
    a: { h: "Use tax measure", lines: "Purchase price.\nInstallation labor is\nexcluded — Reg 1546." },
    b: { h: "Book basis · ASC 360", lines: "Price plus freight\nplus installation —\nwhatever it took to\nget it working." },
    tail: "Same invoice, two different numbers. The rules are asking different questions.",
  },
    "Two rules, one invoice",
    "And this is the part of the job I actually like. That one invoice gets measured twice, two different ways.",
    "For my purposes, the use tax measure starts with the purchase price. But installation labor is excluded under Regulation 1546.\n\nFor their books, under ASC 360, it's the opposite instruction. Freight and installation go into the asset's basis, because basis is whatever it took to get it in place and working.\n\nSame invoice. Two different numbers. Not because anyone's wrong — mine is asking what was purchased for use in California. Theirs is asking what the asset cost.",
    "This is your credibility slide with the technical interviewer. Unhurried, and don't apologise for the detail."),

  S(P2A, {
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
    "What I actually decided",
    "Now, what did I actually decide? It's narrower than you'd think, and I want to be precise about it.",
    "The use tax didn't depend on the classification. Out-of-state tangible property, used in California, no tax paid to the vendor — use tax is due. Repair or asset, that doesn't move.\n\nBut the classification was wrong, and I raised it anyway, because it was their books. It added capability. They weren't fixing a booth, they were buying one. It lasts years. And it was expensed to repairs and never appeared on the depreciation schedule.\n\nOne more thing, and hold me to this. That same vendor's other invoices were real repairs. I left every one of them alone. If it only ever goes one way, it isn't judgment.",
    "Say the repairs line plainly. The restraint is the point."),

  S(P2A, {
    t: "statement",
    kick: "How it came out",
    title: "It held.",
    sub: "And nobody was cheating.",
  },
    "How it came out",
    "At the exit conference I walked the owner and their CPA through both pieces — what they owed, and separately, what their books had wrong. It held.",
    "And nobody was cheating. That's the part I keep coming back to.\n\nThe invoice sounded like a repair, so it went where repair invoices go, and it sat there for three years. Nobody ever revisited it.",
    "Don't play this as a win. The next slide is why it matters."),

  S(P2A, {
    t: "statement",
    kick: "What I'd change",
    title: "The bill\ncoded itself.",
    sub: "There was a rule. It was keyed on who sent the invoice, not what was on it.",
  },
    "The vendor default",
    "Here's how it actually happened. That vendor was set up in their books with a default account, and the default was repairs and maintenance — because for years, that's all that vendor had ever sent them.",
    "The bill came in, it coded itself, and nobody overrode it.\n\nSo there was a rule. It was just keyed on who sent the invoice instead of what was on it.\n\nAnd that's why it sat for three years. Additions to the depreciation schedule get reviewed — by their CPA, by their lender, by me. Costs buried in repairs don't get reviewed by anyone. The coding didn't create the liability. It hid it.\n\nSo that's what I'd change. Not the audit. The rule that coded it. Hold onto that.",
    "\"Keyed on who sent the invoice instead of what was on it\" is the setup for the brilliant idea. Land it."),

  // ─────────────────── TOPIC 1 · EXAMPLE 2 · 16–20 ───────────────────
  S(P2B, {
    t: "statement",
    kick: "Topic 1 · example 2",
    title: "He asked me about\nan S-corp.",
    sub: "A construction client. Fixer-uppers. He'd just landed a contract bigger than anything he'd done.",
  },
    "The question behind the question",
    "Second one. Different chair. Nobody's books were on trial this time — somebody just asked me a question.",
    "Construction client of mine. Does fixer-uppers. He'd landed a contract bigger than anything he'd handled, and he wanted to know if he should elect S-corp.\n\nAnd the honest answer wasn't about the election at all.",
    "This is the slide that shows you advise on books. Don't rush it."),

  S(P2B, {
    t: "list",
    kick: "What the rule wanted",
    title: "The election wasn't the expensive part.",
    items: [
      { lead: "Schedule L and M-1 once receipts or assets cross $250,000" },
      { lead: "A real balance sheet, and a book-to-tax reconciliation" },
      { lead: "Which means his books have to actually tie" },
    ],
    callout: "He was running a checkbook and a folder of receipts.",
  },
    "The cost of the election",
    "It was about what the election was going to cost him.",
    "Once his receipts or his assets cross two hundred fifty thousand, he's filing a Schedule L and an M-1. That's a real balance sheet, and a reconciliation between his books and his return.\n\nWhich means his books have to actually tie.\n\nHe was running a checkbook and a folder of receipts. That's a different business than the one he was asking about."),

  S(P2B, {
    t: "list",
    kick: "What I did",
    title: "Then he started buying equipment.",
    items: [
      { lead: "Better, different, or brought back? Any one — capitalize" },
      { lead: "Or the safe harbor: $2,500 an invoice, no analysis" },
      { lead: "But only with a written policy, in place before the year starts" },
    ],
  },
    "My call now",
    "Then the equipment started coming. And now the call is mine, because I'm the one signing the return.",
    "Same test as the spray booth, different rulebook. Did it make the thing better, change what it does, or bring it back from broken? Any one of those and you capitalize it. None of them and it's a repair.\n\nThere's also a shortcut. The de minimis safe harbor lets you expense anything under twenty-five hundred an invoice and skip the analysis entirely.\n\nBut it has a condition. You need a written accounting policy, and it has to be in place before the tax year starts."),

  S(P2B, {
    t: "statement",
    kick: "How it came out",
    title: "Nobody had\nwritten it down.",
    sub: "So we capitalized things he could have deducted the day he bought them.",
  },
    "The honest part",
    "He didn't have one. So we couldn't use it.",
    "We capitalized a pile of small stuff that could have been deducted the day he bought it. Not because the rule said so — because nobody had written one paragraph the previous December.\n\nAnd I'll own my part of that. He'd been my client the year before. I never told him to write it.",
    "Flat. Don't soften it."),

  S(P2B, {
    t: "statement",
    kick: "What I'd change · Topic 1 close",
    title: "One had the wrong rule.\nOne had none.",
    sub: "Classify on purpose, at the source, in writing. That's not my opinion — that's the regulation.",
  },
    "The close",
    "So here's the lesson, and it's the same one both times. You don't get to decide at the end of the year and justify it backwards. The policy has to exist before the transaction does.",
    "Classify on purpose, at the source, in writing. That's not my opinion. That's the regulation.\n\nTwo calls. The first one had a rule — it was just keyed on the vendor instead of the invoice. The second one had no rule at all, because nobody wrote it. Including me.\n\nI picked those two on purpose. I could have shown you two wins.\n\nI did the job by hand, and I know exactly where it hurts. So let me tell you what I'd build.",
    "THROUGH-LINE, pass 2. Straight into Topic 2 — no pause at the end."),

  // ───────────────────────── TOPIC 2 · 21–30 ─────────────────────────
  S(P3, {
    t: "statement",
    kick: "Topic 2 · the first ninety days",
    title: "I haven't done\ninternational accounting.",
    sub: "I understand the concepts in theory. I just don't have the reps — yet.",
  },
    "Own the gap",
    "Topic two. My first ninety days. And let me say the obvious part out loud, because you already know it. I haven't done international accounting.",
    "What I do have is the standards. FAR tested consolidation and currency translation — ASC 830, intercompany eliminations, the CTA running through OCI instead of income. I understand the concepts in theory. What I don't have is the reps.\n\nBut you've just watched me do this four times. I hadn't done data architecture, and I wrote the thing that moved it into a real database. I hadn't done Salesforce, and six months later I was the department. I hadn't done accounting at all, and I went and got a third bachelor's and passed four CPA exams.\n\nI don't wait until I'm qualified. I go get qualified, and I do it while the work is happening.",
    "PAUSE after \"reps.\" Full stop. Don't rush to reassure — the silence is the confidence."),

  S(P3, {
    t: "list",
    kick: "The study map",
    title: "Four problems, and I know their names.",
    items: [
      { lead: "Currency translation · ASC 830", sub: "JPY and EUR into USD — and the CTA runs through OCI, not the income statement." },
      { lead: "Consolidation and eliminations", sub: "Intercompany, investment, minority interest — in OneWorld or by hand." },
      { lead: "Transfer pricing", sub: "Arm's-length documentation that survives Section 482 and a foreign authority's review." },
      { lead: "Indirect tax — VAT and Consumption Tax", sub: "Which is the discipline I already run daily on California sales and use tax." },
    ],
  },
    "The terrain",
    "The terrain has four problems in it, and I already know their names.",
    "Currency translation under ASC 830 — yen and euro into dollars, with the translation adjustment running through OCI rather than income. Consolidation and eliminations. Transfer pricing — documentation that has to survive both Section 482 and a foreign authority looking at the same transaction from the other side.\n\nAnd indirect tax. VAT and Japanese Consumption Tax. Which is the one I'd argue I already do — a reverse charge and California use tax are the same mechanism under different names. The seller doesn't collect, so the buyer self-assesses. I test that every working day.",
    "Say the fourth one with a little more weight. It's the one place you're transferring, not learning."),

  S(P3, {
    t: "list",
    kick: "Days 1–30",
    title: "Do the job by hand.",
    items: [
      { lead: "Walk one full close manually", sub: "Follow Japan's package through translation and eliminations into the consolidated statements. Once, by hand." },
      { lead: "Sit with whoever does it now", sub: "Not to review it. To find out where it breaks." },
      { lead: "Map how OneWorld is configured", sub: "What the system does, versus what a person quietly fixes afterward." },
    ],
  },
    "Month one",
    "Month one: do the job by hand.",
    "I want to follow one close all the way through manually. Take Japan's reporting package, walk it through translation and eliminations, and land it in the consolidated statements. Once, by hand, slowly.\n\nNot because that's efficient. Because that's the only way I've ever actually learned anything.\n\nAnd I'll map how OneWorld is configured — what the system does automatically, versus what a person quietly fixes afterward.",
    "You're deliberately echoing slide 6. Don't point at it — they'll feel it."),

  S(P3, {
    t: "list",
    kick: "Days 30–60",
    title: "Feel where it hurts.",
    items: [
      { lead: "Own real close tasks, under review", sub: "Reconciliations and translation entries that are mine — checked until they don't need to be." },
      { lead: "Time the close", sub: "Where do the hours actually go? Nobody knows, because nobody has had a reason to write it down." },
      { lead: "Pick one automation with the controller", sub: "Highest pain, lowest risk. Their call, not mine." },
    ],
  },
    "Month two",
    "Month two: feel where it hurts.",
    "By now I should be carrying real close tasks — reconciliations, translation entries — mine, under review by someone senior until that review stops being necessary.\n\nAnd while I'm in there, I'm timing it. Where do the hours actually go? Most teams can't answer that, not because they're careless, but because nobody has ever had a reason to write it down.\n\nThen I pick one automation with the controller. Highest pain, lowest risk. That's their call, not mine — I'm new."),

  S(P3, {
    t: "list",
    kick: "Days 60–90",
    title: "Build the thing that removes it.",
    items: [
      { lead: "My slice of the close, fully owned", sub: "No training wheels." },
      { lead: "The first automation live", sub: "With a before-and-after number attached." },
      { lead: "Both documented well enough to survive me", sub: "If it only works while I'm in the room, I haven't finished." },
    ],
  },
    "Month three",
    "Month three: build the thing that removes it.",
    "My slice of the close is fully mine by then, no training wheels. The first automation is live, with a before-and-after number attached — not a claim, a measurement.\n\nAnd both documented well enough to survive me. If it only works while I'm in the room, I haven't actually finished it."),

  S(P3, {
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
    "Through-line, pass 3",
    "And I want to point at something.",
    "This is the same plan I've run my entire career. I did the bench work, then I built the lab system. I did the data entry, then I built the database.\n\nSo: I do your close by hand, I find out exactly where it hurts, and then I build the thing that takes it away.\n\nThat isn't a plan I wrote for this interview. It's the only way I've ever worked.",
    "THROUGH-LINE, pass 3 of 3 — the payoff of slide 6. Let the third row of the diagram sit before you speak over it."),

  S(P3, {
    t: "statement",
    kick: "The brilliant idea",
    title: "Don't let it\ncode itself.",
    sub: "AI categorization is a control. Nobody tests it.",
  },
    "The idea",
    "So here's the one idea I was asked to bring. And it comes straight out of that spray booth.",
    "Ramp categorizes with AI. Most companies switch that on and treat it as a productivity feature.\n\nBut it isn't a feature. It's a control. Something is deciding what account a transaction lands in, thousands of times a month, and nothing is testing whether it was right.\n\nIf I walked into a business and asked what their detective control is over automated coding, most of them wouldn't have an answer.\n\nSo I'd build one.",
    "\"It's a control\" is the sentence. Slow there. You audit the output of these systems — say it like someone who's seen it fail."),

  S(P3, {
    t: "flow",
    kick: "How it works",
    title: "Three signals. One invoice.",
    tail: "The flag happens the moment the invoice lands — not three weeks later at close, and not three years later with me sitting across the table.",
  },
    "The disagreement rule",
    "Here's how it would have caught my spray booth, the day it landed.",
    "Three independent signals read the same invoice. The vendor default says repair, because that's what that vendor always sends. The amount says this is about fifty times that vendor's own median. The line items say equipment, freight, and installation.\n\nTwo of the three disagree with the default.\n\nAnd that's the rule. You don't flag on any single signal — you flag when they disagree. Because the failure in my audit wasn't a bad rule. It was one rule, with nothing to check it against.\n\nIf they agree, it posts and nobody's day gets slower. If they disagree, it routes to a short review queue while somebody still remembers what it was for.",
    "Let them make the Topic 1 connection before you spell it out. Say the last clause dry."),

  S(P3, {
    t: "list",
    kick: "What would make it fail",
    title: "And I'd rather say it than have you find it.",
    items: [
      { lead: "A new vendor has no history", sub: "So there's no median to compare against. The first few invoices from anyone always route to review." },
      { lead: "Too few invoices to have a baseline", sub: "Below about five, the statistic is noise. Fall back to a flat threshold instead of pretending." },
      { lead: "Flagging everything is worse than flagging nothing", sub: "A queue nobody works is a control that only looks like one. Tie the threshold to performance materiality." },
      { lead: "It has to cut both ways", sub: "It should catch things wrongly capitalized too. Same discipline as the repairs I left alone." },
    ],
  },
    "Failure modes",
    "And here's what would make it fail, because I'd rather say it than have you find it.",
    "A new vendor has no history, so there's nothing to compare against — those always go to review until there's a baseline. Below about five invoices the statistic is just noise, so it falls back to a flat threshold rather than pretending to know something.\n\nOne technical note. It compares against the median, not the average, because an average gets wrecked by exactly the outlier you're hunting for. One big purchase last year and the average stops flagging anything.\n\nAnd the real risk isn't statistical, it's human. If it flags two hundred things a month everybody ignores it, and now you have something worse than no control — because people believe something is watching. So the threshold ties to materiality.\n\nAnd it has to catch things wrongly capitalized too, not just wrongly expensed. Same discipline as the repairs I left alone.",
    "This is the credibility slide. Naming the failure modes yourself is worth more than the idea. Unhurried."),

  S(P3, {
    t: "statement",
    kick: "Close",
    title: "I was the guy\nentering the data.",
    sub: "Then I built the system. I'd like to do that here.",
  },
    "The close",
    "I started by telling you I was the guy entering the data.",
    "Every job since, I did the work by hand first, found out where it hurt, and then built the thing that took it away. The lab system. The database. The payment sync. The audit chair.\n\nSo in ninety days: my close tasks owned. One automation live, with a real number on it. And a close that gets a step faster every month after that — because most closes never get faster, and it's not that anyone's bad at their job. Everybody owns their piece, their piece works, and nobody owns \"faster.\"\n\nI'm offering to own faster.\n\nThank you — I'd love your questions.",
    "PAUSE before \"I'm offering to own faster.\" Then land it, and STOP. Don't add a summary sentence."),
];

if (deck.length !== 30) throw new Error(`Expected 30 slides, built ${deck.length}`);
const multi = deck.filter((s) => s.beats.length !== 1);
if (multi.length) throw new Error(`${multi.length} slides do not have exactly one beat`);

await writeFile(deckPath, `${JSON.stringify(deck, null, 2)}\n`, "utf8");

const count = (pred) => {
  const set = deck.filter(pred);
  const w = set.reduce(
    (n, s) => n + s.beats.reduce((m, b) => m + (b.opener + " " + b.rest).split(/\s+/).filter(Boolean).length, 0),
    0
  );
  return { slides: set.length, words: w };
};
const i = count((s) => s.section.startsWith("Part 01"));
const t1 = count((s) => s.section.startsWith("Part 02"));
const t2 = count((s) => s.section.startsWith("Part 03"));
const total = i.words + t1.words + t2.words;

console.log(`Intro    slides  1–${i.slides}   ${String(i.words).padStart(4)} words`);
console.log(`Topic 1  slides 11–20   ${String(t1.words).padStart(4)} words  (${t1.slides} slides)`);
console.log(`Topic 2  slides 21–30   ${String(t2.words).padStart(4)} words  (${t2.slides} slides)`);
console.log(`TOTAL    30 slides, 30 beats, ${total} words`);
console.log(`spoken:  ${(total / 130).toFixed(1)} min at 130wpm · ${(total / 150).toFixed(1)} min at 150wpm`);
