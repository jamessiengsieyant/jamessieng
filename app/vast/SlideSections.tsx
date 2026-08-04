import s from "./space.module.css";
import type { DeckSlide, Visual } from "./deck-types";
import MockupClip from "./MockupClip";

/**
 * Renders deck slides as the scrolling website sections.
 *
 * The introduction, topic-1 and topic-2 pages used to hold their own copies of
 * this content, which meant an edit had to be made in four places and silently
 * went stale in three of them. They all render from deck.json through here now,
 * so the site, the presenter view, the script and the PowerPoint cannot drift.
 */
function VisualBody({ v, first }: { v: Visual; first: boolean }) {
  if (v.t === "title") {
    return (
      <>
        <div className={s.kicker}>Final Round · Vast Space</div>
        <h1 className={s.h1}>James Sieng</h1>
        <p className={s.sub}>
          Staff Accountant — International Accounting &amp; Accounting Operations
        </p>
      </>
    );
  }

  const Heading = first ? "h1" : "h2";
  const headingClass = first ? s.h1 : s.h2;

  if (v.t === "statement") {
    return (
      <>
        <div className={s.kicker}>{v.kick}</div>
        <Heading className={headingClass} style={{ whiteSpace: "pre-line" }}>
          {v.title}
        </Heading>
        {v.sub && <p className={s.sub}>{v.sub}</p>}
      </>
    );
  }

  if (v.t === "list") {
    return (
      <>
        <div className={s.kicker}>{v.kick}</div>
        <Heading className={headingClass} style={{ whiteSpace: "pre-line" }}>
          {v.title}
        </Heading>
        <ul className={s.slideList}>
          {v.items.map((it, i) => (
            <li key={i}>
              <b>{it.lead}</b>
              {it.sub && <span>{it.sub}</span>}
            </li>
          ))}
        </ul>
        {v.callout && <div className={s.calloutNote}>{v.callout}</div>}
      </>
    );
  }

  if (v.t === "cards") {
    return (
      <>
        <div className={s.kicker}>{v.kick}</div>
        <Heading className={headingClass} style={{ whiteSpace: "pre-line" }}>
          {v.title}
        </Heading>
        <div className={s.two}>
          <div className={s.cap}>
            <h4>{v.a.h}</h4>
            <p style={{ whiteSpace: "pre-line" }}>{v.a.lines}</p>
          </div>
          <div className={s.exp}>
            <h4>{v.b.h}</h4>
            <p style={{ whiteSpace: "pre-line" }}>{v.b.lines}</p>
          </div>
        </div>
        {v.tail && (
          <p className={s.sub} style={{ marginTop: 20 }}>
            {v.tail}
          </p>
        )}
      </>
    );
  }

  if (v.t === "chain") {
    return (
      <>
        <div className={s.kicker}>{v.kick}</div>
        <Heading className={headingClass} style={{ whiteSpace: "pre-line" }}>
          {v.title}
        </Heading>
        {v.sub && <p className={s.sub}>{v.sub}</p>}
        <div className={s.flowWrap}>
          {v.links.map((l, i) => (
            <div key={i} className={s.branch}>
              <div className={s.step}>{l.from}</div>
              <div className={s.arrow}>→</div>
              <div className={`${s.step} ${s.stepHit}`}>{l.to}</div>
            </div>
          ))}
        </div>
        {v.tail && (
          <p className={s.sub} style={{ marginTop: 20 }}>
            {v.tail}
          </p>
        )}
      </>
    );
  }

  // flow — the Ramp diagram, drawn in markup rather than stored as data
  return (
    <>
      <div className={s.kicker}>{v.kick}</div>
      <Heading className={headingClass}>{v.title}</Heading>
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
      <p className={s.sub} style={{ marginTop: 20 }}>
        {v.tail}
      </p>
    </>
  );
}

export default function SlideSections({ slides }: { slides: DeckSlide[] }) {
  return (
    <div className={s.page}>
      {slides.map((slide, i) => (
        <div key={i}>
          <section className={`${s.slide}${i === 0 ? ` ${s.divider}` : ""}`}>
            <VisualBody v={slide.visual} first={i === 0} />
          </section>
          {/* The animated Ramp mockup only exists on the site — a PowerPoint
              can't hold it, so it lives here rather than in the deck data. */}
          {slide.visual.t === "flow" && (
            <section className={s.slide}>
              <div className={s.kicker}>What it looks like</div>
              <h3 className={s.h3}>Not a screen recording — a mockup of the flow.</h3>
              <MockupClip />
              <p className={s.sub} style={{ marginTop: 20 }}>
                The flag happens the moment the invoice lands — not three weeks later at close.
              </p>
            </section>
          )}
        </div>
      ))}
    </div>
  );
}
