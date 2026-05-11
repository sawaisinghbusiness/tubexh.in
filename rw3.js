const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Meta title/description replacements
c = c.replace(
  'property="og:title" content="Web Design Jaipur | Jaipur Web Designers & Website Design | TubeXh"',
  'property="og:title" content="Tubexh | AI-Powered Digital Growth Solutions Agency"'
);

c = c.replace(
  'property="og:description"',
  'property="og:description"'
);

c = c.replace(
  'name="description" content="Web Design Jaipur | Jaipur Web Designers & Website Design | TubeXh"',
  'name="description" content="Tubexh | AI-Powered Digital Growth Solutions | Automation, Web Design, SEO & Branding"'
);

c = c.replace(
  'name="keywords" content="Web Design Jaipur, Jaipur Web Designers, Website Design, WebJaipur, TubeXh"',
  'name="keywords" content="AI Automation, Web Design, Digital Marketing, SEO, Branding, Video Editing, Content Creation, Business Growth, Tubexh"'
);

c = c.replace(
  '<title>Web Design Jaipur | Jaipur Web Designers & Website Design | TubeXh</title>',
  '<title>Tubexh | AI-Powered Digital Growth Solutions &#8211; Automation, Web Design, SEO & Branding</title>'
);

// All other remaining "Jaipur" instances in meta tags - catch-all
c = c.replace(/Web Design Jaipur \| Jaipur Web Designers/g, 'Digital Growth Solutions Agency');

// Also handle any remaining "Jaipur" in meta tag content  
c = c.replace(/Web Design Jaipur/g, 'Digital Growth Solutions');
c = c.replace(/Jaipur Web Designers/g, 'Digital Growth Experts');

// Also replace in alt text and any remaining visible text
c = c.replace(/alt="Jaipur Web Design"/g, 'alt="Tubexh Digital Solutions"');
c = c.replace(/alt="Jaipur Web Designers"/g, 'alt="Tubexh Digital Experts"');

// The "Jaipur, Rajasthan, India" in the footer/address should be kept as address only
// But let me check if there are other Jaipur refs that should be replaced

fs.writeFileSync('index.html', c, 'utf8');
console.log('Meta tags and titles updated');