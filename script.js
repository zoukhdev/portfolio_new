// GSAP and Locomotive Scroll Integration
gsap.registerPlugin(ScrollTrigger);

// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1,
    class: 'is-revealed',
    scrollFromAnywhere: true,
    getDirection: true,
    touchMultiplier: 2,
    smoothMobile: false,
    smartphone: {
        smooth: false
    },
    tablet: {
        smooth: false
    }
});

// GSAP Loading Animation
function initLoadingAnimation() {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progressBar');
    const logoText = document.querySelector('.logo-text');
    const loadingText = document.querySelector('.loading-text');
    
    // Ensure elements exist
    if (!preloader || !progressBar || !logoText || !loadingText) {
        console.error('Preloader elements not found');
        fallbackLoading();
        return;
    }
    
    console.log('Starting loading animation...');
    
    // Set initial states
    gsap.set(logoText, { scale: 0.8, opacity: 0 });
    gsap.set(loadingText, { opacity: 0, y: 20 });
    gsap.set(progressBar, { width: "0%" });
    
    // Create smooth loading timeline
    const tl = gsap.timeline({
        onComplete: () => {
            console.log('Loading animation complete, transitioning to main content...');
            transitionToMain();
        }
    });
    
    // Animate elements with smooth timing
    tl.to(logoText, { 
        scale: 1, 
        opacity: 1, 
        duration: 1.2, 
        ease: "back.out(1.7)" 
    })
    .to(loadingText, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out" 
    }, "-=0.6")
    .to(progressBar, { 
        width: "100%", 
        duration: 2.5, 
        ease: "power2.out" 
    }, "-=0.4");
}

// Smooth transition to main content
function transitionToMain() {
    const preloader = document.getElementById('preloader');
    const mainContent = document.querySelector('main');
    
    if (!preloader) {
        console.log('No preloader found, initializing main animations...');
        initMainAnimations();
        return;
    }
    
    // Fade out preloader and fade in main content simultaneously
    const tl = gsap.timeline({
        onComplete: () => {
            preloader.style.display = "none";
            console.log('Transition complete, main content visible');
        }
    });
    
    // Hide preloader
    tl.to(preloader, {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power2.inOut"
    })
    // Show main content
    .fromTo(mainContent, 
        { opacity: 0, y: 20 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power2.out" 
        }, "-=0.8")
    // Initialize main animations after transition
    .call(() => {
        initMainAnimations();
    });
}

// Main Animations
function initMainAnimations() {
    // Hero Section Animations
    const heroTl = gsap.timeline();
    
    // Animate hero title lines with slower, more elegant timing
    heroTl.fromTo(".title-line",
        { opacity: 0, y: 50, filter: "blur(10px)" },
        { 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)", 
            duration: 1.8, 
            stagger: 0.3, 
            ease: "power3.out" 
        }
    );
    
    // Animate subtitle and CTA with slower timing
    heroTl.fromTo([".hero-subtitle", ".cta-button"],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.3, ease: "power3.out" },
        "-=0.8"
    );
    
    // Animate floating orbs with slower, more elegant movement
    gsap.to(".glow-orb", {
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.8
    });
    
    // CTA Button hover animation
    const ctaBtn = document.getElementById('hireMeBtn');
    ctaBtn.addEventListener('mouseenter', () => {
        gsap.to(ctaBtn, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    ctaBtn.addEventListener('mouseleave', () => {
        gsap.to(ctaBtn, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    // About Section Animations
    console.log('Creating About section ScrollTrigger...');
    ScrollTrigger.create({
        trigger: ".about-section",
        start: "top 80%",
        onEnter: () => {
            console.log('About section animation triggered');
            
            // Animate only the "About Me" title with blur effect
            const title = document.querySelector(".about-section h2.section-title");
            console.log('Title element:', title);
            
            if (title) {
                console.log('Animating title...');
                // Slower, more elegant animation with blur effect
                gsap.fromTo(title, 
                    { 
                        opacity: 0, 
                        filter: "blur(20px)",
                        y: 50 
                    },
                    { 
                        opacity: 1, 
                        filter: "blur(0px)",
                        y: 0, 
                        duration: 2.5, 
                        ease: "power3.out",
                        onStart: () => console.log('Title animation started'),
                        onComplete: () => console.log('Title animation completed')
                    }
                );
            }
            
            // Animate other elements with slower, more elegant timing
            gsap.fromTo(".about-image",
                { opacity: 0, x: -50, filter: "blur(10px)" },
                { opacity: 1, x: 0, filter: "blur(0px)", duration: 2, ease: "power3.out", delay: 0.8 }
            );
            
            gsap.fromTo(".about-text",
                { opacity: 0, x: 50, filter: "blur(10px)" },
                { opacity: 1, x: 0, filter: "blur(0px)", duration: 2, ease: "power3.out", delay: 1.2 }
            );
            
            gsap.fromTo(".skill-item",
                { opacity: 0, y: 30, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 1.6 }
            );
        }
    });
    
    // Projects Section Animations
    ScrollTrigger.create({
        trigger: ".projects-section",
        start: "top 80%",
        onEnter: () => {
            gsap.fromTo(".project-card",
                { opacity: 0, y: 50, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 1.5, stagger: 0.3, ease: "power3.out" }
            );
        }
    });
    
    // Project card hover animations
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Contact Section Animations
    ScrollTrigger.create({
        trigger: ".contact-section",
        start: "top 80%",
        onEnter: () => {
            gsap.fromTo(".contact-info",
                { opacity: 0, x: -50, filter: "blur(10px)" },
                { opacity: 1, x: 0, filter: "blur(0px)", duration: 1, ease: "power2.out" }
            );
            
            gsap.fromTo(".contact-form",
                { opacity: 0, x: 50, filter: "blur(10px)" },
                { opacity: 1, x: 0, filter: "blur(0px)", duration: 1, ease: "power2.out", delay: 0.2 }
            );
        }
    });
    
    // Form input animations
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Submit button animation
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        gsap.to(submitBtn, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.to(submitBtn, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });
    
    // Footer Animations
    ScrollTrigger.create({
        trigger: ".footer",
        start: "top 80%",
        onEnter: () => {
            gsap.fromTo(".footer-content",
                { opacity: 0, y: 60, filter: "blur(10px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power2.out" }
            );
        }
    });
    
    // Social link hover animations
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                y: -3,
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Skill item hover animations
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                y: -5,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('[data-scroll-to]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            scroll.scrollTo(target);
        });
    });
}

// Parallax effects
function initParallaxEffects() {
    // Parallax for floating orbs
    gsap.to(".orb-1", {
        y: -50,
        x: -30,
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });
    
    gsap.to(".orb-2", {
        y: -30,
        x: 20,
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });
    
    gsap.to(".orb-3", {
        y: -40,
        x: -20,
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });
    
    gsap.to(".orb-4", {
        y: -25,
        x: 25,
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });
}

// Cursor effects
function initCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Add cursor styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        }
        
        .custom-cursor.hover {
            transform: scale(2);
            background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
        }
    `;
    document.head.appendChild(style);
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.1,
            ease: "power2.out"
        });
    });
    
    // Add hover effects
    document.querySelectorAll('a, button, .project-card, .skill-item').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// Fallback loading function
function fallbackLoading() {
    console.log('Using fallback loading...');
    const preloader = document.getElementById('preloader');
    const mainContent = document.querySelector('main');
    const progressBar = document.getElementById('progressBar');
    
    if (preloader) {
        // Animate progress bar
        if (progressBar) {
            progressBar.style.transition = 'width 2s ease';
            progressBar.style.width = '100%';
        }
        
        // Simple fallback animation
        setTimeout(() => {
            console.log('Fallback: Starting transition...');
            
            // Fade out preloader
            preloader.style.transition = 'opacity 1s ease, transform 1s ease';
            preloader.style.opacity = '0';
            preloader.style.transform = 'scale(0.95)';
            
            // Fade in main content
            if (mainContent) {
                mainContent.style.transition = 'opacity 1s ease, transform 1s ease';
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }
            
            setTimeout(() => {
                preloader.style.display = "none";
                console.log('Fallback: Transition complete, initializing main animations...');
                initMainAnimations();
            }, 1000);
        }, 2000); // 2 second fallback
    } else {
        console.log('Fallback: No preloader found, initializing main animations...');
        initMainAnimations();
    }
}

// Simple automatic loading - guaranteed to work
function simpleAutoLoading() {
    console.log('Starting simple auto loading...');
    const preloader = document.getElementById('preloader');
    const mainContent = document.querySelector('main');
    const progressBar = document.getElementById('progressBar');
    
    if (!preloader) {
        console.log('No preloader found, showing main content...');
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }
        initMainAnimations();
        return;
    }
    
    // Animate progress bar
    if (progressBar) {
        progressBar.style.transition = 'width 3s ease';
        progressBar.style.width = '100%';
    }
    
    // Auto transition after 3 seconds
    setTimeout(() => {
        console.log('Auto transition starting...');
        
        // Fade out preloader
        preloader.style.transition = 'opacity 1s ease, transform 1s ease';
        preloader.style.opacity = '0';
        preloader.style.transform = 'scale(0.95)';
        
        // Fade in main content
        if (mainContent) {
            mainContent.style.transition = 'opacity 1s ease, transform 1s ease';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }
        
        setTimeout(() => {
            preloader.style.display = "none";
            console.log('Auto transition complete!');
            initMainAnimations();
        }, 1000);
    }, 3000);
}

// Emergency fallback - force hide after 5 seconds
function emergencyFallback() {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        const mainContent = document.querySelector('main');
        
        if (preloader && preloader.style.display !== 'none') {
            console.log('Emergency fallback: Force hiding preloader...');
            
            // Force show main content
            if (mainContent) {
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }
            
            preloader.style.display = "none";
            initMainAnimations();
        }
    }, 5000);
}

// Manual skip loading function
function skipLoading() {
    console.log('Manually skipping loading...');
    const preloader = document.getElementById('preloader');
    const mainContent = document.querySelector('main');
    
    if (preloader) {
        // Force show main content
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }
        
        preloader.style.display = "none";
        initMainAnimations();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    // Ultra-simple loading system
    console.log('Starting ultra-simple loading...');
    
    // Force transition after 3 seconds - no fancy animations
    setTimeout(() => {
        console.log('Force transitioning to main content...');
        
        const preloader = document.getElementById('preloader');
        const mainContent = document.querySelector('main');
        
        // Hide preloader immediately
        if (preloader) {
            preloader.style.display = 'none';
            console.log('Preloader hidden');
        }
        
        // Show main content immediately
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
            console.log('Main content shown');
        }
        
        // Initialize main animations
        console.log('Initializing main animations...');
        initMainAnimations();
        
    }, 3000);
    
    initNavigation();
    initParallaxEffects();
    initCursorEffects();
    
    // Update ScrollTrigger when Locomotive Scroll updates
    if (scroll) {
        scroll.on('scroll', ScrollTrigger.update);
        
        // Refresh ScrollTrigger after Locomotive Scroll is ready
        scroll.on('ready', () => {
            ScrollTrigger.refresh();
        });
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    scroll.update();
    ScrollTrigger.refresh();
});

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Initialize non-critical animations during idle time
        initParallaxEffects();
    });
} else {
    setTimeout(() => {
        initParallaxEffects();
    }, 100);
}
