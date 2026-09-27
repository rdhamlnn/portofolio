"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { SectionHeading, SectionShell } from "./Section";
import { profile } from "@/data/site";

const channels = [
  {
    label: "GitHub",
    value: "github.com/rdhamlnn",
    href: profile.github,
    hint: "Kode dan riwayat proyek",
  },
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    hint: "Untuk kerja sama dan diskusi",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <SectionShell id="kontak">
      <SectionHeading
        index="05 — Kontak"
        title="Punya proyek atau butuh bantuan teknis?"
        lead="Aku terbuka untuk pekerjaan freelance, kolaborasi proyek, maupun diskusi seputar database dan pengembangan web."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1fr]">
        <Reveal className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10">
          <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-accent/20 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-accent2/15 blur-[100px]" />

          <div className="relative">
            <p className="font-mono text-xs tracking-widest text-accent2 uppercase">
              Ketersediaan
            </p>
            <p className="mt-3 flex items-center gap-2.5 text-lg font-medium">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              {profile.status}
            </p>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
              Kirim pesan berisi gambaran singkat kebutuhanmu — lingkup kerja, tenggat, dan hasil
              yang diharapkan. Aku balas dengan estimasi dan pendekatan teknis yang aku sarankan.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
              >
                Mulai Diskusi
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-3 text-sm transition-colors hover:bg-surface-strong"
              >
                {copied ? "Email tersalin" : "Salin email"}
              </button>
            </div>

            <p className="mt-6 font-mono text-xs text-muted">{profile.email}</p>
          </div>
        </Reveal>

        <div className="grid gap-5">
          {channels.map((channel, i) => (
            <Reveal key={channel.label} delay={90 + i * 90}>
              <a
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="glass card-hover group flex items-center gap-4 rounded-2xl p-6"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface font-mono text-xs text-accent2">
                  {channel.label.slice(0, 2)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{channel.label}</span>
                  <span className="mt-0.5 block truncate font-mono text-xs text-muted">
                    {channel.value}
                  </span>
                  <span className="mt-1.5 block text-xs text-muted">{channel.hint}</span>
                </span>
                <span className="text-muted transition-transform group-hover:translate-x-1">↗</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
