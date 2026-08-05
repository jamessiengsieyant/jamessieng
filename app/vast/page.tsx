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
      {/* Two screens tall on purpose. The first holds the vehicle on the pad;
          scrolling through the second is the ascent, and the launch needs room
          to happen or it is over before it reads as one. */}
      <header
        className="hero"
        style={{ minHeight: "96vh", display: "flex", alignItems: "center" }}
      >
        <div className="wrap">
          <div className="mono">Final Round — Vast Space</div>
          <h1>
            The slides talk less
            <br />
            than I do.
          </h1>
          <p className="lede">
            Built as software, not a deck file — behind an authenticated portal, deployed on
            the same stack I&apos;d bring to the accounting problems inside. Headlines on
            screen, the story from me.
          </p>
          <p className="mono" style={{ marginTop: 30, color: "var(--accent)" }}>
            ↓ scroll to launch
          </p>
        </div>
      </header>

      {/* One way on. The presentation is a sequence, so the front door offers a
          sequence — not a menu that lets someone open Topic 2 first. */}
      <section
        className="band"
        style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}
      >
        <div className="wrap">
          <div className="mono">Ignition</div>
          <h2 style={{ marginTop: 10 }}>Thirty slides. About forty minutes.</h2>
          <p className="lede" style={{ maxWidth: 620 }}>
            Where I came from, two calls I had to make on capitalising an asset, and what
            I&apos;d do in the first ninety days.
          </p>

          <Link
            href="/vast/introduction"
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
            Launch →
          </Link>

          {owner && (
            <p className="mono" style={{ marginTop: 34, fontSize: 12, color: "var(--muted)" }}>
              James only ·{" "}
              <Link href="/vast/script" style={{ color: "var(--muted)" }}>
                Script
              </Link>{" "}
              ·{" "}
              <Link href="/vast/prompt" style={{ color: "var(--muted)" }}>
                Prompt
              </Link>{" "}
              ·{" "}
              <Link href="/vast/powerpoint" style={{ color: "var(--muted)" }}>
                Deck
              </Link>{" "}
              ·{" "}
              <Link href="/vast/qr" style={{ color: "var(--muted)" }}>
                QR
              </Link>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
