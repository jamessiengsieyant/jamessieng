import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/vast(.*)"]);

export const proxy = clerkMiddleware(async (auth, req) => {
  const bypassAuth = process.env.NODE_ENV !== "production";
  if (!bypassAuth && isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.png$).*)",
    "/__clerk/:path*",
  ],
};
