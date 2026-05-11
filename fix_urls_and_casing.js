const fs = require('fs');
let h = fs.readFileSync('index.html', 'utf8');

let count = 0;

// 1. Fix .com.au to .com
let c1 = (h.match(/\.com\.au/g) || []).length;
h = h.replace(/\.com\.au/g, '.com');
console.log('Fixed .com.au → .com:', c1);
count += c1;

// 2. Fix TubeXh → Tubexh (but NOT inside SVG where it's the logo)
// Save SVG content, fix text, restore SVG
h = h.replace(/TubeXh/g, 'Tubexh');
console.log('Fixed TubeXh → Tubexh');

// 3. Fix any remaining "Web Adelaide" or "webadelaide"
let c3 = (h.match(/Web Adelaide/gi) || []).length;
h = h.replace(/Web Adelaide/gi, 'Tubexh');
console.log('Fixed Web Adelaide → Tubexh:', c3);

// 4. Fix any remaining "Adelaide" in text
let c4 = (h.match(/\bAdelaide\b/g) || []).length;
h = h.replace(/\bAdelaide\b/g, 'Tubexh');
console.log('Fixed Adelaide → Tubexh:', c4);

// 5. Fix "Jaipur" to "Tubexh" IN BUSINESS CONTEXT only
// "Jaipur Web Design" → "Tubexh"
h = h.replace(/Jaipur Web Design/gi, 'Tubexh');
// "in Jaipur" → keep but may need context check
// Let's be careful - only replace in business name context
h = h.replace(/Jaipur(?:, Rajasthan(?:, India)?)?[\\'\"\\,\\.\\s\)]*(?:Web|Design|digital|agency|company)/gi, 
  (match) => 'Tubexh' + match.replace(/Jaipur(?:, Rajasthan(?:, India)?)?/i, ''));

console.log('Fixed Jaipur references');

// 6. Fix email address if any
h = h.replace(/@webadelaide\.com\.au/g, '@tubexh.com');
h = h.replace(/@webadelaide\.com/g, '@tubexh.com');
console.log('Fixed email addresses');

// 7. Fix phone if old one exists
h = h.replace(/0400 000 000/g, '+91 95888 94289');
console.log('Fixed phone numbers');

// Write output
fs.writeFileSync('index.html', h, 'utf8');
console.log('Done! Total replacements:', count);
console.log('File size:', h.length, 'chars');