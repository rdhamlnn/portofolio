import Reveal from "./Reveal";
import { SectionHeading, SectionShell } from "./Section";
import { timeline } from "@/data/site";

export default function Timeline() {
  return (
    <SectionShell id="perjalanan">
      <SectionHeading
        index="04 — Perjalanan"
        title="Jejak yang membentuk cara kerjaku."
        lead="Urutan pengalaman dari riset, proyek nyata, program studi, sampai latar pendidikan."
      />

      <ol className="relative border-l border-line pl-6 sm:pl-9">
        {timeline.map((item, i) => (
          <li key={`${item.period}-${item.title}`} className="relative pb-10 last:pb-0">
            <Reveal delay={i * 90}>
              <span
                className={`absolute top-1.5 -left-[31px] h-2.5 w-2.5 rounded-full ring-4 ring-bg sm:-left-[46px] ${
                  i === 0 ? "bg-accent2" : "bg-line-strong"
                }`}
              />
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs tracking-wider text-accent2">{item.period}</span>
                <span className="rounded-full border border-line bg-surface px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-muted uppercase">
                  {item.tag}
                </span>
              </div>
              <h3 className="mt-2.5 text-lg font-medium tracking-tight">{item.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{item.detail}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
