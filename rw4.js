const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Logo text: <span>Web</span>Jaipur 
c = c.replace('Web</span>Jaipur', 'Tubexh</span>');

// Image URLs in JSON-LD schema
c = c.replace(/Web-Jaipur-Studio-Logo\.png/g, 'Tubexh-Logo.png');

// Google Maps URL
c = c.replace(/Web%20Jaipur%20Studio/g, 'Tubexh%20Digital%20Studio');

// "Jaipur Web Design & Digital Marketing Services" H2 (may still exist in some form)
c = c.replace(/Our Jaipur Web Design/g, 'Our AI-Powered Digital Growth');

// H3 headings 
c = c.replace(/Our Jaipur Website Design Services Include:/g, 'Our Digital Growth Services Include:');
c = c.replace(/Website Design and Development Services in Jaipur/g, 'AI-Powered Digital Growth Services');

// Visible text in paragraphs (many)
c = c.replace('professional web designers in Jaipur? TubeXh is your trusted partner for custom digital solutions that drive r',
  'professional digital growth experts? TubeXh is your trusted partner for custom solutions that drive r');
c = c.replace("That\u2019s why our expert Jaipur web design team focuses on building sites that not only look beautiful bu",
  "That\u2019s why our expert team focuses on building solutions that not only look beautiful bu");
c = c.replace('ojects of any complexity. Our Jaipur web design portfolio showcases our versatility and commitment to excellen',
  'ojects of any complexity. Our portfolio showcases our versatility and commitment to excellen');
c = c.replace(' in responsive website design Jaipur clients love because it looks perfect and functions flawlessly on smartph',
  ' in responsive website design that clients love because it looks perfect and functions flawlessly on smartph');
c = c.replace('ssional e-commerce web design Jaipur retailers trust. We specialise in creating online stores that drive sales',
  'ssional e-commerce web design that retailers trust. We specialise in creating online stores that drive sales');
c = c.replace('osting solutions tailored for Jaipur businesses, backed by local expert support to keep your website running s',
  'osting solutions tailored for modern businesses, backed by expert support to keep your digital presence running s');
c = c.replace("Let\u2019s enhance your <strong>Jaipur website design</strong> with our comprehensive discovery process, cutting",
  "Let\u2019s enhance your <strong>digital presence</strong> with our comprehensive discovery process, cutting");
c = c.replace('r opportunity to see how your Jaipur web design project will look before development begins. We typically prov',
  'r opportunity to see how your digital solution will look before development begins. We typically prov');
c = c.replace('zed attention throughout your Jaipur web design project.', 'zed attention throughout your project.');
c = c.replace('deliver top-quality, creative Jaipur web design with speed and cost savings. Paired with your local-focused cl',
  'deliver top-quality, creative digital solutions with speed and precision. Paired with your focused cl');
c = c.replace('e worked with a wide range of Jaipur clients from different industries. It is this a great experience in both ',
  'e worked with a wide range of clients from different industries. It is this great experience in both ');
c = c.replace('ank for terms like web design Jaipur.', 'ank for terms like digital growth and automation.');
c = c.replace('the cost of website design in Jaipur?', 'the cost of digital growth solutions?');
c = c.replace('<p>Website Design Jaipur for your Jaipur Web Design and Development?</p>',
  '<p>Looking for a full-service digital growth partner?</p>');

// FAQ placeholder text  
c = c.replace('Website Design Jaipur for your Jaipur Web Design and Development?', 'Digital Growth Solutions for your Business?');
c = c.replace('Jaipur Web Design and Development?', 'Digital Growth Solutions?');

// Service items in second set
c = c.replace(/Local Jaipur Website Hosting and Support<br>/g, 'Cloud Hosting & 24/7 Support<br>');
c = c.replace(/Mobile-Friendly Jaipur Web Design<br>/g, 'Mobile-First Design & UX<br>');
c = c.replace(/Responsive Mobile Web Design in Jaipur<br>/g, 'Advanced Analytics & CRO<br>');

// The word "Jaipur" in service descriptions (2nd services list)
c = c.replace("Reliable, fast, and secure hosting solutions tailored for Jaipur businesses, backed by local expert support to keep your website running smoothly and your customers connected.",
  "Reliable, fast, and secure hosting solutions paired with expert support to keep your digital ecosystem running smoothly.");

c = c.replace("Stand out on mobile devices with responsive layouts that adapt to any screen size, giving your Jaipur business a professional edge and keeping visitors engaged, no matter how they browse.",
  "Stand out on mobile devices with responsive layouts that adapt to any screen size, giving your business a professional edge and keeping visitors engaged, no matter how they browse.");

c = c.replace("Businesses in Jaipur deserve a strong online presence. We build results-driven websites that help local businesses attract more customers and grow their brand.",
  "Modern businesses deserve a strong digital presence. We build results-driven solutions that help businesses attract more customers and grow their brand.");

// Keep address Jaipur reference - but the double "Jaipur, Rajasthan 302001" line needs cleanup
// Use index-based removal for the duplicate 
let idx = c.indexOf("302001\u2028Jaipur");
if (idx > -1) {
  c = c.substring(0, idx + 6) + c.substring(idx + 6 + "Jaipur".length);
}

fs.writeFileSync('index.html', c, 'utf8');
console.log('Remaining Jaipur text cleaned');