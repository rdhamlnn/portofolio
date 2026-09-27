export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  year: string;
  stack: string[];
  highlights: string[];
  repo?: string;
  demo?: string;
  featured?: boolean;
};

export type SkillGroup = {
  id: string;
  label: string;
  blurb: string;
  items: { name: string; level: number; note: string }[];
};

export const profile = {
  name: "Muhammad Ridha Maulana",
  handle: "rdhamlnn",
  location: "Banjarmasin, Kalimantan Selatan",
  role: "Web Developer & Database Engineer",
  headline: "Bangun sistem web yang rapi, cepat, dan bisa diandalkan.",
  intro:
    "Aku mengembangkan aplikasi web end-to-end — dari perancangan skema database, API, sampai antarmuka yang enak dipakai. Fokus di ekosistem Laravel dan Next.js.",
  status: "Terbuka untuk proyek freelance & kolaborasi",
  email: "fzridhaa@gmail.com",
  github: "https://github.com/rdhamlnn",
  avatar: "/avatar.jpg",
  education: {
    school: "Politeknik Negeri Banjarmasin",
    program: "D3 Teknik Informatika",
  },
};

export const stats = [
  { value: "13+", label: "Repository publik" },
  { value: "5", label: "Proyek web produksi" },
  { value: "1", label: "Riset NLP bahasa Indonesia" },
  { value: "2", label: "Tahun membangun sistem" },
];

export const marquee = [
  "Laravel",
  "PHP",
  "Next.js",
  "TypeScript",
  "MySQL",
  "Tailwind CSS",
  "Blade",
  "Python",
  "REST API",
  "Database Design",
  "C++",
  "Git",
];

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    label: "Backend",
    blurb: "Logika aplikasi, autentikasi, dan alur data di sisi server.",
    items: [
      { name: "Laravel", level: 88, note: "Eloquent, middleware, queue, autentikasi" },
      { name: "PHP", level: 85, note: "OOP, Composer, arsitektur MVC" },
      { name: "REST API", level: 80, note: "Desain endpoint, validasi, versioning" },
      { name: "Node.js", level: 68, note: "Scripting, tooling, integrasi API" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Membangun antarmuka yang bersih dan responsif.",
    items: [
      { name: "JavaScript", level: 82, note: "ES2023, DOM, async flow" },
      { name: "Tailwind CSS", level: 86, note: "Design token, responsive, dark mode" },
      { name: "Blade + SCSS", level: 84, note: "Komponen server-rendered" },
      { name: "TypeScript", level: 72, note: "Typing, generics, React props" },
      { name: "Next.js", level: 70, note: "App Router, SSR, static export" },
    ],
  },
  {
    id: "database",
    label: "Database",
    blurb: "Bidang yang paling aku dalami: struktur data yang benar sejak awal.",
    items: [
      { name: "Desain Skema", level: 87, note: "Normalisasi, relasi, indexing" },
      { name: "MySQL / MariaDB", level: 85, note: "Query optimization, JOIN kompleks" },
      { name: "Migration & Seeder", level: 82, note: "Versioning skema, data dummy" },
      { name: "PostgreSQL", level: 66, note: "Dasar, peran, dan tipe data lanjutan" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    blurb: "Alat harian untuk membangun, menguji, dan mengirim.",
    items: [
      { name: "Git & GitHub", level: 84, note: "Branching, rebase, code review" },
      { name: "Figma", level: 74, note: "Wireframe sampai prototipe" },
      { name: "Linux CLI", level: 70, note: "Deployment, log, systemd" },
      { name: "Python / Jupyter", level: 72, note: "Analisis data dan riset model" },
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "workease-kce",
    name: "WorkEase KCE",
    tagline: "Sistem manajemen layanan bengkel",
    description:
      "Aplikasi manajemen operasional untuk unit bengkel: pencatatan pelanggan, antrean pekerjaan, penugasan mekanik, riwayat servis, dan rekap transaksi. Dirancang agar administrasi yang sebelumnya manual bisa tercatat rapi dan bisa diaudit.",
    role: "Full-stack Developer",
    year: "2025",
    stack: ["Laravel", "Blade", "SCSS", "MySQL"],
    highlights: [
      "Skema database relasional untuk pelanggan, kendaraan, pekerjaan, dan transaksi",
      "Dashboard ringkasan status pekerjaan per mekanik",
      "Hak akses terpisah antara admin dan mekanik",
    ],
    repo: "https://github.com/rdhamlnn/workeasekce",
    featured: true,
  },
  {
    slug: "emosiklasifikasi",
    name: "EmosiKlasifikasi",
    tagline: "Klasifikasi emosi teks bahasa Indonesia",
    description:
      "Riset penerapan NLP untuk mengenali emosi pada teks berbahasa Indonesia. Membandingkan pendekatan klasik TF-IDF + Naive Bayes dengan model transformer IndoBERT, lengkap dengan pipeline preprocessing dan evaluasi.",
    role: "Peneliti & Developer",
    year: "2025 — 2026",
    stack: ["Python", "Jupyter", "Next.js", "TypeScript", "IndoBERT"],
    highlights: [
      "Dataset percakapan Indonesia, 4 kelas emosi",
      "Perbandingan baseline klasik vs transformer",
      "Antarmuka demo berbasis Next.js untuk uji coba model",
    ],
    repo: "https://github.com/rdhamlnn/EmosiKlasifikasi",
    featured: true,
  },
  {
    slug: "kce-mechanic",
    name: "KCE Mechanic",
    tagline: "Portal kerja mekanik",
    description:
      "Modul pendamping untuk tim mekanik: daftar tugas aktif, update progres pekerjaan, dan catatan part yang dipakai. Dibuat ringan supaya tetap nyaman dipakai dari perangkat mobile di area kerja.",
    role: "Backend Developer",
    year: "2025",
    stack: ["PHP", "MySQL", "CSS"],
    highlights: [
      "Alur status pekerjaan dari diterima sampai selesai",
      "Pencatatan pemakaian part per pekerjaan",
      "Tampilan dioptimalkan untuk layar kecil",
    ],
    repo: "https://github.com/rdhamlnn/kce_mechanic",
  },
  {
    slug: "siap-project",
    name: "SIAP Project",
    tagline: "Sistem informasi akademik",
    description:
      "Kolaborasi pengembangan sistem informasi akademik berbasis Laravel. Fokus pada perbaikan modul data, konsistensi struktur database, dan penyesuaian tampilan agar konsisten dengan design system yang sudah ada.",
    role: "Kontributor",
    year: "2025",
    stack: ["Laravel", "Blade", "MySQL"],
    highlights: [
      "Penyesuaian relasi antar tabel master",
      "Perbaikan query pelaporan",
      "Konsistensi komponen antarmuka",
    ],
    repo: "https://github.com/rdhamlnn/SIAP-Project",
  },
  {
    slug: "numerical-methods",
    name: "Metode Numerik",
    tagline: "Implementasi algoritma numerik",
    description:
      "Kumpulan implementasi metode numerik untuk menyelesaikan persamaan non-linear dan sistem persamaan: metode biseksi, Newton-Raphson, iterasi, hingga interpolasi — dibangun sebagai alat bantu belajar sekaligus validasi hasil hitung manual.",
    role: "Developer",
    year: "2025",
    stack: ["Python", "Jupyter"],
    highlights: [
      "Implementasi ulang algoritma dari materi kuliah",
      "Perbandingan galat antar metode",
      "Visualisasi grafik konvergensi",
    ],
    repo: "https://github.com/rdhamlnn/UAS-MetNum",
  },
  {
    slug: "cpp-fundamentals",
    name: "C++ Fundamentals",
    tagline: "Latihan struktur data & algoritma",
    description:
      "Repositori latihan dasar pemrograman C++: struktur data, manipulasi pointer, dan penyelesaian soal praktikum. Menjadi fondasi cara berpikirku soal memori dan efisiensi sebelum pindah ke pengembangan web.",
    role: "Developer",
    year: "2024",
    stack: ["C++"],
    highlights: [
      "Struktur data dasar dan operasinya",
      "Manajemen memori manual",
      "Kumpulan solusi soal praktikum",
    ],
    repo: "https://github.com/rdhamlnn/RepoPraktekUAS",
  },
];

export const timeline = [
  {
    period: "2026",
    title: "Riset NLP Bahasa Indonesia",
    detail:
      "Menyelesaikan penelitian klasifikasi emosi teks Indonesia dan membangun antarmuka demo berbasis Next.js.",
    tag: "Riset",
  },
  {
    period: "2025",
    title: "Pengembangan Sistem Bengkel",
    detail:
      "Membangun WorkEase KCE dan KCE Mechanic — sistem operasional bengkel dari perancangan database sampai antarmuka.",
    tag: "Proyek",
  },
  {
    period: "2025",
    title: "Studi Independen Kampus Merdeka",
    detail:
      "Mengikuti program studi independen bersertifikat dan berkontribusi pada proyek tim berbasis Laravel.",
    tag: "Program",
  },
  {
    period: "2024 — Sekarang",
    title: "Politeknik Negeri Banjarmasin",
    detail:
      "Menempuh D3 Teknik Informatika dengan fokus Database Engineering dan pengembangan web.",
    tag: "Pendidikan",
  },
];

export const navItems = [
  { href: "#tentang", label: "Tentang" },
  { href: "#keahlian", label: "Keahlian" },
  { href: "#proyek", label: "Proyek" },
  { href: "#perjalanan", label: "Perjalanan" },
  { href: "#kontak", label: "Kontak" },
];
