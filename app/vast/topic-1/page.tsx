import s from "../space.module.css";

export default function Topic1Page() {
  return (
    <div className={s.page}>
      <section className={`${s.slide} ${s.divider}`}>
        <div className={s.kicker}>Part 02 · Topic 1</div>
        <h1 className={s.h1}>Capitalize or expense?</h1>
        <p className={s.sub}>Two real calls I had to make — and defend.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Example 1</div>
        <h2 className={s.h2}>Salesforce at ForensisGroup.</h2>
        <p className={s.sub}>PMify, a project-management build, plus a custom survey platform written in Apex. ~4 months, my own time, no outside consultant.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>The rule · ASC 350-40 / ASU 2018-15</div>
        <h3 className={s.h3}>A subscription is never an asset. The setup might be.</h3>
        <div className={s.two}>
          <div className={s.cap}>
            <h4>Capitalize</h4>
            <p>Configuration<br />Customization<br />Scripting &amp; testing</p>
          </div>
          <div className={s.exp}>
            <h4>Expense</h4>
            <p>Subscription fees<br />Training<br />Data conversion</p>
          </div>
        </div>
        <p className={s.sub} style={{ marginTop: 20 }}>Payroll for time on application-development counts too — &ldquo;we didn&rsquo;t pay a vendor&rdquo; isn&rsquo;t the answer by itself.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>What actually happened</div>
        <ul className={s.slideList}>
          <li><b>Result</b><span>Expensed as incurred — reached by default, not by analysis.</span></li>
          <li><b>Why I&rsquo;d still defend it</b><span>No contemporaneous time records to separate dev work · heavy preliminary-stage &amp; training share · immaterial at this firm&rsquo;s scale.</span></li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Lessons learned</div>
        <ul className={s.slideList}>
          <li><b>Track hours while it&rsquo;s happening</b><span>Not to force capitalization — to preserve the option.</span></li>
          <li><b>Write the memo even when the answer is &ldquo;expense&rdquo;</b><span>An hour of documentation turns a default into a defensible position.</span></li>
          <li><b>Scale flips the answer</b><span>Same framework, bigger company with real invoices — different outcome.</span></li>
        </ul>
        <div className={s.calloutNote}><strong>The twist:</strong> a capitalized CCA cost isn&rsquo;t a fixed asset — it&rsquo;s a prepaid-type asset amortizing into the same opex line as the subscription. Never depreciation.</div>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Example 2</div>
        <h2 className={s.h2}>The LIMS — freezers, equipment, software.</h2>
        <p className={s.sub}>One system, two capitalization standards, and I built the asset-management module myself.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Two halves, two standards</div>
        <div className={s.two}>
          <div className={s.cap}>
            <h4>Hardware · ASC 360</h4>
            <p>Price + freight + install + testing → depreciate</p>
          </div>
          <div className={s.exp}>
            <h4>Software I built · ASC 350-40</h4>
            <p>Coding, config, testing → amortize as intangible</p>
          </div>
        </div>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>The judgment calls</div>
        <ul className={s.slideList}>
          <li><b>Unit of account</b><span>Freezer + monitoring system — one asset or two?</span></li>
          <li><b>Repair vs. improvement</b><span>Servicing keeps it running (expense). Compressor swap extends life (capitalize).</span></li>
          <li><b>Threshold discipline</b><span>Cheap equipment expensed even if it lasts years — if the policy is written and consistent.</span></li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>My contribution</div>
        <h3 className={s.h3}>Built the fixed-asset subledger, not just the tracker.</h3>
        <p className={s.sub}>Asset identity, location, acquisition data, condition, status — the system of record a fixed-asset roll-forward reconciles against.</p>
        <div className={s.calloutNote}><strong>Needs you:</strong> which employer/year and what triggered the project · your specific role in booking decisions · one concrete result (time saved, audit finding avoided, scale supported).</div>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Lessons learned</div>
        <ul className={s.slideList}>
          <li><b>Design for the accounting question, not just the operational one</b><span>In-service date, capitalized cost, useful life — same register, not two that drift apart.</span></li>
          <li><b>Decide unit of account before purchase one</b><span>Not after the tenth.</span></li>
          <li><b>Repair-vs-improvement belongs at intake</b><span>The person approving the invoice knows — not the person reclassing it at close.</span></li>
        </ul>
      </section>
    </div>
  );
}
