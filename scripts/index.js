document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create('custom', '0.785, 0, 0.15, 1');

    const tl = gsap.timeline({ defaults: { delay: 2.5, duration: 1 } });
    
    document.fonts.ready.then(() => {
        const splitHeading = SplitText.create('.ui-hero-section__heading', {type: "chars"});
        tl.from('.ui-hero-section__top div', {
            y: -50,
            opacity: 0,
            stagger: 0.42,
            ease: "custom"
        }, 0.3)
        .from(splitHeading.chars, {
            x: -30,
            opacity: 0,
            ease: "power2.out",
            duration: 1,
            stagger: 0.1
        }, 1.3)
        .from('.ui-hero-section__bottom div', {
            y:50,
            opacity: 0,
            stagger: 0.25,
            ease: "custom"
        }, 2)
    })
});