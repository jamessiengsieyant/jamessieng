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
          "As the auditor asking “prove it” — or as the builder whose system has to prove itself. I've done both. Sometimes in the same week.",
      },
      {
        cue: "Present — the day job",
        opener: "By day, I'm a sales and use tax auditor for the State of California.",
        rest:
          "CDTFA — the Department of Tax and Fee Administration. I test whether transactions were taxed correctly under California law — including capital equipment purchases, which is exactly where Topic 1 lives.\n\nI'm also the founder of Sieyant, a tax prep software company.",
      },
      {
        cue: "Past — how I got here",
        opener: "Two degrees from UC Irvine — Biomedical Engineering and Business Economics.",
        rest:
          "Then a Bachelor's in Accounting from WGU in 2024. All four CPA exams passed — finishing the experience requirement now — plus the Enrolled Agent credential, admitted to practice before the IRS.\n\nAlong the way: Salesforce and QuickBooks certifications, and systems work for ForensisGroup, a forensic accounting firm — I built their project management system, a survey platform in Apex, a QuickBooks-to-Salesforce sync, and a lab system with asset tracking.",
      },
      {
        cue: "Future — why Vast",
        opener: "Every role I've had comes down to one skill.",
        rest:
          "Translating between rigid rules — tax code, GAAP, a chart of accounts — and a business moving faster than any of them. That's the seam Vast is scaling through right now.",
      },
      {
        cue: "For fun",
        opener: "I sing, and I play guitar.",
        rest:
          "Sometimes both at the same time.\n\nAnd the through-line with accounting is real: both are structured systems where the constraints are the interesting part.",
      },
    ],
  },
  {
    kicker: "Part 02 — Topic 1 · Example 1",
    title: "The spray booth in the repairs account",
    beats: [
      {
        cue: "Setup — inside an audit",
        opener: "First example — let me take you inside a real audit.",
        rest:
          "From my CDTFA work. Details disguised, no names. But the decision is real, and it's one I make regularly.",
      },
      {
        cue: "The purchases exam",
        opener: "People think a sales tax audit only looks at sales. It doesn't.",
        rest:
          "Every field audit examines purchases too — and step one is splitting them into two piles: fixed assets, and expense items. That split is a capitalization review. Same question you ask at Vast — is this an asset, or an expense? I just come at it from the enforcement side.",
      },
      {
        cue: "The find",
        opener: "Auto body shop. I'm going through repairs and maintenance, line by line.",
        rest:
          "R&M is where assets go to hide — not because people cheat, but because of how bookkeeping happens. I'll come back to that.\n\nAnd there it is: a twenty-thousand-dollar invoice. Out-of-state vendor. No tax charged. A spray booth — equipment, freight, and installation on one invoice. Coded to repairs. And not on the depreciation schedule.",
      },
      {
        cue: "The decision — three factors",
        opener: "Now I have a call to make — and I have to defend it.",
        rest:
          "Repair, or capital asset? If it's an asset, two things follow: it belonged on their books as equipment, and use tax was due — never paid.\n\nThree factors. It added capability — they weren't fixing a booth, they were acquiring one. Useful life in years, not months. And my favorite: their own books contradicted themselves — expensed in R&M, missing from the depreciation schedule they kept for everything else. Their own records told on them.",
      },
      {
        cue: "The measure",
        opener: "I called it a capital asset and computed the measure.",
        rest:
          "Purchase price, plus freight, plus installation — the cost of putting the asset in service. Same rule as ASC 360 basis. Tax and book agree on that one.",
      },
      {
        cue: "It cuts both ways",
        opener: "But the same account had real repairs — and I left those alone.",
        rest:
          "Compressor service. Filters. Genuinely expenses. If the call only ever goes one direction, it's not judgment — it's a shakedown. A defensible position cuts both ways.",
      },
      {
        cue: "Result",
        opener: "At the exit conference, I walked the owner and their CPA through it.",
        rest:
          "Useful life. Added capability. The full measure. The classification held, the assessment stood — and going forward, the booth went on the books and a use-tax accrual process was set up to catch the next big purchase.",
      },
      {
        cue: "Lesson — point of entry",
        opener: "Nobody at that shop was cheating.",
        rest:
          "The invoice came from a vendor that sounded like a repair vendor, got filed where repair invoices go, and sat there wrong for three years — until I showed up.\n\nThe capitalize-or-expense call was made by default, at data entry, by the person with the least context. The fix isn't better bookkeepers. It's making the call at the point of entry — on purpose, under a written policy. Hold that thought for Topic 2.",
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
          "First story: I caught someone else's classification. This time, the cost was my own time — and I'll be straight about how the decision actually got made. That's where the lesson is.",
      },
      {
        cue: "Context — the builds",
        opener: "ForensisGroup runs its practice on Salesforce.",
        rest:
          "I did systems work for them — built two things on top of that subscription. PMify, a project management system. And Survey Builder, a survey platform I wrote in Apex. About four months of development.",
      },
      {
        cue: "The rule — ASC 350-40",
        opener: "A Salesforce subscription is a cloud computing arrangement — ASC 350-40.",
        rest:
          "The subscription fee is never an asset — it's rent. But implementation costs — configuration, customization, coding, testing — those are capitalizable. And here's what most people miss: internal payroll counts. The standard doesn't require a consultant's invoice.",
      },
      {
        cue: "“The invoice was me”",
        opener: "There was no consultant invoice — the invoice was me.",
        rest:
          "Four months of configuring, customizing, testing. So “we didn't pay anyone” isn't an answer. The question was real: should some of that cost sit on the balance sheet?",
      },
      {
        cue: "What actually happened",
        opener: "Here's what actually happened — no dressing it up.",
        rest:
          "It ran through payroll and got expensed as incurred. No capitalization discussion. Nobody asked the question — including me. The decision was made by default.",
      },
      {
        cue: "Three tests",
        opener: "What I can stand behind is the conclusion — I've since worked it like an auditor would.",
        rest:
          "Measurement: no time records separating dev work from everything else — so any capitalized number would be a reconstruction. I'd never accept one from a taxpayer, so I won't accept one from me.\n\nStage mix: heavy on scoping up front and training at the end — both expensed under the standard anyway.\n\nMateriality: at that firm's size, the capitalizable slice changes nobody's view of the financials.",
      },
      {
        cue: "The key sentence",
        opener: "Expense was the right answer — reached the wrong way.",
        rest:
          "A defensible answer without documentation is still an undocumented answer. If an auditor walked in, the position holds — but nobody could hand them the memo that proves it. That's the gap.",
      },
      {
        cue: "What I'd do differently",
        opener: "Three things I'd do differently.",
        rest:
          "Track hours while it's happening — not to force capitalization, to preserve the option. Once the quarter closes, the ability to measure is gone.\n\nWrite the memo even when the answer is “expense.” One hour turns a default into a position.\n\nAnd know when scale flips the answer. At Vast — real invoices, dedicated engineers, material dollars — the same framework lands the other way. You've lived this: someone had to make this exact call on the NetSuite and Ramp implementations.",
      },
      {
        cue: "The twist — prepaid, not PP&E",
        opener: "One last twist — a trap I'd want to catch at Vast.",
        rest:
          "A capitalized CCA cost isn't a fixed asset. It's a prepaid-type asset, amortized into the same opex line as the subscription — never depreciation. Coding it to PP&E is wrong even when capitalizing is right.",
      },
      {
        cue: "Topic 1 close — two chairs",
        opener: "Two examples. Two chairs.",
        rest:
          "An auditor finding an asset hidden in a repairs account. A builder whose own four months became the accounting question. Same principle: classify on purpose, at the source, with proof. Which brings me to what I'd do at Vast.",
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
        rest: "Learn it. Plan it. Ship it. And one idea at the end that I think is worth your time.",
      },
      {
        cue: "Days 1–30 · Learn",
        opener: "Month one: learn the machine before touching it.",
        rest:
          "Map the chart of accounts and the capitalization policy — what's the threshold, and is it written down or tribal knowledge? Learn how Ramp is configured and which vendors trigger the most reclasses. And shadow a close, writing down every manual reclass — that friction is the opportunity.",
      },
      {
        cue: "Days 30–60 · Plan",
        opener: "Month two: turn the pattern into a number.",
        rest:
          "How many reclasses a month, and what they cost in hours. Tighten the coding rules for the repeat offenders — SaaS implementation costs, threshold edge cases. And get the policy documented with the controller before building anything.",
      },
      {
        cue: "Days 60–90 · Ship",
        opener: "Month three: ship something and prove it worked.",
        rest:
          "Two deliverables. Pilot the Ramp coding rules on a narrow slice of spend, with before-and-after reclass numbers. And deliver the international consolidation map — how Japan and France actually reach the US-GAAP close today.",
      },
      {
        cue: "Quick win — point of entry",
        opener: "Route the capitalize call to the point of entry.",
        rest:
          "Ramp's AI coding is fast — but it isn't built to catch the two patterns that cause rework: an invoice crossing the capitalization threshold, and a SaaS bill mixing capitalizable setup with training costs.\n\nThe fix is a thin rules layer: flag those two patterns before they sync to NetSuite, route them to a short review queue. Fewer reclasses, cleaner audit trail — and remember the spray booth. This catches it on day one.",
      },
      {
        cue: "The brilliant idea",
        opener: "The international bridge — before it's a fire drill.",
        rest:
          "Vast isn't a single entity anymore: Vast Japan GK, plus a French operation flying French astronauts to LEO. That stacks up four real accounting problems.\n\nCurrency translation — ASC 830, and the CTA runs through OCI, not income. Consolidation — OneWorld with eliminations, or someone's doing it by hand. Transfer pricing — documentation that survives a Section 482 exam and a foreign authority's review. And indirect tax — VAT and Consumption Tax, the same discipline I run daily on California sales and use tax.",
      },
      {
        cue: "The pitch",
        opener: "Within ninety days: a documented map of how Japan and France reach the US-GAAP close.",
        rest:
          "Not a redesign. Just holding the international side to the standard the domestic stack already meets — before a gap becomes a restatement.",
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
  const [showPrompt, setShowPrompt] = useState(false);

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

        <div className="card" style={{ marginTop: 24 }}>
          <button
            onClick={() => setShowPrompt(!showPrompt)}
            className="mono"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}
          >
            The assignment — verbatim from Vast {showPrompt ? "▾" : "▸"}
          </button>
          {showPrompt && (
            <div style={{ marginTop: 14, fontSize: 14, color: "var(--text)", lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>
                &ldquo;Please put together a 30-45 min. presentation that goes over the following:
              </p>
              <ul style={{ margin: "10px 0 0 18px", padding: 0 }}>
                <li style={{ marginBottom: 8 }}>
                  Your background/career with history/projects or programs worked on. Education,
                  what you like to do for fun, etc.
                </li>
                <li style={{ marginBottom: 8 }}>
                  Topic 1: Walk us through 2 examples of times when you had to decide whether
                  something should be capitalized as a fixed asset vs expensed, and why you believe
                  the treatment for that transaction was done appropriately.
                  <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
                    <li>
                      The walk through should include the goals/requirements, your direct
                      contributions, results, and lessons learned/what you&apos;d do differently.
                    </li>
                  </ul>
                </li>
                <li>
                  Topic 2: Give a 30/60/90 day plan of what you would do if you were hired at Vast.
                  Please include one brilliant idea that you believe would benefit Vast!&rdquo;
                </li>
              </ul>
              <p style={{ margin: "12px 0 0", color: "var(--muted)" }}>
                Send 24–48 hours before the onsite to Kimani Glass, Andre Carbajal, and
                guest@vastspace.com · Accepted formats: PDF, PowerPoint.
              </p>
            </div>
          )}
        </div>

        <div className="note" style={{ marginTop: 18 }}>
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
          them&rdquo; · &ldquo;it cuts both ways&rdquo; · &ldquo;the invoice was me&rdquo; ·
          &ldquo;the right answer reached the wrong way.&rdquo; Eye contact on the NetSuite/Ramp
          line — that&apos;s the moment you stop reciting standards and start talking about
          <em> their</em> books.
        </div>
      </div>
    </article>
  );
}
