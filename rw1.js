const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// H2 headings
c = c.replace(/Why Choose Our Jaipur Web Designers\?/g, 'Why Choose TubeXh?');
c = c.replace(/Our Jaipur Web Design & Digital Marketing Services/g, 'Our AI-Powered Digital Growth Services');
c = c.replace(/Brands Jaipur Web Design Work With/g, 'Brands We Partner With');
c = c.replace(/See Our Latest Web Design Projects/g, 'See Our Latest Work');
c = c.replace(/Our Web Design Process in Jaipur/g, 'Our Digital Growth Process');
c = c.replace(/Benefits of Choosing Local Web Designers Jaipur/g, 'Benefits of Choosing TubeXh');
c = c.replace(/Why Our Agency is the Best Choice for Jaipur Web Design/g, 'Why TubeXh is the Best Choice for Digital Growth');
c = c.replace(/Website Designs That Shine, Google Rankings That Soar/g, 'Smarter Digital Systems. Measurable Growth.');
c = c.replace(/FAQs: Web Design Services/g, 'FAQs: Digital Growth Services');

// Service names
c = c.replace(/Affordable Website Design Jaipur/g, 'Smart Automation & AI Solutions');
c = c.replace(/Experienced Jaipur Web Designers/g, 'AI-Optimised Web Development');
c = c.replace(/Mobile-First Website Design Jaipur/g, 'Mobile-First & Responsive Design');
c = c.replace(/SEO-Optimized Website Design/g, 'Advanced SEO & Content Strategy');

// Why choose items
c = c.replace(/Local Market Understanding:/g, 'AI-Driven Automation:');
c = c.replace(/Dedicated Client Success Management/g, 'Dedicated Growth Management');
c = c.replace(/Efficient Remote Collaboration with Local Insight/g, 'Scalable Digital Ecosystems');
c = c.replace(/Reliable Ongoing Support/g, 'Tech-Forward Solutions');

// 25 years
c = c.replace(/Over 25 Years of Combined Experience/g, 'Proven Digital Growth Expertise');
c = c.replace(/over 25 years of combined experience/g, 'proven digital growth expertise');

fs.writeFileSync('index.html', c, 'utf8');
console.log('H2s, services, 25 years done');