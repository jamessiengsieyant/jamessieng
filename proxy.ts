import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { GUEST_COOKIE, keyMatches } from "./app/vast/guestPass";

const isProtectedRoute = createRouteMatcher(["/vast(.*)"]);

// The route that trades a QR key for a cookie. It has to be reachable before
// any auth check, or the key can never be redeemed in the first place.
const isEnterRoute = createRouteMatcher(["/vast/enter"]);

export const proxy = clerkMiddleware(async (auth, req) => {
  const bypassAuth = process.env.NODE_ENV !== "production";
  if (bypassAuth || !isProtectedRoute(req)) return;

  // Let the key be redeemed. The route validates it itself and hands out
  // nothing if it is wrong.
  if (isEnterRoute(req)) return;

  // A phone that has already scanned carries the pass. Checking it here means
  // guests never touch Clerk at all — which matters, because a Clerk
  // development instance answers an unknown visitor with a 404 rather than a
  // sign-in page, and the panel are all unknown visitors on their own phones.
  if (keyMatches(req.cookies.get(GUEST_COOKIE)?.value)) return;

  await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.png$).*)",
    "/__clerk/:path*",
  ],
};
