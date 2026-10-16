// Draws the link preview image for every case study into public/og/<slug>.jpg (1200x630).
// Not part of the build: run it by hand after adding a case study or changing a title,
// subtitle or screenshot, then commit the images.
//
//   npm run og-images
//
// Uses the Chrome already installed on this machine (set CHROME_PATH if it isn't in the
// default macOS location) and needs a network connection for the Google Fonts.
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import { data } from '../src/data.js';
import { slugOf } from '../src/lib/slug.js';
import { previewOf } from '../src/lib/preview.js';

const root = new URL('../', import.meta.url);
const outDir = new URL('public/og/', root);
const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const card = (project, shot) => `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Space+Grotesk:wght@700&family=JetBrains+Mono:wght@500&display=block">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; position: relative; background: #040404; color: #fff; }
  .grid { position: absolute; inset: 0; opacity: 0.5;
    background-image: linear-gradient(#141414 1px, transparent 1px), linear-gradient(90deg, #141414 1px, transparent 1px);
    background-size: 60px 60px; }
  .text { position: absolute; left: 72px; top: 72px; bottom: 64px; width: ${shot ? 470 : 1000}px; display: flex; flex-direction: column; }
  .eyebrow { font: 500 20px 'JetBrains Mono', monospace; letter-spacing: 0.14em; text-transform: uppercase; color: #8a8a8a; }
  /* Space Grotesk stops at 700 on Google Fonts; asking for 800 makes the whole font request fail. */
  h1 { font: 700 ${shot ? 72 : 96}px/1.02 'Space Grotesk', sans-serif; letter-spacing: -0.035em; margin-top: 26px; }
  .sub { font: 400 ${shot ? 30 : 36}px/1.35 Inter, sans-serif; color: #a8a8a8; margin-top: 22px; }
  .foot { margin-top: auto; font: 500 20px 'JetBrains Mono', monospace; color: #8a8a8a; }
  .shot { position: absolute; left: 600px; top: 96px; width: 660px; border: 1px solid #2a2a2a; border-radius: 16px; overflow: hidden; }
  .shot img { display: block; width: 100%; }
</style></head>
<body>
  <div class="grid"></div>
  <div class="text">
    <p class="eyebrow">Case study</p>
    <h1>${escape(project.title)}</h1>
    <p class="sub">${escape(project.subtitle)}</p>
    <p class="foot">Sultan Zhalifunnas</p>
  </div>
  ${shot ? `<div class="shot"><img src="${shot}"></div>` : ''}
</body></html>`;

mkdirSync(outDir, { recursive: true });
const browser = await puppeteer.launch({ executablePath: chrome, headless: 'new', args: ['--allow-file-access-from-files'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

const tmp = new URL('og-card.html', outDir);
for (const project of data.projects.filter((p) => p.caseStudy)) {
  const preview = previewOf(project);
  const shot = preview ? new URL(`public${preview}`, root).href : null;
  writeFileSync(tmp, card(project, shot));
  await page.goto(tmp.href, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');
  const missing = await page.evaluate(`['Space Grotesk', 'Inter', 'JetBrains Mono'].filter((f) => !document.fonts.check('16px "' + f + '"'))`);
  if (missing.length) throw new Error(`og-images: fonts did not load: ${missing.join(', ')}`);
  const file = new URL(`${slugOf(project)}.jpg`, outDir);
  await page.screenshot({ path: fileURLToPath(file), type: 'jpeg', quality: 82 });
  console.log(`og-images: ${slugOf(project)}.jpg (${Math.round(readFileSync(file).length / 1024)} KB)`);
}
rmSync(tmp);
await browser.close();
