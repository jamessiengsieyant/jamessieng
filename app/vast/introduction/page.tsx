export default function IntroductionPage() {
  return (
    <>
      <article className="band">
        <div className="wrap narrow">
          <div className="mono">Part 01 — ~15 min, practiced to memory</div>
          <h1 style={{ marginTop: 12 }}>Introduction</h1>

          <div style={{ marginTop: 44 }}>
            <div className="field">
              <h4>The hook</h4>
              <p>
                Two ways to read a balance sheet: as the auditor asking "prove it," or as the
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
                [CPA credential, education details, school, year — to confirm and fill in]
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
        </div>
      </article>
    </>
  );
}
