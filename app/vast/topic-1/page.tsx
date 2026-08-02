import s from "../space.module.css";

export default function Topic1Page() {
  return (
    <div className={s.page}>
      <section className={`${s.slide} ${s.divider}`}>
        <div className={s.kicker}>Part 02 · Topic 1</div>
        <h1 className={s.h1}>Capitalize or expense?</h1>
        <p className={s.sub}>Two real calls. Two different chairs.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Example 1 · From the audit chair</div>
        <h2 className={s.h2}>The spray booth in the repairs account.</h2>
        <p className={s.sub}>A CDTFA field audit — details disguised.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Every audit starts with a split</div>
        <div className={s.two}>
          <div className={s.cap}>
            <h4>Fixed assets</h4>
            <p>Equipment, machinery, improvements</p>
          </div>
          <div className={s.exp}>
            <h4>Expense items</h4>
            <p>Repairs, supplies, consumables</p>
          </div>
        </div>
        <p className={s.sub} style={{ marginTop: 20 }}>That split <em>is</em> a capitalization review — I just come at it from the enforcement side.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>The find</div>
        <ul className={s.slideList}>
          <li><b>~$20,000 invoice — in R&amp;M</b><span>Repairs &amp; maintenance: where assets go to hide.</span></li>
          <li><b>Out-of-state vendor, no tax charged</b><span>Use tax never self-assessed.</span></li>
          <li><b>Equipment + freight + installation</b><span>All on one invoice.</span></li>
          <li><b>Not on the depreciation schedule</b><span>Their own records told on them.</span></li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>The call</div>
        <ul className={s.slideList}>
          <li><b>Added capability — didn&rsquo;t restore it</b><span>Not fixing a booth. Acquiring one.</span></li>
          <li><b>Useful life in years</b><span>Not months.</span></li>
          <li><b>Measure: price + freight + install</b><span>Same principle as ASC 360 basis — tax and book agree.</span></li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>The discipline</div>
        <h2 className={s.h2}>It has to cut both ways.</h2>
        <p className={s.sub}>The genuine repairs in that account — compressor service, filters — I left alone. If the call only goes one direction, it isn&rsquo;t judgment.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Result &amp; lesson</div>
        <ul className={s.slideList}>
          <li><b>The classification held</b><span>Defended at exit conference; asset capitalized, use-tax accrual set up.</span></li>
          <li><b>Nobody was cheating</b><span>The invoice just landed in the wrong pile — for three years.</span></li>
          <li><b>The decision belongs at the point of entry</b><span>On purpose, under a written policy. Hold that thought for Topic 2.</span></li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Example 2 · From the builder chair</div>
        <h2 className={s.h2}>Four months of my own time.</h2>
        <p className={s.sub}>PMify + Survey Builder, built on ForensisGroup&rsquo;s Salesforce. No consultant invoice — the invoice was me.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>The rule · ASC 350-40 / ASU 2018-15</div>
        <h3 className={s.h3}>A subscription is never an asset. The setup might be.</h3>
        <div className={s.two}>
          <div className={s.cap}>
            <h4>Capitalize</h4>
            <p>Configuration<br />Customization<br />Coding &amp; testing</p>
          </div>
          <div className={s.exp}>
            <h4>Expense</h4>
            <p>Subscription fees<br />Training<br />Data conversion</p>
          </div>
        </div>
        <p className={s.sub} style={{ marginTop: 20 }}>Internal payroll counts — &ldquo;we didn&rsquo;t pay a vendor&rdquo; isn&rsquo;t an answer.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>What actually happened</div>
        <ul className={s.slideList}>
          <li><b>Expensed as incurred — by default</b><span>No capitalization discussion at the time. Nobody asked, including me.</span></li>
          <li><b>The conclusion still holds</b><span>No contemporaneous time records · scoping &amp; training-heavy mix · immaterial at that scale.</span></li>
          <li><b>&ldquo;The right answer reached the wrong way&rdquo;</b><span>A defensible answer without documentation is still an undocumented answer.</span></li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>What I&rsquo;d do differently</div>
        <ul className={s.slideList}>
          <li><b>Track hours while it&rsquo;s happening</b><span>Not to force capitalization — to preserve the option.</span></li>
          <li><b>Write the memo even when the answer is &ldquo;expense&rdquo;</b><span>An hour of work turns a default into a position.</span></li>
          <li><b>Scale flips the answer</b><span>Same framework at Vast — NetSuite and Ramp implementations lived this exact question.</span></li>
        </ul>
        <div className={s.calloutNote}><strong>The twist:</strong> a capitalized CCA cost isn&rsquo;t a fixed asset — it&rsquo;s a prepaid-type asset amortizing into the same opex line as the subscription. Never depreciation.</div>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Topic 1 close</div>
        <h2 className={s.h2}>Two chairs. Same principle.</h2>
        <p className={s.sub}>Classify on purpose, at the source, with the documentation to prove it.</p>
      </section>
    </div>
  );
}
