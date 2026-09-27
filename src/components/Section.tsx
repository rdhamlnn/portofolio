import type { ReactNode } from "react";
import Reveal from "./Reveal";

export function SectionShell({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28 ${className ?? ""}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

/** Words rise one by one; the CSS holds them until their Reveal parent shows. */
function HeadingWords({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="word" style={{ ["--i" as string]: i }}>
          {word}
        </span>
      ))}
    </>
  );
}

export function SectionHeading({
  index,
  title,
  lead,
}: {
  index: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal axis="fade" className="mb-12 max-w-2xl">
      <div className="mb-3 flex items-center gap-3 font-mono text-xs tracking-widest text-accent2 uppercase">
        <span>{index}</span>
        <span className="h-px w-10 origin-left bg-line-strong" />
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        <HeadingWords text={title} />
      </h2>
      {lead && <p className="mt-4 leading-relaxed text-muted">{lead}</p>}
    </Reveal>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-muted">
      {children}
    </span>
  );
}
