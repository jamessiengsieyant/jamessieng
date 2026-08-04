"use client";

import { useState } from "react";

type Block =
  | { k: "note"; text: string }
  | { k: "pairs"; rows: { t: string; d: string }[] }
  | { k: "bullets"; title?: string; items: string[] }
  | { k: "qa"; q: string; a: string }[]
  | { k: "qa"; q: string; a: string };

type Section = { h: string; blocks: Exclude<Block, unknown[]>[] };

type Slot = {
  time: string;
  who: string;
  competency: string;
  oneLine: string;
  depth?: "deep";
  sections: Section[];
};

const SLOTS: Slot[] = [
  {
    time: "12:45–1:00",
    who: "Andre Carbajal",
    competency: "Greet & tour",
    oneLine: "Warm-up. Your job here is to be easy to be around, not impressive.",
    sections: [
      {
        h: "What this actually is",
        blocks: [
          {
            k: "note",
            text: "He is your host and he has your phone number. This is logistics and small talk, but he will be asked later whether you were pleasant. Treat it as part of the interview without performing.",
          },
          {
            k: "bullets",
            title: "Do",
            items: [
              "Ask how long he has been at Vast and what he works on. Let him talk.",
              "Ask a genuine question about something you see on the tour.",
              "Confirm the room, the display connection, and where the restroom is before 1:00.",
            ],
          },
          {
            k: "bullets",
            title: "Don't",
            items: [
              "Start pitching. Nothing you say here helps you and rambling can hurt you.",
              "Ask about compensation, headcount politics, or who makes the decision.",
            ],
          },
        ],
      },
      {
        h: "Tech check — do this here, not at 1:00",
        blocks: [
          {
            k: "bullets",
            items: [
              "Confirm HDMI or USB-C, and whether they mirror or extend. You want extend so notes stay on your laptop.",
              "Open the deck fullscreen once and confirm the dark background does not wash out on their projector.",
              "Have the PDF on the laptop locally. Do not rely on wifi, and do not rely on the live site.",
            ],
          },
        ],
      },
    ],
  },

  {
    time: "1:00–2:00",
    who: "Panel — Nguyen · Rivera · Dungo Morales · Lam · Galvan · Fairchild",
    competency: "The presentation",
    oneLine: "30–45 minutes of material, then questions. All six in the room.",
    sections: [
      {
        h: "Timing",
        blocks: [
          {
            k: "note",
            text: "They asked for 30–45 minutes and blocked a full hour, which means they want 15–25 minutes of questions. Land at 38–40 minutes. Finishing at 44 and leaving no room for questions reads as poor judgment, not thoroughness.",
          },
          {
            k: "pairs",
            rows: [
              { t: "Intro (13 slides)", d: "~10 min. This is the section you can afford to lose time in — cut the CRO story if you are behind." },
              { t: "Topic 1 (12 slides)", d: "~16 min. Two examples, four-part frame each. Do not trim Example 2 — it is the honest one." },
              { t: "Topic 2 (13 slides)", d: "~12 min. Ends on the through-line payoff and the close." },
            ],
          },
        ],
      },
      {
        h: "Reading the room",
        blocks: [
          {
            k: "note",
            text: "You already know each person's competency from the 1:1 schedule. That tells you who is listening for what — and it is the same six people, so a beat you land now gets referenced later.",
          },
          {
            k: "pairs",
            rows: [
              { t: "Rivera — problem solving", d: "Listening to the spray-booth judgment factors and whether you can change your mind." },
              { t: "Dungo Morales — communication", d: "Listening to the exit-conference beat and whether you explain without condescending." },
              { t: "Galvan — technical", d: "Listening for whether ASC 350-40 came out of a textbook or out of your hands." },
              { t: "Lam — leadership", d: "Listening for \"documented well enough to survive me\" and whether you own things." },
              { t: "Fairchild & Nguyen — analytical", d: "Listening for structure. The split-the-piles instinct." },
            ],
          },
        ],
      },
    ],
  },

  {
    time: "2:00–2:30",
    who: "Catherine Rivera",
    competency: "Problem Solving & Adaptability",
    oneLine: "The spray-booth judgment factors, and the \"scale flips the answer\" arc.",
    sections: [
      {
        h: "What she is testing",
        blocks: [
          {
            k: "note",
            text: "Whether you reason from factors or from conclusions, and whether new facts can move you. Adaptability questions are usually really \"have you ever been wrong, and did you notice.\"",
          },
        ],
      },
      {
        h: "Have these ready",
        blocks: [
          {
            k: "qa",
            q: "Tell me about a time you had to make a judgment call without clear guidance.",
            a: "The spray booth. Lead with the three factors — added capability rather than restored it, useful life in years, and the measure includes freight and installation. Then the part that makes it judgment rather than a hunt: the genuine repairs in the same account, which you left alone.",
          },
          {
            k: "qa",
            q: "Tell me about a time you changed your mind.",
            a: "Example 2. You concluded expense was right — but only after reconstructing it like an auditor, and you had to accept that at the time you had not concluded anything, you had defaulted. The change of mind is about your own process, not about the number.",
          },
          {
            k: "qa",
            q: "How do you handle ambiguity?",
            a: "\"Scale flips the answer.\" The same framework produced expense at ForensisGroup and would plausibly produce capitalization at Vast — because materiality and the mix of costs changed, not because the standard did. That is the adaptability answer.",
          },
        ],
      },
      {
        h: "Trap",
        blocks: [
          {
            k: "note",
            text: "Do not describe the audit as catching someone. You found a misclassification nobody intended. If it reads as a conquest story, the adaptability score goes down.",
          },
        ],
      },
    ],
  },

  {
    time: "2:30–3:00",
    who: "Patty Dungo Morales",
    competency: "Communication & Collaboration",
    oneLine: "The exit conference, and getting the controller's buy-in before building.",
    sections: [
      {
        h: "What she is testing",
        blocks: [
          {
            k: "note",
            text: "Whether you can deliver an unwelcome conclusion without making an enemy, and whether you build with people or at them.",
          },
        ],
      },
      {
        h: "Have these ready",
        blocks: [
          {
            k: "qa",
            q: "Tell me about a difficult conversation.",
            a: "The exit conference. You walked the owner and their CPA through the classification, and it held. Emphasize how: you showed them their own depreciation schedule rather than asserting authority. You let the records make the argument.",
          },
          {
            k: "qa",
            q: "How do you work with people who disagree with you?",
            a: "The genuine repairs you left alone are the answer. Conceding the parts where they were right is what made the part where they were wrong survivable.",
          },
          {
            k: "qa",
            q: "How would you introduce a change to a team you just joined?",
            a: "Days 30–60: \"pick one automation with the controller — highest pain, lowest risk. That is their call, not mine.\" You are new. You do not get to choose what hurts most.",
          },
          {
            k: "qa",
            q: "How do you explain technical things to non-technical people?",
            a: "You do this daily — explaining a use-tax assessment to a small business owner who has never heard the phrase. Also worth naming: you write for the person who inherits the work, which is why the 90-day plan ends at \"documented well enough to survive me.\"",
          },
        ],
      },
    ],
  },

  {
    time: "3:00–3:30",
    who: "Daniel Galvan",
    competency: "Technical Breadth & Depth",
    oneLine: "ASC 350-40 vs 360 · ASC 830 and the CTA · the platforms-transfer parallel · the builds.",
    depth: "deep",
    sections: [
      {
        h: "ASC 350-40 vs ASC 360 — get this distinction exactly right",
        blocks: [
          {
            k: "pairs",
            rows: [
              {
                t: "ASC 360 — Property, Plant, and Equipment",
                d: "Tangible long-lived assets. 360-10 is Overall (including impairment and disposal of long-lived assets); 360-20 is Real Estate Sales. This is where the spray booth lives. Cost basis includes everything required to get it in place and working — invoice price, freight, installation. Recovered through depreciation.",
              },
              {
                t: "ASC 350-40 — Internal-Use Software",
                d: "Intangible. As amended by ASU 2018-15, this is also where implementation costs of a cloud computing arrangement that is a service contract live. Recovered through amortization — and it never becomes PP&E.",
              },
            ],
          },
          {
            k: "note",
            text: "The trap, and the thing most candidates get wrong: a capitalized cloud implementation cost is not a fixed asset. It is presented like a prepaid, and the amortization goes to the same income statement line as the subscription fee — an operating expense line — not to depreciation and amortization. So it is a capitalization question that never produces an entry in the fixed asset register. If Galvan is testing depth on one thing, it is probably this.",
          },
          {
            k: "bullets",
            title: "The three stages under 350-40 — know which bucket each cost falls in",
            items: [
              "Preliminary project stage — expense as incurred. Conceptual formulation, evaluating alternatives, deciding whether the technology exists, vendor selection.",
              "Application development stage — capitalize. Configuration, customization, coding, installation, testing. Includes payroll of employees or third parties directly associated with and devoting time to the implementation.",
              "Post-implementation / operation stage — expense as incurred. Maintenance, training after go-live.",
              "Two costs are expensed even inside the application-development stage: data conversion (other than software acquired to do the conversion) and training. This is the detail that shows you have actually applied the standard.",
            ],
          },
          {
            k: "note",
            text: "Why your Example 2 conclusion holds under exactly this rule: the mix was heavily scoping (preliminary stage) and training — both expensed regardless — and there were no contemporaneous time records to support an application-development-stage allocation. Immaterial on top of that. Expense was right; the documentation was not.",
          },
        ],
      },
      {
        h: "ASC 830 — translation, remeasurement, and where the CTA goes",
        blocks: [
          {
            k: "note",
            text: "Start with the question that comes before everything: what is each entity's functional currency? That determination drives which of two completely different mechanics you apply. Japan's entity most likely functions in JPY, France in EUR — but it is a facts-and-circumstances determination, not an assumption, and saying so is the correct answer.",
          },
          {
            k: "pairs",
            rows: [
              {
                t: "Functional ≠ reporting currency → TRANSLATE",
                d: "Current rate method. Assets and liabilities at the balance-sheet-date rate; revenue and expenses at the average rate for the period; equity at historical rates. The plug that results is the cumulative translation adjustment, and it goes to OCI — it accumulates in AOCI and never touches net income while you hold the entity.",
              },
              {
                t: "Functional currency IS the USD → REMEASURE",
                d: "No CTA. Remeasurement gains and losses go straight to the income statement. This is the distinction people blur, and it is the one worth being crisp about.",
              },
            ],
          },
          {
            k: "bullets",
            title: "When the CTA finally hits income (ASC 830-30-40-1)",
            items: [
              "On sale, or on complete or substantially complete liquidation of the investment in the foreign entity. It becomes part of the gain or loss on that transaction.",
              "\"Substantially complete\" is generally read as at least 90% of the entity's net assets liquidated.",
              "Periodic dividends out of the subsidiary's earnings do not release it. Neither do liquidating distributions below the 90% threshold.",
              "If sale proceeds are reinvested in the foreign entity, nothing is released — the investment was never exited.",
            ],
          },
          {
            k: "note",
            text: "Honest framing if he pushes: you have the standards from FAR and you have not run a live consolidation. Say that, then show that you know what you would actually be doing — which entities, which rates, which direction, and where the plug lands.",
          },
        ],
      },
      {
        h: "The platforms-transfer parallel — Salesforce to NetSuite",
        blocks: [
          {
            k: "note",
            text: "This is the objection he is most likely to press: you have not used NetSuite. Do not argue that platforms are interchangeable. Argue something narrower and true — you have built accounting on a configurable cloud platform, and the ledger concepts do not move when the menus do.",
          },
          {
            k: "pairs",
            rows: [
              { t: "Objects, fields, validation rules, Flow, Apex", d: "Records, custom fields, workflows, SuiteScript. Same architecture: a declarative configuration layer with a scripting escape hatch underneath." },
              { t: "What actually transfers", d: "Knowing what a system does automatically versus what a person quietly fixes afterward. That is the skill, and it is platform-independent." },
              { t: "The anchor", d: "The AR/AP payment sync into QuickBooks. To build it you had to know what gets debited, what gets credited, when it is recognized, and what breaks downstream. That is the ledger, not the button." },
            ],
          },
          {
            k: "bullets",
            title: "NetSuite OneWorld vocabulary — worth knowing the words before he says them",
            items: [
              "Subsidiary hierarchy, and consolidated exchange rates (current, average, historical) maintained per period.",
              "An elimination subsidiary, where intercompany eliminations are booked.",
              "Intercompany journal entries and intercompany transaction matching.",
              "If you do not know how theirs is configured, say that — and say that mapping it is in your first thirty days, because it is.",
            ],
          },
        ],
      },
      {
        h: "Transfer pricing — and the connection you should absolutely make",
        blocks: [
          {
            k: "bullets",
            items: [
              "Section 482 lets the IRS reallocate income and deductions among commonly controlled taxpayers; intercompany prices must produce arm's-length results.",
              "IRC 6662(e) penalties: 20% for a substantial valuation misstatement, triggered when the net section 482 adjustment exceeds the lesser of $5 million or 10% of gross receipts.",
              "40% for a gross valuation misstatement — net adjustment above $20 million or 20% of gross receipts.",
              "Documentation meeting Treas. Reg. 1.6662-6 is what provides penalty protection, and it has to be in place contemporaneously — by the time the return is filed, not when the notice arrives.",
            ],
          },
          {
            k: "note",
            text: "Here is the connection to make out loud, because it ties your two topics together and it is genuinely the same idea: transfer pricing documentation does not exist to make you right. It exists to protect a defensible position, and it only works if it was written while the facts were still available. That is exactly the lesson from Example 2 — \"the right answer reached the wrong way.\" You learned that on your own capitalization question, at a scale where it did not matter. Transfer pricing is the same failure mode at a scale where it does.",
          },
        ],
      },
      {
        h: "Indirect tax — and the one genuinely timely thing you can raise",
        blocks: [
          {
            k: "pairs",
            rows: [
              {
                t: "Japan — Consumption Tax",
                d: "10% standard. Since 1 October 2023 the Qualified Invoice System governs input credits: you generally cannot claim one without a qualified invoice from a registered qualified invoice issuer, showing their registration number, the rate, and tax by rate.",
              },
              {
                t: "France — VAT",
                d: "20% standard, with reduced rates of 10%, 5.5% and 2.1%. On intra-community B2B acquisitions the supplier zero-rates and the buyer self-assesses under the reverse charge.",
              },
            ],
          },
          {
            k: "note",
            text: "The timely one: Japan's transitional relief steps down. Purchases without a qualified invoice were 80% creditable from October 2023, and that drops to 50% from 1 October 2026 — about eight weeks after this interview. Which turns vendor registration status into a live AP control question, not a compliance footnote. That is a legitimately useful thing to know on day one, and it is exactly the kind of thing a point-of-entry rules layer should be checking.",
          },
          {
            k: "note",
            text: "And the parallel that is actually yours: a reverse charge and California use tax are the same mechanism under different names. The seller does not collect, so the buyer self-assesses. You test that determination every working day. Of the four international problems, indirect tax is the one where you are not learning — you are transferring.",
          },
        ],
      },
      {
        h: "If he asks something you don't know",
        blocks: [
          {
            k: "note",
            text: "Say you do not know, say what you would check, and say how fast you would have it. You have spent the whole presentation arguing that you close gaps deliberately — bluffing here contradicts the thesis far more expensively than not knowing does. \"I would go to the codification and I would have an answer today\" is a strong sentence when it is true.",
          },
        ],
      },
    ],
  },

  {
    time: "3:30–4:00",
    who: "Dennis Lam",
    competency: "Leadership & Culture",
    oneLine: "\"Documented well enough to survive me.\" Owning \"faster.\" Judgment that cuts both ways.",
    sections: [
      {
        h: "What he is testing",
        blocks: [
          {
            k: "note",
            text: "Whether you build things that outlive you, and whether you take ownership without taking territory. Note that Dennis is also the person most likely to own the external audit relationship — so the CIA beat belongs in this conversation, not just in the deck.",
          },
        ],
      },
      {
        h: "Have these ready",
        blocks: [
          {
            k: "qa",
            q: "How do you show leadership without a title?",
            a: "\"Most closes never get faster because nobody owns faster.\" You are volunteering for an unowned outcome — that is the whole answer, and it is leadership without asking for authority.",
          },
          {
            k: "qa",
            q: "Tell me about something you built that others had to maintain.",
            a: "The LIMS and the payment sync. Then the standard you hold yourself to now: if it only works while you are in the room, you have not finished. Documentation is not paperwork, it is the difference between a tool and a dependency on you.",
          },
          {
            k: "qa",
            q: "What would you do if you disagreed with your controller?",
            a: "The genuine repairs answer, generalized. A position that only ever goes one direction is not judgment. You would bring the factors, not the conclusion — and you would expect to lose sometimes.",
          },
          {
            k: "qa",
            q: "Where do you want to be in a few years?",
            a: "This is where the CIA fits. Someone inside has to speak the auditors' language before the audit arrives rather than during it. Be honest that it is three parts and roughly a year, and explicitly not a 90-day promise.",
          },
        ],
      },
    ],
  },

  {
    time: "4:00–4:30",
    who: "Brian Fairchild & Vincent Nguyen",
    competency: "Analytical — expect a live problem",
    oneLine: "Think out loud. Show the split-the-piles instinct.",
    sections: [
      {
        h: "How to handle a live problem",
        blocks: [
          {
            k: "bullets",
            items: [
              "Restate the question before answering it. Cheap, and it prevents solving the wrong problem in front of two people.",
              "Ask what you are missing. What is the threshold, what is the policy, what period are we in, is this the first time. Asking is scored, not penalized.",
              "Name the framework out loud, then walk it. They are grading the path, not the number.",
              "Say where you would be wrong. \"This flips if the useful life is under a year\" shows you know the boundary of your own answer.",
            ],
          },
          {
            k: "note",
            text: "Your natural move is the right one here: split it into two piles and defend the split. That is the same instinct as the audit purchase exam, and it generalizes to almost any classification problem they can hand you.",
          },
        ],
      },
      {
        h: "Likely shapes",
        blocks: [
          {
            k: "qa",
            q: "A capitalize-or-expense fact pattern.",
            a: "Factors first: does it add capability or restore it, what is the useful life, what does the measure include, what is the capitalization threshold and policy. Then answer, then name what would flip it.",
          },
          {
            k: "qa",
            q: "A reconciliation or variance that does not tie.",
            a: "Do not guess. Bound the problem — is it timing, rate, or population. Then say which you would test first and why. That ordering is the analytical signal.",
          },
          {
            k: "qa",
            q: "An FX or intercompany scenario.",
            a: "Functional currency first, always. Then translate versus remeasure, then where the adjustment lands — OCI or income. If you do not know a detail, say the determination you would need to make before you could answer.",
          },
        ],
      },
    ],
  },

  {
    time: "4:30–4:45",
    who: "Kimani Glass",
    competency: "Wrap-up",
    oneLine: "Ask about next steps. Restate the 90-day pitch in one sentence.",
    sections: [
      {
        h: "The one sentence",
        blocks: [
          {
            k: "note",
            text: "\"In ninety days: my close tasks owned, one automation live with a real number on it, and a close that gets a step faster every month after that.\" Have it ready as a single breath. This is the last thing anyone hears from you.",
          },
        ],
      },
      {
        h: "Ask these",
        blocks: [
          {
            k: "bullets",
            items: [
              "What does the close calendar actually look like today, and where does it hurt most?",
              "Is the first external audit on the horizon, and who owns that relationship?",
              "What would make the first ninety days a success from your side — which may not be what I guessed.",
              "What are the next steps, and what is your timeline?",
            ],
          },
          {
            k: "note",
            text: "Do not raise compensation unless she does. And do not add new material here — you are closing, not presenting.",
          },
        ],
      },
    ],
  },
];

function Blocks({ blocks }: { blocks: Section["blocks"] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.k === "note") {
          return (
            <p
              key={i}
              style={{
                margin: "12px 0 0",
                padding: "12px 14px",
                borderLeft: "2px solid var(--accent)",
                background: "rgba(255,178,94,0.06)",
                fontSize: 14,
                lineHeight: 1.65,
                color: "var(--text)",
              }}
            >
              {b.text}
            </p>
          );
        }
        if (b.k === "pairs") {
          return (
            <div key={i} style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              {b.rows.map((r, j) => (
                <div key={j}>
                  <div style={{ fontWeight: 700, color: "var(--white)", fontSize: 14 }}>{r.t}</div>
                  <div style={{ color: "var(--text)", fontSize: 14, lineHeight: 1.6, marginTop: 3 }}>
                    {r.d}
                  </div>
                </div>
              ))}
            </div>
          );
        }
        if (b.k === "bullets") {
          return (
            <div key={i} style={{ marginTop: 14 }}>
              {b.title && (
                <div className="mono" style={{ fontSize: 11, color: "var(--accent)", marginBottom: 6 }}>
                  {b.title}
                </div>
              )}
              <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 7 }}>
                {b.items.map((it, j) => (
                  <li key={j} style={{ color: "var(--text)", fontSize: 14, lineHeight: 1.6 }}>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        // qa
        return (
          <div key={i} style={{ marginTop: 14, borderTop: "1px solid var(--line)", paddingTop: 12 }}>
            <div style={{ fontWeight: 700, color: "var(--white)", fontSize: 14 }}>&ldquo;{b.q}&rdquo;</div>
            <div style={{ color: "var(--text)", fontSize: 14, lineHeight: 1.65, marginTop: 5 }}>{b.a}</div>
          </div>
        );
      })}
    </>
  );
}

export default function PrepSheets() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ marginTop: 28 }}>
      <div className="mono">Per-interviewer prep — click a slot</div>
      <h2 style={{ fontSize: 24, marginTop: 8, marginBottom: 6 }}>The cheat sheets.</h2>
      <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6, margin: "0 0 20px" }}>
        One card per slot, expanded with what that person is testing and the specific answers you
        already have. Galvan&apos;s is the deep one.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {SLOTS.map((s, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="card"
              style={{
                padding: 0,
                overflow: "hidden",
                borderColor: isOpen ? "var(--accent)" : undefined,
              }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  padding: "16px 18px",
                  color: "inherit",
                  font: "inherit",
                  display: "flex",
                  gap: 14,
                  alignItems: "baseline",
                }}
                aria-expanded={isOpen}
              >
                <span
                  className="mono"
                  style={{ color: "var(--accent)", fontSize: 12, minWidth: 76, flexShrink: 0 }}
                >
                  {s.time}
                </span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: "block", fontWeight: 700, color: "var(--white)" }}>
                    {s.who}
                    {s.depth === "deep" && (
                      <span
                        className="mono"
                        style={{
                          marginLeft: 10,
                          fontSize: 10,
                          padding: "2px 7px",
                          borderRadius: 4,
                          background: "var(--accent)",
                          color: "var(--ink)",
                          verticalAlign: "middle",
                        }}
                      >
                        DEEP
                      </span>
                    )}
                  </span>
                  <span style={{ display: "block", fontSize: 13, color: "var(--accent)", marginTop: 2 }}>
                    {s.competency}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: 14,
                      color: "var(--muted)",
                      marginTop: 4,
                      lineHeight: 1.5,
                    }}
                  >
                    {s.oneLine}
                  </span>
                </span>
                <span style={{ color: "var(--muted)", flexShrink: 0 }}>{isOpen ? "▾" : "▸"}</span>
              </button>

              {isOpen && (
                <div style={{ padding: "0 18px 20px", borderTop: "1px solid var(--line)" }}>
                  {s.sections.map((sec, j) => (
                    <section key={j} style={{ marginTop: 20 }}>
                      <h3
                        style={{
                          fontSize: 15,
                          color: "var(--white)",
                          margin: 0,
                          paddingBottom: 6,
                          borderBottom: "1px solid var(--line)",
                        }}
                      >
                        {sec.h}
                      </h3>
                      <Blocks blocks={sec.blocks} />
                    </section>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
