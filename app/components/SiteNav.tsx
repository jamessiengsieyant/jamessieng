"use client";

import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";

export default function SiteNav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-name">
          James Sieng
        </Link>
        <div className="nav-links">
          <a href="/#credentials">Credentials</a>
          <a href="/#work">Work</a>
          <Link href="/specs">Specs</Link>
          <Show when="signed-out">
            <Link href="/sign-in" className="btn">
              Portal
            </Link>
          </Show>
          <Show when="signed-in">
            <Link href="/vast" className="btn">
              Portal
            </Link>
            <UserButton />
          </Show>
        </div>
      </div>
    </nav>
  );
}
