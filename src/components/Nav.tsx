"use client";

import { useEffect, useRef, useState } from "react";
import { navItems, profile } from "@/data/site";

const SECTION_IDS = ["home", "tentang", "keahlian", "proyek", "perjalanan", "kontak"];

export default function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  // Sliding pill: measured from the active link so it glides instead of blinking.
  const listRef = useRef<HTMLUListElement | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });

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

  // Measure the active nav link → pill position. Re-measured on resize.
  useEffect(() => {
    const measure = () => {
      const list = listRef.current;
      if (!list) return;
      const link = list.querySelector<HTMLElement>(`[data-nav="${active}"]`);
      if (!link) {
        setPill((p) => ({ ...p, ready: false }));
        return;
      }
      setPill({ left: link.offsetLeft, width: link.offsetWidth, ready: true });
    };

    measure();
    window.addEventListener("resize", measure);
    // Fonts can settle after first paint and shift the links slightly.
    const timer = window.setTimeout(measure, 400);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(timer);
    };
  }, [active]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`h-[2px] origin-left bg-gradient-to-r from-accent via-accent2 to-accent3 transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: `scaleX(${progress})` }}
      />

      <nav
        className={`transition-all duration-500 ${
          scrolled ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <a href="#home" className="group flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-line-strong bg-surface font-mono text-sm font-semibold text-accent2 transition-colors duration-300 group-hover:border-accent2/60">
              MR
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">
              {profile.name}
              <span className="ml-2 font-mono text-xs text-muted">@{profile.handle}</span>
            </span>
          </a>

          <ul ref={listRef} className="relative hidden items-center gap-1 md:flex">
            <li
              aria-hidden="true"
              className="pointer-events-none absolute top-0 h-full rounded-full border border-line-strong bg-surface transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: `${pill.width}px`,
                transform: `translateX(${pill.left}px)`,
                opacity: pill.ready ? 1 : 0,
              }}
            />
            {navItems.map((item) => {
              const id = item.href.slice(1);
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <a
                    data-nav={id}
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-full px-3.5 py-2 text-sm transition-colors duration-300 ${
                      isActive ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="shine hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5 sm:block"
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
            <li
              key={item.href}
              className={`transition-transform duration-500 ${
                open ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${80 + i * 55}ms` : "0ms" }}
            >
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-line py-3.5 text-sm last:border-0"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
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
