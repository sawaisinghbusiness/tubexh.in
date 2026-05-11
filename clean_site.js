const fs = require('fs');
let d = fs.readFileSync('index.html', 'utf8');

// Create placeholder images directory
fs.mkdirSync('images', { recursive: true });

// 1. Create a simple placeholder SVG for all image placeholders
const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="#1a1a2e"/><text x="400" y="280" text-anchor="middle" fill="#B65EFF" font-size="48" font-family="Manrope,sans-serif" font-weight="700">TubeXh</text><text x="400" y="340" text-anchor="middle" fill="#666" font-size="24" font-family="Manrope,sans-serif">Image Placeholder</text></svg>`;
fs.writeFileSync('images/placeholder.svg', placeholderSvg);
fs.writeFileSync('images/video-placeholder.webp', placeholderSvg); // SVG as placeholder
console.log('Placeholder images created');

// 2. Replace ALL CDN image URLs with local placeholder
// Replace any cdn.tubexh.com.au/uploads/*.(png|webp|jpg) -> images/placeholder.svg
d = d.replace(/https:\/\/cdn\.tubexh\.com\.au\/wp-content\/uploads\/[^"'<>\s]*\.(png|webp|jpg|jpeg)/gi, 'images/placeholder.svg');

// 3. Replace video source with data URI (empty video)
d = d.replace(/https:\/\/cdn\.tubexh\.com\.au\/[^"'<>\s]*\.mp4/gi, 'images/placeholder.svg');

// 4. Replace favicon with emoji favicon
d = d.replace(/<link [^>]*href="https:\/\/cdn\.tubexh\.com\.au\/wp-content\/uploads\/[^"]*favicon[^"]*"[^>]*>/gi, '<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>">');
d = d.replace(/<link [^>]*href="images\/placeholder\.svg"[^>]*sizes="192x192"[^>]*>/gi, '');
d = d.replace(/<link [^>]*href="images\/placeholder\.svg"[^>]*apple-touch-icon[^>]*>/gi, '');

// 5. Remove ALL tracking/analytics scripts
d = d.replace(/<script[^>]*analytics\.ahrefs\.com[^>]*>[\s\S]*?<\/script>/gi, '');
d = d.replace(/<script[^>]*googletagmanager[^>]*>[\s\S]*?<\/script>/gi, '');
d = d.replace(/<script[^>]*google-analytics\.com[^>]*>[\s\S]*?<\/script>/gi, '');
d = d.replace(/<script[^>]*connect\.facebook\.net[^>]*>[\s\S]*?<\/script>/gi, '');
d = d.replace(/<noscript[^>]*>[\s\S]*?<img[^>]*facebook\.com[^>]*>[\s\S]*?<\/noscript>/gi, '');
d = d.replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '');

// 6. Remove pysOptions tracking code  
d = d.replace(/<script[^>]*id="pys-js-extra"[^>]*>[\s\S]*?<\/script>/gi, '');

// 7. Remove spec rules (prefetch)
d = d.replace(/<script type="speculationrules">[\s\S]*?<\/script>/gi, '');

// 8. Fix any remaining body visibility hidden
d = d.replace(/body\{visibility:hidden\}/gi, 'body{visibility:visible}');

// 9. Remove staq cache comments
d = d.replace(/<!--[\s]*Cached & Optimized by Staq[\s\S]*?-->/gi, '');

// 10. Remove PYS (PixelYourSite) noscript pixels
d = d.replace(/<noscript[^>]*>[\s\S]*?facebook\.com[^>]*tr\?id=[^>]*>[\s\S]*?<\/noscript>/gi, '');

// 11. Remove Google Tag
d = d.replace(/<script[^>]*>\s*window\.dataLayer[\s\S]*?gtag\('config'[^)]*\)[\s\S]*?<\/script>/gi, '');

// 12. Remove any remaining gtag calls
d = d.replace(/<script[^>]*>\s*gtag\('[^']*',\s*'[^']*'[^)]*\);?\s*<\/script>/gi, '');

// 13. Remove Google recaptcha script
d = d.replace(/<script[^>]*google-recaptcha[^>]*>[\s\S]*?<\/script>/gi, '');

// Remove the hidden SEO div  
d = d.replace(/<div style="display:none;" aria-hidden="true">[\s\S]*?<\/div>/gi, '');

// Remove the span with inline info
d = d.replace(/<span id="ma-customfonts-info"[^>]*>[\s\S]*?<\/span>/gi, '');

// Clean up multiple empty lines
d = d.replace(/\n\s*\n\s*\n/g, '\n\n');

fs.writeFileSync('index.html', d);

console.log('\n=== CLEANUP COMPLETE ===');
let remainingCdn = (d.match(/cdn\.tubexh/g) || []).length;
let remainingFb = (d.match(/facebook\.com/g) || []).length;
let remainingGa = (d.match(/google-analytics|googletagmanager/g) || []).length;
console.log('CDN refs remaining:', remainingCdn);
console.log('Facebook refs remaining:', remainingFb);
console.log('Google Analytics refs remaining:', remainingGa);
console.log('File size:', d.length, 'chars');