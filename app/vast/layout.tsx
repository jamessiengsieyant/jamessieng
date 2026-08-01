"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import SpaceBackground from "./SpaceBackground";

export default function VastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SpaceBackground />
      <nav className="nav" style={{ position: "sticky", background: "rgba(5,7,13,.72)" }}>
        <div className="nav-inner">
          <Link href="/vast" className="nav-name">
            James Sieng <span style={{ color: "var(--muted)" }}>/ Vast</span>
          </Link>
          <div className="nav-links">
            <Link href="/vast/introduction">Introduction</Link>
            <Link href="/vast/topic-1">Topic 1</Link>
            <Link href="/vast/topic-2">Topic 2</Link>
            <Link href="/vast/script">Script</Link>
            <UserButton />
          </div>
        </div>
      </nav>
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      <footer className="site" style={{ position: "relative", zIndex: 1 }}>
        <div className="wrap">
          Prepared for the final-round presentation. ·{" "}
          <Link href="/">← jamessieng.com</Link>
        </div>
      </footer>
    </>
  );
}
