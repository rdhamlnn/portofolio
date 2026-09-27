"use client";

import { useEffect } from "react";

/**
 * One scroll loop drives every scroll-reactive layer on the page.
 *
 * - [data-parallax="0.08"]  translate3d on scroll, speed = the attribute value
 * - [data-grow]             sets --g (0..1) so a line can scaleY with progress
 * - [data-dot]              flips data-lit="true" once it passes 72% viewport
 *
 * ponytail: single rAF listener for the whole page, no per-element observers.
 * Ceiling: re-queries elements only on mount, so elements added later (none today)
 * would be missed. Upgrade: re-run the query inside a MutationObserver if needed.
 */
export default function ScrollFX() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const grows = Array.from(document.querySelectorAll<HTMLElement>("[data-grow]"));
    const dots = Array.from(document.querySelectorAll<HTMLElement>("[data-dot]"));
    let frame = 0;

    const run = () => {
      frame = 0;
      const vh = window.innerHeight;

      for (const el of parallax) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -160 || rect.top > vh + 160) continue;
        const speed = Number(el.dataset.parallax) || 0.08;
        const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      }

      for (const el of grows) {
        const rect = el.getBoundingClientRect();
        const progress = (vh * 0.8 - rect.top) / Math.max(1, rect.height);
        el.style.setProperty("--g", Math.max(0, Math.min(1, progress)).toFixed(3));
      }

      for (const el of dots) {
        if (el.dataset.lit === "true") continue;
        if (el.getBoundingClientRect().top < vh * 0.72) el.dataset.lit = "true";
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(run);
    };

    run();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return null;
}
