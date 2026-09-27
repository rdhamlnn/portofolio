"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { Badge, SectionHeading, SectionShell } from "./Section";
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
        <Reveal>
          <ul className="flex flex-col gap-2.5" role="tablist" aria-label="Daftar proyek">
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
                      className={`h-10 w-1 shrink-0 rounded-full transition-colors ${
                        isActive ? "bg-gradient-to-b from-accent to-accent2" : "bg-line-strong"
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
        </Reveal>

        <Reveal delay={90}>
          <article
            key={active.slug}
            className="animate-rise glass flex h-full flex-col rounded-3xl p-7 sm:p-9"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">{active.name}</h3>
                <p className="mt-1.5 text-sm text-muted">{active.tagline}</p>
              </div>
              <span className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] text-muted">
                {active.year}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {active.stack.map((tech) => (
                <Badge key={`${active.slug}-${tech}`}>{tech}</Badge>
              ))}
            </div>

            <p className="mt-7 leading-relaxed text-muted">{active.description}</p>

            <div className="mt-8">
              <h4 className="font-mono text-xs tracking-widest text-accent2 uppercase">
                Bagian yang aku kerjakan
              </h4>
              <ul className="mt-4 space-y-3">
                {active.highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-snug">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent2" />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-line pt-7">
              <span className="font-mono text-[11px] tracking-wider text-muted uppercase">
                Peran
              </span>
              <span className="text-sm">{active.role}</span>
              {active.repo && (
                <a
                  href={active.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="ml-auto inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-2 text-sm transition-colors hover:bg-surface-strong"
                >
                  Lihat Repository
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </article>
        </Reveal>
      </div>
    </SectionShell>
  );
}
