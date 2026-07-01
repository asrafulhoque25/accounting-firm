
// ============================================
// MOBILE MENU & NAVBAR
// ============================================
 // Desktop dropdown: + / − icon toggle
    document.addEventListener('DOMContentLoaded', function () {
        const desktopDropdown = document.querySelector('.desktop-dropdown');
        const dropdownIcon = document.querySelector('.desktop-dropdown-icon');

        if (desktopDropdown && dropdownIcon) {
            desktopDropdown.addEventListener('mouseenter', function () {
                dropdownIcon.textContent = '−';
            });
            desktopDropdown.addEventListener('mouseleave', function () {
                dropdownIcon.textContent = '+';
            });
        }
    });

    // ── Mobile 2-panel menu ──
    document.addEventListener('DOMContentLoaded', function () {
        const overlay       = document.getElementById('mobile-overlay');
        const wrapper       = document.getElementById('mobile-menu-wrapper');
        const mmMain        = document.getElementById('mm-main');
        const mmServices    = document.getElementById('mm-services');
        const toggleBtn     = document.getElementById('mobile-menu-toggle');
        const closeBtn      = document.getElementById('mm-close');
        const servicesTrig  = document.getElementById('mm-services-trigger');
        const backBtn       = document.getElementById('mm-back');
        const servicesClose = document.getElementById('mm-services-close');

        function openMenu() {
            wrapper.classList.add('active');
            overlay.classList.add('active');
            wrapper.classList.remove('services-open');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            wrapper.classList.remove('active', 'services-open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        function openServices() {
            wrapper.classList.add('services-open');
        }

        function closeServices() {
            wrapper.classList.remove('services-open');
        }

        // Open via hamburger
        toggleBtn && toggleBtn.addEventListener('click', openMenu);

        // Close buttons
        closeBtn && closeBtn.addEventListener('click', closeMenu);
        servicesClose && servicesClose.addEventListener('click', closeMenu);

        // Overlay click → close
        overlay && overlay.addEventListener('click', closeMenu);

        // SERVICES → slide to panel 2
        servicesTrig && servicesTrig.addEventListener('click', openServices);

        // BACK → slide back to panel 1
        backBtn && backBtn.addEventListener('click', closeServices);

        // Close nav links (non-services) also close menu
        document.querySelectorAll('.mm-nav-link:not(button)').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Service cards close menu
        document.querySelectorAll('.mm-service-card').forEach(card => {
            card.addEventListener('click', closeMenu);
        });

        // Resize: close on desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth >= 1024) closeMenu();
        });
    });







    //full width and height menu -

    (function () {

  const overlay   = document.getElementById('pixxen-menu');
  const topPanel  = document.getElementById('menu-top');
  const botPanel  = document.getElementById('menu-bottom');
  const closeBtn  = document.getElementById('menu-close');
  const openBtn   = document.getElementById('desktop-sidebar');
  const cols      = document.querySelectorAll('.nav-col');
  const logoWrap  = document.getElementById('bottom-logo');


  const DESKTOP_MIN = 1024;
  function isDesktop() { return window.innerWidth >= DESKTOP_MIN; }

  // ─── Pre-set initial states ───────────────────────────────────
  gsap.set(topPanel, { y: '-100%' });
  gsap.set(botPanel, { y: '100%' });
  gsap.set(cols,     { y: 40, opacity: 0 });
  gsap.set(logoWrap, { y: 30, opacity: 0 });

  let isOpen      = false;
  let isAnimating = false;

  // ─── OPEN ─
  function openMenu() {
    if (!isDesktop() || isOpen || isAnimating) return;
    isAnimating = true;

    document.body.classList.add('menu-open');
    overlay.classList.add('is-open');

    const tl = gsap.timeline({
      onComplete: () => { isOpen = true; isAnimating = false; }
    });

    tl.to(topPanel, { y: '0%',  duration: 0.75, ease: 'power4.out' }, 0);
    tl.to(botPanel, { y: '0%',  duration: 0.75, ease: 'power4.out' }, 0);
    tl.to(cols,     { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, 0.45);
    tl.to(logoWrap, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, 0.5);
  }

  // ─── CLOSE ───
  function closeMenu() {
    if (!isOpen || isAnimating) return;
    isAnimating = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = false;
        isAnimating = false;
        overlay.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        gsap.set(cols,     { y: 40, opacity: 0 });
        gsap.set(logoWrap, { y: 30, opacity: 0 });
      }
    });

    tl.to([...cols].reverse(), { y: -20, opacity: 0, duration: 0.3, stagger: 0.04, ease: 'power2.in' }, 0);
    tl.to(logoWrap, { y: 20, opacity: 0, duration: 0.25, ease: 'power2.in' }, 0);
    tl.to(topPanel, { y: '-100%', duration: 0.65, ease: 'power4.in' }, 0.2);
    tl.to(botPanel, { y: '100%',  duration: 0.65, ease: 'power4.in' }, 0.2);
  }

  // Resize: viewport 
  window.addEventListener('resize', () => {
    if (!isDesktop() && isOpen) {
     
      gsap.killTweensOf([topPanel, botPanel, cols, logoWrap]);
      gsap.set(topPanel, { y: '-100%' });
      gsap.set(botPanel, { y: '100%' });
      gsap.set(cols,     { y: 40, opacity: 0 });
      gsap.set(logoWrap, { y: 30, opacity: 0 });
      overlay.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      isOpen      = false;
      isAnimating = false;
    }
  });

  // ─── Events 
  openBtn.addEventListener('click',  openMenu);
  closeBtn.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // Prevent background scroll when menu open
  const style = document.createElement('style');
  style.textContent = `body.menu-open { overflow: hidden; }`;
  document.head.appendChild(style);

}());



// ============================================
// BANNER LINE SHAPE ANIMATION
// ============================================
// const checkAndAnimate = () => {
//     const svgElement = document.querySelector('.banner-line-shape');
    
//     if (!svgElement || typeof gsap === 'undefined') return;
    
//     const horizontalLines = svgElement.querySelectorAll('rect:not([transform])');
//     const verticalLines = svgElement.querySelectorAll('rect[transform*="rotate"]');
    
//     if (horizontalLines.length === 0 && verticalLines.length === 0) return;
    
//     const tl = gsap.timeline({
//         delay: 1,
//         defaults: {
//             ease: "power2.inOut"
//         }
//     });
    
//     if (horizontalLines.length > 0) {
//         tl.fromTo(horizontalLines, 
//             {
//                 scaleX: 0,
//                 transformOrigin: "left center"
//             },
//             {
//                 scaleX: 1,
//                 duration: 0.8,
//                 stagger: 0.15
//             }
//         );
//     }
    
//     if (verticalLines.length > 0) {
//         tl.fromTo(verticalLines,
//             {
//                 scaleY: 0,
//                 transformOrigin: "center top"
//             },
//             {
//                 scaleY: 1,
//                 duration: 0.8,
//                 stagger: 0.15
//             },
//             "-=0.3"
//         );
//     }
// };

// window.addEventListener('load', checkAndAnimate);


// ============================================
// 3D SHAPE ANIMATION (Home + About Page)
// ============================================
document.addEventListener("DOMContentLoaded", function() {
    if (typeof gsap === 'undefined') return;
    
    const shapes = document.querySelectorAll('.shape-3d');
    
    if (shapes.length === 0) return;

    document.addEventListener("mousemove", function(event) {
        const x = (event.clientX / window.innerWidth) - 0.5;
        const y = (event.clientY / window.innerHeight) - 0.5;
        
        shapes.forEach(shape => {
            gsap.to(shape, {
                duration: 0.4,
                x: x * 50,
                y: y * 30,
                rotationY: x * 15,
                rotationX: -y * 15,
                rotationZ: x * 5,
                scale: 1 + (Math.abs(x) + Math.abs(y)) * 0.1,
                ease: "power1.out",
                overwrite: "auto"
            });
        });
    });
});

// ============================================
// VIDEO SLIDER
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const videoSliderElement = document.getElementById('video-slider');
    
    if (!videoSliderElement || typeof Splide === 'undefined') return;

    const splide = new Splide('#video-slider', {
        type: 'loop',
        drag: 'free',
        focus: 'center',
        perPage: 5,
         gap: '12px',
        arrows: false,
        pagination: false,
        // autoScroll:false,
        autoScroll: {
            speed: 1, 
            pauseOnHover: true,
            pauseOnFocus: true,
        },
        breakpoints: {
            1536: { perPage: 5 },
            1280: { perPage: 4 },
            1024: { perPage: 3 , gap: '10px',},
            768: { perPage: 2.5 },
            640: { perPage: 1.5, gap: '8px', }
        }
    });

    if (window.splide && window.splide.Extensions) {
        splide.mount(window.splide.Extensions);
    } else {
        splide.mount();
    }

    const videoCards = document.querySelectorAll('.video-card');

    if (videoCards.length > 0) {
        videoCards.forEach(card => {
            const video = card.querySelector('.video-element');
            if (!video) return;
            
            let isPlaying = false;

            card.addEventListener('mouseenter', function() {
                if (!isPlaying) {
                    video.currentTime = 0;
                    video.play().catch(err => console.log('Video play error:', err));
                    isPlaying = true;
                }
            });

            card.addEventListener('mouseleave', function() {
                if (isPlaying) {
                    video.pause();
                    video.currentTime = 0;
                    isPlaying = false;
                }
            });

            video.addEventListener('ended', function() {
                if (isPlaying) {
                    video.currentTime = 0;
                    video.play();
                }
            });
        });

        splide.on('move', function() {
            videoCards.forEach(card => {
                const video = card.querySelector('.video-element');
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
            });
        });
    }
});

// ============================================
// WORK PROGRESS PATH ANIMATION
// ============================================
if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
}

if (window.innerWidth >= 1024) {
    const path = document.querySelector("#draw-path");
    const workProgress = document.querySelector(".work-progress");
    
    if (path && workProgress && typeof gsap !== 'undefined') {
        const pathLength = path.getTotalLength();

        gsap.set(path, { 
            strokeDasharray: pathLength, 
            strokeDashoffset: pathLength 
        });

        const processItems = document.querySelectorAll(".process-item");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".work-progress",
                start: "top 80%",         
                end: "bottom 20%",
                toggleActions: "play none none none"
            }
        });

        tl.to(path, {
            strokeDashoffset: 0,
            duration: 4,
            ease: "power1.inOut"
        });

        if (processItems.length > 0) {
            tl.to(".process-item", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.7, 
                ease: "power2.out"
            }, 0.5);
        }
    }
}

// ============================================
// OVERVIEW COUNTER
// ============================================
const counterSections = document.querySelectorAll('.overview-counter, .about-counter, .design-counter, .branding-counter, .scss-counter, .web-counter');

if (counterSections.length > 0 && typeof gsap !== 'undefined') {
    if (gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    counterSections.forEach(counterSection => {
        const counters = counterSection.querySelectorAll('.counter');

        if (counters.length > 0) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');

                gsap.to(counter, {
                    innerText: target,
                    duration: 2,
                    ease: "power2.out",
                    snap: { innerText: 1 }, 
                    scrollTrigger: {
                        trigger: counter,
                        start: "top 90%", 
                        toggleActions: "play none none none"
                    },
                    onUpdate: function () {
                        counter.innerHTML = Math.ceil(this.targets()[0].innerText);
                    }
                });
            });
        }
    });
}

// ============================================
// TESTIMONIAL SLIDER
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const testimonialSlider = document.getElementById('testimonial-slider');
    
    if (!testimonialSlider || typeof Splide === 'undefined') return;

    const splide = new Splide('#testimonial-slider', {
        type: 'loop',
        perPage: 3,
        gap: '2rem',
        arrows: false,
        pagination: false,
        drag: 'free',
        focus: 'center',

        autoScroll: {
            speed: 1,
            pauseOnHover: true,
            pauseOnFocus: false,
        },

        breakpoints: {
            1024: {
                perPage: 2,
                gap: '1.5rem',
            },
            768: {
                perPage: 1,
                gap: '1rem',
            }
        }
    });

    splide.mount(window.splide.Extensions);

    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');

    if (prevArrow) {
        prevArrow.addEventListener('click', function () {

            splide.Components.AutoScroll.pause(); // auto scroll stop
            splide.go('<');                       // manual slide
            splide.Components.AutoScroll.play();  // abar start
        });
    }

    if (nextArrow) {
        nextArrow.addEventListener('click', function () {

            splide.Components.AutoScroll.pause();
            splide.go('>');
            splide.Components.AutoScroll.play();
        });
    }
});

// ============================================
// FAQ ACCORDION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.accounting-firm-faq-item');
    
    if (faqItems.length === 0 || typeof gsap === 'undefined') return;
    
    // Initialize all FAQ items as collapsed
    faqItems.forEach((item) => {
        const answer = item.querySelector('.accounting-firm-accounting-firm-faq-answer');
        const icon = item.querySelector('.plus-icon');
        
        // Remove active class from all items
        item.classList.remove('active');
        
        // Set all answers to height 0
        if (answer) {
            gsap.set(answer, { height: 0 });
        }
        
        // Set all icons to rotation 0
        if (icon) {
            gsap.set(icon, { rotation: 0 });
        }
    });

    // Add click event listeners
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.accounting-firm-accounting-firm-faq-answer');
        const icon = item.querySelector('.plus-icon');
        
        if (!question) return;
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.accounting-firm-accounting-firm-faq-answer');
                const otherIcon = otherItem.querySelector('.plus-icon');
                
                otherItem.classList.remove('active');
                
                if (otherAnswer) {
                    gsap.to(otherAnswer, {
                        height: 0,
                        duration: 0.4,
                        ease: 'power2.inOut'
                    });
                }
                if (otherIcon) {
                    gsap.to(otherIcon, {
                        rotation: 0,
                        duration: 0.3,
                        ease: 'power2.inOut'
                    });
                }
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                
                if (answer) {
                    gsap.to(answer, {
                        height: 'auto',
                        duration: 0.4,
                        ease: 'power2.inOut'
                    });
                }
                if (icon) {
                    gsap.to(icon, {
                        rotation: 45,
                        duration: 0.3,
                        ease: 'power2.inOut'
                    });
                }
            }
        });
    });
});

// ============================================
// GRADIENT BACKGROUND ANIMATION (UPDATED)
// ============================================
if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
}

function applyGradientAnimation(sectionSelector) {
  
    const sections = document.querySelectorAll(sectionSelector);
    
    if (sections.length === 0 || typeof gsap === 'undefined') return;
    
    
    sections.forEach((section, index) => {
        const gradientOverlay1 = document.createElement('div');
        gradientOverlay1.style.cssText = `
            position: absolute;
            inset: 0;
            opacity: 0;
            background: radial-gradient(50% 27.56% at 50% -10%, rgba(6, 81, 54, 0.8) 0%, transparent 100%);
            pointer-events: none;
            z-index: 0;
            filter: blur(40px);
        `;


        const gradientOverlay2 = document.createElement('div');
        gradientOverlay2.style.cssText = `
            position: absolute;
            inset: 0;
            opacity: 0;
            background: radial-gradient(50% 27.56% at 50% 0%, #065136 0%, #002417 100%);
            pointer-events: none;
            z-index: 0;
        `;

        section.insertBefore(gradientOverlay1, section.firstChild);
        section.insertBefore(gradientOverlay2, section.firstChild);

        const masterTl = gsap.timeline({
            scrollTrigger: {
                trigger: section, // Unique trigger for each section
                start: 'top 108%',
                end: 'top 25%',
                scrub: 2,
                markers:false,
            }
        });

        masterTl.to(gradientOverlay1, {
            opacity: 0.6,
            scale: 1.1,
            duration: 1,
            ease: 'power2.inOut'
        }, 0);

        masterTl.to(gradientOverlay2, {
            opacity: 1,
            backgroundPosition: '50% 8%',
            duration: 1,
            ease: 'power2.inOut'
        }, 0);

        const contentWrapper = section.querySelector('.cta-wrap, .teamwrap, .workprocess-wrap > div');
        if (contentWrapper) {
            masterTl.from(contentWrapper, {
                y: 25,
                opacity: 0.85,
                duration: 1,
                ease: 'power1.out'
            }, 0.2);
        }
    });
}

applyGradientAnimation('.cta-section');
applyGradientAnimation('.teamsection');
applyGradientAnimation('.work-progress');

// ============================================
// OVERVIEW/ABOUT COUNTER (UPDATED)
// ============================================

// ============================================
// CONTACT FORM GRADIENT BACKGROUND ANIMATION
// ============================================
if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
}

function applyContactGradientAnimation(sectionSelector) {
    const sections = document.querySelectorAll(sectionSelector);
    
    if (sections.length === 0 || typeof gsap === 'undefined') return;
    
    sections.forEach((section, index) => {
        // Create main gradient overlay
        const gradientOverlay = document.createElement('div');
        gradientOverlay.style.cssText = `
            position: absolute;
            inset: 0;
            opacity: 0;
            background: radial-gradient(
                40% 20% at 50% 100%,
                #065136 0%,
                #002417 100%
            );
            pointer-events: none;
            z-index: 1;
            border-radius: 1.5rem;
        `;

        // Create blur overlay for depth
        const blurOverlay = document.createElement('div');
        blurOverlay.style.cssText = `
            position: absolute;
            inset: 0;
            opacity: 0;
            background: radial-gradient(
                45% 25% at 50% 95%,
                rgba(6, 81, 54, 0.9) 0%,
                transparent 100%
            );
            pointer-events: none;
            z-index: 0;
            filter: blur(60px);
            border-radius: 1.5rem;
        `;

        section.insertBefore(gradientOverlay, section.firstChild);
        section.insertBefore(blurOverlay, section.firstChild);

       
        const masterTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
       start: 'bottom 95%',   
      end: 'bottom 50%',     
                scrub: 1.5,           
             
            }
        });

       
        masterTl.to(blurOverlay, {
            opacity: 0.8,
            scale: 1.15,
            duration: 1.5,
            ease: 'power2.inOut'
        }, 0);

        
        masterTl.to(gradientOverlay, {
            opacity: 1,
            scale: 1.05,
            duration: 1.5,
            ease: 'power2.inOut'
        }, 0);


    });
}

// Initialize gradient animation when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
        applyContactGradientAnimation('.anatomy');
    }, 100);
});





//normal bg gradient 

if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
}

function applyLinearGradientOnScroll() {
    const sections = document.querySelectorAll('.bg-linear-gradient');
    
    if (sections.length === 0 || typeof gsap === 'undefined') return;
    
    sections.forEach((section) => {
        // Create a wrapper div for the gradient
        const gradientBg = document.createElement('div');
        gradientBg.style.cssText = `
            position: absolute;
            inset: 0;
            opacity: 0;
            background: linear-gradient(180deg, var(--dark-shade-1, #002417) 0%, var(--dark-extra-dark, #001B11) 100%);
            pointer-events: none;
            z-index: 0;
        `;
        
        section.insertBefore(gradientBg, section.firstChild);
        
        // Animate gradient on scroll
        gsap.to(gradientBg, {
            opacity: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                end: 'top 60%',
                scrub: 1,
            }
        });
    });
}

// Call the function
applyLinearGradientOnScroll();






//phase background scroll

if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
}

function applyPhaseBackgroundAnimation(sectionSelector) {
    const sections = document.querySelectorAll(sectionSelector);
    
    if (sections.length === 0 || typeof gsap === 'undefined') return;
    
    sections.forEach((section, index) => {
        // Create background wrapper with Tailwind classes
        const backgroundWrapper = document.createElement('div');
        backgroundWrapper.className = 'absolute inset-0 opacity-0 pointer-events-none z-0 rounded-3xl border-white/16 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-[0px]';
        
        section.insertBefore(backgroundWrapper, section.firstChild);
       
        const masterTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 70%',   
                end: 'top 60%',     
                scrub: 1.5,           
            }
        });
       
        masterTl.to(backgroundWrapper, {
            opacity: 1,
            duration: 1.5,
            ease: 'power2.inOut'
        }, 0);
    });
}

// Initialize animation when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
        applyPhaseBackgroundAnimation('.phase-bg');
    }, 100);
});



// ============================================
// TOOLS BACKGROUND IMAGE TRANSITION
// ============================================
function applyBackgroundImageTransition(sectionSelector) {
    const section = document.querySelector(sectionSelector);
    const imageOverlay = section ? section.querySelector('.tools-bg-overlay') : null;
   
    if (!section || !imageOverlay || typeof gsap === 'undefined') return;
   
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: sectionSelector,
            start: 'bottom 95%',
            end: 'bottom 88%',  
            scrub: 2,
            markers: false
        }
    });
   
    tl.to(imageOverlay, {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        duration: 1,
        ease: 'power2.inOut'
    });
   
    const contentWrapper = section.querySelector('.toolswrap');
    if (contentWrapper) {
        gsap.from(contentWrapper, {
            scrollTrigger: {
                trigger: sectionSelector,
                start: 'bottom 75%',
                end: 'bottom 35%',
                scrub: 1.5
            },
            y: 30,
            opacity: 1,
            duration: 1,
            ease: 'power1.out'
        });
    }
}
 
applyBackgroundImageTransition('.tools-technology');

// video section in team page

document.addEventListener('DOMContentLoaded', function() {
    // Prothome check korbe 'team-video-section' class-ti page-e ache kina
    const videoSection = document.querySelector('.team-video-section');

    if (videoSection) {
        // Jodi class-ti thake, tobei baki elements gulo khujbe
        const playButton = document.getElementById('playButton');
        const videoThumbnail = document.getElementById('videoThumbnail');
        const videoPlayer = document.getElementById('videoPlayer');

        // Check kora bhalo j elements gulo thikmoto ache kina (Error avoid korar jonno)
        if (playButton && videoThumbnail && videoPlayer) {
            
            // Play Button Click Handler
            playButton.addEventListener('click', function() {
                playButton.classList.add('hidden-scale');
                videoThumbnail.classList.add('hidden-fade');
                
                setTimeout(() => {
                    videoPlayer.classList.add('visible');
                    videoPlayer.play();
                }, 300);
            });

            // Video Ends Handler
            videoPlayer.addEventListener('ended', function() {
                videoPlayer.classList.remove('visible');
                videoThumbnail.classList.remove('hidden-fade');
                playButton.classList.remove('hidden-scale');
            });

            // Pause Handling
            videoPlayer.addEventListener('pause', function() {
                if (videoPlayer.currentTime === 0 || videoPlayer.ended) {
                    videoPlayer.classList.remove('visible');
                    videoThumbnail.classList.remove('hidden-fade');
                    playButton.classList.remove('hidden-scale');
                }
            });
        }
    }
});




//blog tab 

// Tab Functionality
function initBlogTab() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length === 0 || tabPanes.length === 0) return;
    
    function switchTab(tabId) {
        // Remove active class from all buttons
        tabButtons.forEach(button => {
            button.classList.remove('active');
            button.classList.add('inactive');
        });
        
        // Remove active class from all panes
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });
        
        // Add active class to clicked button
        const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
        if (activeButton) {
            activeButton.classList.remove('inactive');
            activeButton.classList.add('active');
        }
        
        // Show corresponding tab pane
        const activePane = document.getElementById(tabId);
        if (activePane) {
            activePane.classList.add('active');
            
            // Check load more button visibility when switching tabs
            checkLoadMoreButton();
        }
    }
    
    // Add click event listeners to all buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            if (tabId) {
                switchTab(tabId);
            }
        });
    });
}


    




// Reading Progress Bar
function updateReadingProgress() {
    const content = document.querySelector('.blog-details-content');
    const progressBar = document.querySelector('.reading-progress-bar');
    
    if (!content || !progressBar) return;
    
    const contentRect = content.getBoundingClientRect();
    const contentHeight = content.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableHeight = contentHeight - viewportHeight;
    
    // Calculate scroll progress
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const contentTop = content.offsetTop;
    const scrolled = scrollTop - contentTop;
    const progress = Math.min(Math.max((scrolled / scrollableHeight) * 100, 0), 100);
    
    progressBar.style.width = progress + '%';
}

// Dynamic Table of Contents Generator
function generateTableOfContents() {
    const content = document.querySelector('.blog-details-content');
    const tocList = document.querySelector('.toc-blog-list');
    
    if (!content || !tocList) return;
    
    const headings = content.querySelectorAll('h2');
    
    tocList.innerHTML = '';
    
    headings.forEach((heading, index) => {
        const headingId = `section-${index}`;
        heading.setAttribute('id', headingId);
        
        const innerSpans = heading.querySelectorAll('.gr-word-inner');
        const headingText = innerSpans.length > 0
            ? Array.from(innerSpans).map(s => s.textContent).join(' ')
            : heading.textContent;
        
        const li = document.createElement('li');
        li.className = 'toc-blog-item';
        
        const a = document.createElement('a');
        a.href = `#${headingId}`;
        a.innerHTML = `<span class="header-highlight">${headingText}</span>`;
        
        li.appendChild(a);
        tocList.appendChild(li);
    });
}

// Active Section Highlighting
function highlightActiveSection() {
    const headings = document.querySelectorAll('.blog-details-content h2');
    const tocItems = document.querySelectorAll('.toc-blog-item');
    
    if (!headings.length || !tocItems.length) return;
    
    let activeIndex = -1;
    
    headings.forEach((heading, index) => {
        const rect = heading.getBoundingClientRect();
        // Check if heading is in viewport (with some offset from top)
        if (rect.top <= 150) {
            activeIndex = index;
        }
    });
    
    // Remove active class from all items
    tocItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to current section
    if (activeIndex >= 0 && tocItems[activeIndex]) {
        tocItems[activeIndex].classList.add('active');
    }
}

// Smooth Scroll to Section
function initSmoothScroll() {
    const tocLinks = document.querySelectorAll('.toc-blog-item a');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100; // 100px offset from top
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}





// banner main and h1 ,h2 and h3 animaiton reveal 

(function () {
  "use strict";

  function wrapWords(el) {
    function walk(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const parts = node.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else if (part) {
            const outer = document.createElement("span");
            outer.className = "gr-word-outer";
            outer.style.cssText = "display:inline-block;overflow:hidden;vertical-align:bottom;";
            const inner = document.createElement("span");
            inner.className = "gr-word-inner";
            inner.style.cssText = "display:inline-block;";
            inner.textContent = part;
            outer.appendChild(inner);
            frag.appendChild(outer);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== "BR") {
        Array.from(node.childNodes).forEach(walk);
      }
    }
    Array.from(el.childNodes).forEach(walk);
  }

  /* ════════════════════════════════════════════════
     Single heading animate — reusable
     tl = existing timeline (for h1)
     OR null = creates its own ScrollTrigger (for h2)
  ════════════════════════════════════════════════ */
  function animateHeading(heading, tl, delay) {
    const hasSplit = typeof SplitText !== "undefined";

    if (tl) {
      // ── H1: plugged into master timeline ──────
      if (hasSplit) {
        const split = new SplitText(heading, { type: "words" });
        split.words.forEach((w) => {
          const outer = document.createElement("span");
          outer.style.cssText = "display:inline-block;overflow:hidden;vertical-align:bottom;";
          w.parentNode.insertBefore(outer, w);
          outer.appendChild(w);
          w.style.display = "inline-block";
        });
        gsap.set(split.words, { yPercent: 105, skewY: 3, opacity: 0 });
        tl.to(split.words, {
          yPercent: 0, skewY: 0, opacity: 1,
          duration: 1.0,
          stagger: { each: 0.07, ease: "power2.inOut" },
          ease: "expo.out",
          clearProps: "yPercent,skewY,opacity",
        }, delay);
      } else {
        wrapWords(heading);
        const inners = heading.querySelectorAll(".gr-word-inner");
        gsap.set(inners, { yPercent: 108, skewY: 3, opacity: 0 });
        tl.to(inners, {
          yPercent: 0, skewY: 0, opacity: 1,
          duration: 1.05,
          stagger: { each: 0.065, ease: "power2.inOut" },
          ease: "expo.out",
          clearProps: "yPercent,skewY,opacity",
        }, delay);
      }
    } else {
      // ── H2: ScrollTrigger — fires when heading enters viewport ──
      if (hasSplit) {
        const split = new SplitText(heading, { type: "words" });
        split.words.forEach((w) => {
          const outer = document.createElement("span");
          outer.style.cssText = "display:inline-block;overflow:hidden;vertical-align:bottom;";
          w.parentNode.insertBefore(outer, w);
          outer.appendChild(w);
          w.style.display = "inline-block";
        });
        gsap.set(split.words, { yPercent: 105, skewY: 3, opacity: 0 });
        gsap.to(split.words, {
          yPercent: 0, skewY: 0, opacity: 1,
          duration: 1.0,
          stagger: { each: 0.07, ease: "power2.inOut" },
          ease: "expo.out",
          clearProps: "yPercent,skewY,opacity",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",  
            once: true,         
          },
        });
      } else {
        wrapWords(heading);
        const inners = heading.querySelectorAll(".gr-word-inner");
        gsap.set(inners, { yPercent: 108, skewY: 3, opacity: 0 });
        gsap.to(inners, {
          yPercent: 0, skewY: 0, opacity: 1,
          duration: 1.05,
          stagger: { each: 0.065, ease: "power2.inOut" },
          ease: "expo.out",
          clearProps: "yPercent,skewY,opacity",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            once: true,
          },
        });
      }
    }
  }

  /* ════════════════════════════════════════════════
     Banner init — h1 only (page load)
  ════════════════════════════════════════════════ */
  function initBannerReveal(containerSelector) {
    containerSelector = containerSelector || ".banner-content";
    const container = document.querySelector(containerSelector);
    if (!container || typeof gsap === "undefined") return;

    const badge  = container.querySelector(".flex.items-center.justify-center");
    const h1     = container.querySelector("h1");
    const divMid = container.querySelector(".max-w-182\\.5");
    const para   = container.querySelector("p:not(.text-green2)");
    const btn    = container.querySelector(".mega-reveal-btn");

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Top divider
    if (badge) {
      gsap.set(badge, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
      tl.to(badge, { clipPath: "inset(0 0% 0 0)", duration: 0.85, ease: "power3.inOut" }, 0);
      const badgeChildren = badge.querySelectorAll("span, p");
      gsap.set(badgeChildren, { opacity: 0, y: -10 });
      tl.to(badgeChildren, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, 0.6);
    }

    // H1
    if (h1) animateHeading(h1, tl, 0.5);

    // Mid divider
    if (divMid) {
      gsap.set(divMid, { width: "0%", opacity: 1, clearProps: "transform" });
      tl.to(divMid, {
        width: "100%",
        duration: 1.0,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(divMid, { clearProps: "width,transformOrigin,transform,opacity" });
          divMid.style.width = "";
        },
      }, 0.9);

      tl.fromTo(divMid,
        { boxShadow: "0 0 0px 0px rgba(80,200,130,0)" },
        {
          boxShadow: "0 0 16px 4px rgba(80,200,130,0.4)",
          duration: 0.3,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          onComplete: () => gsap.set(divMid, { clearProps: "boxShadow" }),
        }, 1.85
      );
    }

    // Paragraph
    if (para) {
      gsap.set(para, { opacity: 0, y: 28, filter: "blur(6px)" });
      tl.to(para, {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 0.95, ease: "power3.out",
        clearProps: "filter,transform",
      }, 1.2);
    }

    // Button
    if (btn) {
      gsap.set(btn, { opacity: 0, scale: 0.82, y: 16 });
      tl.to(btn, {
        opacity: 1, scale: 1, y: 0,
        duration: 0.75, ease: "back.out(1.6)",
        clearProps: "transform",
      }, 1.5);
    }

    return tl;
  }

  /* ════════════════════════════════════════════════
     H1 and H2 and h3 ScrollTrigger init 
  ════════════════════════════════════════════════ */
function initH2Scroll() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    
    const bannerContainer = document.querySelector(".banner-content");
    const blogContent = document.querySelector(".blog-details-content");
    
    document.querySelectorAll("h1, h2, h3").forEach((heading) => {
        if (bannerContainer && bannerContainer.contains(heading)) return;
        if (blogContent && blogContent.contains(heading)) return;
        
        animateHeading(heading, null, 0);
    });
}

  /* ════════════════════════════════════════════════
     Auto init
  ════════════════════════════════════════════════ */
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(() => {
    initBannerReveal(".banner-content");
    initH2Scroll();
  });

  window.BannerReveal = {
    init: initBannerReveal,
    initH2: initH2Scroll,
  };

})();










//smooth scroll

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.4,     
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
  direction: 'vertical', 
  gestureDirection: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.3, 
  infinite: false,
});


lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
















// accounting firm js start 

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && window.gsap) {
      // single image, gentle + smooth "breathing" — subtle scale + tiny float, slow loop
      gsap.to('.hero-img', {
        scale: 1.03,
        yPercent: -1.5,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: 'center center'
      });
    }


    //testimonial 

    function initContentTestimonialSlider() {
    if (!document.getElementById('testimonialSlider')) return;
 
    const arrowSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.414 10.586L13.121 6.29297L11.707 7.70697L15 11H5V13H15L11.707 16.293L13.121 17.707L17.414 13.414C17.7889 13.0389 17.9996 12.5303 17.9996 12C17.9996 11.4696 17.7889 10.961 17.414 10.586Z" fill="white"/>
    </svg>`;
 
    const testimonialSplide = new Splide('#testimonialSlider', {
      type: 'loop', perPage: 3, perMove: 1, gap: '2rem',
      autoplay: true, interval: 4000, pauseOnHover: true,
      arrows: true, pagination: false,
      breakpoints: { 
        1400: { perPage: 2, gap: '1.5rem' } ,
        1024: { perPage: 1, gap: '1.5rem' } 
    
    }
    });
 
    testimonialSplide.mount();
 
    const testimonialWrapper = document.getElementById('testimonialSlider').closest('.content-our-testimonial');
    if (!testimonialWrapper) return;
 
    const originalArrows           = testimonialWrapper.querySelector('.splide__arrows');
    const testimonialArrowsDesktop = testimonialWrapper.querySelector('.testimonial-real-content-slider-arrows-desktop');
    const testimonialArrowsMobile  = testimonialWrapper.querySelector('.testimonial-real-content-slider-arrows-mobile');
 
    if (!originalArrows || !testimonialArrowsDesktop || !testimonialArrowsMobile) return;
 
    testimonialArrowsDesktop.innerHTML = originalArrows.innerHTML;
    testimonialArrowsMobile.innerHTML  = originalArrows.innerHTML;
 
    [testimonialArrowsDesktop, testimonialArrowsMobile].forEach(container => {
      container.querySelectorAll('.splide__arrow').forEach(arrow => { arrow.innerHTML = arrowSVG; });
      const prevBtn = container.querySelector('.splide__arrow--prev');
      const nextBtn = container.querySelector('.splide__arrow--next');
      if (prevBtn) prevBtn.addEventListener('click', () => testimonialSplide.go('<'));
      if (nextBtn) nextBtn.addEventListener('click', () => testimonialSplide.go('>'));
    });
 
    originalArrows.style.display = 'none';
  }
  initContentTestimonialSlider();


  //accounting firm footer

   document.querySelectorAll('.accounting-firm-faq-item').forEach(function(item){
      item.addEventListener('click', function(){
        var isOpen = item.classList.contains('is-open');
        document.querySelectorAll('.accounting-firm-faq-item').forEach(function(i){ i.classList.remove('is-open'); });
        if (!isOpen) item.classList.add('is-open');
      });
    });