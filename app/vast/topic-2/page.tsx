import s from "../space.module.css";
import MockupClip from "../MockupClip";

export default function Topic2Page() {
  return (
    <div className={s.page}>
      <section className={`${s.slide} ${s.divider}`}>
        <div className={s.kicker}>Part 03 · Topic 2</div>
        <h1 className={s.h1}>The first 90 days.</h1>
        <p className={s.sub}>Learn the job honestly. Contribute like a builder.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Said plainly</div>
        <h2 className={s.h2}>I haven&rsquo;t done international accounting.</h2>
        <p className={s.sub}>But FAR tested consolidation and currency translation — I have the standards. What I lack is reps. The next ninety days are how I get them fast, without slowing your close down.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>The study map</div>
        <ul className={s.slideList}>
          <li><b>Currency translation · ASC 830</b><span>JPY and EUR to USD — the CTA runs through OCI, not the income statement.</span></li>
          <li><b>Consolidation &amp; eliminations</b><span>Intercompany, investment, minority interest — OneWorld or by hand.</span></li>
          <li><b>Transfer pricing</b><span>Arm&rsquo;s-length documentation for Section 482 and French/Japanese review.</span></li>
          <li><b>Indirect tax</b><span>VAT and Consumption Tax — the discipline I run daily on CA sales &amp; use tax.</span></li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Days 1–30 · Learn</div>
        <ul className={s.slideList}>
          <li><b>Walk one close by hand</b><span>Follow Japan&rsquo;s package through translation and eliminations into the consolidated statements — once, manually.</span></li>
          <li><b>Learn the PBC universe</b><span>What the auditors asked for last time, and what dragged.</span></li>
          <li><b>Map the OneWorld config</b><span>Entities, currencies, elimination rules.</span></li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Days 30–60 · Contribute</div>
        <ul className={s.slideList}>
          <li><b>Own real close tasks, under review</b><span>Reconciliations, translation entries — mine, checked by someone senior.</span></li>
          <li><b>Time the close</b><span>Where do the hours actually go?</span></li>
          <li><b>Pick one automation with the controller</b><span>Highest pain, lowest risk.</span></li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Days 60–90 · Ship</div>
        <ul className={s.slideList}>
          <li><b>My close slice, fully owned</b><span>No training wheels.</span></li>
          <li><b>First automation live</b><span>With a before-and-after number.</span></li>
          <li><b>Both documented</b><span>Well enough to survive me.</span></li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>While I learn — the builder part</div>
        <ul className={s.slideList}>
          <li><b>1 · A PBC tracker</b><span>Audit requests tracked like projects, status visible to everyone. I&rsquo;ve built exactly this before.</span></li>
          <li><b>2 · A package pre-check</b><span>Automated completeness and tie-out checks on subsidiary packages, before a human reviews them.</span></li>
          <li><b>3 · Point-of-entry classification rules</b><span>Remember the spray booth. Cleaner books upstream is a faster close downstream.</span></li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Build 3 · Point of entry</div>
        <div className={s.flowWrap}>
          <div className={s.step}>Transaction hits Ramp</div>
          <div className={s.arrow}>↓ AI category + rules</div>
          <div className={s.branch}>
            <div className={s.step}>Below threshold, routine → auto-code as expense</div>
            <div className={`${s.step} ${s.stepHit}`}>Above threshold → route to capex review queue</div>
            <div className={s.step}>CCA/SaaS vendor → split capitalize vs. expense</div>
          </div>
          <div className={s.arrow}>↓</div>
          <div className={s.step}>Approved coding syncs to NetSuite</div>
        </div>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>What it looks like</div>
        <h3 className={s.h3}>Not a real screen recording — a mockup of the flow.</h3>
        <MockupClip />
        <p className={s.sub} style={{ marginTop: 20 }}>The flag happens the moment the invoice lands — not three weeks later at close.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>The brilliant idea</div>
        <h2 className={s.h2}>Instrument the close.</h2>
        <p className={s.sub}>Treat books-to-reports like a pipeline: measure where the hours go, then remove one manual step every month — each small build shipped with a before-and-after number.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Why it works</div>
        <ul className={s.slideList}>
          <li><b>Most closes never get faster</b><span>Because nobody owns &ldquo;faster.&rdquo; I&rsquo;m offering to own it.</span></li>
          <li><b>The first three builds are already scoped</b><span>PBC tracker · package pre-check · point-of-entry rules.</span></li>
          <li><b>Every build ships with a number</b><span>Hours saved, requests tracked, reclasses avoided — measured, not claimed.</span></li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>The pitch</div>
        <h3 className={s.h3}>In 90 days: my close tasks owned, one automation live with numbers — and a close that gets a step faster every month after.</h3>
      </section>
    </div>
  );
}
