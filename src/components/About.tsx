import Reveal from "./Reveal";
import { SectionHeading, SectionShell } from "./Section";
import { profile } from "@/data/site";

const facts = [
  { label: "Pendidikan", value: `${profile.education.school}` },
  { label: "Program Studi", value: profile.education.program },
  { label: "Domisili", value: profile.location },
];

const learning = [
  "Arsitektur aplikasi Laravel berskala menengah",
  "Optimasi query dan perancangan indeks",
  "Next.js App Router untuk antarmuka modern",
  "Penerapan NLP pada teks bahasa Indonesia",
];

const principles = [
  "Skema database dirapikan sebelum fitur ditambah",
  "Kode ditulis untuk dibaca orang lain, bukan hanya mesin",
  "Rilis kecil, diuji langsung, baru dilanjutkan",
];

export default function About() {
  return (
    <SectionShell id="tentang">
      <SectionHeading
        index="01 — Tentang"
        title="Merancang sistem dari datanya dulu, lalu tampilannya."
        lead="Aku lebih suka memahami alur data sebelum menulis antarmuka, karena keputusan struktur di awal menentukan seberapa mudah sistem itu dirawat setahun kemudian."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.45fr_1fr]">
        <Reveal className="glass card-hover rounded-3xl p-7 sm:p-9">
          <p className="text-lg leading-relaxed">
            Aku Muhammad Ridha Maulana, mahasiswa D3 Teknik Informatika di Politeknik Negeri
            Banjarmasin. Keseharianku berkutat di pengembangan web: membangun aplikasi dengan
            Laravel di sisi server, menyusun struktur database yang jelas, lalu merapikan
            antarmukanya supaya nyaman dipakai orang non-teknis.
          </p>
          <p className="mt-5 leading-relaxed text-muted">
            Selain pekerjaan web, aku juga menekuni sisi data dan kecerdasan buatan — terakhir
            lewat riset klasifikasi emosi teks bahasa Indonesia. Kombinasi dua bidang inilah yang
            membentuk caraku bekerja: berpikir soal struktur, sekaligus peduli pada pengalaman
            pemakainya.
          </p>

          <dl className="mt-9 grid gap-6 border-t border-line pt-7 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-[11px] tracking-wider text-muted uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-sm leading-snug">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="grid gap-5">
          <Reveal delay={90} className="glass card-hover rounded-3xl p-7">
            <h3 className="font-mono text-xs tracking-widest text-accent2 uppercase">
              Sedang Dipelajari
            </h3>
            <ul className="mt-5 space-y-3.5">
              {learning.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-snug text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={180} className="glass card-hover rounded-3xl p-7">
            <h3 className="font-mono text-xs tracking-widest text-accent2 uppercase">
              Prinsip Kerja
            </h3>
            <ul className="mt-5 space-y-3.5">
              {principles.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-snug text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent3" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
