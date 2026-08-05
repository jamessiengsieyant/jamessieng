import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { isOwnerEmail } from "./owner";

export const dynamic = "force-dynamic";

export default async function VastIndex() {
  const devBypass = process.env.NODE_ENV !== "production";
  const user = devBypass ? null : await currentUser();
  const owner =
    devBypass || (user?.emailAddresses?.some((e) => isOwnerEmail(e.emailAddress)) ?? false);

  return (
    <>
      {/* tall on purpose: the sky has to have somewhere to go before the
          content arrives, or "scroll to launch" is over in 400px */}
      <header className="hero" style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}>
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
            screen, the story from me.
          </p>
          <p className="mono" style={{ marginTop: 30, color: "var(--accent)" }}>
            ↓ scroll to launch
          </p>
        </div>
      </header>

      <section className="band">
        <div className="wrap">
          <div className="mono">Contents</div>
          <div className="grid grid-3" style={{ marginTop: 28 }}>
            <Link href="/vast/introduction" className="card" style={{ textDecoration: "none" }}>
              <span className="mono">Part 01 · slides 1–10</span>
              <h3>Introduction →</h3>
              <p>Background, career, education, and what I do when I&apos;m not doing this.</p>
            </Link>
            <Link href="/vast/topic-1" className="card" style={{ textDecoration: "none" }}>
              <span className="mono">Part 02 · slides 11–20</span>
              <h3>Capitalize or Expense →</h3>
              <p>Two real calls I had to make, and why the treatment held up.</p>
            </Link>
            <Link href="/vast/topic-2" className="card" style={{ textDecoration: "none" }}>
              <span className="mono">Part 03 · slides 21–30</span>
              <h3>The First 90 Days →</h3>
              <p>A 30/60/90 plan, and one idea for Ramp → NetSuite.</p>
            </Link>
            <Link href="/vast/powerpoint" className="card" style={{ textDecoration: "none" }}>
              <span className="mono">All 30</span>
              <h3>The Deck →</h3>
              <p>The same presentation, one slide at a time.</p>
            </Link>
            {owner && (
              <Link href="/vast/script" className="card" style={{ textDecoration: "none" }}>
                <span className="mono">James only</span>
                <h3>Full Script →</h3>
                <p>Every beat, in full — for rereading before the room, not during it.</p>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
