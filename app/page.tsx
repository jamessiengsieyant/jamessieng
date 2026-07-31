import SiteNav from "./components/SiteNav";

export default function Home() {
  return (
    <>
      <SiteNav />

      <header className="hero">
        <div className="wrap">
          <div className="mono">Accountant · Auditor · Builder</div>
          <h1>
            I audit the books,
            <br />
            then I build the system.
          </h1>
          <p className="lede">
            CPA-credentialed accountant and California sales &amp; use tax auditor.
            I spend my days testing whether transactions were recorded and taxed
            correctly — and my nights building the software that gets it right the
            first time.
          </p>
          <div className="hero-actions">
            <a href="#credentials" className="btn btn-solid">
              Credentials
            </a>
            <a href="#work" className="btn">
              What I&apos;ve built
            </a>
          </div>
        </div>
      </header>

      <section className="band" id="credentials">
        <div className="wrap">
          <div className="mono">01 — Credentials</div>
          <h2>Licensed, credentialed, certified.</h2>
          <div className="grid grid-3" style={{ marginTop: 28 }}>
            <div className="card">
              <div className="cred">
                <span className="k">CPA</span>
                <span className="v">Certified Public Accountant</span>
              </div>
            </div>
            <div className="card">
              <div className="cred">
                <span className="k">Enrolled Agent</span>
                <span className="v">Admitted to practice before the IRS</span>
              </div>
            </div>
            <div className="card">
              <div className="cred">
                <span className="k">Salesforce</span>
                <span className="v">Administrator &amp; Advanced Administrator</span>
              </div>
            </div>
            <div className="card">
              <div className="cred">
                <span className="k">CISSP</span>
                <span className="v">Exam passed — endorsement in progress</span>
              </div>
            </div>
            <div className="card">
              <div className="cred">
                <span className="k">CompTIA</span>
                <span className="v">A+ · Network+ · Security+</span>
              </div>
            </div>
            <div className="card">
              <div className="cred">
                <span className="k">AWS</span>
                <span className="v">Certified Cloud Practitioner</span>
              </div>
            </div>
            <div className="card">
              <div className="cred">
                <span className="k">ISC2</span>
                <span className="v">Certified in Cybersecurity</span>
              </div>
            </div>
            <div className="card">
              <div className="cred">
                <span className="k">QuickBooks Certified</span>
                <span className="v">ProAdvisor</span>
              </div>
            </div>
            <div className="card">
              <div className="cred">
                <span className="k">Education</span>
                <span className="v">[School, degree, year — to confirm]</span>
              </div>
            </div>
            <div className="card">
              <div className="cred">
                <span className="k">Based in</span>
                <span className="v">Southern California</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band" id="work">
        <div className="wrap">
          <div className="mono">02 — Experience</div>
          <h2>Where I&apos;ve done the work.</h2>
          <ul className="list" style={{ marginTop: 24 }}>
            <li>
              <span className="yr">Present</span>
              <span className="body">
                <strong>Tax Auditor — CDTFA, State of California</strong>
                <span>
                  Sales and use tax audits under the California Revenue &amp;
                  Taxation Code. I examine books and records, test transaction
                  populations, and evaluate capital equipment purchases for correct
                  tax treatment — including where use tax must be self-accrued and
                  capitalized into an asset&apos;s basis.
                </span>
              </span>
            </li>
            <li>
              <span className="yr">Present</span>
              <span className="body">
                <strong>Systems &amp; Automation — ForensisGroup</strong>
                <span>
                  Forensic and expert-witness practice. Built out Salesforce and
                  AI-assisted tooling for how the firm tracks engagements — which
                  put me on the other side of the table from auditing: designing the
                  system that has to hold up rather than testing one that already
                  exists.
                </span>
              </span>
            </li>
            <li>
              <span className="yr">Present</span>
              <span className="body">
                <strong>Founder — Sieyant</strong>
                <span>
                  Tax preparation and bookkeeping software. Next.js, Postgres,
                  Stripe, Plaid, Clerk — architected and built end to end, including
                  the client portal and the internal admin panel. This site runs on
                  the same stack.
                </span>
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="mono">03 — Outside the ledger</div>
          <h2>For fun.</h2>
          <p>
            I write and record music — guitar and vocals — and I&apos;m slowly working
            toward a full album. The through-line with accounting is not as strange as
            it sounds: both are structured systems where the constraints are the
            interesting part.
          </p>
        </div>
      </section>

      <footer className="site">
        <div className="wrap">© {new Date().getFullYear()} James Sieng</div>
      </footer>
    </>
  );
}
