// WebAdelaide Clone - Main JavaScript
(function() {
    'use strict';

    // ===== DOM READY =====
    document.addEventListener('DOMContentLoaded', function() {

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

        // Video scroll effect (small→full on scroll) - like webadelaide.com.au
        initVideoScrollEffect();
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

    // ===== SCROLL TO TOP =====
    var scrollToTopBtn = document.querySelector('.oxy-eci-collapsed');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

})();