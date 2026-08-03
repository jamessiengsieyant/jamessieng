import SiteNav from "./components/SiteNav";
import BlackHole from "./components/BlackHole";
import AutoAdvance from "./components/AutoAdvance";

export default function Home() {
  return (
    <>
      <BlackHole />
      <div className="bh-scrim" aria-hidden="true" />
      <AutoAdvance />

      <div className="layer">
        <SiteNav />

        <header className="hero snap">
          <div className="wrap">
            <div className="mono">Accountant · Auditor · Builder</div>
            <h1>
              I audit the books,
              <br />
              then I build the system.
            </h1>
            <p className="lede">
              Accountant and California sales &amp; use tax auditor — CPA exams
              passed, completing the experience requirement for licensure. I
              spend my days testing whether transactions were recorded and taxed
              correctly — and my nights building the software that gets it right
              the first time.
            </p>
          </div>
        </header>

        <section className="band snap" id="credentials">
          <div className="wrap">
            <div className="mono">01 — Credentials</div>
            <h2>Credentialed and certified.</h2>
            <div className="grid grid-3" style={{ marginTop: 28 }}>
              <div className="card">
                <div className="cred">
                  <span className="k">CPA (Passed)</span>
                  <span className="v">
                    All exams passed — experience requirement in progress
                  </span>
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
                  <span className="k">QuickBooks Certified</span>
                  <span className="v">ProAdvisor</span>
                </div>
              </div>
              <div className="card">
                <div className="cred">
                  <span className="k">Security &amp; Cloud</span>
                  <span className="v">
                    CISSP (passed) · CompTIA A+/Network+/Security+ · AWS CCP · ISC2 CC
                  </span>
                </div>
              </div>
              <div className="card">
                <div className="cred">
                  <span className="k">Education</span>
                  <span className="v">
                    UC Irvine — B.S. Biomedical Engineering · B.A. Business
                    Economics · WGU — B.S. Accounting
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="band snap" id="work">
          <div className="wrap">
            <div className="mono">02 — Projects</div>
            <h2>Systems I&apos;ve built. Demos available.</h2>
            <div className="grid grid-2" style={{ marginTop: 28 }}>
              <div className="card">
                <h3>LIMS</h3>
                <p>
                  Laboratory Information Management System — patient sample
                  tracking, freezer location management, and asset management for
                  lab operations.
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

        <section className="band snap">
          <div className="wrap">
            <div className="mono">03 — Outside the ledger</div>
            <h2>For fun.</h2>
            <p>
              I sing, and I play guitar — sometimes both at the same time. The
              through-line with accounting is not as strange as it sounds: both
              are structured systems where the constraints are the interesting
              part.
            </p>
            <p style={{ marginTop: 32, color: "var(--muted)", fontSize: 14 }}>
              This page is falling into a Schwarzschild black hole as you scroll.{" "}
              <a href="/specs" style={{ color: "var(--accent)" }}>
                How it works →
              </a>
            </p>
            <div
              style={{
                marginTop: 48,
                paddingTop: 24,
                borderTop: "1px solid var(--line)",
                color: "var(--muted)",
                fontSize: 13,
              }}
            >
              © {new Date().getFullYear()} James Sieng
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
