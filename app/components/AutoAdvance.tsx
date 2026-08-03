"use client";

import { useEffect, useState } from "react";

const DWELL = 4000; // time between advances
const MIN_MS = 1200; // shortest transition
const MAX_MS = 3000; // longest (used when looping back to the top)
const RESUME_AFTER = 9000; // idle time before auto-play picks back up

export default function AutoAdvance() {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = () => Array.from(document.querySelectorAll<HTMLElement>(".snap"));

    setCount(sections().length);

    let interval: number | undefined;
    let idle: number | undefined;
    let raf = 0;
    let animating = false;
    let paused = false;

    // Document-space top of a section. offsetTop would be measured against the
    // nearest positioned ancestor, which the sticky nav throws off.
    function topOf(el: HTMLElement) {
      return Math.round(el.getBoundingClientRect().top + root.scrollTop);
    }

    function nearest() {
      const y = root.scrollTop;
      let best = 0;
      let bestD = Infinity;
      sections().forEach((s, i) => {
        const d = Math.abs(topOf(s) - y);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      return best;
    }

    function tweenTo(i: number) {
      const secs = sections();
      const target = secs[i];
      if (!target) return;

      const from = root.scrollTop;
      const maxY = root.scrollHeight - root.clientHeight;
      const to = i === 0 ? 0 : Math.min(topOf(target), maxY);
      const delta = to - from;
      if (Math.abs(delta) < 2) {
        setIndex(i);
        return;
      }

      // Longer travel gets a longer tween, so the loop back to the top reads as
      // pulling away rather than snapping.
      const duration = Math.min(MAX_MS, Math.max(MIN_MS, 900 + Math.abs(delta) * 1.0));

      // CSS snapping would fight a manual tween, so stand it down until we land.
      animating = true;
      root.style.scrollSnapType = "none";

      const t0 = performance.now();
      cancelAnimationFrame(raf);

      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        window.scrollTo(0, from + delta * e);
        if (p < 1) {
          raf = requestAnimationFrame(step);
        } else {
          root.style.scrollSnapType = "";
          animating = false;
          setIndex(i);
        }
      };
      raf = requestAnimationFrame(step);
    }

    function advance() {
      if (paused || animating || document.hidden) return;
      const secs = sections();
      if (secs.length < 2) return;
      tweenTo((nearest() + 1) % secs.length);
    }

    // Any deliberate input hands control back to the visitor for a while.
    function pause() {
      paused = true;
      if (animating) {
        cancelAnimationFrame(raf);
        root.style.scrollSnapType = "";
        animating = false;
      }
      window.clearTimeout(idle);
      idle = window.setTimeout(() => {
        paused = false;
      }, RESUME_AFTER);
    }

    function onScroll() {
      if (!animating) setIndex(nearest());
    }

    addEventListener("scroll", onScroll, { passive: true });

    const inputs = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    if (!reduced) {
      interval = window.setInterval(advance, DWELL);
      inputs.forEach((ev) => addEventListener(ev, pause, { passive: true }));
    }

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(idle);
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      inputs.forEach((ev) => removeEventListener(ev, pause));
      root.style.scrollSnapType = "";
    };
  }, []);

  if (count < 2) return null;

  return (
    <div className="dots" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className={i === index ? "dot on" : "dot"} />
      ))}
    </div>
  );
}
