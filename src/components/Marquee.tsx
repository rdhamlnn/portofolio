import { marquee } from "@/data/site";

export default function Marquee() {
  const items = [...marquee, ...marquee];

  return (
    <div className="relative overflow-hidden border-y border-line py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-10 pr-10">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            <span className="font-mono text-sm tracking-wide whitespace-nowrap text-muted">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-accent/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
