import { timingSafeEqual } from "node:crypto";

/**
 * A scannable way in, for the panel.
 *
 * The QR code carries a long random key — never a password. Passwords in URLs
 * end up in browser history, proxy logs and Referer headers, and a QR printed
 * on a slide gets photographed and forwarded. This key is traded once for an
 * httpOnly cookie, grants the same read-only access as a guest account, and is
 * revoked by changing one environment variable.
 */
export const GUEST_COOKIE = "vast_pass";

/** Unset means the feature is off — never treat a missing key as a match. */
export function guestKey(): string | null {
  const k = process.env.VAST_GUEST_KEY?.trim();
  return k && k.length >= 24 ? k : null;
}

export function keyMatches(candidate: string | undefined | null): boolean {
  const expected = guestKey();
  if (!expected || !candidate) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  // compare in constant time, but only once the lengths agree — timingSafeEqual
  // throws on a length mismatch rather than returning false
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
