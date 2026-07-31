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
                      Ship two things. First, pilot the Ramp coding rules below on a narrow
                      slice of spend, with a before/after on reclass volume. Second, deliver
                      the international consolidation map — how Japan and France actually flow
                      into the US-GAAP close today. A lightweight business case for each, not
                      just a demo.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            <section style={{ marginBottom: 52 }}>
              <h2 style={{ fontSize: 26, marginBottom: 12 }}>Quick win: route the capitalize call to the point of entry</h2>

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
                Small build, immediate payoff. Fewer reclass journal entries at close, a
                cleaner audit trail, and a policy that used to live in someone&apos;s head now
                lives in the system.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: 26, marginBottom: 12 }}>The brilliant idea: the international bridge, before it&apos;s a fire drill</h2>

              <p style={{ marginTop: 12 }}>
                Vast isn&apos;t a single-entity company anymore. There&apos;s{" "}
                <a href="https://www.vastspace.com/updates/vast-expands-to-japan-appointing-naoko-yamazaki-as-general-manager-of-vast-japan-gk" target="_blank" rel="noopener noreferrer">Vast Japan GK</a>{" "}
                in Tokyo, and a French operation tied to Vast&apos;s agreement with the French
                government to fly French astronauts to LEO. Two real subsidiaries means the US
                consolidation now has company on the same close calendar.
              </p>

              <p style={{ marginTop: 16, fontWeight: 600 }}>
                Four things stack up under &ldquo;international,&rdquo; and each is a real
                accounting problem, not a legal one:
              </p>

              <ul style={{ marginTop: 12 }}>
                <li style={{ marginBottom: 10 }}>
                  <strong>Currency translation (ASC 830).</strong> Japan GK&apos;s functional
                  currency is JPY, the France entity&apos;s is EUR. Translating both to USD for
                  consolidation produces a Cumulative Translation Adjustment that runs through
                  OCI, not the income statement — a distinction that&apos;s easy to code wrong
                  and expensive to unwind later.
                </li>
                <li style={{ marginBottom: 10 }}>
                  <strong>Multi-entity consolidation.</strong> If Japan and France aren&apos;t
                  already on NetSuite OneWorld with intercompany elimination built in, that
                  consolidation is happening by hand somewhere — and manual consolidation is
                  the first thing that breaks as transaction volume grows.
                </li>
                <li style={{ marginBottom: 10 }}>
                  <strong>Transfer pricing.</strong> Any cost-sharing, management fee, or R&amp;D
                  allocation between the US parent and the two subs needs arm&apos;s-length
                  documentation to hold up under both a US Section 482 exam and a French or
                  Japanese tax authority&apos;s own review.
                </li>
                <li>
                  <strong>Indirect tax.</strong> France runs on VAT, Japan on Consumption Tax —
                  different mechanics, same underlying discipline I already practice daily
                  auditing California sales and use tax: does this transaction carry the tax it
                  should, documented at the point of entry rather than reconstructed at audit.
                </li>
              </ul>

              <p style={{ marginTop: 22 }}>
                <strong>The pitch:</strong> within 90 days, a documented map of exactly how
                Japan and France flow into the US-GAAP consolidation today — manual or
                NetSuite-native — and a plan to close whichever gap is biggest first. Not a
                redesign of what Vast already has. Making sure the multi-entity structure that
                already runs Ramp and NetSuite domestically is held to the same standard
                internationally, before the international side gets big enough that a gap
                becomes a restatement.
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
