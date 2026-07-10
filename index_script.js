/* menu button script */

const menuButton = document.getElementById('menuButton');
const menu = document.getElementById('menu');




menuButton.addEventListener('click', () => {
    try {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            menu.style.animation = 'slideIn 0.5s ease forwards';
        } else{
            menu.style.animation = 'slideOut 0.5s ease forwards';
        }
    } catch (error) {
        console.error('Error toggling menu:', error);
    }  
});

menu.addEventListener('animationend', (e) =>{
    try{
        if(e.animationName === 'slideOut'){
            menu.classList.add('hidden');
        }

    } catch (error){
        console.error('Error toggling menue:', error);
    }
});