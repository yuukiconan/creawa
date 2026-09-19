const icon = document.createElement('link');
icon.rel = 'website icon';
icon.href = '/assets/images/sagitta_thunder_logo.webp';
document.head.appendChild(icon);

const iconCdn = document.createElement('link');
iconCdn.rel = 'stylesheet';
iconCdn.href = 'https://cdn.jsdelivr.net/npm/remixicon@4.9.0/fonts/remixicon.css';
document.head.appendChild(iconCdn);

window.__pageRevealEvent = null;
window.addEventListener('pagereveal', (e) => {
    window.__pageRevealEvent = e;
}, { once: true });

history.scrollRestoration = 'manual';

document.addEventListener('DOMContentLoaded', () => {
    const lenis = new Lenis({
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        duration: 1.2,
        smooth: true,
        autoRaf: false,
        mouseMultiplier: 2,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    })
    
    window.lenis = lenis;
    
    gsap.registerPlugin(ScrollTrigger);
    
    lenis.on("scroll", () => {
        ScrollTrigger.update();
    });
    
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    function initPageReveal() {
        let triggered = false;

        const runOnce = async (viewTransition) => {
            if (triggered) return;
            triggered = true;

            if (viewTransition) {
                try {
                    await viewTransition.finished;
                } catch(err) {
                    console.error(err);
                }
            }

            triggerHeroLoading();
        }

        if ('onpagereveal' in window) {
            if (window.__pageRevealEvent) {
                // Already fired before this script ran — use the captured event
                runOnce(window.__pageRevealEvent.viewTransition);
            } else {
                // Hasn't fired yet — wait for it properly, no race
                window.addEventListener('pagereveal', (e) => {
                    runOnce(e.viewTransition);
                }, { once: true });
            }
        } else {
            runOnce(null);
        }
    }

    const hamburgerMenu = document.querySelector('.hamburger-menu');

    if (hamburgerMenu) {
        if (!hamburgerMenu.classList.contains('hidden')) {
            lenis.stop();
        } else {
            lenis.start();
        }
    }
    
    const peopleCards = document.querySelectorAll('.ui-person-card');
    if (!peopleCards) return;

    const root = document.documentElement;
    
    const circle = document.createElement('div');
    const circleText = document.createElement('span');
    circle.className = 'circle-cursor';
    circleText.className = 'circle-text';
    peopleCards.forEach(el => {
        el.setAttribute('data-circle-text', 'View profile');
        el.setAttribute('tabIndex', '0');
    });
    
    const texts = document.querySelectorAll('[data-circle-text]');
    texts.forEach(el => {
        el.addEventListener('pointerenter', (e) => {
            if (e.pointerType !== 'mouse') {
                circleText.classList.remove('visible');
                circle.classList.remove('visible');
                return;
            }
            circleText.textContent = el.dataset.circleText;
            circle.classList.add('visible');
            circleText.classList.add('visible');
        });
        el.addEventListener('pointerleave', () => {
            circleText.classList.remove('visible');
            circle.classList.remove('visible');
        })
    })

    circle.appendChild(circleText);
    root.appendChild(circle);
    
    let mouseX = 0;
    let mouseY = 0;
    let raf = null;

    function updateCirclePosition() {
        circle.style.setProperty('--cursor-x', `${mouseX}px`);
        circle.style.setProperty('--cursor-y', `${mouseY}px`);

        raf = null;
    }
    
    window.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') {
            circleText.classList.remove('visible');
            circle.classList.remove('visible');
            return;
        }
        
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!raf) {
            raf = requestAnimationFrame(updateCirclePosition);
        }

    })
    

    root.addEventListener('pointerleave', () => {
        circle.classList.remove('visible');
    })

    // Dialog handler
    function openDialog(className) {
        document.querySelector(`.${className}`)?.showModal();
    }

    document.addEventListener('click', (e) => {
        const dialogOpen = e.target.closest('[data-dialog-open]');
        if (dialogOpen) {
            openDialog(dialogOpen.dataset.dialogOpen);
            root.classList.add('noscroll');
            lenis.stop();
        }

        const closeBtn = e.target.closest('[data-dialog-close]');
        const dialog = closeBtn?.closest('dialog');
        if (closeBtn) {
            requestAnimationFrame(() => {
                dialog.style.animation = `fadeOut 350ms cubic-bezier(0.5, 0, 0.75, 0)`;
                dialog.addEventListener('animationend', () => {
                    closeBtn.closest('dialog')?.close();
                    dialog.style.animation = '';
                    root.classList.remove('noscroll');
                    lenis.start();
                }, {once: true});
            })
        }
    });
})