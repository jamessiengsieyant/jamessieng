export default function Topic2Page() {
  return (
    <>
      <article className="band">
        <div className="wrap narrow">
          <div className="mono">Part 03 — The First 90 Days at Vast</div>
          <h1 style={{ marginTop: 12 }}>A plan, and one idea</h1>

          <div style={{ marginTop: 44 }}>
            <section style={{ marginBottom: 52 }}>
              <h2 style={{ fontSize: 26, marginBottom: 20 }}>The timeline</h2>

              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                  Days 1–30: Learn the machine
                </h3>
                <ul className="list" style={{ margin: 0 }}>
                  <li style={{ borderBottom: "none" }}>
                    <span className="yr">Week 1</span>
                    <span className="body">
                      Map the current chart of accounts, capitalization policy, and threshold.
                      What&apos;s Vast&apos;s dollar line between capitalize and expense today?
                      Is it documented or tribal knowledge?
                    </span>
                  </li>
                  <li style={{ borderBottom: "none" }}>
                    <span className="yr">Week 2–3</span>
                    <span className="body">
                      Understand how Ramp is configured: category mappings, AI-suggested coding
                      accuracy, which dimensions (department/class/location) are in use. Which
                      vendors trigger reclasses most often?
                    </span>
                  </li>
                  <li style={{ borderBottom: "none" }}>
                    <span className="yr">Week 4</span>
                    <span className="body">
                      Shadow month-end close. Where do manual reclasses happen? Where does the
                      system fail? That friction is the opportunity.
                    </span>
                  </li>
                </ul>
              </div>

              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                  Days 30–60: Start contributing
                </h3>
                <ul className="list" style={{ margin: 0 }}>
                  <li style={{ borderBottom: "none" }}>
                    <span className="yr">Week 5–6</span>
                    <span className="body">
                      Tighten the GL coding rules for the judgment calls that recur most —
                      CCA/SaaS implementation costs, capex threshold edge cases. Document the
                      rationale.
                    </span>
                  </li>
                  <li style={{ borderBottom: "none" }}>
                    <span className="yr">Week 7–8</span>
                    <span className="body">
                      Partner with the controller/FP&amp;A on documenting the capitalization
                      policy crisply, if it isn&apos;t already. Start quantifying the
                      manual-reclass problem: how many per month, how much time it costs.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                  Days 60–90: Ship something
                </h3>
                <ul className="list" style={{ margin: 0 }}>
                  <li style={{ borderBottom: "none" }}>
                    <span className="yr">Week 9–12</span>
                    <span className="body">
                      Pilot the idea below on a narrow slice of spend, with a before/after on
                      reclass volume. Bring a lightweight business case, not just a demo.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 style={{ fontSize: 26, marginBottom: 12 }}>The idea</h2>

              <p style={{ marginTop: 12, fontWeight: 600 }}>
                Route the capitalize-vs-expense decision to the point of transaction entry in
                Ramp, not to close.
              </p>

              <p style={{ marginTop: 16 }}>
                AI-assisted coding in Ramp is tuned for speed and general category accuracy —
                not purpose-built to catch the two judgment calls that create rework later:
              </p>
              <ol style={{ marginTop: 8, marginLeft: 20 }}>
                <li>
                  An invoice that crosses the capitalization threshold (should go to a capex
                  review queue, not straight to "expense")
                </li>
                <li>
                  A SaaS vendor bill that blends capitalizable implementation work (config,
                  customization, testing) with costs that must stay expensed (training, data
                  conversion) on the same invoice
                </li>
              </ol>

              <p style={{ marginTop: 20 }}>
                <strong>The fix:</strong> a lightweight rules layer on top of Ramp&apos;s
                existing categorization that flags those two patterns before they sync to
                NetSuite, and routes them to a short review queue instead of posting straight
                through.
              </p>

              <div className="flow" style={{ marginTop: 20 }}>
                <div className="step">Transaction hits Ramp</div>
                <div className="arrow">↓ AI category + rules</div>
                <div className="branch">
                  <div className="step">Below threshold, routine → auto-code as expense</div>
                  <div className="step">
                    Above threshold, tangible asset → route to capex review queue
                  </div>
                  <div className="step">
                    CCA / SaaS implementation vendor → split: capitalize config &amp; testing,
                    expense training &amp; data conversion
                  </div>
                </div>
                <div className="arrow">↓</div>
                <div className="step">Approved coding syncs to NetSuite</div>
              </div>

              <p style={{ marginTop: 22 }}>
                <strong>Why this works:</strong> small build, immediate payoff. Fewer reclass
                journal entries at close, a cleaner audit trail, and a policy that used to live
                in someone&apos;s head now lives in the system. Once it&apos;s working, it
                becomes part of standard operating procedure — and that&apos;s not just a
                feature, it&apos;s culture.
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
