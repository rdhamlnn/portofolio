"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/site";

export default function Footer() {
  const [show, setShow] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Magnet: the button leans toward the cursor, then springs back on leave.
  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);
      const range = 110;
      const pull = dist < range ? (1 - dist / range) * 0.42 : 0;
      el.style.setProperty("--tx", `${(dx * pull).toFixed(1)}px`);
      el.style.setProperty("--ty", `${(dy * pull).toFixed(1)}px`);
    };

    const onLeave = () => {
      el.style.setProperty("--tx", "0px");
      el.style.setProperty("--ty", "0px");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <footer className="border-t border-line px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">{profile.name}</p>
            <p className="mt-1 font-mono text-xs text-muted">
              {profile.role} · Banjarmasin, Indonesia
            </p>
          </div>

          <div className="flex items-center gap-5 font-mono text-xs text-muted">
            <a
              href="https://github.com/rdhamlnn/portofolio"
              target="_blank"
              rel="noreferrer noopener"
              className="group relative hover:text-ink"
            >
              Sumber
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent2 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="group relative hover:text-ink"
            >
              GitHub
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent2 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
            <a href={`mailto:${profile.email}`} className="group relative hover:text-ink">
              Email
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent2 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
            <a href="#home" className="group relative hover:text-ink">
              Kembali ke atas ↑
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent2 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-6xl border-t border-line pt-6 font-mono text-[11px] text-muted">
          © {new Date().getFullYear()} {profile.name}. Dibangun dengan Next.js dan Tailwind CSS.
        </p>
      </footer>

      <button
        ref={btnRef}
        type="button"
        aria-label="Kembali ke atas"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`glass magnet fixed right-5 bottom-5 z-40 grid h-11 w-11 place-items-center rounded-full ${
          show ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"
        }`}
      >
        <span aria-hidden="true">↑</span>
      </button>
    </>
  );
}
