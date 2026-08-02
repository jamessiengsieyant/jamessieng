"use client";

import { useEffect, useState } from "react";

const BG = "#05070d";
const CARD = "#141b2b";
const LINE = "#2a3347";
const LIGHT = "#f2f4f8";
const MUTED = "#98a2b3";
const ACCENT = "#ffb25e";
const BLUE = "#7db2ff";

type Item = { lead: string; sub?: string };
type SlideDef =
  | { t: "title"; notes: string }
  | { t: "statement"; kick: string; title: string; sub?: string; notes: string }
  | { t: "list"; kick: string; title: string; items: Item[]; callout?: string; notes: string }
  | { t: "cards"; kick: string; title: string; a: { h: string; lines: string }; b: { h: string; lines: string }; tail?: string; notes: string }
  | { t: "flow"; kick: string; title: string; tail: string; notes: string };

const SLIDES: SlideDef[] = [
  { t: "title", notes: "Two ways to read a balance sheet. As the auditor asking “prove it” — or as the builder whose system has to prove itself. I've done both. Sometimes in the same week." },
  {
    t: "statement", kick: "The hook", title: "Two ways to read\na balance sheet.",
    sub: "“Prove it.”  —or—  “Make it provable.”  I do both — some weeks, in the same week.",
    notes: "Open with the hook, slow: two ways to read a balance sheet — the auditor asking “prove it,” or the builder whose system has to prove itself. I've done both, sometimes in the same week.",
  },
  {
    t: "list", kick: "Experience", title: "What I bring to this role.",
    items: [
      { lead: "CDTFA — sales & use tax auditor · current", sub: "Capital purchases, use tax, audit procedure — daily." },
      { lead: "ForensisGroup — systems & accounting tooling", sub: "Built the Salesforce systems that produce the records I used to audit." },
      { lead: "Independent software builds", sub: "Full-stack, accounting-adjacent — shipped end to end." },
    ],
    notes: "By day I'm a sales and use tax auditor for the State of California — CDTFA. Capital equipment purchases are part of what I test — a direct line into Topic 1. Before that framing goes further: ForensisGroup is past work — I built their Salesforce systems. The rest of my time goes into building software, most of it accounting-adjacent.",
  },
  {
    t: "list", kick: "How I got here", title: "Education & credentials.",
    items: [
      { lead: "UC Irvine, 2010–2014", sub: "Biomedical Engineering & Business Economics." },
      { lead: "Western Governors University, 2024", sub: "B.S. Accounting." },
      { lead: "CPA — all four exams passed", sub: "Completing the experience requirement; Enrolled Agent — admitted to practice before the IRS." },
      { lead: "Salesforce & QuickBooks certified", sub: "PMify · Survey Builder (Apex) · QuickBooks↔Salesforce AP/AR sync · LIMS with asset tracking." },
    ],
    notes: "Two degrees from UC Irvine, then a Bachelor's in Accounting from WGU in 2024. All four CPA exams passed — finishing the experience requirement — plus the Enrolled Agent credential, admitted to practice before the IRS. Salesforce and QuickBooks certified; the builds are on screen.",
  },
  {
    t: "statement", kick: "The NetSuite question", title: "Platforms transfer.",
    sub: "I didn’t just use Salesforce — I built accounting on it: AR/AP payments syncing into QuickBooks. NetSuite is the same kind of animal.",
    notes: "I haven't lived in NetSuite yet — and here's why that doesn't worry me. Salesforce and NetSuite are the same kind of animal: cloud platforms you configure and build on. And I didn't just use Salesforce — I built accounting on it: PMify, Survey Builder, and an automated AR/AP payment sync into QuickBooks. Real accounting and reporting through a system I built. The ledger concepts don't change between platforms. Only the menus move.",
  },
  {
    t: "statement", kick: "Why Vast", title: "Rules meet reality.",
    sub: "Tax code. GAAP. A chart of accounts. Then a company moving faster than any of them.",
    notes: "Every role I've had comes down to one skill: translating between rigid rules and a business moving faster than any of them. That's the seam Vast is scaling through right now.",
  },
  {
    t: "statement", kick: "For fun", title: "I sing.\nI play guitar.",
    sub: "Sometimes both at the same time.",
    notes: "I sing, and I play guitar. Sometimes both at the same time. (Deadpan — let it land.) The through-line with accounting is real: both are structured systems where the constraints are the interesting part.",
  },
  {
    t: "statement", kick: "Part 02 · Topic 1", title: "Capitalize\nor expense?",
    sub: "Two real calls. Two different chairs.",
    notes: "First example — let me take you inside a real audit. From my CDTFA work. Details disguised, no names. But the decision is real, and it's one I make regularly.",
  },
  {
    t: "statement", kick: "Example 1 · From the audit chair", title: "The spray booth in\nthe repairs account.",
    sub: "A CDTFA field audit — details disguised.",
    notes: "People think a sales tax audit only looks at sales. It doesn't. Every field audit examines purchases too.",
  },
  {
    t: "cards", kick: "Every audit starts with a split", title: "Purchases go in two piles.",
    a: { h: "Fixed assets", lines: "Equipment, machinery,\nimprovements" },
    b: { h: "Expense items", lines: "Repairs, supplies,\nconsumables" },
    tail: "That split is a capitalization review — I just come at it from the enforcement side.",
    notes: "Step one is splitting purchases into two piles: fixed assets, and expense items. That split IS a capitalization review. Same question you ask at Vast — is this an asset, or an expense? I just come at it from the enforcement side.",
  },
  {
    t: "list", kick: "The find", title: "In repairs & maintenance:",
    items: [
      { lead: "~$20,000 invoice — coded to R&M", sub: "Repairs & maintenance: where assets go to hide." },
      { lead: "Out-of-state vendor, no tax charged", sub: "Use tax never self-assessed." },
      { lead: "Equipment + freight + installation", sub: "All on one invoice — a spray booth." },
      { lead: "Not on the depreciation schedule", sub: "Their own records told on them." },
    ],
    notes: "Auto body shop, R&M line by line — R&M is where assets go to hide. Not because people cheat; because of how bookkeeping happens. And there it is: twenty thousand dollars, out-of-state vendor, no tax charged. A spray booth — equipment, freight, installation, one invoice. Coded to repairs. Not on the depreciation schedule.",
  },
  {
    t: "list", kick: "The call", title: "Repair — or capital asset?",
    items: [
      { lead: "Added capability — didn’t restore it", sub: "Not fixing a booth. Acquiring one." },
      { lead: "Useful life in years", sub: "Not months." },
      { lead: "Measure: price + freight + install", sub: "Same principle as ASC 360 basis — tax and book agree." },
    ],
    notes: "Now I have a call to make — and I have to defend it. If it's an asset, it belonged on their books, and use tax was due — never paid. Three factors: added capability; useful life in years; and their own books contradicted themselves — expensed in R&M, missing from the schedule. Their own records told on them. I computed the measure: price plus freight plus installation.",
  },
  {
    t: "statement", kick: "The discipline", title: "It has to cut\nboth ways.",
    sub: "The genuine repairs — compressor service, filters — I left alone. If the call only goes one direction, it isn’t judgment.",
    notes: "The same account had real repairs — and I left those alone. If the call only ever goes one direction, it's not judgment — it's a shakedown. A defensible position cuts both ways. SLOW DOWN HERE.",
  },
  {
    t: "list", kick: "Result & lesson", title: "What it left behind.",
    items: [
      { lead: "The classification held", sub: "Defended at exit conference; asset capitalized, use-tax accrual set up." },
      { lead: "Nobody was cheating", sub: "The invoice just landed in the wrong pile — for three years." },
      { lead: "The decision belongs at the point of entry", sub: "On purpose, under a written policy. Hold that thought for Topic 2." },
    ],
    notes: "At the exit conference I walked the owner and their CPA through it — the classification held. Nobody was cheating: the invoice sounded like a repair vendor, got filed where repair invoices go, and sat there wrong for three years. The call was made by default, at data entry, by the person with the least context. It has to happen at the point of entry — on purpose, under a written policy. Hold that thought.",
  },
  {
    t: "statement", kick: "Example 2 · From the builder chair", title: "Four months of\nmy own time.",
    sub: "PMify + Survey Builder, built on ForensisGroup’s Salesforce. No consultant invoice — the invoice was me.",
    notes: "Second example — same question, opposite chair. First story I caught someone else's classification; this time the cost was my own time. ForensisGroup runs on Salesforce; I built PMify and Survey Builder on top of it. About four months of development.",
  },
  {
    t: "cards", kick: "The rule · ASC 350-40 / ASU 2018-15", title: "A subscription is never an asset.\nThe setup might be.",
    a: { h: "Capitalize", lines: "Configuration\nCustomization\nCoding & testing" },
    b: { h: "Expense", lines: "Subscription fees\nTraining\nData conversion" },
    tail: "Internal payroll counts — “we didn’t pay a vendor” isn’t an answer.",
    notes: "The subscription fee is never an asset — it's rent. But implementation costs are capitalizable, and internal payroll counts. There was no consultant invoice — the invoice was me. So the question was real: should some of that cost sit on the balance sheet?",
  },
  {
    t: "list", kick: "What actually happened", title: "Honestly.",
    items: [
      { lead: "Expensed as incurred — by default", sub: "No capitalization discussion at the time. Nobody asked, including me." },
      { lead: "The conclusion still holds", sub: "No time records · scoping- and training-heavy mix · immaterial at that scale." },
      { lead: "“The right answer reached the wrong way”", sub: "A defensible answer without documentation is still an undocumented answer." },
    ],
    notes: "No dressing it up: it ran through payroll, expensed as incurred, nobody asked — including me. But I've since worked it like an auditor: no time records, so any number is a reconstruction; scoping and training are expensed anyway; and it's immaterial at that scale. Expense was right — reached the wrong way. KEY SENTENCE, slow down.",
  },
  {
    t: "list", kick: "What I’d do differently", title: "Three things.",
    items: [
      { lead: "Track hours while it’s happening", sub: "Not to force capitalization — to preserve the option." },
      { lead: "Write the memo even when the answer is “expense”", sub: "An hour of work turns a default into a position." },
      { lead: "Scale flips the answer", sub: "Same framework at Vast — the NetSuite and Ramp implementations lived this exact question." },
    ],
    callout: "The twist: a capitalized CCA cost isn’t a fixed asset — it’s a prepaid-type asset amortizing into the same opex line as the subscription. Never depreciation.",
    notes: "Track hours while it's happening — once the quarter closes, the ability to measure is gone. Write the memo even when the answer is expense. And know when scale flips the answer — at Vast, same framework, other outcome. You've lived this on the NetSuite and Ramp implementations. EYE CONTACT. Then the twist: capitalized CCA cost is a prepaid, never PP&E, never depreciation.",
  },
  {
    t: "statement", kick: "Topic 1 close", title: "Two chairs.\nSame principle.",
    sub: "Classify on purpose, at the source, with the documentation to prove it.",
    notes: "Two examples, two chairs. An auditor finding an asset hidden in a repairs account; a builder whose own four months became the accounting question. Same principle: classify on purpose, at the source, with proof. Which brings me to what I'd do at Vast.",
  },
  {
    t: "statement", kick: "Part 03 · Topic 2", title: "The first\n90 days.",
    sub: "Learn it. Plan it. Ship it.",
    notes: "Topic two: my first ninety days. Learn it, plan it, ship it — and one idea at the end that I think is worth your time.",
  },
  {
    t: "list", kick: "Days 1–30 · Learn", title: "Learn the machine before touching it.",
    items: [
      { lead: "Map the policy", sub: "Chart of accounts, capitalization threshold — documented or tribal knowledge?" },
      { lead: "Understand Ramp", sub: "Category mappings, AI-coding accuracy, which vendors trigger reclasses most." },
      { lead: "Shadow month-end close", sub: "Write down every manual reclass — that friction is the opportunity." },
    ],
    notes: "Month one: learn the machine before touching it. Map the chart of accounts and the capitalization policy — written down or tribal knowledge? Learn how Ramp is configured and which vendors trigger reclasses. Shadow a close and write down every manual reclass — that friction is the opportunity.",
  },
  {
    t: "list", kick: "Days 30–60 · Plan", title: "Turn the pattern into a number.",
    items: [
      { lead: "Quantify the reclass problem", sub: "How many per month, how much time they cost." },
      { lead: "Tighten GL coding rules", sub: "SaaS implementation costs, capex threshold edge cases." },
      { lead: "Document the policy crisply", sub: "With the controller — before building anything." },
    ],
    notes: "Month two: turn the pattern into a number. How many reclasses a month and what they cost in hours. Tighten the coding rules for the repeat offenders. Get the policy documented with the controller before building anything.",
  },
  {
    t: "list", kick: "Days 60–90 · Ship", title: "Ship something. Prove it worked.",
    items: [
      { lead: "Pilot the Ramp coding rules", sub: "Narrow slice of spend, before/after on reclass volume." },
      { lead: "Deliver the international consolidation map", sub: "How Japan and France actually flow into the US-GAAP close today." },
    ],
    notes: "Month three: ship something and prove it worked. Pilot the Ramp coding rules on a narrow slice of spend with before-and-after numbers. And deliver the international consolidation map — how Japan and France actually reach the US-GAAP close today.",
  },
  {
    t: "statement", kick: "Quick win", title: "Route the capitalize call\nto the point of entry.",
    sub: "Ramp’s AI coding is fast — but not built to catch a threshold crossing, or a SaaS bill blending setup with training.",
    notes: "Route the capitalize call to the point of entry. Ramp's AI coding is fast — but it isn't built to catch the two patterns that cause rework: a threshold crossing, and a SaaS bill mixing capitalizable setup with training costs.",
  },
  {
    t: "flow", kick: "The fix", title: "A rules layer in front of NetSuite.",
    tail: "Remember the spray booth — this catches it on day one.",
    notes: "A thin rules layer: flag those two patterns before they sync to NetSuite, route them to a short review queue. Fewer reclasses, cleaner audit trail — and remember the spray booth. This catches it on day one.",
  },
  {
    t: "statement", kick: "The brilliant idea", title: "The international bridge —\nbefore it’s a fire drill.",
    sub: "Vast Japan GK in Tokyo. A French operation flying French astronauts to LEO. Two real subsidiaries, one close calendar.",
    notes: "The international bridge — before it's a fire drill. Vast isn't a single entity anymore: Vast Japan GK, plus a French operation flying French astronauts to LEO. Two real subsidiaries on the same close calendar.",
  },
  {
    t: "list", kick: "Four real accounting problems", title: "What “international” actually means.",
    items: [
      { lead: "Currency translation · ASC 830", sub: "JPY and EUR to USD — the CTA runs through OCI, not the income statement." },
      { lead: "Multi-entity consolidation", sub: "OneWorld with eliminations — or by hand, and manual breaks first as volume grows." },
      { lead: "Transfer pricing", sub: "Arm’s-length documentation for Section 482 and French/Japanese review." },
      { lead: "Indirect tax", sub: "VAT and Consumption Tax — the discipline I run daily on CA sales & use tax." },
    ],
    notes: "Four real problems: ASC 830 currency translation — the CTA runs through OCI, not income. Consolidation — OneWorld with eliminations, or someone's doing it by hand. Transfer pricing — documentation that survives Section 482 and a foreign authority's review. Indirect tax — VAT and Consumption Tax, the discipline I run daily on California sales and use tax.",
  },
  {
    t: "statement", kick: "The pitch", title: "A documented map of the\nclose — within 90 days.",
    sub: "Not a redesign. The standard Vast already holds domestically, extended internationally — before a gap becomes a restatement.",
    notes: "Within ninety days: a documented map of how Japan and France reach the US-GAAP close. Not a redesign — just holding the international side to the standard the domestic stack already meets, before a gap becomes a restatement.",
  },
  {
    t: "statement", kick: "Close", title: "Auditor’s skepticism.\nBuilder’s toolkit.",
    sub: "Thank you — I’d love your questions.",
    notes: "Auditor's skepticism. Builder's toolkit. That's what I'd bring to Vast. Thank you — I'd love your questions.",
  },
];

function Kicker({ children }: { children: string }) {
  return (
    <div style={{ letterSpacing: "0.28em", textTransform: "uppercase", fontSize: "0.62em", color: ACCENT, fontWeight: 700 }}>
      {children}
    </div>
  );
}

function SlideView({ s }: { s: SlideDef }) {
  const pad = "7% 8%";
  if (s.t === "title") {
    return (
      <div style={{ padding: pad, display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
        <Kicker>Final Round · Vast Space</Kicker>
        <div style={{ fontSize: "3.6em", fontWeight: 800, color: LIGHT, lineHeight: 1.02, margin: "0.25em 0 0.2em" }}>James Sieng</div>
        <div style={{ fontSize: "1.05em", color: MUTED }}>Staff Accountant — International Accounting &amp; Accounting Operations</div>
      </div>
    );
  }
  if (s.t === "statement") {
    return (
      <div style={{ padding: pad, display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
        <Kicker>{s.kick}</Kicker>
        <div style={{ fontSize: "2.6em", fontWeight: 800, color: LIGHT, lineHeight: 1.05, whiteSpace: "pre-line", margin: "0.35em 0" }}>
          {s.title}
        </div>
        {s.sub && <div style={{ fontSize: "0.95em", fontStyle: "italic", color: MUTED, maxWidth: "80%" }}>{s.sub}</div>}
      </div>
    );
  }
  if (s.t === "list") {
    return (
      <div style={{ padding: pad, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Kicker>{s.kick}</Kicker>
        <div style={{ fontSize: "1.7em", fontWeight: 800, color: LIGHT, margin: "0.4em 0 0.7em" }}>{s.title}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85em" }}>
          {s.items.map((it, i) => (
            <div key={i} style={{ display: "flex", gap: "0.7em", alignItems: "baseline" }}>
              <span style={{ width: "0.42em", height: "0.42em", borderRadius: "50%", background: ACCENT, flexShrink: 0, transform: "translateY(-0.1em)" }} />
              <div>
                <div style={{ fontSize: "1.0em", fontWeight: 700, color: LIGHT, lineHeight: 1.25 }}>{it.lead}</div>
                {it.sub && <div style={{ fontSize: "0.74em", color: MUTED, lineHeight: 1.4, marginTop: "0.15em" }}>{it.sub}</div>}
              </div>
            </div>
          ))}
        </div>
        {s.callout && (
          <div style={{ marginTop: "1.1em", border: `1px solid ${ACCENT}`, borderRadius: "0.5em", padding: "0.6em 0.9em", fontSize: "0.72em", color: LIGHT, background: "#1f1a12" }}>
            {s.callout}
          </div>
        )}
      </div>
    );
  }
  if (s.t === "cards") {
    return (
      <div style={{ padding: pad, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Kicker>{s.kick}</Kicker>
        <div style={{ fontSize: "1.55em", fontWeight: 800, color: LIGHT, whiteSpace: "pre-line", margin: "0.4em 0 0.8em", lineHeight: 1.15 }}>{s.title}</div>
        <div style={{ display: "flex", gap: "1em", flexWrap: "wrap" }}>
          {[{ c: s.a, col: ACCENT }, { c: s.b, col: BLUE }].map(({ c, col }, i) => (
            <div key={i} style={{ flex: "1 1 12em", background: CARD, border: `1px solid ${LINE}`, borderRadius: "0.6em", padding: "1em 1.2em" }}>
              <div style={{ fontSize: "0.66em", letterSpacing: "0.22em", textTransform: "uppercase", color: col, fontWeight: 700, marginBottom: "0.8em" }}>{c.h}</div>
              <div style={{ fontSize: "0.88em", color: LIGHT, whiteSpace: "pre-line", lineHeight: 1.5 }}>{c.lines}</div>
            </div>
          ))}
        </div>
        {s.tail && <div style={{ marginTop: "1em", fontSize: "0.85em", fontStyle: "italic", color: MUTED }}>{s.tail}</div>}
      </div>
    );
  }
  // flow
  const box = (txt: string, hit?: boolean, indent?: boolean) => (
    <div style={{
      background: CARD, border: `1px solid ${hit ? ACCENT : LINE}`, borderRadius: "0.4em",
      padding: "0.45em 0.9em", fontSize: "0.74em", color: hit ? ACCENT : LIGHT,
      marginLeft: indent ? "2em" : 0, width: "fit-content",
    }}>{txt}</div>
  );
  return (
    <div style={{ padding: pad, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Kicker>{s.kick}</Kicker>
      <div style={{ fontSize: "1.55em", fontWeight: 800, color: LIGHT, margin: "0.4em 0 0.7em" }}>{s.title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.42em" }}>
        {box("Transaction hits Ramp")}
        <div style={{ color: BLUE, fontSize: "0.66em", marginLeft: "1em" }}>↓ AI category + rules</div>
        {box("Below threshold, routine → auto-code as expense", false, true)}
        {box("Above threshold → route to capex review queue", true, true)}
        {box("CCA/SaaS vendor → split capitalize vs. expense", false, true)}
        <div style={{ color: BLUE, fontSize: "0.66em", marginLeft: "1em" }}>↓</div>
        {box("Approved coding syncs to NetSuite")}
      </div>
      <div style={{ marginTop: "0.9em", fontSize: "0.8em", fontStyle: "italic", color: MUTED }}>{s.tail}</div>
    </div>
  );
}

export default function PowerPointPage() {
  const [i, setI] = useState(0);
  const [notes, setNotes] = useState(false);
  const last = SLIDES.length - 1;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) { e.preventDefault(); setI((n) => Math.min(last, n + 1)); }
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); setI((n) => Math.max(0, n - 1)); }
      if (e.key === "Home") { e.preventDefault(); setI(0); }
      if (e.key === "End") { e.preventDefault(); setI(last); }
    }
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [last]);

  const s = SLIDES[i];

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "28px 16px 60px", maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
        <div className="mono">The deck — click or use ← → arrow keys</div>
        <button className="btn" onClick={() => setNotes(!notes)} style={{ fontSize: 13, padding: "6px 14px" }}>
          {notes ? "Hide" : "Show"} speaker notes
        </button>
      </div>

      <div
        style={{
          position: "relative", width: "100%", aspectRatio: "16 / 9", background: BG,
          border: `1px solid ${LINE}`, borderRadius: 10, overflow: "hidden",
          fontSize: "clamp(9px, 1.55vw, 18px)", boxShadow: "0 30px 90px rgba(0,0,0,0.6)",
          userSelect: "none",
        }}
      >
        <SlideView s={s} />
        <div style={{ position: "absolute", right: "3%", bottom: "3.5%", fontSize: "0.66em", color: MUTED }}>
          {i + 1}
        </div>
        {/* click zones: left third = back, rest = forward */}
        <div onClick={() => setI((n) => Math.max(0, n - 1))} style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "33%", cursor: i > 0 ? "w-resize" : "default" }} />
        <div onClick={() => setI((n) => Math.min(last, n + 1))} style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "67%", cursor: i < last ? "e-resize" : "default" }} />
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
        <button className="btn" onClick={() => setI((n) => Math.max(0, n - 1))} disabled={i === 0} style={{ opacity: i === 0 ? 0.35 : 1 }}>
          ← Prev
        </button>
        <span className="mono" style={{ color: "var(--muted)" }}>{i + 1} / {SLIDES.length}</span>
        <button className="btn" onClick={() => setI((n) => Math.min(last, n + 1))} disabled={i === last} style={{ opacity: i === last ? 0.35 : 1 }}>
          Next →
        </button>
      </div>

      {notes && (
        <div className="note" style={{ marginTop: 18 }}>
          <span className="mono" style={{ display: "block", marginBottom: 8 }}>Speaker notes — slide {i + 1}</span>
          {s.notes}
        </div>
      )}
    </div>
  );
}
