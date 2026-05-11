const fs = require('fs');
let d = fs.readFileSync('index.html', 'utf8');

// Find all CDN URLs
let matches = d.match(/https:\/\/cdn\.tubexh\.com\.au\/[^"'<>\s]+/g) || [];
console.log('CDN URLs found:', matches.length);
matches.slice(0, 15).forEach(u => console.log(' -', u.substring(0, 120)));

// Count remaining webadelaide refs
let wa = (d.match(/webadelaide/gi) || []).length;
console.log('\nRemaining webadelaide refs:', wa);