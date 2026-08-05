import Link from "next/link";
import { readDeck } from "../deckFile";
import SlideSections from "../SlideSections";

export const dynamic = "force-dynamic";

export default async function IntroductionPage() {
  const slides = (await readDeck()).filter((s) => s.section.startsWith("Part 01"));
  return (
    <>
      <SlideSections slides={slides} />

      {/* Mirrors the card at the end of /vast, but for the next handoff:
          engines have just cut off, which is the cue to let go of the
          rocket and see what it was carrying. */}
      <section
        className="band"
        style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}
      >
        <div className="wrap">
          <div className="mono">Staging</div>
          <h2 style={{ marginTop: 10 }}>Now we let go of the rocket.</h2>
          <p className="lede" style={{ maxWidth: 620 }}>
            Two real calls on capitalizing an asset — and why I believe both were handled
            right.
          </p>

          <Link
            href="/vast/topic-1"
            className="btn"
            style={{
              display: "inline-block",
              marginTop: 26,
              padding: "14px 30px",
              fontSize: 17,
              fontWeight: 600,
              background: "var(--accent)",
              borderColor: "var(--accent)",
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            Staging →
          </Link>
        </div>
      </section>
    </>
  );
}
