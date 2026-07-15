

const menuButton = document.getElementById('menuButton');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', () => {
    try {
        if (menu.classList.contains('hidden')) {
            menuButton.setAttribute('aria-expanded', 'true');
            menu.classList.remove('hidden');
            menu.style.animation = 'slideIn 0.5s ease forwards';
        } else {
            menuButton.setAttribute('aria-expanded', 'false');
            menu.style.animation = 'slideOut 0.5s ease forwards';
        }
    } catch (error) {
        console.error('Error toggling menu:', error);
    }
});

menu.addEventListener('animationend', (e) => {
    try {
        if (e.animationName === 'slideOut') {
            menu.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error toggling menu:', error);
    }
});
