import s from "../space.module.css";

export default function IntroductionPage() {
  return (
    <div className={s.page}>
      <section className={s.slide}>
        <div className={s.kicker}>Part 01 · Introduction</div>
        <h1 className={s.h1}>James Sieng</h1>
        <p className={s.sub}>Two ways to read a balance sheet.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>The hook</div>
        <h2 className={s.h2}>&ldquo;Prove it&rdquo; vs. &ldquo;make it provable.&rdquo;</h2>
        <p className={s.sub}>I&rsquo;ve done both — sometimes in the same week.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Three chairs</div>
        <ul className={s.slideList}>
          <li>
            <b>CDTFA</b> — sales &amp; use tax auditor
            <span>Testing whether businesses taxed capital purchases correctly under CA law.</span>
          </li>
          <li>
            <b>ForensisGroup</b> — Salesforce &amp; AI tooling
            <span>Built the systems that produce the records I used to audit.</span>
          </li>
          <li>
            <b>Sieyant</b> — founder
            <span>Tax preparation software, shipped end to end.</span>
          </li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Past · how I got here</div>
        <ul className={s.slideList}>
          <li>
            <b>UC Irvine</b>, 2010–2014
            <span>Biomedical Engineering &amp; Business Economics.</span>
          </li>
          <li>
            <b>Western Governors University</b>, 2024
            <span>B.S. Accounting.</span>
          </li>
          <li>
            <b>CPA</b> — all four exams passed
            <span>Completing the experience requirement, alongside the Enrolled Agent credential — admitted to practice before the IRS.</span>
          </li>
          <li>
            <b>Salesforce &amp; QuickBooks certified</b>
            <span>Built a LIMS, a Salesforce PM system (PMify), a QuickBooks↔Salesforce AP/AR sync, and an Apex survey platform.</span>
          </li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Future · why Vast</div>
        <h2 className={s.h2}>Rules meet reality.</h2>
        <p className={s.sub}>
          Tax code. GAAP. A chart of accounts. Then a company moving faster than any of them — the seam Vast is scaling through right now.
        </p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>For fun</div>
        <h2 className={s.h2}>Guitar, vocals, unfinished songs.</h2>
        <p className={s.sub}>Building an album is a lot like building an accounting system: structure that makes room for the interesting work.</p>
      </section>
    </div>
  );
}
