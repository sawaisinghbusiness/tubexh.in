const fs = require('fs');
const path = require('path');

// Pages to move into subdirectories
const pages = ['about', 'contact', 'projects'];

// Replacement map for internal links
const linkMap = {
  '"about.html"':    '"/about/"',
  '"contact.html"':  '"/contact/"',
  '"projects.html"': '"/projects/"',
  '"index.html"':    '"/"',
  "'about.html'":    "'/about/'",
  "'contact.html'":  "'/contact/'",
  "'projects.html'": "'/projects/'",
  "'index.html'":    "'/'",
  // anchor links on index
  '"index.html#':    '"/#',
  "'index.html#":    "'/#",
};

// Local asset patterns to make root-relative
// Only applies inside subdirectory files (not index.html at root)
function makeRootRelative(html) {
  return html
    .replace(/(href|src)="(?!http|\/\/|#|data:|mailto:|tel:)(css\/|js\/|images\/|script\.js|style\.css)/g,
      (match, attr, p) => `${attr}="/${p}`)
    .replace(/(href|src)='(?!http|\/\/|#|data:|mailto:|tel:)(css\/|js\/|images\/|script\.js|style\.css)/g,
      (match, attr, p) => `${attr}='/${p}`);
}

// Apply link map replacements
function fixLinks(html) {
  let out = html;
  for (const [from, to] of Object.entries(linkMap)) {
    out = out.split(from).join(to);
  }
  return out;
}

// Process each page
pages.forEach(page => {
  const src = `${page}.html`;
  const dir = page;
  const dest = path.join(dir, 'index.html');

  let html = fs.readFileSync(src, 'utf8');
  html = makeRootRelative(html);
  html = fixLinks(html);

  // Also fix canonical / og:url if they reference the .html URL
  html = html.replace(
    new RegExp(`tubexh\\.in/${page}\\.html`, 'g'),
    `tubexh.in/${page}/`
  );

  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFileSync(dest, html, 'utf8');
  console.log(`Created ${dest}`);

  // Overwrite original .html with instant redirect
  const redirect = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Redirecting...</title><meta http-equiv="refresh" content="0;url=/${page}/"><link rel="canonical" href="https://tubexh.in/${page}/"></head><body><script>window.location.replace("/${page}/")</script></body></html>`;
  fs.writeFileSync(src, redirect, 'utf8');
  console.log(`Redirect written to ${src}`);
});

// Update internal links in index.html (stays at root, no path changes needed)
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = fixLinks(indexHtml);
fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Updated internal links in index.html');
