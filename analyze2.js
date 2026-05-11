const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Find all h2 headings
let re = /<h2[^>]*>(.*?)<\/h2>/g;
let m;
console.log('=== H2 HEADINGS ===');
while((m = re.exec(c)) !== null) {
  let text = m[1].replace(/<[^>]+>/g, '').trim();
  if(text.length < 200) console.log('-', text);
}

// Find service item texts
console.log('\n=== SERVICE NAMES (in h3/h4) ===');
re = /<(h3|h4)[^>]*>(.*?)<\/\1>/g;
while((m = re.exec(c)) !== null) {
  let text = m[2].replace(/<[^>]+>/g, '').trim();
  if(text.length > 2 && text.length < 100) console.log('-', text);
}

// Find testimonial text blocks
console.log('\n=== TESTIMONIALS ===');
let tIdx = c.indexOf('testimonial');
if(tIdx > -1) console.log(c.substring(tIdx, tIdx + 2000));

// Footer
console.log('\n=== FOOTER AREA ===');
let fIdx = c.lastIndexOf('footer');
if(fIdx > -1) console.log(c.substring(fIdx, Math.min(fIdx + 2000, c.length)));

// Process section
console.log('\n=== PROCESS/TIMELINE ===');
let pIdx = c.indexOf('process');
if(pIdx > -1) console.log(c.substring(pIdx, pIdx + 1500));

// All paragraphs with meaningful text
console.log('\n=== KEY PARAGRAPHS ===');
re = /<p[^>]*>(.*?)<\/p>/g;
let count = 0;
while((m = re.exec(c)) !== null) {
  let text = m[1].replace(/<[^>]+>/g, '').trim();
  if(text.length > 30 && text.length < 500 && count < 30) {
    console.log('-', text.substring(0, 300));
    count++;
  }
}