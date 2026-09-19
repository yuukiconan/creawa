/// <reference lib="dom" />

export default class LyraUI {
    constructor(version, author) {
        this.version = version;
        this.author = author;
    }
    
    animateOnScroll(selector, options = {}) {
        const {
            target = null,
            animationClass = 'visible',
            stagger = 0,
            threshold = 0.4,
            rootMargin = '0px',
            once = true
        } = options;
        
        const elements = target ? document.querySelectorAll(`${selector} ${target}`) : document.querySelectorAll(selector);
        const observer = new IntersectionObserver((entries, obs) => { 
            const visibleEntries = entries.filter(e => e.isIntersecting);

            visibleEntries.forEach((entry, i) => {
                const el = entry.target;
                
                if (stagger) {
                    el.style.transitionDelay = `${i * stagger}s`;
                }
                
                el.classList.add(animationClass);
                
                if (once) {
                    obs.unobserve(el);
                }
            });
        }, {threshold, rootMargin});

        elements.forEach(el => observer.observe(el));
    }
}