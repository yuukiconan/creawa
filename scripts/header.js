document.addEventListener('DOMContentLoaded', () => {
    fetch('../elements/header.html')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        document.querySelector('header').innerHTML = data;

        const header = document.querySelector('header');

        let lastScrollY = window.scrollY;
        const threshold = 20;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;
            
            if (Math.abs(delta) < threshold) return;
            
            header.classList.toggle('hide', delta > 0);
            
            lastScrollY = currentScrollY;
        }); 


        const hamburger = document.querySelector('.hamburger');
        const hamburgerLabel = hamburger.querySelector('.hamburger-text');
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const staggerElements = hamburgerMenu.querySelectorAll('.stagger-element');
        const root = document.documentElement;
        const lenis = window.lenis;
        
        function menuFadeIn() {
            hamburgerMenu.style.animation = `inUpDynamic 1.2s cubic-bezier(0.8, 0, 0.2, 1)`;
        }
        
        function openMenu() {
            hamburgerMenu.classList.remove('hidden');
            hamburger.disabled = true;
            hamburger.classList.add('active');

            requestAnimationFrame(() => {
                menuFadeIn();

                setTimeout(() => {
                    staggerElements.forEach((btn, index) => {
                        setTimeout(() => {
                            btn.classList.add('visible');
                        }, index * 70)
                        
                        btn.addEventListener('transitionend', () => {
                            hamburger.disabled = false;
                        }, {once: true})
                    })
                }, 500);
            });
        }

        function menuFadeOut() {
            hamburgerMenu.style.animation = 'outUpDynamic 1.2s cubic-bezier(1, 0, 0.2, 1)';

            hamburgerMenu.addEventListener('animationend', () => {
                if (hamburgerMenu.style.animation.includes('outUpDynamic')) {
                    hamburgerMenu.style.animation = '';
                    hamburgerMenu.classList.add('hidden');
                    hamburger.classList.remove('active');
                    hamburger.disabled = false;
                }
            });
        }

        function closeMenu() {
            hamburger.disabled = true;
            requestAnimationFrame(() => {
                const array = Array.from(staggerElements).reverse();

                array.forEach((btn, index) => {
                    setTimeout(() => {
                        btn.classList.remove('visible');
                    }, index * 50)
                });

                setTimeout(() => {
                    menuFadeOut();
                }, 300)
            });
        }

        function toggleMenuVisibility() {
            if (hamburgerMenu.classList.contains('hidden')) {
                root.classList.add('noscroll');
                hamburgerLabel.textContent = "Close";
                hamburgerLabel.ariaLabel = "Close";
                lenis.stop();
                openMenu();
            } else {
                lenis.start();
                root.classList.remove('noscroll');
                hamburgerLabel.textContent = "Menu";
                hamburgerLabel.ariaLabel = "Menu";
                closeMenu();
            }
        }

        hamburger.addEventListener('click', toggleMenuVisibility);

        
        const themeToggle = document.querySelector('.theme-toggle');
        const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
        const theme = localStorage.getItem('theme') === 'true';
        
        function updateTheme(isLight) {
            root.classList.toggle('light-mode', isLight);

            if (themeToggle) {
                themeToggle.textContent = isLight ? "Theme: Light" : "Theme: Dark";
            }

            const icon = themeToggleDesktop?.querySelector('i');
            if (icon) {
                icon.className = isLight ? 'ri-sun-line' : 'ri-moon-line';
            }
        }
        
        // Dark & Light mode handler
        function changeTheme(selector) {
            if (!selector) return;

            selector.addEventListener('click', () => {
                const isLight = !root.classList.contains('light-mode');
                
                localStorage.setItem('theme', isLight);
                updateTheme(isLight)
            });
        }

        updateTheme(theme);

        changeTheme(themeToggle);
        changeTheme(themeToggleDesktop);

    })
    .catch(err => {
        console.error(err);
    });
})