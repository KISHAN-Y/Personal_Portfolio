document.addEventListener('DOMContentLoaded', function () {
    // Ensure GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP or ScrollTrigger is not loaded.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const panels = gsap.utils.toArray(".scroll-stack-panel");

    // Only run the animation if there are panels to animate
    if (panels.length > 0) {
        
        // This creates the main stacking effect.
        // It pins the entire container and animates each panel out sequentially.
        ScrollTrigger.create({
            trigger: ".scroll-stack-panels-container",
            pin: true,
            start: "top top",
            // The scroll distance is determined by how many panels there are.
            // This creates enough space for the whole animation to play out.
            end: () => "+=" + (panels.length - 1) * window.innerHeight * 0.7,
        });

        // Animate each panel to scale down as the next one comes into view.
        panels.forEach((panel, i) => {
            // We don't need to animate the very last panel.
            if (i < panels.length - 1) {
                gsap.to(panel, {
                    scale: 0.90, // Slightly scale down the panel
                    opacity: 0.9,  // Keep it mostly visible for readability
                    yPercent: -5,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: panels[i + 1], // The animation is triggered by the NEXT panel
                        start: "top bottom",
                        end: "top top",
                        scrub: 1, // Smoothly scrub the animation
                    }
                });
            }
        });
    }
});

