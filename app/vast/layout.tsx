import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function VastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/vast" className="nav-name">
            James Sieng <span style={{ color: "var(--muted)" }}>/ Vast</span>
          </Link>
          <div className="nav-links">
            <Link href="/vast/introduction">Introduction</Link>
            <Link href="/vast/topic-1">Topic 1</Link>
            <Link href="/vast/topic-2">Topic 2</Link>
            <UserButton />
          </div>
        </div>
      </nav>
      {children}
      <footer className="site">
        <div className="wrap">
          Prepared for the final-round presentation. ·{" "}
          <Link href="/">← jamessieng.com</Link>
        </div>
      </footer>
    </>
  );
}
