const fs = require('fs');
let h = fs.readFileSync('index.html', 'utf8');

let changes = [];

// 1. Fix lang attribute
if (h.includes('lang="en-AU"')) {
  h = h.replace('lang="en-AU"', 'lang="en-IN"');
  changes.push('Fixed lang="en-AU" -> "en-IN"');
}

// 2. Fix en-AU in schema JSON
let c2 = (h.match(/"inLanguage":"en-AU"/g) || []).length;
if (c2 > 0) {
  h = h.replace(/"inLanguage":"en-AU"/g, '"inLanguage":"en-IN"');
  changes.push('Fixed en-AU in schema (' + c2 + ' times)');
}

// 3. Fix Adelaide references in URLs (menu items)
h = h.replace(/\/about-us-web-adelaide\//g, '/about-us/');
h = h.replace(/\/cms-web-hosting-adelaide\//g, '/web-hosting/');
h = h.replace(/\/real-estate-website-design-adealide\//g, '/real-estate-website-design/');
h = h.replace(/Website design adelaide/gi, 'Website Design');
h = h.replace(/CMS Web Hosting/gi, 'Web Hosting');
changes.push('Fixed Adelaide URL references');

// 4. Fix "Over 25 Years of Industry Experience" -> remove
h = h.replace(/Over 25 Years of Industry Experience/gi, 'AI-Powered Digital Solutions');
h = h.replace(/Leverage our seasoned experts for tailored web development advice\./gi, 'Leverage cutting-edge AI and automation to accelerate your business growth.');
h = h.replace(/With over 25 years of experience, our team specialises/gi, 'Our team of experts specialises');

// 5. Fix duplicate address in footer  
h = h.replace(/Jaipur, Rajasthan 302001r, Rajasthan 302001/g, 'Jaipur, Rajasthan 302001');
h = h.replace(/Jaipur, Rajasthan 302001\u2028Jaipur, Rajasthan 302001/g, 'Jaipur, Rajasthan 302001');

// 6. Fix Google Maps iframe - replace Adelaide map with Jaipur map
h = h.replace(/src="https:\/\/www\.google\.com\/maps\/embed\?pb=[^"]*"/, 'src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.876!2d75.787!3d26.912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6b1b1b1b1b1%3A0x0!2sTubexh%20Digital%20Solutions!5e0!3m2!1sen!2sin!4v1234567890"');

// 7. Fix footer address link
h = h.replace(/href="https:\/\/maps\.google\.com\/maps\/dir\/\/15\+Fullarton\+Rd\+Kent\+Town\+SA\+5067\+Australia[^"]*"/g, 'href="https://maps.google.com/maps?q=C-205+RIICO+Industrial+Area+Jaipur+Rajasthan+India"');

// 8. Update description text
h = h.replace(/As one of Rajasthan, India.s leading digital agencies/gi, 'As a premier AI-powered digital agency in India');

// 9. Fix any remaining "25 years" references
h = h.replace(/25\+? years? of experience/gi, 'extensive industry');
h = h.replace(/decades of combined expertise/gi, 'deep combined expertise');

// 10. Update OG title 
h = h.replace(/<meta property="og:title" content="[^"]*" \/>/g, '<meta property="og:title" content="AI Powered Digital Growth Solutions | Tubexh" />');

// Write output
fs.writeFileSync('index.html', h, 'utf8');
console.log('Changes made:');
changes.forEach(c => console.log(' -', c));
console.log('Done!');