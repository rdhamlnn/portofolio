import Reveal from "./Reveal";
import { SectionHeading, SectionShell } from "./Section";
import { timeline } from "@/data/site";

export default function Timeline() {
  return (
    <SectionShell id="perjalanan">
      <SectionHeading
        index="04 · Perjalanan"
        title="Jejak yang membentuk cara kerjaku."
        lead="Urutan pengalaman dari riset, proyek nyata, program studi, sampai latar pendidikan."
      />

      <ol className="relative pl-6 sm:pl-9">
        {/* Base rail + the accent rail that grows with scroll (ScrollFX sets --g). */}
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-0 w-px bg-line" />
        <span
          aria-hidden="true"
          data-grow
          className="absolute top-2 bottom-2 left-0 w-px bg-gradient-to-b from-accent2 via-accent to-accent3"
        />

        {timeline.map((item, i) => (
          <li key={`${item.period}-${item.title}`} className="relative pb-10 last:pb-0">
            <Reveal axis={i % 2 === 0 ? "left" : "right"} delay={i * 70}>
              <span
                aria-hidden="true"
                data-dot
                className="absolute top-1.5 -left-[25px] h-2.5 w-2.5 rounded-full bg-line-strong ring-4 ring-bg sm:-left-[41px]"
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
