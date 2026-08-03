// Replaces Topic 1 and Topic 2 with drafts written in the v2 intro's voice:
// short ALL-CAPS kicker, a plain first-person headline, one subline.
// Keeps the 13 intro slides (through the Topic 1 title card) untouched.
import { readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const deckPath = path.join(import.meta.dirname, "..", "app", "vast", "deck.json");
const old = JSON.parse(await readFile(deckPath, "utf8"));
const intro = old.slice(0, 13); // 0–11 intro, 12 = "Capitalize, or expense?" title card

const T1 = "Part 02 — Topic 1";
const E1 = "Example 1 — the audit chair";
const E2 = "Example 2 — the other chair";
const T2 = "Part 03 — Topic 2";
const T2T = "The first ninety days";

const topic1 = [
  // ---------- Example 1 ----------
  {
    section: T1,
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
          "This is from my CDTFA work, so the details are disguised — no names, nothing identifying. But the decision is real, and it's one I make regularly.\n\nAnd I want to start with the thing most people get wrong about a sales tax audit. Everyone assumes we only look at sales. We don't. Every field audit examines what the business bought, too.",
        marks: "Plain and unhurried. You are inviting them somewhere, not performing.",
      },
    ],
  },
  {
    section: T1,
    sectionTitle: E1,
    visual: {
      t: "cards",
      kick: "The requirement",
      title: "Every audit starts by\nsplitting purchases in two.",
      a: { h: "Fixed assets", lines: "Equipment\nMachinery\nImprovements" },
      b: { h: "Expense items", lines: "Repairs\nSupplies\nConsumables" },
      tail: "That split is a capitalization review. I just come at it from the enforcement side.",
    },
    beats: [
      {
        cue: "The requirement — the two piles",
        opener: "Step one of the purchase exam is splitting everything into two piles: fixed assets, and expense items.",
        rest:
          "And I want to name what that actually is, because it took me a while to see it myself.\n\nThat split is a capitalization review. It is the exact question you ask here at Vast — is this an asset, or is this an expense? Same question, same factors. I just come at it from the enforcement side, after the fact, with the invoice in my hand.",
        marks: "Land \"same question\" — this is why the story belongs in this interview at all.",
      },
    ],
  },
  {
    section: T1,
    sectionTitle: E1,
    visual: {
      t: "list",
      kick: "What I did · the find",
      title: "In repairs and maintenance:",
      items: [
        { lead: "A ~$20,000 invoice, coded to R&M", sub: "Repairs and maintenance is where assets go to hide." },
        { lead: "Out-of-state vendor, no tax charged", sub: "Which means use tax — and it was never self-assessed." },
        { lead: "Equipment, freight and installation, one invoice", sub: "A spray booth for an auto body shop." },
        { lead: "Nowhere on the depreciation schedule", sub: "Their own records contradicted each other." },
      ],
    },
    beats: [
      {
        cue: "The find",
        opener: "So I'm going through repairs and maintenance line by line, which is where I always spend my time.",
        rest:
          "R&M is where assets go to hide. Not because people are cheating — because of how bookkeeping actually happens. Something arrives, it sounds like a repair, it gets filed where repairs go.\n\nAnd there it is. About twenty thousand dollars. Out-of-state vendor, so no tax was charged. Equipment, freight, and installation, all on one invoice — a spray booth. Coded to repairs.\n\nAnd it was nowhere on the depreciation schedule.",
        marks: "Slow on the last line. Their own records told on them — let that be obvious without saying it yet.",
      },
    ],
  },
  {
    section: T1,
    sectionTitle: E1,
    visual: {
      t: "list",
      kick: "What I did · the call",
      title: "So: repair, or capital asset?",
      items: [
        { lead: "It added capability — it didn't restore it", sub: "They weren't fixing a booth. They were acquiring one." },
        { lead: "Useful life in years, not months", sub: "This outlives the period it was expensed in." },
        { lead: "Measured at price plus freight plus installation", sub: "Everything required to get it in place and working." },
      ],
      callout: "And their own books already disagreed with the coding — expensed in R&M, missing from the schedule.",
    },
    beats: [
      {
        cue: "The three factors",
        opener: "Now I have a call to make, and I have to be able to defend it — because if it's an asset, it belonged on their books and use tax was due, and never paid.",
        rest:
          "Three factors got me there. It added capability rather than restoring it — they weren't fixing a booth, they were acquiring one. Its useful life is measured in years, not months. And the measure includes freight and installation, because that's what it took to get it in place and working.\n\nAnd then the thing that settled it: their own books already disagreed with themselves. Expensed as a repair, and missing from the depreciation schedule.\n\nTheir own records told on them.",
        marks: "PAUSE after \"told on them.\" Do not add anything to it.",
      },
    ],
  },
  {
    section: T1,
    sectionTitle: E1,
    visual: {
      t: "statement",
      kick: "What I did · the discipline",
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
    section: T1,
    sectionTitle: E1,
    visual: {
      t: "list",
      kick: "How it came out · what I'd change",
      title: "It held. And nobody was cheating.",
      items: [
        { lead: "The classification held at the exit conference", sub: "Walked the owner and their CPA through it. Asset capitalized, use tax accrued." },
        { lead: "Nobody was cheating", sub: "The invoice sounded like a repair vendor, so it went where repair invoices go — and sat there for three years." },
        { lead: "The call got made at data entry", sub: "By default, by the person with the least context, with no rule to follow." },
      ],
      callout: "Which is the actual lesson: that decision belongs at the point of entry, on purpose, under a written policy. Hold that thought.",
    },
    beats: [
      {
        cue: "How it came out",
        opener: "At the exit conference I walked the owner and their CPA through all of it, and the classification held. The asset was capitalized and the use tax was accrued.",
        rest:
          "But here's what I actually took away from it, and it isn't about tax.\n\nNobody was cheating. The invoice sounded like a repair vendor, so it got filed where repair invoices go, and it sat there wrong for three years. Nobody ever revisited it.\n\nThat call was made at data entry, by default, by the person with the least context, with no rule to follow.",
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

  // ---------- Example 2 ----------
  {
    section: T1,
    sectionTitle: E2,
    visual: {
      t: "statement",
      kick: "Example 2 · the other chair",
      title: "The other chair\nwas mine.",
      sub: "Four months of my own time, on a system I built. No consultant invoice — the invoice was me.",
    },
    beats: [
      {
        cue: "The reveal",
        opener: "The second call. Same question — capitalize, or expense. And this time the cost was mine.",
        rest:
          "The other chair was mine.\n\nRemember PMify and Survey Builder, the two things I built on Salesforce at ForensisGroup. That was roughly four months of development. There was no consultant invoice for any of it.\n\nThe invoice was me.",
        marks:
          "PAYOFF of the plant on the Topic 1 title card. Let \"the invoice was me\" sit before you move.",
      },
    ],
  },
  {
    section: T1,
    sectionTitle: E2,
    visual: {
      t: "cards",
      kick: "The requirement · ASC 350-40",
      title: "A subscription is never an asset.\nThe setup might be.",
      a: { h: "Capitalize", lines: "Configuration\nCustomization\nCoding and testing" },
      b: { h: "Expense", lines: "Subscription fees\nTraining\nData conversion" },
      tail: "And internal payroll counts. \"We didn't pay a vendor\" is not an answer.",
    },
    beats: [
      {
        cue: "The rule",
        opener: "So what does the rule actually require? This is ASC 350-40 — cloud computing arrangements, as amended by ASU 2018-15.",
        rest:
          "The subscription fee itself is never an asset. That's rent, you expense it as you consume it.\n\nBut implementation costs split. Configuration, customization, coding and testing can be capitalized. Training and data conversion are expensed regardless of when they happen.\n\nAnd the part that made this my problem: internal payroll counts. \"We didn't pay an outside vendor\" is not an answer. My four months was a real cost, and the question of whether some of it belonged on the balance sheet was a real question.",
      },
    ],
  },
  {
    section: T1,
    sectionTitle: E2,
    visual: {
      t: "statement",
      kick: "What I did",
      title: "Nothing. Nobody asked —\nincluding me.",
      sub: "It ran through payroll and was expensed as incurred. There was no capitalization discussion at the time.",
    },
    beats: [
      {
        cue: "The honest answer",
        opener: "I'm not going to dress this up. What I did at the time was nothing.",
        rest:
          "It ran through payroll and got expensed as incurred. There was no capitalization analysis, no memo, no discussion. Nobody asked.\n\nIncluding me. And I was the one who knew both halves of it.",
        marks:
          "Do not soften this and do not rush past it. The credibility of everything after depends on saying it flat.",
      },
    ],
  },
  {
    section: T1,
    sectionTitle: E2,
    visual: {
      t: "list",
      kick: "How it came out",
      title: "I've since worked it like an auditor.",
      items: [
        { lead: "No contemporaneous time records", sub: "So any capitalizable number now would be a reconstruction, not a measurement." },
        { lead: "The mix was scoping and training heavy", sub: "Both of which are expensed under the standard anyway." },
        { lead: "Immaterial at that scale", sub: "It would not have moved a reader's understanding of the statements." },
      ],
      callout: "Expense was the right answer. But I reached it the wrong way — and a defensible answer without documentation is still an undocumented answer.",
    },
    beats: [
      {
        cue: "The reconstruction",
        opener: "So I went back and worked it the way I'd work someone else's file.",
        rest:
          "There were no contemporaneous time records, which means any number I produce now is a reconstruction, not a measurement. The mix was heavily scoping and training, both of which get expensed anyway. And at that scale it was immaterial — it wouldn't have changed how anyone read the statements.\n\nSo expense was the right answer.",
      },
      {
        cue: "The right answer, wrong way",
        opener: "But I got to the right answer the wrong way.",
        rest:
          "I didn't conclude expense. I defaulted to expense, and then got lucky that the default happened to be correct.\n\nA defensible answer without documentation is still an undocumented answer.",
        marks: "SLOW. This is the line the whole example exists for.",
      },
    ],
  },
  {
    section: T1,
    sectionTitle: E2,
    visual: {
      t: "list",
      kick: "What I'd change",
      title: "Three things, and I'd do them on day one.",
      items: [
        { lead: "Track the hours while it's happening", sub: "Not to force capitalization — to preserve the option. Once the quarter closes, the ability to measure is gone." },
        { lead: "Write the memo even when the answer is \"expense\"", sub: "An hour of work turns a default into a position." },
        { lead: "Know when scale flips the answer", sub: "Same framework, different outcome — your NetSuite and Ramp implementations lived this exact question." },
      ],
      callout: "And the twist people miss: a capitalized cloud implementation cost isn't a fixed asset. It's a prepaid-type asset amortizing into the same operating line as the subscription. Never depreciation.",
    },
    beats: [
      {
        cue: "The three changes",
        opener: "Three things I'd do differently, and none of them are hard.",
        rest:
          "Track the hours while it's happening — not to force capitalization, but to preserve the option, because once the quarter closes the ability to measure it is gone for good.\n\nWrite the memo even when the answer is expense. An hour of work turns a default into a position.\n\nAnd know when scale flips the answer. Same framework, different outcome — and I'd guess your NetSuite and Ramp implementations lived this exact question at a size where it mattered.",
      },
      {
        cue: "The twist",
        opener: "And one technical thing that catches people, since we're on it.",
        rest:
          "A capitalized cloud implementation cost isn't a fixed asset. It doesn't go to PP&E and it never gets depreciated. It's a prepaid-type asset that amortizes into the same operating expense line as the subscription itself.\n\nSo it's a capitalization question that never produces a fixed asset.",
        marks: "Deliver as a genuine aside, not a flex. If it reads as showing off it costs you.",
      },
    ],
  },
  {
    section: T1,
    sectionTitle: "Topic 1 close",
    visual: {
      t: "statement",
      kick: "Topic 1 close",
      title: "Both calls got made\nby whoever was closest.",
      sub: "One by a bookkeeper with no rule. One by me, with every rule — and still no memo.",
    },
    beats: [
      {
        cue: "Two chairs, one failure mode",
        opener: "Two calls, two chairs, and the same failure underneath both of them.",
        rest:
          "In the first one, a bookkeeper made a capitalization decision by default, because nobody had given them a threshold to check against.\n\nIn the second one, I made a capitalization decision by default — and I knew the standard. I just didn't write anything down.\n\nBoth calls got made by whoever happened to be closest to the transaction, with nothing to follow.",
      },
      {
        cue: "Through-line, pass 2",
        opener: "Which is the pattern I told you I'd come back to.",
        rest:
          "I did the job by hand. I felt exactly where it hurt.\n\nSo let me tell you what I'd build.",
        marks:
          "THROUGH-LINE pass 2 of 3. This is the hinge into Topic 2 — do not pause after \"what I'd build.\"",
      },
    ],
  },
];

const topic2 = [
  {
    section: T2,
    sectionTitle: T2T,
    visual: {
      t: "statement",
      kick: "Topic 2",
      title: "The first\nninety days.",
      sub: "Learn the job honestly. Contribute like a builder.",
    },
    beats: [
      {
        cue: "Topic 2 setup",
        opener: "Topic two. My first ninety days.",
        rest:
          "This is a learning plan and a contribution plan at the same time, and I want to be straight with you about which parts are which.",
      },
    ],
  },
  {
    section: T2,
    sectionTitle: T2T,
    visual: {
      t: "statement",
      kick: "Said plainly",
      title: "I haven't done\ninternational accounting.",
      sub: "I understand the concepts in theory. I just don't have the reps — yet.",
    },
    beats: [
      {
        cue: "Own the gap",
        opener: "So let me say the obvious part out loud, because you already know it. I haven't done international accounting.",
        rest:
          "What I do have is the standards. FAR tested consolidation and currency translation — ASC 830, intercompany eliminations, the CTA running through OCI instead of income. I understand the concepts in theory.\n\nWhat I don't have is the reps.",
        marks: "PAUSE. Full stop. Do not rush to reassure them — the silence is the confidence.",
      },
      {
        cue: "But you've watched me do this",
        opener: "But you've just watched me do this four times.",
        rest:
          "I hadn't done data architecture, and I wrote the VBA and moved it into a real database. I hadn't done Salesforce, and six months later I was the department. I hadn't done accounting at all, and I went and got a third bachelor's degree and passed four CPA exams.\n\nI don't wait until I'm qualified. I go get qualified, and I do it while the work is happening.\n\nSo here's the ninety days.",
        marks: "This is the whole intro cashing in. Confident, not defensive. You're stating a record, not arguing.",
      },
    ],
  },
  {
    section: T2,
    sectionTitle: T2T,
    visual: {
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
    beats: [
      {
        cue: "The terrain",
        opener: "The terrain has four problems in it, and I already know their names.",
        rest:
          "Currency translation under ASC 830 — Japan's yen and France's euro into dollars, with the translation adjustment running through OCI rather than income. Consolidation and eliminations — intercompany, investment, minority interest. Transfer pricing — documentation that has to survive both Section 482 and a foreign authority looking at the same transaction from the other side.\n\nAnd indirect tax. VAT and Japanese Consumption Tax. Which is the one I'd argue I already do — that is the same discipline as California sales and use tax, and I run it every day.",
        marks: "Say the fourth one with a little more weight. It's the one place you're already an expert.",
      },
    ],
  },
  {
    section: T2,
    sectionTitle: T2T,
    visual: {
      t: "list",
      kick: "Days 1–30",
      title: "Do the job by hand.",
      items: [
        { lead: "Walk one full close manually", sub: "Follow Japan's reporting package through translation and eliminations into the consolidated statements. Once, by hand." },
        { lead: "Sit with whoever does it now", sub: "Not to review it. To learn it from the person who actually knows where it breaks." },
        { lead: "Map how OneWorld is configured", sub: "Entities, currencies, elimination rules — what the system does versus what a human does after it." },
      ],
    },
    beats: [
      {
        cue: "Month one — by hand",
        opener: "Month one: do the job by hand.",
        rest:
          "I want to follow one close all the way through manually. Take Japan's reporting package, walk it through translation and eliminations, and land it in the consolidated statements — once, by hand, slowly.\n\nNot because that's efficient. Because that's the only way I've ever actually learned anything. And I want to sit with whoever does it today, not to review their work, but to find out where it breaks.\n\nAnd I'll map how OneWorld is configured — what the system does automatically, versus what a person quietly fixes afterward.",
        marks: "You are deliberately echoing slide 7. Do not point at it — they'll feel it.",
      },
    ],
  },
  {
    section: T2,
    sectionTitle: T2T,
    visual: {
      t: "list",
      kick: "Days 30–60",
      title: "Feel where it hurts.",
      items: [
        { lead: "Own real close tasks, under review", sub: "Reconciliations and translation entries that are mine — checked by someone senior until they don't need to be." },
        { lead: "Time the close", sub: "Where do the hours actually go? Nobody knows, because nobody has ever written it down." },
        { lead: "Pick one automation with the controller", sub: "Highest pain, lowest risk. Their call, not mine." },
      ],
    },
    beats: [
      {
        cue: "Month two — where it hurts",
        opener: "Month two: feel where it hurts.",
        rest:
          "By now I should be carrying real close tasks — reconciliations, translation entries — mine, under review by someone senior until that review stops being necessary.\n\nAnd while I'm in there, I'm timing it. Where do the hours actually go? Most teams can't answer that, not because they're careless, but because nobody has ever had a reason to write it down.\n\nThen I pick one automation with the controller. Highest pain, lowest risk. That's their call, not mine — I'm new.",
      },
    ],
  },
  {
    section: T2,
    sectionTitle: T2T,
    visual: {
      t: "list",
      kick: "Days 60–90",
      title: "Build the thing that removes it.",
      items: [
        { lead: "My slice of the close, fully owned", sub: "No training wheels." },
        { lead: "The first automation live", sub: "With a before-and-after number attached to it." },
        { lead: "Both documented well enough to survive me", sub: "If it only works while I'm in the room, I haven't finished." },
      ],
    },
    beats: [
      {
        cue: "Month three — build it",
        opener: "Month three: build the thing that removes it.",
        rest:
          "My slice of the close is fully mine by then, no training wheels. The first automation is live, with a before-and-after number attached — not a claim, a measurement.\n\nAnd both are documented well enough to survive me. If it only works while I'm in the room, I haven't actually finished it.",
      },
    ],
  },
  {
    section: T2,
    sectionTitle: T2T,
    visual: {
      t: "chain",
      kick: "The pattern",
      title: "You've seen this plan before.",
      links: [
        { from: "Bench tech", to: "Built the lab system" },
        { from: "Data entry", to: "Built the database" },
        { from: "Your close, by hand", to: "The thing that removes it" },
      ],
      tail: "It isn't a plan I wrote for this interview. It's the only way I've ever worked.",
    },
    beats: [
      {
        cue: "Through-line, pass 3",
        opener: "And I want to point at something, because I promised I would.",
        rest:
          "This is the same plan I've run my entire career. I did the bench work, then I built the lab system. I did the data entry, then I built the database.\n\nSo: I do your close by hand, I find out exactly where it hurts, and then I build the thing that takes it away.\n\nThat isn't a plan I wrote for this interview. It's just the only way I've ever worked.",
        marks:
          "THROUGH-LINE pass 3 of 3 — the payoff of slide 7. Slow, and let the third row of the diagram sit before you speak over it.",
      },
    ],
  },
  {
    section: T2,
    sectionTitle: T2T,
    visual: {
      t: "statement",
      kick: "The brilliant idea",
      title: "Instrument\nthe close.",
      sub: "Treat books-to-reports like a pipeline: measure where the hours go, then remove one manual step every month.",
    },
    beats: [
      {
        cue: "The idea",
        opener: "Which brings me to the one idea I was asked to bring. Instrument the close.",
        rest:
          "Treat books-to-reports like a pipeline. Measure where the hours actually go, then remove exactly one manual step every month — small builds, each one shipped with a before-and-after number.\n\nMost closes never get faster. Not because anyone is bad at their job, but because nobody owns the word \"faster.\" Everyone owns their piece, and their piece works.\n\nI'm offering to own faster.",
        marks: "PAUSE before \"I'm offering to own faster.\" That's the sentence you want them repeating later.",
      },
    ],
  },
  {
    section: T2,
    sectionTitle: T2T,
    visual: {
      t: "list",
      kick: "The first three builds",
      title: "And I'd start with these.",
      items: [
        { lead: "1 · The close clock", sub: "Instrument it before touching it. You cannot remove a step you haven't measured — and this needs no domain expertise, so I can build it in month one." },
        { lead: "2 · A package pre-check", sub: "Automated completeness and tie-out checks on subsidiary packages, run before a human ever opens them." },
        { lead: "3 · Point-of-entry classification rules", sub: "Remember the spray booth. Cleaner books upstream is a faster close downstream." },
      ],
      callout: "Measure it, stop the rework, then stop the error. In that order.",
    },
    beats: [
      {
        cue: "Three builds",
        opener: "Three builds, in a deliberate order.",
        rest:
          "First, the close clock — instrument it before I touch anything. You can't remove a step you haven't measured, and this one needs no international accounting knowledge at all, which is exactly why it's first. I can build it while I'm still learning.\n\nSecond, a package pre-check. Automated completeness and tie-out checks on the subsidiary packages, run before a human ever opens them. Stop the rework.\n\nThird — and this is the one I planted twenty minutes ago — point-of-entry classification rules.",
      },
    ],
  },
  {
    section: T2,
    sectionTitle: T2T,
    visual: {
      t: "flow",
      kick: "Build 3 · point of entry",
      title: "A rules layer in front of NetSuite.",
      tail: "Remember the spray booth. This is the thing that would have caught it on day one.",
    },
    beats: [
      {
        cue: "The spray booth, prevented",
        opener: "This is the spray booth, solved at the front instead of found at the back.",
        rest:
          "A transaction hits Ramp. Rules and categorization run on it immediately. Routine and below threshold, it auto-codes as an expense. Above threshold, it routes to a short capex review queue instead of being coded by whoever is closest. A cloud or SaaS vendor gets flagged for the capitalize-versus-expense split we just talked about.\n\nThen the approved coding syncs to NetSuite.\n\nThe flag happens the moment the invoice lands — not three weeks later at close, and not three years later with me sitting across the table.",
        marks: "The last clause is the callback. Say it dry — it's funnier and sharper if you don't lean on it.",
      },
    ],
  },
  {
    section: T2,
    sectionTitle: T2T,
    visual: {
      t: "statement",
      kick: "Further out",
      title: "And when the auditors\nget bigger.",
      sub: "I'd go get the Certified Internal Auditor — so I'm already that person before the audit shows up, not during it.",
    },
    beats: [
      {
        cue: "The CIA — further out",
        opener: "One thing beyond ninety days, because Vast is going to keep scaling and the audit gets bigger with it.",
        rest:
          "At some point the external audit stops being a formality. Somebody on the inside has to already speak that language — to know what they're going to ask for before they ask, and to have it ready.\n\nI'd go get the Certified Internal Auditor for that. Not because the role requires it. Because I'd rather be that person before the audit shows up than during it.\n\nAnd I want to be honest about the timeline — that's three parts and about a year. It is not a ninety-day promise.",
        marks: "The honesty about the timeline is doing real work here. Do not skip it to sound more impressive.",
      },
    ],
  },
  {
    section: T2,
    sectionTitle: T2T,
    visual: {
      t: "list",
      kick: "The pitch",
      title: "So — in ninety days.",
      items: [
        { lead: "My close tasks owned", sub: "Not shadowed. Owned." },
        { lead: "One automation live, with numbers", sub: "Measured, not claimed." },
        { lead: "And a close that gets a step faster every month after that", sub: "Because somebody finally owns faster." },
      ],
    },
    beats: [
      {
        cue: "The pitch",
        opener: "So, in ninety days: my close tasks owned — not shadowed, owned.",
        rest:
          "One automation live, with a real number attached to it.\n\nAnd a close that gets a step faster every month after that, because somebody finally owns faster.",
      },
    ],
  },
  {
    section: T2,
    sectionTitle: "Close",
    visual: {
      t: "statement",
      kick: "Close",
      title: "I was the guy\nentering the data.",
      sub: "Then I built the system. I'd like to do that here.",
    },
    beats: [
      {
        cue: "The close",
        opener: "I started by telling you I was the guy entering the data.",
        rest:
          "Every job since, I did the work by hand first, found out where it hurt, and then built the thing that took it away. The lab system. The database. The payment sync. The audit chair.\n\nI'd like to do that here.",
        marks:
          "Full circle to slide 3. Land it, then STOP. Do not add a summary sentence — let the silence be the ending.",
      },
      {
        cue: "Hand off to questions",
        opener: "Thank you. I'd love your questions.",
        rest: "",
      },
    ],
  },
];

const next = [...intro, ...topic1, ...topic2];
await copyFile(deckPath, `${deckPath}.pre-topics.bak`);
await writeFile(deckPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
console.log(`intro: ${intro.length}  topic1: ${topic1.length}  topic2: ${topic2.length}`);
console.log(`total slides: ${next.length}`);
