// GSAP Scroll Trigger for section animations
gsap.registerPlugin(ScrollTrigger);

// Text split and animation utility
const splitTextAndAnimate = (element) => {
    if (!element) return;

    // Split text into words
    const text = element.textContent;
    element.textContent = '';

    const words = text.split(' ').map(word => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        return span;
    });

    words.forEach(word => element.appendChild(word));

    // Animate each word
    gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
        }
    });
};

// Hero section animations
const initHeroAnimations = () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    const heroLogo = document.querySelector('.hero-logo-background');

    // Initial states
    gsap.set([heroSubtitle, heroCta], { opacity: 0, y: 20 });
    gsap.set(heroLogo, { opacity: 0, scale: 0.8 });

    // Hero animations timeline with initial delay
    const heroTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.8 // Add initial delay before hero animations start
    });

    heroTimeline
        .add(splitTextAndAnimate(heroTitle))
        .to(heroLogo, { opacity: 0.05, scale: 1, duration: 1.5 }, "+=0.3") // Added delay
        .to(heroSubtitle, { opacity: 1, y: 0, duration: 1 }, "+=0.2") // Added delay
        .to(heroCta, { opacity: 1, y: 0, duration: 0.8 }, "+=0.3"); // Added delay
};

// Section animations
const initSectionAnimations = () => {
    // Animate section headers with delay
    document.querySelectorAll('.section-title, .section-subtitle, .faq-title').forEach((title, index) => {
        gsap.delayedCall(0.2 * index, () => {
            splitTextAndAnimate(title);
        });
    });

    // Animate cards with increased stagger and delay
    const cardGroups = [
        { elements: '.case-card', stagger: 0.3, delay: 0.4 },
        { elements: '.metric-card', stagger: 0.25, delay: 0.3 },
        { elements: '.faq-item', stagger: 0.2, delay: 0.2 }
    ];

    cardGroups.forEach(group => {
        const elements = document.querySelectorAll(group.elements);
        gsap.set(elements, { opacity: 0, y: 30 });

        gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 1.2, // Increased duration
            stagger: group.stagger,
            delay: group.delay, // Added delay
            ease: "power3.out",
            scrollTrigger: {
                trigger: elements[0],
                start: "top 85%",
                once: true, // Only animate once
                toggleActions: "play none none reverse"
            }
        });
    });
};

// Initialize all animations
// FAQ Animation and Functionality
const initFAQs = () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const content = item.querySelector('.faq-content');

        // Set initial state for animation
        gsap.set(content, {
            height: 0,
            opacity: 0,
            y: -10
        });

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close any open FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    gsap.to(otherItem.querySelector('.faq-content'), {
                        height: 0,
                        opacity: 0,
                        y: -10,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            });

            // Toggle current item
            item.classList.toggle('active');

            if (!isActive) {
                // Opening animation
                gsap.to(content, {
                    height: 'auto',
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            } else {
                // Closing animation
                gsap.to(content, {
                    height: 0,
                    opacity: 0,
                    y: -10,
                    duration: 0.4,
                    ease: 'power2.in'
                });
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize FAQ functionality
    initFAQs();

    // Page transition panels
    const panels = document.querySelectorAll('.transition-panel');

    // Enter animation
    const enterAnimation = (href) => {
        gsap.to(panels, {
            yPercent: 0,
            duration: 0.8, // Increased duration
            stagger: 0.08, // Increased stagger
            ease: 'power3.inOut',
            delay: 0.2, // Added delay before transition starts
            onComplete: () => window.location.href = href
        });
    };

    // Exit animation
    const exitAnimation = () => {
        gsap.timeline()
            .set(panels, { yPercent: 0 })
            .to(panels, {
                yPercent: -100,
                duration: 0.6,
                stagger: 0.05,
                ease: 'power3.inOut',
            })
            .to('body', {
                opacity: 1,
                visibility: 'visible',
                duration: 0.5,
                ease: 'power1.inOut'
            }, '-=0.6');
    };

    // Setup page transitions
    const transitionLinks = document.querySelectorAll('a');
    transitionLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && link.target !== '_blank') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                enterAnimation(href);
            });
        }
    });

    // Set initial panel state and run exit animation
    gsap.set(panels, { yPercent: 100 });
    exitAnimation();

    // Initialize all other animations
    initHeroAnimations();
    initSectionAnimations();
});
