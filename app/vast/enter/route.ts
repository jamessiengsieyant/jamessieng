import { NextResponse } from "next/server";
import { GUEST_COOKIE, guestKey, keyMatches } from "../guestPass";

/**
 * The QR code points here: /vast/enter?k=<key>
 *
 * Trades the key for an httpOnly cookie and sends them to a clean /vast. The
 * destination is built explicitly rather than by redirecting to a relative
 * path, because the query string is otherwise carried across and the key ends
 * up in the address bar — and from there in history and in whatever the
 * browser syncs.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const k = url.searchParams.get("k");

  const res = NextResponse.redirect(new URL("/vast", url.origin), 303);

  // Silent either way: never say whether the key was wrong or the feature is
  // switched off. A wrong key simply lands on the ordinary front door.
  if (keyMatches(k)) {
    res.cookies.set(GUEST_COOKIE, guestKey()!, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 14, // a fortnight — comfortably past the onsite
    });
  }

  return res;
}
