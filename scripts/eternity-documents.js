const notes = document.getElementById('entries');
const images = document.getElementById('doc-image');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const cover = document.getElementById('cover');
const back = document.getElementById('back');
const closer = document.getElementById('closer');
const listItems = [];
const lightbox = document.getElementById('lightbox');
const lightboxIMG = document.getElementById('lightbox-img');
let lastTag = null;
let pendingPage = null;
let turningOut = false; 
let flipDir = 1;        
let isOpen = false;
let atBack = false;
let currentPage = 0;

const entries = [
    {
        file:  "Alistair_Journal_Day1.png",
        title: "Recovered 1",
        alt:   "Alistair's journal — first entry",
        date:  "10/24/2XXX",
        tag:   "Alistair's Journal"
    },
    {
        file:  "Alistair_Journal_Day2.png",
        title: "Recovered 2",
        alt:   "Alistair's journal — second entry",
        date:  "10/24/2XXX",
        tag:   "Alistair's Journal"
    },
    {
        file:  "Alistair_Journal_Day3.png",
        title: "Recovered 3",
        alt:   "Alistair's journal — third entry",
        date:  "10/24/2XXX",
        tag:   "Alistair's Journal"
    },
    {
        file:  "Alistair_Journal_Day4.png",
        title: "Recovered 4",
        alt:   "Alistair's journal — fourth entry",
        date:  "10/24/2XXX",
        tag:   "Alistair's Journal"
    },
    {
        file:  "Alistair_Journal_Day5.png",
        title: "Recovered 5",
        alt:   "Alistair's journal — fifth entry",
        date:  "10/24/2XXX",
        tag:   "Alistair's Journal"
    },
    {
        file:  "Alistair_Journal_ClosingNote.png",
        title: "Recovered 6",
        alt:   "Alistair's journal — closing note",
        date:  "10/24/2XXX",
        tag:   "Alistair's Journal"
    },
    {
        file:  "BreakerTheory_Paper1_OriginalTheory_p1.png",
        title: "Breaker Theory 1",
        alt:   "The original Breaker Theory paper - part 1",
        date:  "1/19/2XXX",
        tag:   "Breaker Theory"
    },
    {
        file:  "BreakerTheory_Paper1_OriginalTheory_p2.png",
        title: "Breaker Theory 2",
        alt:   "The original Breaker Theory paper - part 2",
        date:  "1/19/2XXX",
        tag:   "Breaker Theory"
    },
    {
        file:  "BreakerTheory_Paper1_OriginalTheory_p3.png",
        title: "Breaker Theory 3",
        alt:   "The original Breaker Theory paper - part 3",
        date:  "1/19/2XXX",
        tag:   "Breaker Theory"
    },
    {
        file:  "BreakerTheory_Paper2_Confirmation_p1.png",
        title: "Breaker Theory 4",
        alt:   "The Breaker Theory confirmation paper - part 1",
        date:  "1/28/2XXX",
        tag:   "Breaker Theory"
    },
    {
        file:  "BreakerTheory_Paper2_Confirmation_p2.png",
        title: "Breaker Theory 5",
        alt:   "The Breaker Theory confirmation paper - part 2",
        date:  "1/28/2XXX",
        tag:   "Breaker Theory"
    },
    {
        file:  "BreakerTheory_Paper2_Confirmation_p3.png",
        title: "Breaker Theory 6",
        alt:   "The Breaker Theory confirmation paper - part 3",
        date:  "1/28/2XXX",
        tag:   "Breaker Theory"
    },
    {
        file:  "BreakerTheory_Paper2_Confirmation_p4.png",
        title: "Breaker Theory 7",
        alt:   "The Breaker Theory confirmation paper - part 4",
        date:  "1/28/2XXX",
        tag:   "Breaker Theory"
    },
];



cover.addEventListener('click', () =>{
    cover.classList.add('cover-open');
    if (isOpen == false){
        isOpen = true;
        if(notes.classList.contains('hidden')){
            notes.classList.remove('hidden');
            notes.style.animation = 'slideIn 0.5s ease forwards';
        }
        if(closer.classList.contains('hidden')){
            closer.classList.remove('hidden');
            closer.style.animation = 'slideIn 0.5s ease forwards';
        }
    }
    
});

entries.forEach((element, index) => {
    if (element.tag != lastTag){
        const h2 = document.createElement('h2');
        h2.textContent = element.tag;
        notes.appendChild(h2);
        lastTag = element.tag;
    }
    const li = document.createElement('li');
    listItems.push(li);
    li.textContent = element.title;
    notes.appendChild(li);
    li.setAttribute('tabindex', '0');
    li.setAttribute('role', 'button');
    li.addEventListener('click', () =>{
        flipToPage(index);
    });
    li.addEventListener('keydown', (e)=>{
        if(e.key === 'Enter'|| e.key === ' '){
            e.preventDefault();
            flipToPage(index);
        }
    });
});

function showPage(index){
    images.src = '../eternity/' + entries[index].file;
    images.alt = entries[index].alt;
    currentPage = index;
    listItems.forEach(item => item.classList.remove('active'));
    listItems[index].classList.add('active');
}

closer.addEventListener('click', ()=>{
    closeJournal(); 
});

prev.addEventListener('click', () =>{
    if (atBack == true) {
        back.classList.remove('back-closed');
        atBack = false;
    }else{
        if (currentPage > 0) {
            flipToPage(currentPage - 1);
        }
    }
});

next.addEventListener('click', () =>{
    if (atBack == true) {
        closeJournal();
    }else if(currentPage < entries.length - 1){
        flipToPage(currentPage + 1);
    }else{
        back.classList.add('back-closed');
        atBack = true;
    } 
});

images.addEventListener('transitionend', () => {
    if (turningOut) {
        turningOut = false;                          

        showPage(pendingPage);                       
        images.style.transition = 'none';           
        images.style.transform = `rotateY(${90 * flipDir}deg)`;  
        images.offsetWidth;
        requestAnimationFrame(() => {                          
        images.style.transition = '';                
        images.style.transform = 'rotateY(0deg)';   
    });
    }
});

notes.addEventListener('animationend', (el) =>{
    if(el.animationName === 'slideOut'){
            notes.classList.add('hidden');
        }
});

closer.addEventListener('animationend', (ele) =>{
    if(ele.animationName === 'slideOut'){
            closer.classList.add('hidden');
        }
});

images.addEventListener('click', () =>{
    lightboxIMG.src = images.src;
    lightboxIMG.alt = images.alt;
    lightbox.classList.remove('hidden');
});

lightbox.addEventListener('click', () =>{
    lightbox.classList.add('hidden');
});

document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
        lightbox.classList.add('hidden');
        
    }
})  

function closeJournal(){
    cover.classList.remove('cover-open');
    back.classList.remove('back-closed');
    notes.style.animation = 'slideOut 0.5s ease forwards'
    closer.style.animation = 'slideOut 0.5s ease forwards'
    isOpen = false;
    atBack = false;
}

function flipToPage(index){
    if (atBack === true){
        back.classList.remove('back-closed');
        atBack = false;
    }
    pendingPage = index;
    turningOut = true;
    flipDir = index > currentPage ? 1 : -1;                             
    images.style.transform = `rotateY(${-100 * flipDir}deg)`; 
}

showPage(0);