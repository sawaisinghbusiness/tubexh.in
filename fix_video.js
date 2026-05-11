const fs = require('fs');
let h = fs.readFileSync('index.html', 'utf8');

// Fix video: change data-src to direct src
h = h.replace(
  'data-src="images/tubexh web hero section video.mp4"',
  'src="images/tubexh web hero section video.mp4"'
);

// Also ensure autoplay works - remove lazy class from video that might prevent autoplay
// Actually keep lazy class but also add preload attribute
h = h.replace(
  'poster="images/video-placeholder.webp"> <source src=',
  'poster="images/video-placeholder.webp" preload="auto"> <source src='
);

fs.writeFileSync('index.html', h, 'utf8');
console.log('Video source fixed to direct src!');