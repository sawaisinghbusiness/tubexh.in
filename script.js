// WebAdelaide Clone - Main JavaScript
(function() {
    'use strict';

    // ===== WEBGL SHADER HERO =====
    function initShaderHero() {
        var canvas = document.getElementById('shader-canvas');
        if (!canvas) return;
        var gl = canvas.getContext('webgl2');
        if (!gl) { canvas.style.display = 'none'; return; }

        var dpr = Math.max(1, 0.5 * window.devicePixelRatio);
        function resize() {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
        }
        resize();
        window.addEventListener('resize', resize);

        var vertSrc = '#version 300 es\nprecision highp float;\nin vec4 position;\nvoid main(){ gl_Position = position; }';
        var fragSrc = [
            '#version 300 es',
            'precision highp float;',
            'out vec4 O;',
            'uniform vec2 resolution;',
            'uniform float time;',
            '#define FC gl_FragCoord.xy',
            '#define T time',
            '#define R resolution',
            '#define MN min(R.x,R.y)',
            'float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}',
            'float noise(in vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}',
            'float fbm(vec2 p){float t=.0,a=1.;mat2 m=mat2(1.,-.5,.2,1.2);for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;}return t;}',
            'float clouds(vec2 p){float d=1.,t=.0;for(float i=.0;i<3.;i++){float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);t=mix(t,d,a);d=a;p*=2./(i+1.);}return t;}',
            'void main(void){',
            '  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);',
            '  vec3 col=vec3(0);',
            '  float bg=clouds(vec2(st.x+T*.5,-st.y));',
            '  uv*=1.-.3*(sin(T*.2)*.5+.5);',
            '  for(float i=1.;i<12.;i++){',
            '    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);',
            '    vec2 p=uv;float d=length(p);',
            '    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);',
            '    float b=noise(i+p+bg*1.731);',
            '    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));',
            '    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);',
            '  }',
            '  O=vec4(col,1);',
            '}'
        ].join('\n');

        function makeShader(type, src) {
            var s = gl.createShader(type);
            gl.shaderSource(s, src);
            gl.compileShader(s);
            return s;
        }

        var prog = gl.createProgram();
        gl.attachShader(prog, makeShader(gl.VERTEX_SHADER, vertSrc));
        gl.attachShader(prog, makeShader(gl.FRAGMENT_SHADER, fragSrc));
        gl.linkProgram(prog);

        var buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,1,-1,-1,1,1,1,-1]), gl.STATIC_DRAW);

        var posLoc = gl.getAttribLocation(prog, 'position');
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        var uRes = gl.getUniformLocation(prog, 'resolution');
        var uTime = gl.getUniformLocation(prog, 'time');

        function render(now) {
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(prog);
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.uniform1f(uTime, now * 1e-3);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }

    // initShaderHero(); // shader removed, video-only bg

    // ===== DOM READY =====
    document.addEventListener('DOMContentLoaded', function() {

        // Subtle fade-in on scroll
        initFadeIn();

        // FAQ Toggle functionality
        initFaqToggles();

        // Toggler expand/collapse buttons
        initTogglers();

        // Video mute/unmute
        initVideoMute();

        // Smooth scroll for anchor links
        initSmoothScroll();

        // Mobile menu off-canvas
        initOffCanvas();

        // Lazy load video source
        lazyLoadVideo();

        // Video scroll effect disabled — video is now full-screen hero background
        // initVideoScrollEffect();
    });

    // ===== FAQ TOGGLES =====
    function initFaqToggles() {
        const toggles = document.querySelectorAll('.oxy-toggle');
        toggles.forEach(function(toggle) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                const parent = this.closest('.ct-div-block');
                const content = parent ? parent.querySelector('.ct-div-block:not(:first-child)') : null;

                if (this.classList.contains('toggle-9693-expanded')) {
                    this.classList.remove('toggle-9693-expanded');
                    if (content) content.style.display = 'none';
                    const icon = this.querySelector('.oxy-expand-collapse-icon');
                    if (icon) icon.style.transform = 'rotate(0deg)';
                } else {
                    this.classList.add('toggle-9693-expanded');
                    if (content) content.style.display = 'block';
                    const icon = this.querySelector('.oxy-expand-collapse-icon');
                    if (icon) icon.style.transform = 'rotate(45deg)';
                }
            });
        });
    }

    // ===== TOGGLER CONTENT =====
    function initTogglers() {
        const togglerButtons = document.querySelectorAll('.toggler-button');
        togglerButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const container = this.closest('.toggler-container');
                if (!container) return;
                const content = container.querySelector('.toggler-content');
                if (!content) return;

                if (content.classList.contains('expanded')) {
                    content.classList.remove('expanded');
                    content.style.maxHeight = '0';
                } else {
                    content.classList.add('expanded');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        });
    }

    // ===== VIDEO HERO SCROLL EFFECT =====
    // Like webadelaide.com.au: small video at top → expands to full width on scroll
    function initVideoScrollEffect() {
        var hero = document.getElementById('mj-video-hero');
        if (!hero) return;

        // Set initial state: small centered video
        hero.classList.add('video-hero-initial');
        hero.classList.remove('video-hero-full');

        var ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    var scrollY = window.scrollY || window.pageYOffset;

                    if (scrollY > 50) {
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
    }

    // ===== VIDEO MUTE TOGGLE =====
    function initVideoMute() {
        const muteBtn = document.querySelector('.ct-fancy-icon[title*="unmute"]');
        const video = document.querySelector('#mj-video-hero-container video');
        if (!muteBtn || !video) return;

        muteBtn.addEventListener('click', function() {
            if (video.muted) {
                video.muted = false;
                video.volume = 0.5;
                this.setAttribute('title', 'Click to mute video');
            } else {
                video.muted = true;
                this.setAttribute('title', 'Click to unmute video while scrolling');
            }
        });
    }

    // ===== SMOOTH SCROLL =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;
                var target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ===== OFF-CANVAS MOBILE MENU =====
    function initOffCanvas() {
        var triggers = document.querySelectorAll('.triggerIcon');
        var offcanvasInner = document.querySelector('.oxy-offcanvas_inner');
        var backdrop = document.querySelector('.oxy-offcanvas_backdrop');

        if (!offcanvasInner || !backdrop) return;

        triggers.forEach(function(trigger) {
            trigger.addEventListener('click', function() {
                offcanvasInner.classList.add('oxy-offcanvas_inner-visible');
                backdrop.classList.add('oxy-offcanvas_backdrop-visible');
                document.body.style.overflow = 'hidden';
            });
        });

        backdrop.addEventListener('click', closeOffCanvas);

        function closeOffCanvas() {
            offcanvasInner.classList.remove('oxy-offcanvas_inner-visible');
            backdrop.classList.remove('oxy-offcanvas_backdrop-visible');
            document.body.style.overflow = '';
        }
    }

    // ===== LAZY LOAD VIDEO =====
    function lazyLoadVideo() {
        var video = document.querySelector('#mj-video-hero-container video');
        if (!video) return;
        var source = video.querySelector('source');
        if (source && source.dataset.src) {
            source.src = source.dataset.src;
            video.load();
            video.play().catch(function() {});
        }
    }

    // ===== AOS INITIALIZATION =====
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 500,
            once: false,
            mirror: false
        });
    }

    // ===== 3D FLIP ON SCROLL =====
    function initFadeIn() {
        var elements = document.querySelectorAll('.hoverBorder');
        if (!elements.length) return;

        // Mark all as flip-in (hidden rotated state)
        elements.forEach(function(el) {
            el.classList.add('flip-in');
        });

        // Wait one frame so browser paints the hidden state before observing
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                var observer = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('flip-show');
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

                document.querySelectorAll('.flip-in').forEach(function(el) {
                    observer.observe(el);
                });
            });
        });
    }

    // ===== SCROLL TO TOP =====
    var scrollToTopBtn = document.querySelector('.oxy-eci-collapsed');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

})();