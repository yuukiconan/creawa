document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create('custom', '0.785, 0, 0.15, 1');
    CustomEase.create('good', '0.025, 0, 0, 1');

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
            x: -50,
            opacity: 0,
            ease: "good",
            duration: 1,
            stagger: 0.2
        }, 1.3)
        .from('.ui-hero-section__bottom div', {
            y:50,
            opacity: 0,
            stagger: 0.25,
            ease: "custom"
        }, 2)
    })

    const heading = new SplitText(".ui-hero-section__heading", { type: "chars" });

    const headingTween = gsap.to(heading.chars, {
        x: -50, opacity: 0, stagger: 0.1
    })

    ScrollTrigger.create({
        trigger: ".ui-hero-section__heading",
        start: "top 200px",
        end: "bottom 50px",
        ease: "good",
        animation: headingTween,
        scrub: true
    });

    const divTween = gsap.to(gsap.utils.toArray('.ui-hero-section__bottom div'), {
        x: -50, opacity: 0, stagger: 0.1
    })

    ScrollTrigger.create({
        trigger: ".ui-hero-section__bottom",
        start: "top 500px",
        end: "bottom 50px",
        ease: "good",
        animation: divTween,
        scrub: true
    });

    gsap.utils.toArray('.ui-pillar-images__item').forEach(card => {
        const img = card.querySelector('img');
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                scrub: true,
                pin: false
            }
        })

        tl.fromTo(img, {
            yPercent: -20,
            ease: 'none'
        }, {
            yPercent: 20,
            ease: 'none'
        });
    })

    gsap.utils.toArray('.ui-hero-section__bottom div').forEach(img => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: img,
                scrub: true,
                pin: false
            }
        })

        tl.fromTo(img, {
            yPercent: -20,
            ease: 'none'
        }, {
            yPercent: 20,
            ease: 'none'
        });
    })

    gsap.utils.toArray('.ui-hero-section__image-overlay img').forEach(img => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: img,
                scrub: true,
                pin: false
            }
        })

        tl.fromTo(img, {
            yPercent: -20,
            ease: 'none'
        }, {
            yPercent: 20,
            ease: 'none'
        });
    })
    

});