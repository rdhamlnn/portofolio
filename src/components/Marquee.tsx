import { marquee } from "@/data/site";
import { TechMark } from "./icons";

export default function Marquee() {
  const front = [...marquee, ...marquee];
  const back = [...marquee.slice().reverse(), ...marquee.slice().reverse()];

  return (
    <div
      data-parallax="0.03"
      className="relative overflow-hidden border-y border-line py-4"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />

      <div className="flex w-max animate-marquee items-center gap-10 pr-10">
        {front.map((item, i) => (
          <span key={`f-${item}-${i}`} className="flex items-center gap-10">
            <span className="flex items-center gap-2 font-mono text-sm tracking-wide whitespace-nowrap text-muted transition-colors duration-300 hover:text-ink">
              <TechMark name={item} className="h-4 w-4 text-accent2/80" />
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-accent/70" />
          </span>
        ))}
      </div>

      <div className="mt-3 flex w-max animate-marquee-reverse items-center gap-10 pr-10 opacity-45">
        {back.map((item, i) => (
          <span key={`b-${item}-${i}`} className="flex items-center gap-10">
            <span className="flex items-center gap-2 font-mono text-xs tracking-wide whitespace-nowrap text-muted">
              <TechMark name={item} className="h-3.5 w-3.5" />
              {item}
            </span>
            <span className="h-px w-8 bg-line-strong" />
          </span>
        ))}
      </div>
    </div>
  );
}
