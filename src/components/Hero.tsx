import Image from "next/image";
import AmbientCanvas from "./AmbientCanvas";
import TypingWords from "./TypingWords";
import { profile, stats } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pt-24 pb-14 sm:px-8 sm:pt-28 sm:pb-16"
    >
      <div className="absolute inset-0 -z-20">
        <AmbientCanvas />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 grid-lines" />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-drift absolute top-[-18%] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/20 blur-[130px]" />
        <div
          className="animate-drift absolute right-[6%] bottom-[-12%] h-[380px] w-[380px] rounded-full bg-accent2/15 blur-[120px]"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div>
          <div className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs text-muted backdrop-blur">
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {profile.status}
          </div>

          <h1
            className="animate-rise mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            <span className="gradient-text">{profile.name}</span>
          </h1>

          <p
            className="animate-rise mt-4 font-mono text-sm sm:text-base"
            style={{ animationDelay: "160ms" }}
          >
            <span className="text-muted">{"<"}</span>
            <TypingWords />
            <span className="text-muted">{" />"}</span>
          </p>

          {/* Mobile: compact identity chip. The full portrait card is lg+ only. */}
          <div
            className="animate-rise mt-6 flex items-center gap-3.5 lg:hidden"
            style={{ animationDelay: "200ms" }}
          >
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

          <p
            className="animate-rise mt-6 max-w-xl leading-relaxed text-muted sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            {profile.intro}
          </p>

          <div
            className="animate-rise mt-8 flex flex-wrap items-center gap-3 sm:mt-9"
            style={{ animationDelay: "320ms" }}
          >
            <a
              href="#proyek"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              Lihat Proyek
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-3 text-sm transition-colors hover:bg-surface-strong"
            >
              Kirim Email
            </a>
          </div>

          <dl
            className="animate-rise mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-12 sm:grid-cols-4"
            style={{ animationDelay: "400ms" }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-bg-soft px-3.5 py-4 sm:px-4 sm:py-5">
                <dt className="font-mono text-[10px] tracking-wider text-muted uppercase sm:text-[11px]">
                  {stat.label}
                </dt>
                <dd className="mt-1.5 text-xl font-semibold tracking-tight sm:mt-2 sm:text-2xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="animate-rise relative mx-auto hidden w-full max-w-sm lg:block"
          style={{ animationDelay: "220ms" }}
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
                className="object-cover"
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
            className="animate-drift absolute -top-4 -left-7 hidden rounded-xl border border-line bg-bg-soft/90 px-3 py-2 font-mono text-xs backdrop-blur lg:block"
            style={{ animationDuration: "11s" }}
          >
            Laravel
          </div>
          <div
            className="animate-drift absolute -right-6 bottom-28 hidden rounded-xl border border-line bg-bg-soft/90 px-3 py-2 font-mono text-xs backdrop-blur lg:block"
            style={{ animationDuration: "13s", animationDelay: "-4s" }}
          >
            MySQL
          </div>
        </div>
      </div>
    </section>
  );
}
