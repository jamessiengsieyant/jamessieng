"use client";

import { useEffect, useState } from "react";
import s from "./space.module.css";

type Step = {
  cursor: { top: number; left: number };
  click?: boolean;
  badge: "expense" | "flag" | "ok";
  rowHit?: boolean;
  toast?: string;
};

const STEPS: Step[] = [
  { cursor: { top: 18, left: 210 }, badge: "expense" },
  { cursor: { top: 44, left: 236 }, badge: "expense" },
  { cursor: { top: 44, left: 236 }, click: true, badge: "flag", rowHit: true },
  { cursor: { top: 44, left: 236 }, badge: "flag", rowHit: true, toast: "Routed to capex review queue…" },
  { cursor: { top: 44, left: 236 }, badge: "ok", rowHit: true, toast: "✓ Synced to NetSuite" },
];
const STEP_MS = 1500;

export default function MockupClip() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setI(STEPS.length - 1);
      return;
    }
    const id = setInterval(() => setI((n) => (n + 1) % STEPS.length), STEP_MS);
    return () => clearInterval(id);
  }, []);

  const step = STEPS[i];
  const badgeLabel = step.badge === "expense" ? "Expense" : step.badge === "flag" ? "⚑ Flagged" : "Capex ✓";
  const badgeClass = `${s.mockupBadge} ${step.badge === "flag" ? s.flag : ""} ${step.badge === "ok" ? s.ok : ""}`;

  return (
    <div className={s.mockup} aria-hidden="true">
      <div className={s.mockupBar}>
        <span className={s.mockupDot} style={{ background: "#ff5f57" }} />
        <span className={s.mockupDot} style={{ background: "#febc2e" }} />
        <span className={s.mockupDot} style={{ background: "#28c840" }} />
        <span className={s.mockupTitle}>Ramp — Transactions</span>
      </div>
      <div className={s.mockupBody}>
        <div className={`${s.mockupRow} ${step.rowHit ? s.hit : ""}`}>
          <div className={s.mockupRowMain}>
            <span className={s.mockupVendor}>Salesforce Implementation LLC</span>
            <span className={s.mockupAmt}>$18,400 · Jul 14</span>
          </div>
          <span className={badgeClass}>{badgeLabel}</span>
        </div>
        <div className={s.mockupCursor + (step.click ? ` ${s.click}` : "")} style={{ top: step.cursor.top, left: step.cursor.left }} />
        {STEPS.slice(0, i + 1).some((st) => st.toast) && (
          <div className={`${s.mockupToast} ${step.toast ? s.show : ""}`}>{step.toast ?? ""}</div>
        )}
      </div>
    </div>
  );
}
