document.addEventListener('DOMContentLoaded', () => {
    fetch('../elements/footer.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('footer').innerHTML = data;
    })
    .finally(() => {
        const toggleContrastButton = document.getElementById('contrast-toggle');
        if (toggleContrastButton) {
            toggleContrastButton.addEventListener('change', () => {
                document.querySelector('main').classList.toggle('high-contrast');
            });
        }
        
        const invert = document.getElementById('invert-toggle');
        if (invert) {
            invert.addEventListener('change', () => {
                document.querySelector('main').classList.toggle('invert');
            });
        }
        
        const footer = document.querySelector('footer');
        
        const float = document.querySelector('.float-container');
        setTimeout(() => {
            float.classList.remove('hidden');
        }, 10000);
        
    });

})
