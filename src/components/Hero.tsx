"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import AmbientCanvas from "./AmbientCanvas";
import TypingWords from "./TypingWords";
import { BrandIcon } from "./icons";
import { ArrowRight } from "./ui";
import { profile, stats } from "@/data/site";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  // Pointer parallax: the glow follows the cursor, the portrait drifts with it.
  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const card = section.querySelector<HTMLElement>("[data-hero-card]");
    let frame = 0;
    let target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      target = {
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5,
      };
    };

    const loop = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      glow.style.transform = `translate3d(${(current.x * 44).toFixed(1)}px, ${(current.y * 30).toFixed(1)}px, 0)`;
      if (card) {
        card.style.transform = `rotateY(${(current.x * 6).toFixed(2)}deg) rotateX(${(-current.y * 6).toFixed(2)}deg)`;
      }
      frame = window.requestAnimationFrame(loop);
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    frame = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pt-24 pb-16 sm:px-8 sm:pt-28 sm:pb-20"
    >
      <div className="absolute inset-0 -z-20">
        <AmbientCanvas />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 grid-lines" />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          ref={glowRef}
          className="animate-drift absolute top-[-18%] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/20 blur-[130px]"
        />
        <div
          className="animate-drift absolute right-[6%] bottom-[-12%] h-[380px] w-[380px] rounded-full bg-accent2/15 blur-[120px]"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div>
          <div className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs text-muted backdrop-blur">
            <span className="pulse-ring relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {profile.status}
          </div>

          <h1 className="animate-rise mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            <span className="gradient-text">{profile.name}</span>
          </h1>

          <p className="animate-rise mt-4 font-mono text-sm sm:text-base">
            <span className="text-muted">{"<"}</span>
            <TypingWords />
            <span className="text-muted">{" />"}</span>
          </p>

          {/* Mobile: compact identity chip. The full portrait card is lg+ only. */}
          <div className="animate-rise mt-6 flex items-center gap-3.5 lg:hidden">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={56}
              height={56}
              priority
              className="h-14 w-14 rounded-2xl border border-line object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{profile.location}</p>
              <p className="truncate font-mono text-xs text-muted">{profile.education.school}</p>
            </div>
          </div>

          <p className="animate-rise mt-6 max-w-xl leading-relaxed text-muted sm:text-lg">
            {profile.intro}
          </p>

          <div className="animate-rise mt-8 flex flex-wrap items-center gap-3 sm:mt-9">
            <a
              href="#proyek"
              className="shine group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5"
            >
              Lihat Proyek
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="group relative inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-3 text-sm transition-colors hover:bg-surface-strong"
            >
              Kirim Email
              <span className="absolute inset-x-5 -bottom-px h-px origin-left scale-x-0 bg-accent2 transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          </div>

          <dl className="animate-rise mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-12 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group bg-bg-soft px-3.5 py-4 transition-colors duration-300 hover:bg-surface-strong sm:px-4 sm:py-5"
              >
                <dt className="font-mono text-[10px] tracking-wider text-muted uppercase sm:text-[11px]">
                  {stat.label}
                </dt>
                <dd className="mt-1.5 text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent2 sm:mt-2 sm:text-2xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          data-hero-card
          className="animate-rise relative mx-auto hidden w-full max-w-sm transition-transform duration-500 ease-out lg:block"
        >
          <span className="absolute -top-2 -left-2 h-6 w-6 border-t border-l border-accent2/60" />
          <span className="absolute -top-2 -right-2 h-6 w-6 border-t border-r border-accent2/60" />
          <span className="absolute -bottom-2 -left-2 h-6 w-6 border-b border-l border-accent2/60" />
          <span className="absolute -right-2 -bottom-2 h-6 w-6 border-r border-b border-accent2/60" />

          <div className="glass overflow-hidden rounded-3xl">
            <div className="relative aspect-square">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                priority
                sizes="(max-width: 1024px) 24rem, 24rem"
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-sm font-medium">{profile.name}</p>
                <p className="mt-0.5 font-mono text-xs text-muted">{profile.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 border-t border-line">
              <div className="border-r border-line p-4">
                <p className="font-mono text-[11px] tracking-wider text-muted uppercase">Fokus</p>
                <p className="mt-1.5 text-xs">Laravel · Next.js</p>
              </div>
              <div className="p-4">
                <p className="font-mono text-[11px] tracking-wider text-muted uppercase">
                  Domisili
                </p>
                <p className="mt-1.5 text-xs">Banjarmasin, ID</p>
              </div>
            </div>
          </div>

          <div
            className="animate-drift absolute -top-4 -left-7 hidden items-center gap-2 rounded-xl border border-line bg-bg-soft/90 px-3 py-2 font-mono text-xs backdrop-blur lg:flex"
            style={{ animationDuration: "11s" }}
          >
            <BrandIcon brand="laravel" className="h-3.5 w-3.5 text-accent2" />
            Laravel
          </div>
          <div
            className="animate-drift absolute -right-6 bottom-28 hidden items-center gap-2 rounded-xl border border-line bg-bg-soft/90 px-3 py-2 font-mono text-xs backdrop-blur lg:flex"
            style={{ animationDuration: "13s", animationDelay: "-4s" }}
          >
            <BrandIcon brand="mysql" className="h-3.5 w-3.5 text-accent2" />
            MySQL
          </div>
        </div>
      </div>

      {/* Not a Reveal: the wrapper is display:none below sm, so an
          IntersectionObserver would never fire and it would stay invisible. */}
      <div
        className="animate-rise pointer-events-none absolute inset-x-0 bottom-7 z-10 hidden justify-center sm:flex"
        style={{ animationDelay: "900ms" }}
      >
        <span className="flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-muted uppercase">
          Scroll
          <span className="relative h-9 w-px overflow-hidden bg-line-strong">
            <span className="animate-scroll-cue absolute inset-x-0 top-0 h-3 bg-accent2" />
          </span>
        </span>
      </div>
    </section>
  );
}
