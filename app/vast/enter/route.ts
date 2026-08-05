import { GUEST_COOKIE, guestKey, keyMatches } from "../guestPass";

/**
 * The QR code points here: /vast/enter?k=<key>
 *
 * Sets the cookie, then hands back a one-line page that calls
 * location.replace('/vast').
 *
 * A server redirect was tried first and does not work here: the platform
 * rewrites Location, re-appending the original query string and substituting
 * the internal deploy host, so the phone ends up on
 * <deploy-id>.netlify.app/vast?k=<key> — the key in the address bar, in
 * history, and the wrong domain besides. Doing the last hop in the browser
 * avoids all of it, and replace() overwrites the entry rather than adding one,
 * so the key is not left behind in the back button either.
 */
export async function GET(request: Request) {
  const k = new URL(request.url).searchParams.get("k");

  const headers = new Headers({
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store, max-age=0",
    "Referrer-Policy": "no-referrer",
  });

  // Silent either way — a wrong key just lands on the ordinary front door.
  if (keyMatches(k)) {
    const bits = [
      `${GUEST_COOKIE}=${guestKey()}`,
      "Path=/",
      `Max-Age=${60 * 60 * 24 * 14}`, // a fortnight — comfortably past the onsite
      "HttpOnly",
      "SameSite=Lax",
    ];
    if (process.env.NODE_ENV === "production") bits.push("Secure");
    headers.append("Set-Cookie", bits.join("; "));
  }

  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
      `<meta name="robots" content="noindex"><title>Opening…</title>` +
      `<script>location.replace("/vast")</script></head>` +
      `<body style="background:#05070d"><noscript>` +
      `<a href="/vast" style="color:#ffb25e;font-family:system-ui;padding:2rem;display:block">` +
      `Continue to the presentation</a></noscript></body></html>`,
    { headers }
  );
}
