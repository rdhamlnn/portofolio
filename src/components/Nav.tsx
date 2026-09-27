"use client";

import { useEffect, useState } from "react";
import { navItems, profile } from "@/data/site";

const SECTION_IDS = ["home", "tentang", "keahlian", "proyek", "perjalanan", "kontak"];

export default function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
        }
        if (best) setActive(best.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`h-[2px] origin-left bg-gradient-to-r from-accent via-accent2 to-accent3 transition-transform duration-150 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: `scaleX(${progress})` }}
      />

      <nav
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <a href="#home" className="group flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-line-strong bg-surface font-mono text-sm font-semibold text-accent2">
              MR
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">
              {profile.name}
              <span className="ml-2 font-mono text-xs text-muted">@{profile.handle}</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const id = item.href.slice(1);
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                      isActive ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 -z-10 rounded-full border border-line-strong bg-surface" />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 sm:block"
            >
              Hire me
            </a>

            <button
              type="button"
              aria-label="Buka menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-surface md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute inset-x-0 top-0 h-[1.5px] bg-ink transition-transform duration-300 ${
                    open ? "translate-y-[5.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-[5px] h-[1.5px] bg-ink transition-opacity duration-200 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-[10px] h-[1.5px] bg-ink transition-transform duration-300 ${
                    open ? "-translate-y-[4.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-b border-line bg-bg/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 md:hidden ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
          {navItems.map((item, i) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-line py-3.5 text-sm last:border-0"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-muted">
                  0{i + 1}
                </span>
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a
              href={`mailto:${profile.email}`}
              onClick={() => setOpen(false)}
              className="block rounded-xl bg-ink py-3 text-center text-sm font-medium text-bg"
            >
              Hire me
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
