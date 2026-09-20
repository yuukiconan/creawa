document.addEventListener('DOMContentLoaded', () => {
    gsap.from('.hero-editorial-heading', {
        opacity: 0,
        yPercent: 20,
        ease: "power2.out",
        duration: 0.7
    })
});