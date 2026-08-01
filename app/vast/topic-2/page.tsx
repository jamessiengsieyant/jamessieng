import s from "../space.module.css";

export default function Topic2Page() {
  return (
    <div className={s.page}>
      <section className={`${s.slide} ${s.divider}`}>
        <div className={s.kicker}>Part 03 · Topic 2</div>
        <h1 className={s.h1}>The first 90 days.</h1>
        <p className={s.sub}>Learn it. Plan it. Ship it.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Days 1–30 · Learn</div>
        <ul className={s.slideList}>
          <li><b>Map the policy</b><span>Chart of accounts, capitalization threshold — documented or tribal knowledge?</span></li>
          <li><b>Understand Ramp</b><span>Category mappings, AI-coding accuracy, which vendors trigger reclasses most.</span></li>
          <li><b>Shadow month-end close</b><span>Where do manual reclasses happen? That friction is the opportunity.</span></li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Days 30–60 · Plan</div>
        <ul className={s.slideList}>
          <li><b>Tighten GL coding rules</b><span>For the calls that recur most — CCA/SaaS costs, capex threshold edge cases.</span></li>
          <li><b>Document the policy crisply</b><span>With the controller / FP&amp;A, if it isn&rsquo;t already.</span></li>
          <li><b>Quantify the reclass problem</b><span>How many per month, how much time it costs.</span></li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Days 60–90 · Ship</div>
        <ul className={s.slideList}>
          <li><b>Pilot the Ramp coding rules</b><span>On a narrow slice of spend, with a before/after on reclass volume.</span></li>
          <li><b>Deliver the international consolidation map</b><span>How Japan and France actually flow into the US-GAAP close today.</span></li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Quick win</div>
        <h2 className={s.h2}>Route the capitalize call to the point of entry.</h2>
        <p className={s.sub}>Ramp&rsquo;s AI coding is fast and generally accurate — not built to catch a threshold crossing, or a SaaS invoice blending capitalizable setup with training costs.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>The fix</div>
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
        <p className={s.sub} style={{ marginTop: 20 }}>Small build. Fewer reclass entries at close, a cleaner audit trail.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>The brilliant idea</div>
        <h2 className={s.h2}>The international bridge — before it&rsquo;s a fire drill.</h2>
        <p className={s.sub}>Vast Japan GK in Tokyo. A French operation tied to flying French astronauts to LEO. Two real subsidiaries on the same close calendar.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Four real accounting problems</div>
        <ul className={s.slideList}>
          <li><b>Currency translation · ASC 830</b><span>JPY and EUR to USD — the CTA runs through OCI, not the income statement.</span></li>
          <li><b>Multi-entity consolidation</b><span>NetSuite OneWorld with intercompany elimination, or by hand — manual breaks first as volume grows.</span></li>
          <li><b>Transfer pricing</b><span>Arm&rsquo;s-length documentation for US Section 482 and French/Japanese review.</span></li>
          <li><b>Indirect tax</b><span>French VAT, Japanese Consumption Tax — same discipline I run daily on CA sales &amp; use tax.</span></li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>The pitch</div>
        <h3 className={s.h3}>Within 90 days: a documented map of how Japan and France flow into the US-GAAP close today.</h3>
        <p className={s.sub}>Not a redesign — making sure the multi-entity structure already running Ramp and NetSuite domestically holds to the same standard internationally, before a gap becomes a restatement.</p>
      </section>
    </div>
  );
}
