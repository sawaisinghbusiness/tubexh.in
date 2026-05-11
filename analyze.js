const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Title
let m = c.match(/<title>(.*?)<\/title>/);
if(m) console.log('TITLE:', m[1]);

// Meta description
m = c.match(/<meta name="description"[^>]*content="([^"]+)"/);
if(m) console.log('META DESC:', m[1]);

// H1s
let re3 = /<h1[^>]*>(.*?)<\/h1>/g;
while((m = re3.exec(c)) !== null) {
  let text = m[1].replace(/<[^>]+>/g, '');
  console.log('H1:', text.substring(0, 200));
}

// 25 years context
let idx = c.indexOf('25 years');
if(idx > -1) {
  console.log('\n25 YEARS CONTEXT:');
  console.log(c.substring(Math.max(0, idx - 80), idx + 130));
}

// Hero heading
idx = c.indexOf('hero-heading');
if(idx > -1) console.log('\nHERO HEADING AREA:\n', c.substring(idx, idx + 500));

// Check all remaining "WebJaipur" or "Jaipur" references
let jaipurMatches = c.match(/[Jj]aipur/g);
console.log('\nJaipur references:', jaipurMatches ? jaipurMatches.length : 0);

// Check all spans/text with TubeXh
let tubexhMatches = c.match(/TubeXh/g);
console.log('TubeXh references:', tubexhMatches ? tubexhMatches.length : 0);