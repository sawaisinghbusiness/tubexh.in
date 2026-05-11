const fs = require('fs');
let d = fs.readFileSync('index.html', 'utf8');

// Replace CDN CSS/JS with local files
d = d.replace(/https:\/\/cdn\.tubexh\.com\.au\/wp-content\/cache\/staq-min\/staq_d7f663f56f4d41bd27c776a6a963c07b\.css/g, 'css/main.min.css');
d = d.replace(/https:\/\/cdn\.tubexh\.com\.au\/wp-includes\/js\/jquery\/jquery\.min\.js/g, 'js/jquery.min.js');
d = d.replace(/https:\/\/cdn\.tubexh\.com\.au\/wp-content\/cache\/staq-min\/staq_a3f5b00b85f45a2ea421b7184bb5e924\.js/g, 'js/main-bundle.min.js');
d = d.replace(/https:\/\/cdn\.tubexh\.com\.au\/wp-content\/cache\/staq-min\/staq_87c7281d6bbc0c23cab469e14d68fed5\.js/g, 'js/oxygen.min.js');
d = d.replace(/https:\/\/cdn\.tubexh\.com\.au\/wp-content\/cache\/staq-min\/staq_7579f2757f310c6f7a9752872a41c7d2\.js/g, 'js/recaptcha.min.js');

// Replace CDN images with local placeholder
d = d.replace(/https:\/\/cdn\.tubexh\.com\.au\/wp-content\/uploads\/[^"'\s<>]+\.(png|webp|jpg|jpeg)/gi, 'images/placeholder.svg');

// Replace CDN video
d = d.replace(/https:\/\/cdn\.tubexh\.com\.au\/[^"'\s<>]+\.mp4/gi, 'images/placeholder.svg');

fs.writeFileSync('index.html', d);

let cdn = (d.match(/cdn\.tubexh/g) || []).length;
let localCss = (d.match(/css\/main\.min\.css/g) || []).length;
let localJs = (d.match(/js\/(jquery|oxygen)\.min\.js/g) || []).length;
let placeholders = (d.match(/images\/placeholder/g) || []).length;

console.log('=== FINALIZE COMPLETE ===');
console.log('CDN refs remaining:', cdn);
console.log('Local CSS refs:', localCss);
console.log('Local JS refs:', localJs);
console.log('Placeholder images:', placeholders);
console.log('File size:', d.length, 'chars');
console.log('Has TubeXh:', d.includes('TubeXh'));
console.log('Has +91:', d.includes('+91 95888'));