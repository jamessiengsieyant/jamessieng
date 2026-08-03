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
          "CDTFA — the Department of Tax and Fee Administration. I test whether transactions were taxed correctly under California law — including capital equipment purchases, which is exactly where Topic 1 lives.\n\nThe rest of my time goes into building software — most of it accounting-adjacent.",
      },
      {
        cue: "Past — how I got here",
        opener: "Two degrees from UC Irvine — Biomedical Engineering and Business Economics.",
        rest:
          "Then a Bachelor's in Accounting from WGU in 2024. All four CPA exams passed — finishing the experience requirement now.\n\nAnd the credential I lean on daily: Enrolled Agent — admitted to practice before the IRS. I prepare business returns up through Form 1120, which means I read small-business books for a living — trial balance to Schedule L, book-to-tax on the M-1. Books to returns is my normal commute.\n\nOn the systems side: seven Salesforce certifications, QuickBooks ProAdvisor, CISSP passed, three CompTIA certs, ISC2's CC. The builds came out of that — PMify, Survey Builder, the QuickBooks sync, a lab system with asset tracking.",
      },
      {
        cue: "The NetSuite question",
        opener: "I haven't lived in NetSuite yet — and here's why that doesn't worry me.",
        rest:
          "Salesforce and NetSuite are the same kind of animal: cloud platforms you configure and build on. Records, workflows, permissions, reports.\n\nAnd I didn't just use Salesforce — I built accounting on it. PMify for project management. Survey Builder. And an automated AR/AP payment sync into QuickBooks — real accounting and reporting, running through a system I built. The ledger concepts don't change between platforms. Only the menus move.",
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
        cue: "S · The purchases exam",
        opener: "People think a sales tax audit only looks at sales. It doesn't.",
        rest:
          "Every field audit examines purchases too — and step one is splitting them into two piles: fixed assets, and expense items. That split is a capitalization review. Same question you ask at Vast — is this an asset, or an expense? I just come at it from the enforcement side.",
      },
      {
        cue: "S · The find",
        opener: "Auto body shop. I'm going through repairs and maintenance, line by line.",
        rest:
          "R&M is where assets go to hide — not because people cheat, but because of how bookkeeping happens. I'll come back to that.\n\nAnd there it is: a twenty-thousand-dollar invoice. Out-of-state vendor. No tax charged. A spray booth — equipment, freight, and installation on one invoice. Coded to repairs. And not on the depreciation schedule.",
      },
      {
        cue: "T · The decision — three factors",
        opener: "Now I have a call to make — and I have to defend it.",
        rest:
          "Repair, or capital asset? If it's an asset, two things follow: it belonged on their books as equipment, and use tax was due — never paid.\n\nThree factors. It added capability — they weren't fixing a booth, they were acquiring one. Useful life in years, not months. And my favorite: their own books contradicted themselves — expensed in R&M, missing from the depreciation schedule they kept for everything else. Their own records told on them.",
      },
      {
        cue: "A · The measure",
        opener: "I called it a capital asset and computed the measure.",
        rest:
          "Purchase price, plus freight, plus installation — the cost of putting the asset in service. Same rule as ASC 360 basis. Tax and book agree on that one.",
      },
      {
        cue: "A · It cuts both ways",
        opener: "But the same account had real repairs — and I left those alone.",
        rest:
          "Compressor service. Filters. Genuinely expenses. If the call only ever goes one direction, it's not judgment — it's a shakedown. A defensible position cuts both ways.",
      },
      {
        cue: "R · Result",
        opener: "At the exit conference, I walked the owner and their CPA through it.",
        rest:
          "Useful life. Added capability. The full measure. The classification held, the assessment stood — and going forward, the booth went on the books and a use-tax accrual process was set up to catch the next big purchase.",
      },
      {
        cue: "L · Lesson — point of entry",
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
        cue: "S · Context — the builds",
        opener: "ForensisGroup runs its practice on Salesforce.",
        rest:
          "I did systems work for them — built two things on top of that subscription. PMify, a project management system. And Survey Builder, a survey platform I wrote in Apex. About four months of development.",
      },
      {
        cue: "S · The rule — ASC 350-40",
        opener: "A Salesforce subscription is a cloud computing arrangement — ASC 350-40.",
        rest:
          "The subscription fee is never an asset — it's rent. But implementation costs — configuration, customization, coding, testing — those are capitalizable. And here's what most people miss: internal payroll counts. The standard doesn't require a consultant's invoice.",
      },
      {
        cue: "T · “The invoice was me”",
        opener: "There was no consultant invoice — the invoice was me.",
        rest:
          "Four months of configuring, customizing, testing. So “we didn't pay anyone” isn't an answer. The question was real: should some of that cost sit on the balance sheet?",
      },
      {
        cue: "R · What actually happened",
        opener: "Here's what actually happened — no dressing it up.",
        rest:
          "It ran through payroll and got expensed as incurred. No capitalization discussion. Nobody asked the question — including me. The decision was made by default.",
      },
      {
        cue: "A · Three tests",
        opener: "What I can stand behind is the conclusion — I've since worked it like an auditor would.",
        rest:
          "Measurement: no time records separating dev work from everything else — so any capitalized number would be a reconstruction. I'd never accept one from a taxpayer, so I won't accept one from me.\n\nStage mix: heavy on scoping up front and training at the end — both expensed under the standard anyway.\n\nMateriality: at that firm's size, the capitalizable slice changes nobody's view of the financials.",
      },
      {
        cue: "R · The key sentence",
        opener: "Expense was the right answer — reached the wrong way.",
        rest:
          "A defensible answer without documentation is still an undocumented answer. If an auditor walked in, the position holds — but nobody could hand them the memo that proves it. That's the gap.",
      },
      {
        cue: "L · What I'd do differently",
        opener: "Three things I'd do differently.",
        rest:
          "Track hours while it's happening — not to force capitalization, to preserve the option. Once the quarter closes, the ability to measure is gone.\n\nWrite the memo even when the answer is “expense.” One hour turns a default into a position.\n\nAnd know when scale flips the answer. At Vast — real invoices, dedicated engineers, material dollars — the same framework lands the other way. You've lived this: someone had to make this exact call on the NetSuite and Ramp implementations.",
      },
      {
        cue: "L · The twist — prepaid, not PP&E",
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
        rest:
          "Straight up: this is a learning plan and a contribution plan at the same time. You know I haven't done international accounting — so I'll tell you exactly how I get useful fast, and what I bring while I do.",
      },
      {
        cue: "Said plainly",
        opener: "Let me say the obvious part out loud: I haven't done international accounting.",
        rest:
          "What I do have is the standards — FAR tested consolidation and currency translation. ASC 830, eliminations, the CTA through OCI. I know the rules. I lack the reps. The next ninety days are how I get reps without slowing your close down.",
      },
      {
        cue: "The study map",
        opener: "The terrain has four problems, and I already know their names.",
        rest:
          "Currency translation — ASC 830, and the CTA runs through OCI, not income. Consolidation — intercompany and investment eliminations. Transfer pricing — documentation that survives Section 482 and a foreign authority's review. And indirect tax — VAT and Consumption Tax, the same discipline I run daily on California sales and use tax.",
      },
      {
        cue: "Days 1–30 · Learn",
        opener: "Month one: walk one close by hand.",
        rest:
          "Follow Japan's reporting package all the way through — translation, eliminations, into the consolidated statements — once, manually, so I know where it breaks. Learn the PBC universe: what the auditors asked for last time, and what dragged. And map how OneWorld is configured — entities, currencies, elimination rules.",
      },
      {
        cue: "Days 30–60 · Contribute",
        opener: "Month two: real close tasks, under review.",
        rest:
          "Reconciliations, translation entries — mine, checked by someone senior. While I'm in there, I time the close: where do the hours actually go? Then I pick one automation with the controller — highest pain, lowest risk.",
      },
      {
        cue: "Days 60–90 · Ship",
        opener: "Month three: own my slice, ship the first automation.",
        rest:
          "My close tasks fully mine. The automation live, with a before-and-after number. Both documented well enough to survive me.",
      },
      {
        cue: "The builder part",
        opener: "Now the part I bring on day one: the builder part.",
        rest:
          "Three builds I already know how to make.\n\nA PBC tracker — audit requests tracked like projects, status visible to auditors and stakeholders. I've built exactly this before.\n\nA package pre-check — automated completeness and tie-out checks on subsidiary packages, before a human reviews them.\n\nAnd point-of-entry classification rules in Ramp — remember the spray booth. Cleaner books upstream is a faster close downstream.",
      },
      {
        cue: "The brilliant idea",
        opener: "Which is the real idea: instrument the close.",
        rest:
          "Treat books-to-reports like a pipeline. Measure where the hours go, then remove one manual step every month — small builds, each shipped with a before-and-after number.\n\nMost closes never get faster because nobody owns “faster.” I'm offering to own it.",
      },
      {
        cue: "The pitch",
        opener: "So, in ninety days:",
        rest:
          "My close tasks owned. One automation live, with numbers. And a close that gets a step faster every month after that.",
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
