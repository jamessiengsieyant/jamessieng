import Link from "next/link";

export default function VastIndex() {
  return (
    <>
      <header className="hero">
        <div className="wrap">
          <div className="mono">Final Round — Vast Space</div>
          <h1>
            The slides talk less
            <br />
            than I do.
          </h1>
          <p className="lede">
            Built as software, not a deck file — behind an authenticated portal, deployed on
            the same stack I&apos;d bring to the accounting problems below. Headlines on
            screen, the story from me. Full detail lives on the Script page, for before the
            room — not during it.
          </p>
        </div>
      </header>

      <section className="band">
        <div className="wrap">
          <div className="mono">Contents</div>
          <div className="grid grid-3" style={{ marginTop: 28 }}>
            <Link href="/vast/introduction" className="card" style={{ textDecoration: "none" }}>
              <span className="mono">Part 01</span>
              <h3>Introduction →</h3>
              <p>Background, career, education, and what I do when I&apos;m not doing this.</p>
            </Link>
            <Link href="/vast/topic-1" className="card" style={{ textDecoration: "none" }}>
              <span className="mono">Part 02</span>
              <h3>Capitalize or Expense →</h3>
              <p>Two real calls I had to make, and why the treatment held up.</p>
            </Link>
            <Link href="/vast/topic-2" className="card" style={{ textDecoration: "none" }}>
              <span className="mono">Part 03</span>
              <h3>The First 90 Days →</h3>
              <p>A 30/60/90 plan, and one idea for Ramp → NetSuite.</p>
            </Link>
            <Link href="/vast/script" className="card" style={{ textDecoration: "none" }}>
              <span className="mono">Leave-behind</span>
              <h3>Full Script →</h3>
              <p>Every example, in full — for rereading before the room, not during it.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
