const fs = require('fs');
let h = fs.readFileSync('index.html', 'utf8');

// 1. Add inline CSS for video animation before closing </head>
let cssCode = `/* ===== VIDEO HERO SCROLL EFFECT ===== */
#mj-video-hero-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
#mj-video-hero-container video {
    width: 100%;
    height: auto;
    display: block;
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.video-hero-initial #mj-video-hero-container {
    max-width: 320px;
    margin: 0 auto;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    transform: scale(0.9);
    opacity: 0.9;
}
.video-hero-initial #mj-video-hero-container video {
    border-radius: 16px;
}
.video-hero-full #mj-video-hero-container {
    max-width: 100%;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    transform: scale(1);
    opacity: 1;
}
.video-hero-full #mj-video-hero-container video {
    border-radius: 0;
}
@media (max-width: 768px) {
    .video-hero-initial #mj-video-hero-container {
        max-width: 240px;
    }
}`;

// Insert CSS before </head>
h = h.replace('</head>', '<style>' + cssCode + '</style></head>');

// 2. Add inline JS for scroll effect before </body>
let jsCode = `// Video hero scroll effect (small→full)
(function(){
    var hero = document.getElementById('mj-video-hero');
    if(!hero) return;
    hero.classList.add('video-hero-initial');
    var ticking = false;
    window.addEventListener('scroll', function(){
        if(!ticking){
            window.requestAnimationFrame(function(){
                var scrollY = window.scrollY || window.pageYOffset;
                if(scrollY > 50){
                    hero.classList.remove('video-hero-initial');
                    hero.classList.add('video-hero-full');
                } else {
                    hero.classList.remove('video-hero-full');
                    hero.classList.add('video-hero-initial');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
})();`;

// Insert JS before </body>
h = h.replace('</body>', '<script>' + jsCode + '</script></body>');

fs.writeFileSync('index.html', h, 'utf8');
console.log('Animation CSS & JS injected inline into index.html!');