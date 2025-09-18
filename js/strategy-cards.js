document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.strategy-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
    });

    function handleMouseMove(e) {
        const card = this;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = -(x - centerX) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    }

    function handleMouseLeave(e) {
        const card = this;
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
    }
});
