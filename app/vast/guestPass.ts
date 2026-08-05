/**
 * A scannable way in, for the panel.
 *
 * The QR code carries a long random key — never a password. Passwords in URLs
 * end up in browser history, proxy logs and Referer headers, and a QR printed
 * on a slide gets photographed and forwarded by design. This key is traded once
 * for an httpOnly cookie, grants the same read-only access as a guest account,
 * and is revoked by changing one environment variable.
 *
 * Everything here must run on the Edge runtime as well as in Node, because the
 * proxy consults it before Clerk does — so no node:crypto.
 */
export const GUEST_COOKIE = "vast_pass";

/** Unset or too short means the feature is off — never match on empty. */
export function guestKey(): string | null {
  const k = process.env.VAST_GUEST_KEY?.trim();
  return k && k.length >= 24 ? k : null;
}

/** Constant-time compare; length is checked first and leaks nothing useful. */
export function keyMatches(candidate: string | undefined | null): boolean {
  const expected = guestKey();
  if (!expected || !candidate || candidate.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= candidate.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}
