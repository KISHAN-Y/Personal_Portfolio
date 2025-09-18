document.addEventListener('DOMContentLoaded', function () {

    // --- 1. FAQ Accordion functionality ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                // Deactivate the currently open item
                currentlyActive.classList.remove('active');
                currentlyActive.querySelector('.faq-content').style.maxHeight = null;
                currentlyActive.querySelector('.faq-content').style.opacity = "0";
            }

            // Toggle the clicked item
            item.classList.toggle('active');
            const content = item.querySelector('.faq-content');
            if(item.classList.contains('active')){
                // Set max-height to its scroll height to animate opening
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.opacity = "1";
            } else {
                // Unset max-height to animate closing
                content.style.maxHeight = null;
                content.style.opacity = "0";
            }
        });
    });

    // --- 2. Client Logo Ticker functionality ---
    const ticker = document.querySelector('.ticker');
    if(ticker) {
        // You should replace these with your actual logo image paths
        const logos = [
            '../images/Logo=adobe.svg',
            '../images/Logo=framer.svg',
            '../images/Logo=google.svg',
            '../images/Logo=shopify.svg',
            '../images/Logo=spotify.svg',
            '../images/Logo=notion.svg',
            '../images/Logo=canva.svg',
        ];

        let tickerContent = logos.map(logo => `<img class="logo-item" src="${logo}" alt="Company Logo" loading="lazy">`).join('');
        // Duplicate the content for a seamless, infinite loop
        ticker.innerHTML = tickerContent + tickerContent;
    }

    // --- 3. Contact Form Button functionality ---
    const tagGroups = document.querySelectorAll('.tag-group');
    tagGroups.forEach(group => {
        const buttons = group.querySelectorAll('.tag-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const isMultiSelect = group.dataset.group === 'interest';

                if (isMultiSelect) {
                    // For "interest" group, allow multiple selections
                    button.classList.toggle('active');
                } else {
                    // For "budget" group, only allow one selection
                    buttons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                }
            });
        });
    });

    // --- 4. Active Navigation Link Highlighting ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPageUrl = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkUrl = link.getAttribute('href').split('/').pop();
        if (linkUrl === currentPageUrl) {
            link.classList.add('active');
        }
    });

    // --- 5. Page Transition Animation using GSAP ---
    const panels = document.querySelectorAll('.transition-panel');

    // Defines the animation when leaving a page
    const enterAnimation = (href) => {
        gsap.to(panels, {
            yPercent: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power3.inOut',
            onComplete: () => {
                // Navigate to the new page after the animation completes
                window.location.href = href;
            }
        });
    };

    // Defines the animation when entering a new page
    const exitAnimation = () => {
         gsap.timeline()
            .set(panels, { yPercent: 0 }) // Start with panels covering the screen
            .to(panels, {
                yPercent: -100, // Animate panels up and out of view
                duration: 0.6,
                stagger: 0.05,
                ease: 'power3.inOut',
            })
            .to('body', { // Fade in the new page content smoothly
                opacity: 1,
                visibility: 'visible',
                duration: 0.5,
                ease: 'power1.inOut'
            }, '-=0.6'); // Overlap animations for a smoother effect
    };

    // Attach click event listeners to all internal links
    const transitionLinks = document.querySelectorAll('a');
    transitionLinks.forEach(link => {
        const href = link.getAttribute('href');

        // Check if the link is a valid internal link for transitions
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && link.target !== '_blank') {
            link.addEventListener('click', function(e) {
                // Prevent the default browser navigation
                e.preventDefault();
                // Start the page-leaving animation
                enterAnimation(href);
            });
        }
    });

    // Set the initial state of panels off-screen (at the bottom)
    gsap.set(panels, { yPercent: 100 });
    // Run the page-entering animation on every page load
    exitAnimation();
});

const heroLines = document.querySelectorAll(".hero-title .line");

if (heroLines.length) {
    setTimeout(() => {
        const letterDelay = 0.08;  // delay between letters
        const lineDelay = 0.4;     // delay between lines

        heroLines.forEach((line, lineIndex) => {
            const letters = [...line.textContent].map((letter, letterIndex) => {
                const totalDelay = lineIndex * (line.textContent.length * letterDelay + lineDelay) + letterIndex * letterDelay;
                return `<span style="animation-delay:${totalDelay}s">${letter}</span>`;
            });

            line.innerHTML = letters.join("");
        });
    }, 1000); // Start animation after 4s
}


