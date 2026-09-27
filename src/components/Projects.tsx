"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { Badge, SectionHeading, SectionShell } from "./Section";
import { CursorGlow } from "./fx";
import { TechMark } from "./icons";
import { ArrowUpRight } from "./ui";
import { projects } from "@/data/site";

export default function Projects() {
  const [activeSlug, setActiveSlug] = useState(projects[0].slug);
  const active = projects.find((p) => p.slug === activeSlug) ?? projects[0];

  return (
    <SectionShell id="proyek">
      <SectionHeading
        index="03 — Proyek"
        title="Yang pernah aku bangun."
        lead="Klik salah satu proyek untuk melihat peran, teknologi, dan bagian yang aku kerjakan."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Reveal axis="left">
          <CursorGlow>
            <ul className="stagger flex flex-col gap-2.5" role="tablist" aria-label="Daftar proyek">
              {projects.map((project) => {
                const isActive = project.slug === active.slug;
                return (
                  <li key={project.slug}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveSlug(project.slug)}
                      className={`group flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                        isActive
                          ? "border-line-strong bg-surface-strong"
                          : "border-line bg-transparent hover:border-line-strong hover:bg-surface"
                      }`}
                    >
                      <span
                        className={`h-10 w-1 shrink-0 rounded-full transition-all duration-500 ${
                          isActive
                            ? "bg-gradient-to-b from-accent to-accent2 scale-y-100"
                            : "bg-line-strong scale-y-75 group-hover:scale-y-100"
                        }`}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{project.name}</span>
                        <span className="mt-0.5 block truncate text-xs text-muted">
                          {project.tagline}
                        </span>
                      </span>
                      <span className="font-mono text-[11px] whitespace-nowrap text-muted">
                        {project.year}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </CursorGlow>
        </Reveal>

        <Reveal axis="right" delay={90}>
          <article
            key={active.slug}
            className="animate-panel glass spotlight relative flex h-full flex-col overflow-hidden rounded-3xl p-7 sm:p-9"
          >
            <div className="pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full bg-accent/15 blur-[90px]" />

            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">{active.name}</h3>
                <p className="mt-1.5 text-sm text-muted">{active.tagline}</p>
              </div>
              <span className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] text-muted">
                {active.year}
              </span>
            </div>

            <div className="relative mt-6 flex flex-wrap gap-2">
              {active.stack.map((tech) => (
                <Badge key={`${active.slug}-${tech}`}>
                  <span className="inline-flex items-center gap-1.5">
                    <TechMark name={tech} className="h-3.5 w-3.5 text-accent2" />
                    {tech}
                  </span>
                </Badge>
              ))}
            </div>

            <p className="relative mt-7 leading-relaxed text-muted">{active.description}</p>

            <div className="relative mt-8">
              <h4 className="font-mono text-xs tracking-widest text-accent2 uppercase">
                Bagian yang aku kerjakan
              </h4>
              <ul className="stagger mt-4 space-y-3">
                {active.highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-snug">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent2" />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-auto flex flex-wrap items-center gap-4 border-t border-line pt-7">
              <span className="font-mono text-[11px] tracking-wider text-muted uppercase">
                Peran
              </span>
              <span className="text-sm">{active.role}</span>
              {active.repo && (
                <a
                  href={active.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="shine group ml-auto inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-2 text-sm transition-colors hover:bg-surface-strong"
                >
                  Lihat Repository
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              )}
            </div>
          </article>
        </Reveal>
      </div>
    </SectionShell>
  );
}
