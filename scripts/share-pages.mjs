// Runs after `vite build`. For every project with a case study it writes
// dist/work/<slug>/index.html: the built page with the title, description and preview
// image swapped, so a link shared on LinkedIn or WhatsApp shows that project instead of
// the home page. On load the app moves /work/<slug> into #/work/<slug> (src/lib/route.js).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { data } from '../src/data.js';
import { slugOf } from '../src/lib/slug.js';

const dist = new URL('../dist/', import.meta.url);
const html = readFileSync(new URL('index.html', dist), 'utf8');
const site = html.match(/<link rel="canonical" href="([^"]+)"/)[1].replace(/\/$/, '');

const escape = (text) =>
  text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Every tag is replaced exactly once. If index.html changes shape, fail the build instead of
// shipping pages with the home page's preview.
function swap(page, pattern, value, label) {
  let count = 0;
  const out = page.replace(pattern, (_, before, after) => {
    count += 1;
    return before + value + after;
  });
  if (count !== 1) throw new Error(`share-pages: expected one ${label} in index.html, found ${count}`);
  return out;
}

const meta = (attr, key) => new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`, 'g');

const urls = [];
for (const project of data.projects.filter((p) => p.caseStudy)) {
  const slug = slugOf(project);
  const url = `${site}/work/${slug}`;
  const title = escape(`${project.title}: ${project.subtitle} | Sultan Zhalifunnas`);
  const description = escape(project.summary);
  const imageFile = `og/${slug}.jpg`;
  const image = existsSync(new URL(imageFile, dist)) ? `${site}/${imageFile}` : `${site}/og-image.png`;

  let page = html;
  page = swap(page, /(<title>)[^<]*(<\/title>)/g, title, '<title>');
  page = swap(page, meta('name', 'description'), description, 'description');
  page = swap(page, /(<link rel="canonical" href=")[^"]*(")/g, url, 'canonical');
  page = swap(page, meta('property', 'og:title'), title, 'og:title');
  page = swap(page, meta('property', 'og:description'), description, 'og:description');
  page = swap(page, meta('property', 'og:type'), 'article', 'og:type');
  page = swap(page, meta('property', 'og:url'), url, 'og:url');
  page = swap(page, meta('property', 'og:image'), image, 'og:image');
  page = swap(page, meta('property', 'og:image:alt'), escape(`${project.title} case study`), 'og:image:alt');
  page = swap(page, meta('name', 'twitter:title'), title, 'twitter:title');
  page = swap(page, meta('name', 'twitter:description'), description, 'twitter:description');
  page = swap(page, meta('name', 'twitter:image'), image, 'twitter:image');

  mkdirSync(new URL(`work/${slug}/`, dist), { recursive: true });
  writeFileSync(new URL(`work/${slug}/index.html`, dist), page);
  urls.push(url);
}

const sitemapFile = new URL('sitemap.xml', dist);
const entries = urls
  .map((url) => `  <url>\n    <loc>${url}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`)
  .join('');
writeFileSync(sitemapFile, readFileSync(sitemapFile, 'utf8').replace('</urlset>', `${entries}</urlset>`));

console.log(`share-pages: wrote ${urls.length} case study pages and added them to sitemap.xml`);
