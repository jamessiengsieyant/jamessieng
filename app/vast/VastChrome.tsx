"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import JourneyScene from "./JourneyScene";
import { isJourneyRoute } from "./journey";

export default function VastChrome({
  owner,
  children,
}: {
  owner: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // The journey is mounted once, here, and deliberately never keyed on the
  // pathname: remounting would drop the WebGL context on every navigation and
  // the continuity between scenes is the entire point.
  const onJourney = isJourneyRoute(pathname);

  return (
    <>
      {onJourney && <JourneyScene />}
      <nav className="nav" style={{ position: "sticky", background: "rgba(5,7,13,.72)" }}>
        <div className="nav-inner">
          <span className="nav-name">
            <Link href="/" className="nav-name" style={{ textDecoration: "none" }}>
              James Sieng
            </Link>{" "}
            <Link href="/vast" style={{ color: "var(--muted)", textDecoration: "none" }}>
              / Vast
            </Link>
          </span>
          <div className="nav-links">
            <Link href="/vast/role">Role</Link>
            {owner && <Link href="/vast/prompt">Prompt</Link>}
            <Link href="/vast/introduction">Introduction</Link>
            <Link href="/vast/topic-1">Topic 1</Link>
            <Link href="/vast/topic-2">Topic 2</Link>
            {owner && <Link href="/vast/script">Script</Link>}
            <Link href="/vast/powerpoint">PowerPoint</Link>
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
