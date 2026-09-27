"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { SectionHeading, SectionShell } from "./Section";
import { CountUp } from "./fx";
import { brandOf, BrandIcon } from "./icons";
import { skillGroups } from "@/data/site";

export default function SkillsExplorer() {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const group = skillGroups.find((g) => g.id === activeId) ?? skillGroups[0];

  return (
    <SectionShell id="keahlian">
      <SectionHeading
        index="02 — Keahlian"
        title="Perangkat yang aku pakai sehari-hari."
        lead="Pilih kategori untuk melihat detailnya. Angka menunjukkan seberapa sering aku memakainya dalam pekerjaan nyata, bukan sekadar pernah mencoba."
      />

      <Reveal axis="fade">
        <div
          role="tablist"
          aria-label="Kategori keahlian"
          className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {skillGroups.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveId(item.id)}
                className={`shine shrink-0 rounded-full border px-4 py-2.5 text-sm transition-all duration-300 hover:-translate-y-0.5 ${
                  isActive
                    ? "border-transparent bg-ink text-bg"
                    : "border-line bg-surface text-muted hover:border-line-strong hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal axis="scale" delay={80}>
        <div key={group.id} className="animate-panel glass glow-border relative mt-6 rounded-3xl p-7 sm:p-9">
          <p className="text-sm text-muted">{group.blurb}</p>

          <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2">
            {group.items.map((skill) => (
              <li key={`${group.id}-${skill.name}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-sm font-medium">
                    {brandOf(skill.name) && (
                      <BrandIcon brand={brandOf(skill.name)!} className="h-4 w-4 text-accent2" />
                    )}
                    {skill.name}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    <CountUp to={skill.level} />%
                  </span>
                </div>

                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-surface-strong">
                  <span
                    className="bar block h-full rounded-full bg-gradient-to-r from-accent to-accent2"
                    style={{ ["--w" as string]: `${skill.level}%` }}
                  />
                </div>

                <p className="mt-2.5 text-xs leading-relaxed text-muted">{skill.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </SectionShell>
  );
}
