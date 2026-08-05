import Link from "next/link";
import { readDeck } from "../deckFile";
import SlideSections from "../SlideSections";

export const dynamic = "force-dynamic";

export default async function Topic1Page() {
  const slides = (await readDeck()).filter((s) => s.section.startsWith("Part 02"));
  return (
    <>
      <SlideSections slides={slides} />

      {/* Mirrors the handoff card on Introduction. Haven-1 has just closed its
          hatch — this is the cue to go inside, rather than another launch beat. */}
      <section
        className="band"
        style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}
      >
        <div className="wrap">
          <div className="mono">Docked</div>
          <h2 style={{ marginTop: 10 }}>Now we go inside.</h2>
          <p className="lede" style={{ maxWidth: 620 }}>
            My first ninety days, and one idea I&apos;d bring on day one.
          </p>

          <Link
            href="/vast/topic-2"
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
            Entering →
          </Link>
        </div>
      </section>
    </>
  );
}
