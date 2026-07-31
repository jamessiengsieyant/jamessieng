export default function Topic1Page() {
  return (
    <>
      <article className="band">
        <div className="wrap narrow">
          <div className="mono">Part 02 — Capitalize or Expense?</div>
          <h1 style={{ marginTop: 12 }}>Two real judgment calls I made</h1>

          <div style={{ marginTop: 44 }}>
            <section style={{ marginBottom: 60 }}>
              <h2 style={{ fontSize: 26, marginBottom: 12 }}>
                Example 1 — ForensisGroup, Salesforce
              </h2>

              <div className="field">
                <h4>The technical spine</h4>
                <p>
                  A Salesforce subscription is a Cloud Computing Arrangement under{" "}
                  <strong>ASC 350-40</strong> (as amended by <strong>ASU 2018-15</strong>).
                  The subscription fee itself is never an asset—it&apos;s always a straight
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
                  The entire cost of the build was <em>my own time as an employee</em>—which
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
                    training—expensed under the standard regardless.
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
                  Expensed as incurred. I believe that was the correct outcome—but it was
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
                    Not to force a capitalization—to preserve the option. Once the quarter
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
                A capitalized CCA implementation cost is a third thing—a prepaid-type asset
                that amortizes into the same operating expense line as the subscription
                itself, never into depreciation. Coding it to a fixed-asset account would be
                wrong even when capitalizing is right.
              </div>
            </section>

            <section>
              <h2 style={{ fontSize: 26, marginBottom: 12 }}>
                Example 2 — The LIMS: freezers, equipment, and software I built
              </h2>

              <div className="field">
                <h4>The technical spine</h4>
                <p>
                  A Laboratory Information Management System is a capitalization problem with
                  two halves that fall under <em>two different standards</em>—and getting one
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
                hosted service contract—capitalizable implementation cost becomes a
                prepaid-type asset that amortizes into the same operating line as the
                subscription. The LIMS is software the organization builds and controls—it
                becomes an <em>intangible asset</em> on the balance sheet with its own
                amortization. Same code section. Different asset. Different P&amp;L line.
              </div>

              <div className="field" style={{ marginTop: 22 }}>
                <h4>Goals / requirements</h4>
                <p>
                  The lab needed to track patient samples through their full lifecycle:
                  chain of custody, physical location down to the freezer and shelf position,
                  and the equipment those samples depended on. That last requirement is the
                  one that matters here—the system had to know what equipment existed, where
                  it was, and what condition it was in.
                </p>
                <p style={{ marginTop: 10 }}>
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
                    running is maintenance—expense it. A compressor replacement or a controls
                    retrofit that extends useful life or increases capacity is a
                    betterment—capitalize it. Same vendor, same invoice format, opposite
                    treatment.
                  </li>
                  <li>
                    <strong>Threshold discipline.</strong> Individually cheap lab equipment
                    below the capitalization threshold gets expensed even when it lasts
                    years—and that&apos;s correct, but only if the threshold is a written
                    policy applied consistently rather than a judgment made invoice by
                    invoice.
                  </li>
                </ul>
              </div>

              <div className="field">
                <h4>My direct contribution</h4>
                <p>
                  I built the system, including the asset-management module—which is worth
                  naming plainly: <strong>that module is a fixed-asset subledger</strong>.
                  Asset identity, location, acquisition data, condition, and status, tied to
                  the operations that depend on it. I wasn&apos;t only accounting for fixed
                  assets; I built the system of record that a fixed-asset roll-forward gets
                  reconciled against.
                </p>
                <p style={{ marginTop: 10 }}>
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
                  system—rather than reconstructed from invoices at year-end, which is where
                  fixed-asset registers usually go wrong.
                </p>
                <p style={{ marginTop: 10 }}>
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
                    life—so the operational register and the fixed-asset register are the
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
                    invoice—not the person reclassing it at close three weeks later.
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
