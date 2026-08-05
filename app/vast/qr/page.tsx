import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import QRCode from "qrcode";
import { isOwnerEmail } from "../owner";
import { guestKey } from "../guestPass";

export const dynamic = "force-dynamic";

const SITE = "https://jamessieng.com";

export default async function QrPage() {
  const devBypass = process.env.NODE_ENV !== "production";
  const user = devBypass ? null : await currentUser();
  const owner =
    devBypass || (user?.emailAddresses?.some((e) => isOwnerEmail(e.emailAddress)) ?? false);
  if (!owner) redirect("/vast");

  const key = guestKey();
  const url = key ? `${SITE}/vast/enter?k=${encodeURIComponent(key)}` : null;

  // Rendered as SVG so it stays sharp at any size — including projected, and
  // including whatever scale PowerPoint decides to put it at.
  const svg = url
    ? await QRCode.toString(url, {
        type: "svg",
        errorCorrectionLevel: "M",
        margin: 1,
        width: 560,
        color: { dark: "#05070d", light: "#ffffff" },
      })
    : null;

  return (
    <article className="band">
      <div className="wrap narrow">
        <div className="mono">James only — do not put this page in the deck</div>
        <h1 style={{ marginTop: 12 }}>The scan-to-enter code</h1>

        {!key && (
          <div className="note" style={{ marginTop: 20, borderColor: "var(--accent)" }}>
            <strong>Not configured yet.</strong> Set <code>VAST_GUEST_KEY</code> in Netlify to a
            long random string — at least 24 characters — then redeploy and reload this page. Until
            it is set, <code>/vast/enter</code> refuses every key rather than letting anyone in.
          </div>
        )}

        {svg && (
          <>
            <div
              className="qrFrame"
              style={{
                marginTop: 24,
                background: "#fff",
                padding: 20,
                borderRadius: 14,
                width: "min(420px, 100%)",
              }}
              // the QR is generated on the server from a key we control
              dangerouslySetInnerHTML={{ __html: svg }}
            />
            {/* the generated markup carries a fixed width attribute; let it
                scale to the frame instead of forcing the page sideways */}
            <style>{`.qrFrame svg { width: 100%; height: auto; display: block; }`}</style>

            <div className="note" style={{ marginTop: 22 }}>
              <strong>Right-click the code and save the image</strong>, then drop it on the title
              slide. It carries a one-purpose key, never the password — so a photographed slide
              cannot leak a login. Scanning signs the phone in as a guest for two weeks.
            </div>

            <h2 style={{ fontSize: 20, marginTop: 34 }}>What a guest can reach</h2>
            <ul className="list" style={{ marginTop: 14 }}>
              <li>
                <span className="yr">Yes</span>
                <span className="body">
                  <strong>Role · Introduction · Topic 1 · Topic 2 · the deck</strong>
                  <span>The presentation, and nothing behind it.</span>
                </span>
              </li>
              <li>
                <span className="yr">No</span>
                <span className="body">
                  <strong>Script · Prompt · speaker notes</strong>
                  <span>
                    A scan can never grant owner access. The deck page strips the beats on the
                    server, so a guest&apos;s browser never receives the words you are going to say.
                  </span>
                </span>
              </li>
            </ul>

            <h2 style={{ fontSize: 20, marginTop: 34 }}>To revoke it</h2>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.65 }}>
              Change <code>VAST_GUEST_KEY</code> in Netlify and redeploy. Every cookie issued under
              the old key stops working immediately, and every printed code goes dead with it.
            </p>
          </>
        )}
      </div>
    </article>
  );
}
