# Running TODO — Vast Final Round

Last updated: 2026-07-30

## ✅ Done

- [x] Repo created + pushed → `github.com/jamessiengsieyant/jamessieng`
- [x] Next.js 16.2.6 + React 19 + Clerk v7 app scaffolded
- [x] Netlify build fixed (Clerk v7 uses `<Show when="signed-in">`, not `SignedIn`/`SignedOut`)
- [x] DNS resolved — jamessieng.com live, valid SSL, HTTP 200
- [x] www → apex redirect working

## 🔧 Infrastructure — remaining

- [ ] Confirm Clerk keys in Netlify are **production** keys (currently showing `dev-browser-missing` = dev instance)
- [ ] Set Clerk allowed origin to `jamessieng.com`
- [ ] Test full sign-in flow end-to-end on the live domain
- [ ] Add `vast.jamessieng.com` subdomain (optional — decide)
- [ ] Generate offline backup: PPTX + PDF export

## ✍️ Content — the actual presentation

### Introduction (~15 min, memorized)
- [ ] Confirm education details (school, year, CPA path)
- [ ] Decide: does music (guitar/vocals) go in the room?
- [ ] Write final hook + Present/Past/Future arc
- [ ] Rehearse to memory

### Topic 1 — Capitalize vs. Expense (2 examples)
- [ ] **Example 1 — ForensisGroup / Salesforce**
  - NEED FROM JAMES: was there a paid consultant/agency implementation, or self-configured only? Dollar scale? What did you personally decide/recommend?
- [ ] **Example 2 — TBD** (CDTFA is off-limits — confidential taxpayer info)
  - Candidates: equipment repair-vs-improvement call · a Sieyant infrastructure decision · another ForensisGroup call
- [ ] For each: goals/requirements → direct contribution → results → lessons learned

### Topic 2 — 30/60/90 + the idea
- [x] Draft 30/60/90 structure
- [x] Draft the "brilliant idea" (Ramp → NetSuite capex/opex routing at point of entry)
- [ ] Pressure-test the idea against how Vast actually operates
- [ ] Tighten to presentation-ready

## 🎯 Final prep

- [ ] Full run-through with timing (target 30–45 min)
- [ ] Mock Q&A — anticipate pushback on both examples
- [ ] Have ASC 350-40 / ASU 2018-15 / ASC 360 details cold

---

## Key technical facts to know cold

**Fixed assets (ASC 360)** — capitalize purchase price + tax + freight + installation + testing + site prep. Threshold is company policy (commonly $2,500–$5,000), not GAAP. Subsequent costs: capitalize if it extends life / adds capacity / improves efficiency; expense if it merely maintains.

**SaaS like Salesforce (ASC 350-40, as amended by ASU 2018-15)** — subscription fee is ALWAYS a period expense, never an asset. Implementation costs: capitalize configuration, customization, testing → sits as a prepaid/other asset, amortized to the SAME P&L line as the subscription (not D&A). Training and data conversion are expensed immediately.

**Vast's stack** — Ramp (spend management) → NetSuite (ERP). Ramp mirrors NetSuite's chart of accounts, departments, classes; AI suggests coding; syncs every 15–20 min.
