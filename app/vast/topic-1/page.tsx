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
              <h2 style={{ fontSize: 26, marginBottom: 12 }}>Example 2 — TBD</h2>

              <div className="note">
                <strong>Note:</strong> CDTFA audit files are off the table — confidential
                taxpayer information under CA Revenue &amp; Taxation Code.
              </div>

              <p style={{ marginTop: 18 }}>
                Candidates for the second example:
              </p>
              <ul style={{ marginTop: 8 }}>
                <li>A repair-vs-improvement call on equipment (extended useful life vs. routine maintenance)</li>
                <li>A Sieyant capitalize/expense decision (software, infrastructure, tools)</li>
                <li>Another ForensisGroup situation unrelated to Salesforce</li>
              </ul>

              <div className="field" style={{ marginTop: 24 }}>
                <h4>Goals / requirements</h4>
                <p>[TBD: to confirm]</p>
              </div>

              <div className="field">
                <h4>My direct contribution</h4>
                <p>[TBD: to confirm]</p>
              </div>

              <div className="field">
                <h4>Result</h4>
                <p>[TBD: to confirm]</p>
              </div>

              <div className="field">
                <h4>Lessons learned / what I&apos;d do differently</h4>
                <p>[TBD: to confirm]</p>
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
