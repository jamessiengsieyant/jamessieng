"use client";

import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

export default function AccessDenied({ email }: { email?: string }) {
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-name">
            James Sieng
          </Link>
        </div>
      </nav>
      <section className="band">
        <div className="wrap narrow">
          <div className="mono">Private</div>
          <h1 style={{ marginTop: 12, fontSize: 34 }}>This area is invitation only.</h1>
          <p style={{ color: "var(--muted)", maxWidth: "60ch" }}>
            {email ? (
              <>
                You&apos;re signed in as <strong>{email}</strong>, which isn&apos;t on the access
                list for this presentation.
              </>
            ) : (
              <>This account isn&apos;t on the access list for this presentation.</>
            )}{" "}
            If you were given credentials, sign out and sign back in with those.
          </p>
          <div className="hero-actions">
            <SignOutButton>
              <button className="btn btn-solid">Sign out</button>
            </SignOutButton>
            <Link href="/" className="btn">
              ← jamessieng.com
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
