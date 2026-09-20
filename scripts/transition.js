function animateContent() {
    const content = document.querySelector('[data-page-content]');
    if (!content) return;
    
    const targets = content.querySelectorAll('[data-animate]');
    if (!targets.length) return;
    
    return gsap.from(targets, {
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform'
    })
}

const curtain = document.querySelector('.ui-curtain');
const curtainLabel = document.querySelector('.ui-curtain__label');
if (!curtain) { throw new Error("Page curtain not found") }

let split;
const ready = document.fonts.ready.then(()=> {
    split = SplitText.create(curtainLabel, {
        type: "chars"
    });
});

function openCurtain() {
    const tl = gsap.timeline({delay: 0.9});
    
    tl.to(split.chars, {
        yPercent: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.03,
        ease: "power3.inOut"
    })

    tl.to(curtain, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut'
    }, 0.15)

    return tl;
}

function closeCurtain() {
    const tl = gsap.timeline();

    tl.set(split.chars, {
        yPercent: -100,
        opacity: 0
    })

    tl.to(split.chars, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.inOut"
    })
    
    tl.to(curtain, {
        yPercent: 0,
        duration: 1.25,
        ease: 'power3.inOut'
    }, 0.1)

    return tl;
}

let leaving = false;

async function enter() {
    leaving = false;
    await ready;
    gsap.killTweensOf([curtain, split.chars]);

    gsap.set(curtain, { yPercent: 0 });
    gsap.set(split.chars, { yPercent: 0, opacity: 1 });

    openCurtain();
    animateContent(0.6); 
}

async function leave(href) {
    if (leaving) return;
    leaving = true;
    await ready;
    await closeCurtain();
    location.href = href;
}

document.addEventListener('click', e => {
    const link = e.target.closest('a[href]');
    if (!link) return;

    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (link.target === '_blank' || link.hasAttribute('download')) return;
    if (link.origin !== location.origin) return;

    const url = new URL(link.href);
    if (url.pathname === location.pathname && url.search === location.search) return; 

    e.preventDefault();
    leave(url.href);
});

enter();

window.addEventListener('pageshow', e => { if (e.persisted) enter(); });