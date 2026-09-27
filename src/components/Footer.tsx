"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/site";

export default function Footer() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
            <a href={profile.github} target="_blank" rel="noreferrer noopener" className="hover:text-ink">
              GitHub
            </a>
            <a href={`mailto:${profile.email}`} className="hover:text-ink">
              Email
            </a>
            <a href="#home" className="hover:text-ink">
              Kembali ke atas ↑
            </a>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-6xl border-t border-line pt-6 font-mono text-[11px] text-muted">
          © {new Date().getFullYear()} {profile.name}. Dibangun dengan Next.js dan Tailwind CSS.
        </p>
      </footer>

      <button
        type="button"
        aria-label="Kembali ke atas"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`glass fixed right-5 bottom-5 z-40 grid h-11 w-11 place-items-center rounded-full transition-all duration-300 ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        ↑
      </button>
    </>
  );
}
