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
            Accountant and California sales &amp; use tax auditor — CPA exams
            passed, completing the experience requirement for licensure.
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
          <h2>Credentialed and certified.</h2>
          <div className="grid grid-3" style={{ marginTop: 28 }}>
            <div className="card">
              <div className="cred">
                <span className="k">CPA (Passed)</span>
                <span className="v">All exams passed — experience requirement in progress</span>
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
                <span className="k">UC Irvine</span>
                <span className="v">
                  B.S. Biomedical Engineering · B.A. Business Economics
                  (2010–2014)
                </span>
              </div>
            </div>
            <div className="card">
              <div className="cred">
                <span className="k">WGU</span>
                <span className="v">B.S. Accounting (2024)</span>
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

      <section className="band" id="projects">
        <div className="wrap">
          <div className="mono">03 — Projects</div>
          <h2>Systems I&apos;ve built. Demos available.</h2>
          <div className="grid grid-2" style={{ marginTop: 28 }}>
            <div className="card">
              <h3>LIMS</h3>
              <p>
                Laboratory Information Management System — patient sample tracking,
                freezer location management, and asset management for lab
                operations.
              </p>
            </div>
            <div className="card">
              <h3>PMify — PMIS</h3>
              <p>
                Project Management Information System built natively on
                Salesforce.
              </p>
            </div>
            <div className="card">
              <h3>AP/AR &amp; Payment Sync</h3>
              <p>
                Custom QuickBooks Online ↔ Salesforce integration syncing
                accounts payable, accounts receivable, and payments between the
                CRM and the ledger — no manual re-keying, no drift between
                systems.
              </p>
            </div>
            <div className="card">
              <h3>Survey Platform</h3>
              <p>
                Custom survey solution built in Apex — create surveys from
                Salesforce with no rebuild time, auto-deliver to the right
                clients, hosted on the main website.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="mono">04 — Outside the ledger</div>
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
