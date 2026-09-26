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

    function openPanel() {
        lenis.stop();
        document.documentElement.classList.add('noscroll');
        personPanel.classList.remove('hidden');
    }
    
    let animation = 'fadeOut';
    
    function closePanel() {
        // reset the previous animation
        personPanel.style.animation = '';

        requestAnimationFrame(() => {
            personPanel.style.animation = `${animation} .5s cubic-bezier(0.4, 0, 0.2, 1)`;
            personPanel.addEventListener('animationend', () => {
                personPanel.style.animation = '';
                personPanelContent.scrollTop = 0;
                personPanel.classList.add('hidden');
                lenis.start();
                document.documentElement.classList.remove('noscroll');
            }, {once: true});
        })
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
