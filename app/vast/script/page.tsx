"use client";

import { useState } from "react";

type Beat = { cue: string; opener: string; rest: string };
type Section = { kicker: string; title: string; beats: Beat[] };

const SECTIONS: Section[] = [
  {
    kicker: "Part 01 — ~10 min",
    title: "Introduction",
    beats: [
      {
        cue: "The hook",
        opener: "Two ways to read a balance sheet.",
        rest:
          "As the auditor asking “prove it” — or as the person building the system that has to prove itself. I've spent my career doing both. Sometimes in the same week.",
      },
      {
        cue: "Present — the day job",
        opener: "By day, I'm a sales and use tax auditor for the State of California.",
        rest:
          "CDTFA — the Department of Tax and Fee Administration. I go into businesses' books and test whether transactions were taxed correctly under California law — including capital equipment purchases, which is a direct line into the first topic today.\n\nOutside of that, I'm the founder of Sieyant, a tax preparation software business.",
      },
      {
        cue: "Past — how I got here",
        opener: "Two degrees from UC Irvine — Biomedical Engineering and Business Economics.",
        rest:
          "2010 to 2014. Then a Bachelor's in Accounting from Western Governors University in 2024. I've passed all four CPA exams and I'm completing the experience requirement now, along with the Enrolled Agent credential — admitted to practice before the IRS.\n\nAlong the way I picked up Salesforce and QuickBooks certifications, and I did systems work for ForensisGroup, a forensic and expert-witness accounting firm — built out their Salesforce platform and AI tooling: a project management system, a custom survey platform written in Apex, a QuickBooks-to-Salesforce AP/AR sync, and a lab information system with an asset-tracking module.",
      },
      {
        cue: "Future — why Vast",
        opener: "Every role I've had comes down to one skill.",
        rest:
          "Translating between a rigid system of rules — tax code, GAAP, a chart of accounts — and the messy reality of a fast-moving business. That's exactly the seam Vast is scaling through right now.",
      },
      {
        cue: "For fun",
        opener: "I write and record music — guitar and vocals.",
        rest:
          "Building an album is a lot like building an accounting system: structured constraints where the interesting work happens.",
      },
    ],
  },
  {
    kicker: "Part 02 — Topic 1 · Example 1",
    title: "The spray booth in the repairs account",
    beats: [
      {
        cue: "Setup — inside an audit",
        opener: "For my first example, I want to take you inside an actual audit.",
        rest:
          "This is from my current work at CDTFA — I've disguised the details, so no names, and some specifics are changed. But the decision is real, and it's the kind of decision I make on a regular basis.",
      },
      {
        cue: "The purchases exam",
        opener: "People assume a sales tax audit only looks at sales. It doesn't.",
        rest:
          "A standard part of every field audit is examining purchases. And the very first thing you do with purchases is split them into two piles: fixed assets, and expense items. That split matters because the tax treatment follows from it — and here's the thing I want you to catch: that split is a capitalization review. Same question you'd ask at Vast. Is this an asset, or is this an expense? I just come at it from the enforcement side.",
      },
      {
        cue: "The find",
        opener: "Auto body shop. I'm going through repairs and maintenance, line by line.",
        rest:
          "The reason it's standard procedure to look there is that R&M is where assets go to hide. Not because people are cheating — because of how bookkeeping actually happens, which I'll come back to.\n\nAnd in this R&M account, there's an invoice for about twenty thousand dollars. Out-of-state vendor. No tax charged on the invoice. And it's for a spray booth — the equipment itself, the freight, and the installation, all on one invoice.\n\nCoded to repairs and maintenance. And when I pull the depreciation schedule — it's not there.",
      },
      {
        cue: "The decision — three factors",
        opener: "So now I have a decision to make, and I have to be able to defend it.",
        rest:
          "Is this a repair — expense it, done — or is this a capital asset? Because if it's a capital asset, two things are true: it should have been capitalized on their books, and use tax is due on the purchase, self-assessed — and it never was.\n\nFirst — did this restore something that broke, or add capability the shop didn't have? It added capability. This wasn't fixing a booth; it was acquiring one. Second — useful life. A spray booth lasts years, not months. Third — and this is my favorite part — the taxpayer's own books contradicted themselves. Expensed in R&M, but absent from the depreciation schedule they already maintained for other equipment. Their own records told on them.",
      },
      {
        cue: "The measure",
        opener: "I classified it as a capital asset and computed the measure.",
        rest:
          "That's the full purchase price plus freight plus installation — because those costs are part of putting the asset in service. Same principle as GAAP, by the way: under ASC 360, freight and installation go into basis. Tax and book agree on that one. And I scheduled the assessment.",
      },
      {
        cue: "It cuts both ways",
        opener: "But that same account had real repair invoices in it — and I did not assess those.",
        rest:
          "Compressor service. Filter replacements. Routine maintenance. I looked at every one and left them alone, because they're genuinely expenses. If the call only ever goes one direction, it's not judgment, it's a shakedown. A defensible position has to cut both ways.",
      },
      {
        cue: "Result",
        opener: "At the exit conference, I walked the owner and their CPA through the reasoning.",
        rest:
          "Useful life, added capability, the freight and install in the measure. The classification held. The assessment stood. And the fix going forward was the right one: the booth went on the books as an asset and started depreciating, and they set up a use-tax accrual process so the next big purchase gets caught when it happens.",
      },
      {
        cue: "Lesson — point of entry",
        opener: "Nobody at that shop was trying to get away with anything.",
        rest:
          "The invoice came from a vendor whose name sounded like a repair vendor, the bookkeeper filed it where invoices from repair vendors go, and nobody ever looked at it again. For three years. Until I did.\n\nThe capitalize-versus-expense decision got made by default, at the moment of data entry, by the person with the least context. The lesson isn't “hire better bookkeepers.” The lesson is: the classification decision has to happen at the point of entry, on purpose, under a written policy — not get reconstructed years later by whoever comes checking.\n\nHold that thought — in Topic 2, I'll show you exactly how I'd build that into Ramp at Vast.",
      },
    ],
  },
  {
    kicker: "Part 02 — Topic 1 · Example 2",
    title: "Four months of my own time",
    beats: [
      {
        cue: "The opposite chair",
        opener: "My second example is the same question from the opposite chair.",
        rest:
          "In the first story, I was the auditor catching someone else's classification. In this one, the cost was my own time — and I want to be straight with you about how the decision actually got made, because that's where the lesson is.",
      },
      {
        cue: "Context — the builds",
        opener: "ForensisGroup is a forensic and expert-witness firm that runs its practice on Salesforce.",
        rest:
          "I did systems work for them — and on top of that subscription, I built two systems. PMify, a project management system for the practice. And Survey Builder — a custom survey platform I wrote in Apex, so the firm can spin up client surveys without rebuilding each time. Roughly four months of development across the two.",
      },
      {
        cue: "The rule — ASC 350-40",
        opener: "A Salesforce subscription is a cloud computing arrangement — ASC 350-40, as amended by ASU 2018-15.",
        rest:
          "The subscription fee itself is never an asset. It's rent. Always expense. But the implementation costs — configuration, customization, coding, testing — those are capitalizable. And here's the part most people miss: the standard doesn't say “capitalizable if you paid a consultant.” Internal payroll counts. An employee's time in the application-development stage is exactly the cost the standard points at.",
      },
      {
        cue: "“The invoice was me”",
        opener: "There was no consultant invoice — the invoice was me.",
        rest:
          "Four months of my time, configuring and customizing and testing. Which means “we didn't pay anyone” is not an answer. The question was real: should some of that cost have gone on the balance sheet?",
      },
      {
        cue: "What actually happened",
        opener: "Here's what actually happened, and I'm not going to dress it up.",
        rest:
          "The cost flowed through payroll and was expensed as incurred. There was no capitalization discussion at the time. Nobody asked the question — including me. The decision got made by default.",
      },
      {
        cue: "Three tests",
        opener: "What I can stand behind is the conclusion — because I've since worked it properly, the way I'd work it as an auditor.",
        rest:
          "First, measurement. There were no contemporaneous time records separating application-development work from everything else I did. Without that, any capitalized number is a reconstruction, not a measurement — and I'd never accept a reconstructed number from a taxpayer, so I won't accept one from myself.\n\nSecond, the stage mix. A big share of those months was preliminary-stage scoping up front and training and refinement at the end. The standard expenses both of those regardless. The truly capitalizable middle was a slice, not the whole.\n\nThird, materiality. At the scale of a firm that size, that slice doesn't change any reader's view of the financials.",
      },
      {
        cue: "The key sentence",
        opener: "So: expense was the right answer. But it was the right answer reached the wrong way.",
        rest:
          "A defensible answer without documentation is still an undocumented answer. If an auditor like me had walked in, the position holds — but nobody could have handed them the memo that proves it. That's the gap.",
      },
      {
        cue: "What I'd do differently",
        opener: "Three things I'd do differently.",
        rest:
          "One: track hours to the project while it's happening. Not to force capitalization — to preserve the option. Once the quarter closes, the ability to measure is gone forever.\n\nTwo: write the memo even when the answer is “expense.” It costs an hour, and it turns a default into a documented position.\n\nThree — and this is the one that matters for this room: recognize when scale flips the answer. At a firm that size, expense. At a company like Vast — real implementation invoices, dedicated engineering time, material dollars — the same framework comes out the other way. And you've lived this: when Vast implemented NetSuite and Ramp, somebody had to decide which implementation costs to capitalize. It's this exact analysis.",
      },
      {
        cue: "The twist — prepaid, not PP&E",
        opener: "One last twist, because it's a trap I'd want to catch at Vast.",
        rest:
          "When a CCA implementation cost is capitalized, it doesn't become a fixed asset. It's a prepaid-type asset that amortizes into the same operating expense line as the subscription. Never depreciation. Coding it to PP&E would be wrong even when capitalizing is right. The classification question doesn't end at “capitalize or expense” — it ends at “which asset, which line.”",
      },
      {
        cue: "Topic 1 close — two chairs",
        opener: "So, two examples, two chairs.",
        rest:
          "An auditor finding a twenty-thousand-dollar asset hiding in a repairs account. And a builder whose own four months of work turned out to be the accounting question. Same principle both times: the classification has to be made on purpose, at the source, with the documentation to prove it. Which brings me to what I'd actually do at Vast.",
      },
    ],
  },
  {
    kicker: "Part 03 — Topic 2",
    title: "The first 90 days",
    beats: [
      {
        cue: "The frame",
        opener: "Topic two: my first ninety days.",
        rest:
          "Three phases — learn it, plan it, ship it. And I'll end with one idea I think is genuinely worth your time.",
      },
      {
        cue: "Days 1–30 · Learn",
        opener: "The first month, I'm learning the machine before I touch it.",
        rest:
          "Map the chart of accounts and the capitalization policy — what's the dollar threshold, and is it documented or tribal knowledge? Learn how Ramp is configured: the category mappings, how accurate the AI coding actually is, which vendors trigger reclasses most. And shadow a month-end close, writing down every manual reclass I see — because that friction is the opportunity.",
      },
      {
        cue: "Days 30–60 · Plan",
        opener: "The second month, I turn the pattern into a number.",
        rest:
          "Quantify the reclass problem — how many per month, how much time they cost. Tighten the GL coding rules for the judgment calls that recur most: SaaS implementation costs, capex threshold edge cases. And document the capitalization policy crisply with the controller — before building anything.",
      },
      {
        cue: "Days 60–90 · Ship",
        opener: "The third month, I ship something and prove it worked.",
        rest:
          "Two deliverables. Pilot the Ramp coding rules on a narrow slice of spend, with a before-and-after on reclass volume. And deliver the international consolidation map — how Japan and France actually flow into the US-GAAP close today.",
      },
      {
        cue: "Quick win — point of entry",
        opener: "Route the capitalize call to the point of entry.",
        rest:
          "Ramp's AI coding is fast and generally accurate — but it isn't built to catch the two patterns that create rework: an invoice crossing the capitalization threshold, and a SaaS bill that blends capitalizable setup with training costs on one invoice. The fix is a lightweight rules layer: flag those two patterns before they sync to NetSuite, and route them to a short review queue.\n\nFewer reclasses at close, a cleaner audit trail — and remember the spray booth. This is exactly the system that would have caught it on day one.",
      },
      {
        cue: "The brilliant idea",
        opener: "The international bridge — before it's a fire drill.",
        rest:
          "Vast isn't a single-entity company anymore. Vast Japan GK in Tokyo. A French operation tied to flying French astronauts to LEO. Four real accounting problems stack up.\n\nCurrency translation under ASC 830 — the CTA runs through OCI, not the income statement, and that's easy to code wrong and expensive to unwind. Multi-entity consolidation — either OneWorld with eliminations built in, or someone is doing it by hand, and manual consolidation is the first thing that breaks as volume grows. Transfer pricing — arm's-length documentation that survives both a Section 482 exam and a French or Japanese authority's review. And indirect tax — VAT and Consumption Tax, which is the same discipline I run daily on California sales and use tax: does this transaction carry the tax it should, documented at the point of entry.",
      },
      {
        cue: "The pitch",
        opener: "Within ninety days: a documented map of how Japan and France flow into the US-GAAP close today.",
        rest:
          "Not a redesign. Making sure the multi-entity structure already running Ramp and NetSuite domestically holds to the same standard internationally — before a gap becomes a restatement.",
      },
      {
        cue: "The close",
        opener: "Auditor's skepticism. Builder's toolkit.",
        rest: "That's what I'd bring to Vast. Thank you — I'd love your questions.",
      },
    ],
  },
];

const LEVELS = [
  { name: "Full script", desc: "Read it all. First passes." },
  { name: "Openers", desc: "Opening lines only — recite the rest." },
  { name: "Cues", desc: "Beat titles only — recite everything." },
  { name: "Test", desc: "Numbers only. Perform it." },
];
// visibility tiers: 0 = hidden, 1 = cue, 2 = cue+opener, 3 = full
const BASE_TIER = [3, 2, 1, 0];

export default function ScriptPage() {
  const [level, setLevel] = useState(0);
  const [peek, setPeek] = useState<Record<string, number>>({});

  function tierFor(key: string) {
    return Math.min(3, BASE_TIER[level] + (peek[key] ?? 0));
  }
  function bump(key: string) {
    setPeek((p) => {
      const cur = Math.min(3, BASE_TIER[level] + (p[key] ?? 0));
      if (cur >= 3) {
        const { [key]: _drop, ...restP } = p;
        return restP; // collapse back to the level's baseline
      }
      return { ...p, [key]: (p[key] ?? 0) + 1 };
    });
  }

  return (
    <article className="band">
      <div className="wrap narrow">
        <div className="mono">For James — not for the screen</div>
        <h1 style={{ marginTop: 12 }}>The script</h1>
        <p className="lede" style={{ color: "var(--muted)", fontSize: 16 }}>
          Beats, not words. Memorize each beat&apos;s <strong>opening line word-perfect</strong> and
          let the rest flex — then fade the cues until you can run it from bare numbers.
        </p>

        <div className="note" style={{ marginTop: 24 }}>
          <strong>The method.</strong> ① Each beat is one idea anchored to one slide — the deck is
          your memory palace. ② Openers are sacred; everything else is yours to rephrase. ③ Rehearse
          out loud, standing, and fade: Full → Openers → Cues → Test. Stuck? Click a beat to peek one
          layer. ④ Three 15-minute passes a day beat one two-hour grind. Record a pass on your phone;
          listen back on the drive.
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "28px 0 8px" }}>
          {LEVELS.map((l, i) => (
            <button
              key={l.name}
              onClick={() => { setLevel(i); setPeek({}); }}
              className="btn"
              style={
                i === level
                  ? { background: "var(--accent)", borderColor: "var(--accent)", color: "var(--ink)", fontWeight: 600 }
                  : undefined
              }
            >
              {l.name}
            </button>
          ))}
        </div>
        <p style={{ color: "var(--muted)", fontSize: 13, margin: "4px 0 8px" }}>{LEVELS[level].desc}</p>

        {SECTIONS.map((sec, si) => (
          <div key={si} style={{ marginTop: 48 }}>
            <div className="mono">{sec.kicker}</div>
            <h2 style={{ fontSize: 24, marginTop: 8, marginBottom: 6 }}>{sec.title}</h2>
            {sec.beats.map((b, bi) => {
              const key = `${si}-${bi}`;
              const tier = tierFor(key);
              return (
                <div
                  key={key}
                  onClick={() => bump(key)}
                  style={{
                    borderTop: "1px solid var(--line)",
                    padding: "14px 0",
                    cursor: level > 0 ? "pointer" : "default",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                    <span
                      className="mono"
                      style={{ color: "var(--muted)", minWidth: 22, flexShrink: 0 }}
                    >
                      {bi + 1}
                    </span>
                    {tier >= 1 ? (
                      <span className="mono">{b.cue}</span>
                    ) : (
                      <span style={{ color: "var(--muted)", fontSize: 13 }}>· · ·</span>
                    )}
                  </div>
                  {tier >= 2 && (
                    <p style={{ margin: "10px 0 0 34px", color: "var(--white)", fontWeight: 600 }}>
                      {b.opener}
                    </p>
                  )}
                  {tier >= 3 &&
                    b.rest.split("\n\n").map((para, pi) => (
                      <p key={pi} style={{ margin: "10px 0 0 34px", color: "var(--text)" }}>
                        {para}
                      </p>
                    ))}
                </div>
              );
            })}
          </div>
        ))}

        <div className="note" style={{ marginTop: 40 }}>
          <strong>Delivery marks.</strong> Slow down on: &ldquo;their own records told on
          them&rdquo; · &ldquo;it has to cut both ways&rdquo; · &ldquo;the invoice was me&rdquo; ·
          &ldquo;the right answer reached the wrong way.&rdquo; Eye contact on the NetSuite/Ramp
          line — that&apos;s the moment you stop reciting standards and start talking about
          <em> their</em> books.
        </div>
      </div>
    </article>
  );
}
