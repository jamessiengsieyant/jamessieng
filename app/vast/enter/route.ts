import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GUEST_COOKIE, guestKey, keyMatches } from "../guestPass";

/**
 * The QR code points here: /vast/enter?k=<key>
 *
 * Trades the key for an httpOnly cookie and redirects to the presentation, so
 * the key itself never stays in the address bar of the page they end up on.
 */
export async function GET(request: Request) {
  const k = new URL(request.url).searchParams.get("k");

  if (!keyMatches(k)) {
    // Say nothing about whether the feature is configured or the key was wrong.
    redirect("/vast");
  }

  const jar = await cookies();
  jar.set(GUEST_COOKIE, guestKey()!, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14, // a fortnight — comfortably past the onsite
  });

  redirect("/vast");
}
