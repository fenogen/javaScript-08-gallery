
import galleryItems from "./gallery-items.js";

const listRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const buttonRef = document.querySelector('button[data-action="close-lightbox"]');
const modalImg = document.querySelector('.lightbox__image');
const overlayRef = document.querySelector('.lightbox__overlay');

let parent;

// -------------------------------> Создали разметку
galleryItems.forEach((img, index) => {
    const string = '<li><a><img></li>';
    listRef.insertAdjacentHTML('afterbegin', string);

    const li = listRef.querySelector('li');
    const link = listRef.querySelector('a');
    const Img = listRef.querySelector('img');


    li.setAttribute('class', 'gallery__item');
    link.setAttribute('class', 'gallery__link');

    Img.setAttribute('class', 'gallery__image');
    Img.setAttribute('src', img['preview']);
    Img.setAttribute('data-source', img['original']);
    Img.setAttribute('alt', img['description']);

    return;
});

listRef.childNodes[0].classList.add('check');  //---> Для закрытия первого и последнего элемента
listRef.childNodes[8].classList.add('check');  //---> Для закрытия первого и последнего элемента

// -------------------------------> Открытие окна
const fnOpen = (event) => {
    console.log('hello');
    modalRef.classList.add('is-open');
    console.dir(event.target);
    const alt = event.target.alt;
    const src = event.target.dataset.source;
    modalImg.setAttribute('alt', alt)
    modalImg.setAttribute('src', src)
    console.log(modalImg);
    
    parent = event.target.parentNode.parentNode; //---> Для прокрутки галереи

    window.addEventListener('keydown', fnKey);  //---> Повесили внутри fnOpen что бы ф-я срабатывала только когда окно-открытое

    return;
}

listRef.addEventListener('click', fnOpen);

// -------------------------------> Закрытие окна (X)

const fnClose = (event) => {
    console.log('Bye-Bye');
    modalRef.classList.remove('is-open');
    modalImg.setAttribute('alt', '');
    modalImg.setAttribute('src', '');

    window.removeEventListener('keydown', fnKey); //---> Сняли слушателя, что бы Esc не работал после закрытия окна
};

// -------------------------------> Закрытие окна клавишами (Esc) + Пролистывание
const fnKey = (event) => {
    if (event.code === 'Escape') {
        fnClose();
        console.log(event.code);
    };
    if (event.code === 'ArrowRight') {
        console.log('Сдвиг вправо');
        const neighborNext = parent.nextElementSibling;
        const childNext = neighborNext.firstElementChild.firstElementChild;
        modalImg.setAttribute('alt', childNext.alt);
        modalImg.setAttribute('src', childNext.dataset.source);
        parent = parent.nextElementSibling;

        // ---------------------> Закрытие при окончании галереи
        if (parent.classList.contains('check')) {
            console.log('Good-bye');
            fnClose();
        }
    };
    if (event.code === 'ArrowLeft') {
        console.log('Сдвиг в лево');
        const neighborPrevious = parent.previousElementSibling;
        const childPrevious = neighborPrevious.firstElementChild.firstElementChild;
        modalImg.setAttribute('alt', childPrevious.alt);
        modalImg.setAttribute('src', childPrevious.dataset.source);
        parent = parent.previousElementSibling;

        // ---------------------> Закрытие при окончании галереи
        if (parent.classList.contains('check')) {
            console.log('Good-bye');
            fnClose();
        }
    };
};


buttonRef.addEventListener('click', fnClose);
overlayRef.addEventListener('click', fnClose);





