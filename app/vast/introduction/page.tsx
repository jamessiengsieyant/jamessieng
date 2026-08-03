import s from "../space.module.css";

export default function IntroductionPage() {
  return (
    <div className={s.page}>
      <section className={s.slide}>
        <div className={s.kicker}>Part 01 · Introduction</div>
        <h1 className={s.h1}>James Sieng</h1>
        <p className={s.sub}>Where I came from, what I&rsquo;ve built, and why this role.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>01 · Education</div>
        <h2 className={s.h2}>Two degrees at eighteen.<br />A third, fourteen years later.</h2>
        <ul className={s.slideList}>
          <li>
            <b>UC Irvine · 2010–2014</b>
            <span>B.S. Biomedical Engineering · B.A. Business Economics.</span>
          </li>
          <li>
            <b>Business econ came with accounting courses</b>
            <span>Debits and credits. Filed away, and not thought about for years.</span>
          </li>
          <li>
            <b>The CPA had a prerequisite I didn&rsquo;t have</b>
            <span>Accounting units. So it sat on the shelf.</span>
          </li>
          <li>
            <b>WGU · 2024 — B.S. Accounting</b>
            <span>I bought the CPA review course before I graduated.</span>
          </li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>02 · Work &amp; projects</div>
        <h2 className={s.h2}>The lab taught me the work.<br />The data taught me the system.</h2>
        <ul className={s.slideList}>
          <li>
            <b>Research associate</b>
            <span>Years at the bench, in the workflow — before I ever tried to automate one.</span>
          </li>
          <li>
            <b>Data analyst · Amgen</b>
            <span>Contract role: clean up years of historical lab data. VBA to read inconsistent formats and land them as tabular records in a relational database.</span>
          </li>
          <li>
            <b>Accidental Salesforce admin · CRO</b>
            <span>The database work made the platform obvious. I could already picture what to build.</span>
          </li>
          <li>
            <b>LIMS, built on Salesforce</b>
            <span>Chain of custody, non-repudiation, barcode scan-in. You always know where a patient sample is and who touched it.</span>
          </li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>02 · Work &amp; projects</div>
        <h2 className={s.h2}>Then I went and learned the books.</h2>
        <ul className={s.slideList}>
          <li>
            <b>ForensisGroup — systems &amp; accounting tooling</b>
            <span>PMify · Survey Builder, written in Apex · automated AR/AP payment sync into QuickBooks.</span>
          </li>
          <li>
            <b>H&amp;R Block — first season, new system, no training</b>
            <span>250+ returns · $70K+ in revenue · #1 new preparer in the district, by count and by revenue.</span>
          </li>
          <li>
            <b>Individuals — and moderately complex business returns</b>
            <span>1120, 1120-S, partnerships. That season is what made the auditor job possible.</span>
          </li>
          <li>
            <b>CDTFA — sales &amp; use tax auditor · current</b>
            <span>Examining books and records. Now I&rsquo;m the one asking.</span>
          </li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>03 · Certifications</div>
        <h2 className={s.h2}>Every one of these started as a gap.</h2>
        <ul className={s.slideList}>
          <li>
            <b>7× Salesforce certified · QuickBooks ProAdvisor</b>
            <span>Learned the platform on the job, then went and verified it.</span>
          </li>
          <li>
            <b>Enrolled Agent — admitted to practice before the IRS</b>
            <span>Business returns through Form 1120. I read small-business books for a living: trial balance, Schedule L, M-1.</span>
          </li>
          <li>
            <b>CPA — all four exams passed</b>
            <span>Completing the experience requirement.</span>
          </li>
          <li>
            <b>CISSP passed · CompTIA A+, Network+, Security+ · ISC2 CC · AWS CCP</b>
            <span>I owned the systems, so I went and learned how to secure them.</span>
          </li>
        </ul>
        <div className={s.calloutNote}>
          The pattern: <strong>find the gap, go close it, prove it closed, then use it where I am.</strong>
        </div>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>The NetSuite question</div>
        <h2 className={s.h2}>Platforms transfer.</h2>
        <p className={s.sub}>I didn&rsquo;t just use Salesforce — I built accounting on it: AR/AP payments syncing into QuickBooks. NetSuite is the same kind of animal. The ledger concepts don&rsquo;t change; only the menus move.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Why Vast</div>
        <h2 className={s.h2}>Rules meet reality.</h2>
        <p className={s.sub}>
          Tax code. GAAP. A chart of accounts. Then a company moving faster than any of them — the seam Vast is scaling through right now.
        </p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>For fun</div>
        <h2 className={s.h2}>I sing.<br />I play guitar.</h2>
        <p className={s.sub}>Sometimes both at the same time.</p>
      </section>
    </div>
  );
}
