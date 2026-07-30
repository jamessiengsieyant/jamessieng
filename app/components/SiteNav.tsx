import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

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
          <SignedOut>
            <Link href="/sign-in" className="btn">
              Portal
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/vast" className="btn">
              Portal
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
