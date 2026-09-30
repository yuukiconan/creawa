import CreawaUI from "./framework.js";

const Creawa = new CreawaUI("1.1", "Creawa");

// const container = document.querySelector('.horizontal-gallery-wrapper');
// const track = document.querySelector('.horizontal-track')
// const sections = gsap.utils.toArray('.ui-gallery-view');
// const distance = () => track.scrollWidth - window.innerWidth + 160;

// var scrollTween = gsap.to(track, {
//     x: () => -distance(),
//     ease: "none",
//     scrollTrigger: {
//         trigger: container,
//         pin: true,
//         start: "top top",
//         scrub: 1,
//         invalidateOnRefresh: true,
//         snap: {
//             snapTo: 1 / (sections.length - 1),
//             duration: 0.6,
//             ease: "power1.inOut"
//         },
//         end: () => "+=" + distance()
//     }
// });

/* Fetch members JSON to HTML */
async function fetchMembers(targetId) {
    try {
        const response = await fetch('/scripts/json/members.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        
        // Basic member information handler
        const memberName = document.querySelector('.ui-person-panel .member-name');
        const memberRole = document.querySelector('.ui-person-panel .member-role');
        const memberAvatar = document.querySelector('.ui-person-panel .member-avatar');
        
        const matchUser = data.find(user => user.id === targetId);

        memberName.textContent = matchUser.name;
        memberRole.textContent = matchUser.role;
        memberAvatar.src = matchUser.avatar_url;
        
        // Quote handler
        const memberQuoteContainer = document.querySelector('.ui-person-panel__quote');
        const memberQuote = document.querySelector('.ui-person-panel__quotetext');
        const memberCitation = document.querySelector('.ui-person-panel__citation');
        
        if (!matchUser.quotes && !matchUser.citation) {
            memberQuoteContainer.classList.add('hidden');
            memberQuote.textContent = '';
            memberCitation.textContent = '';
        } else {
            memberQuoteContainer.classList.remove('hidden');
            memberQuote.textContent = matchUser.quotes;
            memberCitation.textContent = matchUser.citation;
        }

    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const lenis = window.lenis;
    const peopleCards = document.querySelectorAll('.ui-person-card');
    const personPanel =  document.querySelector('.ui-person-panel');
    const personPanelContent = personPanel.querySelector('.ui-person-panel__content');
    const closePanelBtn =  document.querySelector('.ui-person-panel .close-btn');
    const gsap = window.gsap;
    let panelAnimation;

    function openPanel() {
        panelAnimation?.kill();
        lenis.stop();
        document.documentElement.classList.add('noscroll');
        personPanel.classList.remove('hidden');

        const panelImage = personPanel.querySelector('.ui-person-panel__avatar img');
        const panelRevealTargets = [
            personPanel.querySelector('.ui-person-panel__content-header'),
            personPanel.querySelector('.ui-person-panel__biography')
        ];
        gsap.set([personPanel, ...panelRevealTargets, panelImage], {clearProps: 'all'});
        panelAnimation = gsap.timeline({
            onComplete: () => gsap.set([personPanel, ...panelRevealTargets, panelImage], {clearProps: 'opacity,transform,visibility'})
        });
        panelAnimation.fromTo(personPanel,
            {autoAlpha: 0, y: 28},
            {autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out'}
        );
        panelAnimation.fromTo(panelRevealTargets,
            {autoAlpha: 0, y: 32},
            {autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out'},
            '-=0.35'
        );
        panelAnimation.fromTo(panelImage,
            {scale: 1.12},
            {scale: 1, duration: 1.2, ease: 'power2.out'},
            '<'
        );
    }

    function closePanel() {
        panelAnimation?.kill();
        panelAnimation = gsap.timeline({
            onComplete: () => {
                personPanel.classList.add('hidden');
                gsap.set([personPanel, personPanelContent, personPanel.querySelector('.ui-person-panel__avatar img')], {clearProps: 'all'});
                personPanelContent.scrollTop = 0;
                lenis.start();
                document.documentElement.classList.remove('noscroll');
            }
        });
        panelAnimation.to(personPanel, {
            autoAlpha: 0,
            y: -12,
            duration: 0.38,
            ease: 'power2.in'
        });
    }

    peopleCards.forEach(people => {
        people.addEventListener('click', (e) => {
            openPanel();
            fetchMembers(e.currentTarget.dataset.person);
        })
    })
    
    closePanelBtn.addEventListener('click', () => {
        closePanel();
    })
})
