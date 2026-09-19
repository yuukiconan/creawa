const tl = gsap.timeline({
    defaults: { duration: 0.7, ease: "power2.out" }
});
const headlines = gsap.utils.toArray('.ui-hero__line');
const galleries = gsap.utils.toArray('.ui-gallery__panel');

document.fonts.ready.then(() => {
    setTimeout(() => {
        headlines.forEach(hl => {
            const splitHeroHeading = new SplitText(hl, {type: "words"});
            tl.from(splitHeroHeading.words, {
                duration: 0.3,
                x: -40,
                opacity: 0,
                stagger: 0.1,
                ease: "power1.inOut"
            });
        })
        galleries.forEach((gl) => {
            tl.from(gl, {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                duration: 0.5
            });
        })
        const fSplit = new SplitText(".ui-hero__sub", {type: "lines"});
        gsap.from(fSplit.lines, {
            duration: 0.8,
            opacity: 0,
            y: 40,
            stagger: 0.05,
            scrollTrigger: {
                trigger: '.ui-hero__grid',
                start: 'top 80%',
                end: 'top 34%',
            }
        });
    }, 1800)
});

gsap.utils.toArray('.ui-highlight-card').forEach(card => {
    const img = card.querySelector('.card-image img');
    
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
