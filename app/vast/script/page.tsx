export default function ScriptPage() {
  return (
    <>
      <article className="band">
        <div className="wrap narrow">
          <div className="mono">For James — not for the screen</div>
          <h1 style={{ marginTop: 12 }}>The full script</h1>
          <p className="lede" style={{ color: "var(--muted)", fontSize: 16 }}>
            The slides carry headlines. This carries the talking. Read it once, then leave it —
            the room should watch you, not this page.
          </p>

          {/* ---------------- INTRODUCTION ---------------- */}
          <div style={{ marginTop: 56 }}>
            <div className="mono">Part 01 — ~10 min</div>
            <h2 style={{ fontSize: 26, marginTop: 8, marginBottom: 20 }}>Introduction</h2>

            <div className="field">
              <h4>The hook</h4>
              <p>
                Two ways to read a balance sheet: as the auditor asking &ldquo;prove it,&rdquo; or as the
                person building the system that has to prove itself. I&apos;ve spent my career
                doing both — sometimes in the same week.
              </p>
            </div>

            <div className="field">
              <h4>Present — what I do now</h4>
              <p>
                By day, I&apos;m a sales and use tax auditor for the California Department of
                Tax and Fee Administration — I go into businesses&apos; books and test whether
                transactions were taxed correctly under California&apos;s Revenue &amp;
                Taxation Code, including capital equipment purchases, which is a direct line
                into the capitalization topic we&apos;ll cover next.
              </p>
              <p>
                Outside of that, I work with ForensisGroup, a forensic and expert-witness
                accounting firm, building out Salesforce and AI tooling for the practice. And
                I&apos;m the founder of Sieyant, a tax preparation software business.
              </p>
            </div>

            <div className="field">
              <h4>Past — how I got here</h4>
              <p>
                Two degrees from UC Irvine — Biomedical Engineering and Business
                Economics, 2010 to 2014 — then a Bachelor&apos;s in Accounting from
                Western Governors University in 2024. I&apos;ve passed all four CPA
                exams and I&apos;m completing the experience requirement now, along
                with the Enrolled Agent credential — admitted to practice before the
                IRS.
              </p>
              <p>
                Salesforce and QuickBooks certified along the way, which is what put me in
                the room to build the systems I used to just audit: a LIMS for lab sample
                and asset tracking, a project management system built on Salesforce, a
                custom QuickBooks-to-Salesforce AP/AR and payment sync, and a survey
                platform written in Apex.
              </p>
            </div>

            <div className="field">
              <h4>Future — why Vast</h4>
              <p>
                Every role I&apos;ve had comes down to the same skill: translating between a
                rigid system of rules — tax code, GAAP, a chart of accounts — and the messy
                reality of a fast-moving business. That&apos;s exactly the seam Vast is
                scaling through right now.
              </p>
            </div>

            <div className="field">
              <h4>For fun</h4>
              <p>
                I write and record music — guitar and vocals. Building albums is a lot like
                building accounting systems: structured constraints where the interesting work
                happens.
              </p>
            </div>
          </div>

          {/* ---------------- TOPIC 1 ---------------- */}
          <div style={{ marginTop: 72 }}>
            <div className="mono">Part 02 — Capitalize or Expense?</div>
            <h2 style={{ fontSize: 26, marginTop: 8, marginBottom: 20 }}>Two real judgment calls I made</h2>

            <section style={{ marginBottom: 60 }}>
              <h3 style={{ fontSize: 22, marginBottom: 12 }}>Example 1 — ForensisGroup, Salesforce</h3>

              <div className="field">
                <h4>The technical spine</h4>
                <p>
                  A Salesforce subscription is a Cloud Computing Arrangement under{" "}
                  <strong>ASC 350-40</strong> (as amended by <strong>ASU 2018-15</strong>).
                  The subscription fee itself is never an asset&mdash;it&apos;s always a straight
                  period expense, like rent. The real judgment call lives in the{" "}
                  <em>implementation</em> costs:
                </p>
                <table style={{ marginTop: 14 }}>
                  <thead>
                    <tr>
                      <th>Capitalize</th>
                      <th>Expense immediately</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Configuration, customization, scripting, testing</td>
                      <td>Training, data conversion, subscription fees</td>
                    </tr>
                  </tbody>
                </table>
                <p style={{ marginTop: 12 }}>
                  Capitalized costs sit on the balance sheet as a prepaid asset and expense
                  ratably over the contract term (including likely renewals).
                </p>
              </div>

              <div className="field">
                <h4>Goals / requirements</h4>
                <p>
                  ForensisGroup runs its practice on Salesforce. Two builds sat on top of
                  that subscription: <strong>PMify</strong>, a project management
                  information system, and a <strong>custom survey platform written in
                  Apex</strong> that lets the firm spin up client surveys without a rebuild
                  each time. Roughly four months of development across both.
                </p>
                <p style={{ marginTop: 10 }}>
                  No outside consultant, no implementation invoice, no statement of work.
                  The entire cost of the build was <em>my own time as an employee</em>&mdash;which
                  is exactly what makes this a real judgment call instead of a bookkeeping
                  exercise.
                </p>
              </div>

              <div className="field">
                <h4>The question that had to be answered</h4>
                <p>
                  ASC 350-40 does <strong>not</strong> limit capitalizable implementation
                  cost to third-party invoices. Payroll for employees directly associated
                  with and devoting time to the application-development stage is
                  capitalizable too. So &ldquo;we didn&apos;t pay anyone&rdquo; is not, by
                  itself, an answer. Four months of internal configuration, customization,
                  and testing is precisely the activity the standard points at.
                </p>
              </div>

              <div className="field">
                <h4>My direct contribution</h4>
                <p>
                  I built both systems. The accounting analysis is the part I want to be
                  judged on, and I&apos;ll be straight about the sequence: the cost flowed
                  through payroll and was expensed as incurred. There was no capitalization
                  discussion at the time.
                </p>
                <p style={{ marginTop: 10 }}>
                  What I can defend is the <em>conclusion</em>, and I&apos;ve since worked
                  through why it holds:
                </p>
                <ul style={{ marginTop: 10 }}>
                  <li>
                    <strong>Measurement reliability.</strong> There were no contemporaneous
                    time records separating application-development work from everything
                    else I did. Without that, any capitalized number would have been a
                    reconstruction, not a measurement.
                  </li>
                  <li>
                    <strong>Stage mix.</strong> A large share of those four months was
                    preliminary-stage scoping and post-implementation refinement and user
                    training&mdash;expensed under the standard regardless.
                  </li>
                  <li>
                    <strong>Materiality.</strong> At the scale of a firm that size, the
                    capitalizable slice would not have changed any reader&apos;s view of the
                    financials.
                  </li>
                </ul>
              </div>

              <div className="field">
                <h4>Result</h4>
                <p>
                  Expensed as incurred. I believe that was the correct outcome&mdash;but it was
                  reached by default rather than by analysis, and those are not the same
                  thing. A defensible answer arrived at without documentation is still an
                  undocumented answer.
                </p>
              </div>

              <div className="field">
                <h4>Lessons learned / what I&apos;d do differently</h4>
                <ul>
                  <li>
                    <strong>Track hours to the project while it&apos;s happening.</strong>{" "}
                    Not to force a capitalization&mdash;to preserve the option. Once the quarter
                    closes, the ability to measure is gone.
                  </li>
                  <li>
                    <strong>Write the memo even when the answer is &ldquo;expense.&rdquo;</strong>{" "}
                    A short materiality memo costs an hour and turns a default into a
                    documented position an auditor can follow.
                  </li>
                  <li>
                    <strong>Recognize when scale flips the answer.</strong> The same analysis
                    at a company with real implementation invoices and dedicated engineering
                    time comes out the other way. The framework doesn&apos;t change; the
                    materiality does.
                  </li>
                </ul>
              </div>

              <div className="note" style={{ marginTop: 18 }}>
                <strong>Why this example is worth your time:</strong> the treatment
                here isn&apos;t &ldquo;fixed asset&rdquo; <em>or</em> &ldquo;expense.&rdquo;
                A capitalized CCA implementation cost is a third thing&mdash;a prepaid-type asset
                that amortizes into the same operating expense line as the subscription
                itself, never into depreciation. Coding it to a fixed-asset account would be
                wrong even when capitalizing is right.
              </div>
            </section>

            <section>
              <h3 style={{ fontSize: 22, marginBottom: 12 }}>
                Example 2 — The LIMS: freezers, equipment, and software I built
              </h3>

              <div className="field">
                <h4>The technical spine</h4>
                <p>
                  A Laboratory Information Management System is a capitalization problem with
                  two halves that fall under <em>two different standards</em>&mdash;and getting one
                  right doesn&apos;t get you the other.
                </p>
                <table style={{ marginTop: 14 }}>
                  <thead>
                    <tr>
                      <th></th>
                      <th>The hardware</th>
                      <th>The software I built</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Standard</strong></td>
                      <td>ASC 360 — PP&amp;E</td>
                      <td>ASC 350-40 — internal-use software</td>
                    </tr>
                    <tr>
                      <td><strong>What lands in basis</strong></td>
                      <td>
                        Purchase price + freight + installation + testing + site prep +
                        non-recoverable sales/use tax
                      </td>
                      <td>
                        Application-development stage only: coding, configuration, testing
                      </td>
                    </tr>
                    <tr>
                      <td><strong>What&apos;s expensed</strong></td>
                      <td>Routine maintenance, calibration, consumables</td>
                      <td>
                        Preliminary-stage scoping, training, data conversion,
                        post-implementation maintenance
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Then what</strong></td>
                      <td>Depreciate over useful life</td>
                      <td>Amortize over useful life, as an intangible</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="note" style={{ marginTop: 18 }}>
                <strong>The contrast with Example 1 is the whole point.</strong> Both examples
                run through ASC 350-40, and they come out in different places. Salesforce is a
                hosted service contract&mdash;capitalizable implementation cost becomes a
                prepaid-type asset that amortizes into the same operating line as the
                subscription. The LIMS is software the organization builds and controls&mdash;it
                becomes an <em>intangible asset</em> on the balance sheet with its own
                amortization. Same code section. Different asset. Different P&amp;L line.
              </div>

              <div className="field" style={{ marginTop: 22 }}>
                <h4>Goals / requirements</h4>
                <p>
                  The lab needed to track patient samples through their full lifecycle:
                  chain of custody, physical location down to the freezer and shelf position,
                  and the equipment those samples depended on. That last requirement is the
                  one that matters here&mdash;the system had to know what equipment existed, where
                  it was, and what condition it was in.
                </p>
                <p style={{ marginTop: 10, color: "var(--accent)" }}>
                  <em>
                    [Fill: which employer/client, roughly what year, and what triggered the
                    project — a compliance requirement, a growth problem, a failed audit?]
                  </em>
                </p>
              </div>

              <div className="field">
                <h4>The judgment calls</h4>
                <ul>
                  <li>
                    <strong>Unit of account on the equipment.</strong> Is a freezer plus its
                    temperature-monitoring system one asset or two? It changes the useful life
                    you depreciate over and whether a monitoring upgrade later is a component
                    replacement or a repair.
                  </li>
                  <li>
                    <strong>Repair vs. improvement.</strong> Servicing a freezer to keep it
                    running is maintenance&mdash;expense it. A compressor replacement or a controls
                    retrofit that extends useful life or increases capacity is a
                    betterment&mdash;capitalize it. Same vendor, same invoice format, opposite
                    treatment.
                  </li>
                  <li>
                    <strong>Threshold discipline.</strong> Individually cheap lab equipment
                    below the capitalization threshold gets expensed even when it lasts
                    years&mdash;and that&apos;s correct, but only if the threshold is a written
                    policy applied consistently rather than a judgment made invoice by
                    invoice.
                  </li>
                </ul>
              </div>

              <div className="field">
                <h4>My direct contribution</h4>
                <p>
                  I built the system, including the asset-management module&mdash;which is worth
                  naming plainly: <strong>that module is a fixed-asset subledger</strong>.
                  Asset identity, location, acquisition data, condition, and status, tied to
                  the operations that depend on it. I wasn&apos;t only accounting for fixed
                  assets; I built the system of record that a fixed-asset roll-forward gets
                  reconciled against.
                </p>
                <p style={{ marginTop: 10, color: "var(--accent)" }}>
                  <em>
                    [Fill: your specific role in any purchase or booking decisions — did you
                    recommend treatment, prepare the entries, or design the fields that
                    captured the data accounting needed? Any dollar ranges you can cite.]
                  </em>
                </p>
              </div>

              <div className="field">
                <h4>Result</h4>
                <p>
                  The lab got a single source of truth for both samples and the equipment
                  supporting them. From an accounting standpoint, the value is that asset
                  data was captured <em>at the point of acquisition</em>, in a structured
                  system&mdash;rather than reconstructed from invoices at year-end, which is where
                  fixed-asset registers usually go wrong.
                </p>
                <p style={{ marginTop: 10, color: "var(--accent)" }}>
                  <em>[Fill: a concrete outcome — time saved, audit finding avoided, sample
                  volume handled, headcount it supported.]</em>
                </p>
              </div>

              <div className="field">
                <h4>Lessons learned / what I&apos;d do differently</h4>
                <ul>
                  <li>
                    <strong>Design the subledger to answer the accounting question, not just
                    the operational one.</strong> The system tracked where equipment was. It
                    should also have carried in-service date, capitalized cost, and useful
                    life&mdash;so the operational register and the fixed-asset register are the
                    same register instead of two things that drift apart.
                  </li>
                  <li>
                    <strong>Decide unit of account before the first purchase, not after the
                    tenth.</strong> Componentization decided asset-by-asset produces a
                    register nobody can defend two years later.
                  </li>
                  <li>
                    <strong>The repair-vs-improvement call belongs at intake.</strong> Same
                    lesson as Example 1, same lesson I&apos;d bring to Ramp at Vast: the
                    person who knows what the work actually was is the person approving the
                    invoice&mdash;not the person reclassing it at close three weeks later.
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* ---------------- TOPIC 2 ---------------- */}
          <div style={{ marginTop: 72, marginBottom: 40 }}>
            <div className="mono">Part 03 — The First 90 Days at Vast</div>
            <h2 style={{ fontSize: 26, marginTop: 8, marginBottom: 20 }}>A plan, and one idea</h2>

            <section style={{ marginBottom: 52 }}>
              <h3 style={{ fontSize: 22, marginBottom: 20 }}>The timeline</h3>

              <div style={{ marginBottom: 28 }}>
                <h4 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Days 1–30: Learn the machine</h4>
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
                <h4 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Days 30–60: Start contributing</h4>
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
                <h4 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Days 60–90: Ship something</h4>
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
              <h3 style={{ fontSize: 22, marginBottom: 12 }}>Quick win: route the capitalize call to the point of entry</h3>

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
                  review queue, not straight to &ldquo;expense&rdquo;)
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
                  <div className="step">Above threshold, tangible asset → route to capex review queue</div>
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
              <h3 style={{ fontSize: 22, marginBottom: 12 }}>The brilliant idea: the international bridge, before it&apos;s a fire drill</h3>

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
