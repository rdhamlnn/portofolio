// Temporary live QA — deleted after run.
import { chromium } from "playwright-core";

const URL = process.argv[2];
const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const log = (...a) => console.log(...a);

for (const vp of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844, isMobile: true, hasTouch: true },
]) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, hasTouch: vp.hasTouch });
  const errors = [];
  const failed = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("requestfailed", (r) => failed.push(`${r.url()} :: ${r.failure()?.errorText}`));

  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1600);

  const core = await page.evaluate(() => {
    const de = document.documentElement;
    const cs = getComputedStyle(document.body);
    const img = document.querySelector("img");
    const css = [...document.styleSheets].filter((s) => s.href || s.ownerNode?.textContent).length;
    return {
      overflow: de.scrollWidth - de.clientWidth,
      bodyBg: cs.backgroundColor,
      accentVar: getComputedStyle(de).getPropertyValue("--accent").trim(),
      stylesheets: css,
      imgLoaded: img ? { complete: img.complete, w: img.naturalWidth } : null,
      sections: [...document.querySelectorAll("section")].map((s) => s.id),
      fonts: document.fonts.status,
    };
  });
  log(`[${vp.name}]`, JSON.stringify(core));

  // interactions
  await page.click('header a[href="#proyek"]').catch(() => log(`[${vp.name}] desktop nav click skipped`));
  await page.waitForTimeout(700);
  const anchor = await page.evaluate(() => {
    const s = document.getElementById("proyek");
    const nav = document.querySelector("header nav");
    return { top: Math.round(s.getBoundingClientRect().top), navH: Math.round(nav.getBoundingClientRect().height) };
  });
  log(`[${vp.name}] anchor #proyek top=${anchor.top} navH=${anchor.navH} ok=${anchor.top >= anchor.navH - 4}`);

  const skillA = await page.textContent("#keahlian ul li span.font-medium");
  await page.click('#keahlian button[role="tab"]:has-text("Database")');
  await page.waitForTimeout(500);
  const skillB = await page.textContent("#keahlian ul li span.font-medium");
  log(`[${vp.name}] skills tab: "${skillA}" -> "${skillB}" ok=${skillA !== skillB}`);

  const pA = await page.textContent("#proyek article h3");
  await page.click('#proyek button[role="tab"] >> nth=4');
  await page.waitForTimeout(500);
  const pB = await page.textContent("#proyek article h3");
  const repoHref = await page.getAttribute("#proyek article a[target=_blank]", "href");
  log(`[${vp.name}] project: "${pA}" -> "${pB}" repo=${repoHref}`);

  // canvas motion + cursor response
  const hash = () =>
    page.evaluate(() => {
      const c = document.querySelector("canvas");
      const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
      let h = 0;
      for (let i = 0; i < d.length; i += 97) h = (h * 31 + d[i]) >>> 0;
      return h;
    });
  const h1 = await hash();
  await page.waitForTimeout(450);
  const h2 = await hash();
  log(`[${vp.name}] canvas animating=${h1 !== h2}`);

  if (vp.name === "mobile") {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.click('button[aria-label="Buka menu"]');
    await page.waitForTimeout(600);
    const menu = await page.evaluate(() => {
      const panel = document.querySelector("header > div:last-of-type");
      return { h: Math.round(panel.getBoundingClientRect().height), links: panel.querySelectorAll("a").length };
    });
    log(`[${vp.name}] menu open:`, JSON.stringify(menu));
    await page.screenshot({ path: `/tmp/portfolio-qa/live-mobile-menu.png` });
  }

  await page.screenshot({ path: `/tmp/portfolio-qa/live-${vp.name}.png` });
  await page.screenshot({ path: `/tmp/portfolio-qa/live-${vp.name}-full.png`, fullPage: true });
  log(`[${vp.name}] console errors:`, errors.length ? errors.slice(0, 3).join(" || ") : "none");
  log(`[${vp.name}] failed requests:`, failed.length ? failed.slice(0, 3).join(" || ") : "none");
  await page.close();
}

// Link preview + favicon: both are invisible in the page body, so a broken one
// ships silently. Check them explicitly.
const problems = [];
{
  const page = await browser.newPage({ viewport: { width: 900, height: 700 } });
  await page.goto(URL, { waitUntil: "domcontentloaded" });

  const meta = await page.evaluate(() => {
    const content = (sel) => document.querySelector(sel)?.content ?? null;
    return {
      ogImage: content('meta[property="og:image"]'),
      ogImageW: content('meta[property="og:image:width"]'),
      ogImageH: content('meta[property="og:image:height"]'),
      card: content('meta[name="twitter:card"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
      icon: document.querySelector('link[rel*="icon"]')?.href ?? null,
    };
  });

  // Crawlers reject a relative og:image, so it must be absolute.
  if (!meta.ogImage || !/^https?:\/\//.test(meta.ogImage)) {
    problems.push(`og:image is missing or not absolute: ${meta.ogImage}`);
  }
  if (`${meta.ogImageW}x${meta.ogImageH}` !== "1200x630") {
    problems.push(`og:image declared ${meta.ogImageW}x${meta.ogImageH}, expected 1200x630`);
  }
  if (meta.card !== "summary_large_image") problems.push(`twitter:card is "${meta.card}"`);

  const og = meta.ogImage
    ? await page.evaluate(async (u) => {
        try {
          const r = await fetch(u);
          const b = await r.blob();
          const dims = await new Promise((res) => {
            const im = new Image();
            im.onload = () => res({ w: im.naturalWidth, h: im.naturalHeight });
            im.onerror = () => res(null);
            im.src = u;
          });
          return { status: r.status, type: r.headers.get("content-type"), bytes: b.size, dims };
        } catch (e) {
          return { error: String(e) };
        }
      }, meta.ogImage)
    : null;
  if (og?.status !== 200) problems.push(`og image fetch failed: ${JSON.stringify(og)}`);
  if (og?.dims && (og.dims.w !== 1200 || og.dims.h !== 630)) {
    problems.push(`og image is ${og.dims.w}x${og.dims.h} on the wire, expected 1200x630`);
  }

  // A path truncated during generation still parses as SVG but draws nothing.
  const icon = meta.icon
    ? await page.evaluate(async (u) => {
        const txt = await (await fetch(u)).text();
        const host = document.createElement("div");
        host.style.cssText = "position:fixed;width:128px;height:128px;opacity:0";
        host.innerHTML = txt;
        document.body.append(host);
        const b = host.querySelector("path")?.getBBox();
        return { bytes: txt.length, usesTextEl: txt.includes("<text"), w: b?.width ?? 0, h: b?.height ?? 0 };
      }, meta.icon)
    : null;
  if (!icon || icon.w === 0 || icon.h === 0) problems.push(`favicon draws nothing: ${JSON.stringify(icon)}`);
  if (icon?.usesTextEl) problems.push("favicon uses <text>, which renders per-platform");

  log("[preview]", JSON.stringify({ meta, og, icon }));
  await page.close();
}

await browser.close();

if (problems.length) {
  console.log("\nFAILED:");
  for (const p of problems) console.log("  -", p);
  process.exitCode = 1;
} else {
  console.log("\nAll preview checks passed.");
}
