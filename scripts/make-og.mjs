/**
 * Renders public/og.png (1200x630) for link previews.
 *
 * Why a renderer and not a checked-in PNG: the card must stay in sync with the
 * copy in src/data/site.ts. Hand-editing a PNG is how preview cards go stale.
 * Why Chrome and not an image lib: no rsvg/imagemagick on this box, and HTML
 * gives exact type control.
 *
 * Run: node scripts/make-og.mjs
 * ponytail: copy is duplicated from site.ts because this is plain Node and
 * site.ts is TypeScript. If a third field needs sharing, parse site.ts or
 * export a JSON manifest instead of adding more duplication here.
 */
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("/usr/local/lib/hermes-agent/node_modules/playwright");

const NAME = "Muhammad Ridha Maulana";
const ROLE = "Web Developer & Database Engineer";
const HEADLINE = "Bangun sistem web yang rapi, cepat, dan bisa diandalkan.";
const URL_TEXT = "rdhamlnn.vercel.app";
const MARKS = ["laravel", "php", "nextdotjs", "typescript", "mysql", "python"];

const icons = JSON.parse(readFileSync("scripts/brand-icons.json", "utf8"));
// brand-icons.json holds bare path `d` strings, not full <svg> markup.
const paths = MARKS.map((slug) => {
  const d = icons[slug];
  if (!d) throw new Error(`missing brand path: ${slug}`);
  if (!/^[Mm]/.test(d.trim())) throw new Error(`${slug} is not a moveto path: ${d.slice(0, 24)}`);
  return { slug, d };
});

// No Geist on this box (it is a next/font asset). Liberation/DejaVu are the
// installed faces and render identically on every build machine.
const FONT = "Liberation Sans, DejaVu Sans, Arial, sans-serif";

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #05060b; font-family: ${FONT}; }
  .card { position: relative; width: 1200px; height: 630px; display: flex; flex-direction: column;
          justify-content: space-between; padding: 68px 76px; }
  .glowA, .glowB { position: absolute; border-radius: 50%; filter: blur(90px); }
  .glowA { width: 620px; height: 620px; top: -330px; left: -180px; background: #7c5cff; opacity: .30; }
  .glowB { width: 700px; height: 700px; bottom: -430px; right: -220px; background: #22d3ee; opacity: .22; }
  .grid { position: absolute; inset: 0; opacity: .5;
          background-image: linear-gradient(#ffffff0d 1px, transparent 1px), linear-gradient(90deg, #ffffff0d 1px, transparent 1px);
          background-size: 60px 60px; }
  .rail { position: absolute; top: 0; left: 0; width: 100%; height: 6px;
          background: linear-gradient(90deg, #7c5cff, #22d3ee); }
  .inner { position: relative; display: flex; flex-direction: column; height: 100%; justify-content: space-between; }
  .top { display: flex; align-items: center; gap: 20px; }
  .avatar { width: 66px; height: 66px; border-radius: 18px; object-fit: cover;
            border: 1px solid #ffffff26; flex: none; }
  .who .name { font-size: 27px; font-weight: 700; color: #f2f4f8; letter-spacing: -.2px; }
  .who .handle { font-size: 18px; color: #8b93a7; margin-top: 4px; }
  h1 { font-size: 62px; line-height: 1.1; font-weight: 700; color: #f5f7fb;
       letter-spacing: -1.4px; max-width: 1010px; }
  h1 .accent { color: #22d3ee; }
  .role { margin-top: 20px; font-size: 25px; color: #9aa3b8; font-weight: 500; }
  .bottom { display: flex; align-items: center; justify-content: space-between; }
  .marks { display: flex; align-items: center; gap: 26px; }
  .marks svg { width: 38px; height: 38px; fill: #7d879c; }
  .url { font-size: 22px; color: #767f95; }
</style>
<div class="card">
  <div class="glowA"></div><div class="glowB"></div><div class="grid"></div><div class="rail"></div>
  <div class="inner">
    <div class="top">
      <img class="avatar" src="data:image/jpeg;base64,__AVATAR__">
      <div class="who">
        <div class="name">${NAME}</div>
        <div class="handle">@rdhamlnn</div>
      </div>
    </div>
    <div>
      <h1>Bangun sistem web yang <span class="accent">rapi</span>, cepat, dan bisa diandalkan.</h1>
      <div class="role">${ROLE}</div>
    </div>
    <div class="bottom">
      <div class="marks">
        ${paths.map((p) => `<svg viewBox="0 0 24 24"><path d="${p.d}"/></svg>`).join("\n        ")}
      </div>
      <div class="url">${URL_TEXT}</div>
    </div>
  </div>
</div>`;

const avatar = readFileSync("public/avatar.jpg").toString("base64");
const finalHtml = html.replace("__AVATAR__", avatar);

const dir = mkdtempSync(join(tmpdir(), "og-"));
const file = join(dir, "og.html");
writeFileSync(file, finalHtml);

const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(`file://${file}`, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);

// Self-check: a mark whose path got truncated renders as nothing, and a card with
// no marks still looks plausible at a glance. Fail loudly instead.
const drawn = await page.evaluate(() =>
  [...document.querySelectorAll(".marks svg")].filter((s) => {
    try {
      const b = s.getBBox();
      return b.width > 0 && b.height > 0;
    } catch {
      return false;
    }
  }).length,
);
// Measure real content, not the decorative blur: the glow divs intentionally
// bleed past the card and are clipped by overflow:hidden.
const bad = await page.evaluate(() => {
  const card = document.querySelector(".card").getBoundingClientRect();
  const out = [];
  for (const el of document.querySelectorAll(".name, .handle, h1, .role, .url, .marks")) {
    const r = el.getBoundingClientRect();
    if (r.right > card.right - 40 || r.left < card.left + 40) {
      out.push(`${el.className || el.tagName} right=${Math.round(r.right)} card=${Math.round(card.right)}`);
    }
  }
  return out;
});
if (drawn !== paths.length) throw new Error(`only ${drawn}/${paths.length} brand marks drew`);
if (bad.length) throw new Error(`content too close to the card edge: ${bad.join("; ")}`);

await page.screenshot({ path: "public/og.png", clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
rmSync(dir, { recursive: true, force: true });
console.log(`wrote public/og.png (1200x630), ${drawn}/${paths.length} brand marks drawn, edge check ok`);
