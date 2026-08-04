import s from "../space.module.css";

export default function Topic1Page() {
  return (
    <div className={s.page}>
      <section className={`${s.slide} ${s.divider}`}>
        <div className={s.kicker}>Part 02 · Topic 1</div>
        <h1 className={s.h1}>Capitalize or expense?</h1>
        <p className={s.sub}>Two real calls, two chairs — each told as STAR: situation, task, action, result. Plus lessons.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Example 1 · From the audit chair</div>
        <h2 className={s.h2}>The spray booth in the repairs account.</h2>
        <p className={s.sub}>A CDTFA field audit — details disguised.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>The requirement · where a purchase exam looks</div>
        <div className={s.two}>
          <div className={s.cap}>
            <h4>Fixed asset additions</h4>
            <p>A list of things somebody already decided were assets</p>
          </div>
          <div className={s.exp}>
            <h4>Expense accounts</h4>
            <p>Repairs, supplies, consumables — and whatever got misfiled</p>
          </div>
        </div>
        <p className={s.sub} style={{ marginTop: 20 }}>The schedule is the easy pile. The expense accounts are where you earn the day — because that&rsquo;s where assets hide. Not from tax. <em>From detection.</em></p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Situation · The find</div>
        <ul className={s.slideList}>
          <li><b>~$20,000 invoice — in R&amp;M</b><span>Repairs &amp; maintenance: where assets go to hide.</span></li>
          <li><b>Out-of-state vendor, no tax charged</b><span>Use tax never self-assessed.</span></li>
          <li><b>Equipment + freight + installation</b><span>All on one invoice.</span></li>
          <li><b>Not on the depreciation schedule</b><span>Their own records told on them.</span></li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>The interesting part</div>
        <h3 className={s.h3}>Two rules. One invoice. Two different numbers.</h3>
        <div className={s.two}>
          <div className={s.cap}>
            <h4>Use tax measure</h4>
            <p>Purchase price. Separately stated installation labor is excluded &mdash; Reg 1546.</p>
          </div>
          <div className={s.exp}>
            <h4>GAAP basis · ASC 360</h4>
            <p>Price plus freight plus installation &mdash; everything to get it in place and working.</p>
          </div>
        </div>
        <p className={s.sub} style={{ marginTop: 20 }}>Not because anyone is wrong &mdash; because the two rules are asking different questions. Mine asks what was purchased for use in California. Theirs asks what the asset cost.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>The call I make — and the one I don&rsquo;t</div>
        <h2 className={s.h2}>Use tax never depended on the pile.</h2>
        <ul className={s.slideList}>
          <li><b>The tax was due either way</b><span>Tangible personal property, bought out of state, used in California, no tax paid to the vendor. Which account it sat in changes nothing.</span></li>
          <li><b>But it was misclassified, and I said so</b><span>Added capability rather than restoring it, useful life in years, missing from the schedule for three years. A books problem — not my assessment to make.</span></li>
          <li><b>And that&rsquo;s why nobody had caught it</b><span>Additions on the depreciation schedule get reviewed. Costs buried in R&amp;M don&rsquo;t. The coding didn&rsquo;t create the liability — it hid it.</span></li>
        </ul>
        <div className={s.calloutNote}>Which is the actual reason this story belongs in a capitalization presentation.</div>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Action · The discipline</div>
        <h2 className={s.h2}>It has to cut both ways.</h2>
        <p className={s.sub}>The genuine repairs in that account — compressor service, filters — I left alone. If the call only goes one direction, it isn&rsquo;t judgment.</p>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Result &amp; Lessons</div>
        <ul className={s.slideList}>
          <li><b>The assessment held</b><span>Walked the owner and their CPA through both pieces at the exit conference — what they owed, and separately, what their books had wrong.</span></li>
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
        <div className={s.kicker}>Situation · The rule — ASC 350-40 / ASU 2018-15</div>
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
        <div className={s.kicker}>Result, then Action · What actually happened</div>
        <ul className={s.slideList}>
          <li><b>Expensed as incurred — by default</b><span>No capitalization discussion at the time. Nobody asked, including me.</span></li>
          <li><b>The conclusion still holds</b><span>No contemporaneous time records · scoping &amp; training-heavy mix · immaterial at that scale.</span></li>
          <li><b>&ldquo;The right answer reached the wrong way&rdquo;</b><span>A defensible answer without documentation is still an undocumented answer.</span></li>
        </ul>
      </section>

      <section className={s.slide}>
        <div className={s.kicker}>Lessons · What I&rsquo;d do differently</div>
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
