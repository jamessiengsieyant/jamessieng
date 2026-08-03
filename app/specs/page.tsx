import SiteNav from "../components/SiteNav";

export const metadata = {
  title: "Specs — James Sieng",
  description: "What this site is built with, and what it deliberately leaves out.",
};

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="card">
      <div className="cred">
        <span className="k">{k}</span>
        <span className="v">{v}</span>
      </div>
    </div>
  );
}

export default function SpecsPage() {
  return (
    <>
      <SiteNav />

      <header className="hero">
        <div className="wrap">
          <div className="mono">Colophon</div>
          <h1>Specs.</h1>
          <p className="lede">
            What this site is made of — and, further down, what it deliberately isn&apos;t. I wrote
            all of it, which is the point: the presentation behind the portal argues that
            accounting judgment and system design are the same discipline, so it seemed fair to
            build the argument rather than describe it.
          </p>
        </div>
      </header>

      <section className="band">
        <div className="wrap">
          <div className="mono">01 — Stack</div>
          <h2>The short version.</h2>
          <div className="grid grid-3" style={{ marginTop: 28 }}>
            <Row k="Next.js 16" v="App Router, React Server Components, Turbopack builds" />
            <Row k="React 19" v="Server components by default; client components only where state or WebGL demands it" />
            <Row k="TypeScript 5" v="Strict mode — the build fails before a type error can ship" />
            <Row k="three.js" v="WebGL scene behind the presentation: Earth, starfield, Haven-1's window" />
            <Row k="Clerk" v="Authentication, plus a server-side email allowlist for the portal" />
            <Row k="Netlify" v="Continuous deploy from GitHub — push to master, it's live in about a minute" />
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap narrow">
          <div className="mono">02 — The view</div>
          <h2>Everything you see out the window is math.</h2>
          <p>
            The presentation is set inside Haven-1, looking out the domed window. There are no
            photographs and no downloaded textures anywhere in that scene — the planet, its cloud
            deck, the atmospheric rim, and the stars are all generated in the browser at load
            time.
          </p>
          <ul className="list" style={{ marginTop: 20 }}>
            <li>
              <span className="yr">Earth</span>
              <span className="body">
                <strong>Drawn to a canvas, wrapped to a sphere</strong>
                <span>
                  Ocean gradients, weather bands, and cyclone swirls composited procedurally, then
                  used as a texture. Because it&apos;s a sphere map, the rotation loops seamlessly
                  forever.
                </span>
              </span>
            </li>
            <li>
              <span className="yr">Atmosphere</span>
              <span className="body">
                <strong>A custom GLSL shader</strong>
                <span>
                  The blue rim is a fragment shader computing light falloff against the surface
                  normal — not a glow image pasted over the edge.
                </span>
              </span>
            </li>
            <li>
              <span className="yr">Stars</span>
              <span className="body">
                <strong>A particle system that twinkles</strong>
                <span>
                  Each star carries its own phase offset, so a vertex shader can vary brightness
                  independently across thousands of points in a single draw call.
                </span>
              </span>
            </li>
            <li>
              <span className="yr">Scroll</span>
              <span className="body">
                <strong>Walking toward the glass</strong>
                <span>
                  Scroll position drives the camera and widens the window aperture, eased frame by
                  frame so it glides instead of snapping.
                </span>
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="band">
        <div className="wrap narrow">
          <div className="mono">03 — Access control</div>
          <h2>Signed in is not the same as allowed in.</h2>
          <p>
            Authentication services let anyone create an account. Checking only whether a visitor
            is signed in would mean anyone who signed themselves up could read a private
            presentation — so the portal checks the account&apos;s email against an explicit
            allowlist, on the server, in the layout that wraps every page beneath it.
          </p>
          <p style={{ marginTop: 14 }}>
            Guessing a URL doesn&apos;t help: the check runs before any content is rendered, so
            unlisted accounts receive a polite door rather than a page. A second, narrower list
            governs the pages meant only for me.
          </p>
          <div className="note">
            The same instinct runs through the presentation itself: decide who gets in at the point
            of entry, under a written rule — not by cleaning it up afterward.
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap narrow">
          <div className="mono">04 — Omissions</div>
          <h2>What isn&apos;t here, on purpose.</h2>
          <p>
            A dependency you don&apos;t add is a dependency you never have to upgrade, audit, or
            explain. Everything below was considered and left out.
          </p>
          <ul className="list" style={{ marginTop: 20 }}>
            <li>
              <span className="yr">No CSS framework</span>
              <span className="body">
                <span>
                  No Tailwind, no component library. One global stylesheet and a single CSS module.
                  The whole visual system is a handful of custom properties.
                </span>
              </span>
            </li>
            <li>
              <span className="yr">No webfonts</span>
              <span className="body">
                <span>
                  System font stack. Nothing to download, nothing to block the first paint, no
                  third party watching who reads the page.
                </span>
              </span>
            </li>
            <li>
              <span className="yr">No images</span>
              <span className="body">
                <span>
                  Not one raster file in the presentation. Every visual is geometry, shader, or
                  text.
                </span>
              </span>
            </li>
            <li>
              <span className="yr">No analytics</span>
              <span className="body">
                <span>
                  No trackers, no session recording, no cookie banner to dismiss — because there is
                  nothing to consent to.
                </span>
              </span>
            </li>
            <li>
              <span className="yr">No CMS</span>
              <span className="body">
                <span>
                  Content lives in typed components in version control. A wrong word is a diff, and
                  every revision has an author and a timestamp.
                </span>
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="band">
        <div className="wrap narrow">
          <div className="mono">05 — The backup</div>
          <h2>The PowerPoint is generated, not drawn.</h2>
          <p>
            A live site is a single point of failure in a conference room, so there is a
            PowerPoint fallback — but nobody dragged those text boxes by hand. A Node script
            composes the deck with <strong>pptxgenjs</strong>, laying out every slide from the same
            content the site renders and writing each spoken beat into the speaker-notes pane.
          </p>
          <p style={{ marginTop: 14 }}>
            Which means a wording change is one edit and one command, not thirty slides of
            find-and-replace — and the file and the website cannot quietly drift apart.
          </p>
        </div>
      </section>

      <footer className="site">
        <div className="wrap">© {new Date().getFullYear()} James Sieng</div>
      </footer>
    </>
  );
}
