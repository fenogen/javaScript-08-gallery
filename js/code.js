
import galleryItems from "./gallery-items.js";

console.table(galleryItems);


const listRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const buttonRef = document.querySelector('button[data-action="close-lightbox"]');
const modalImg = document.querySelector('.lightbox__image');

// -------------------------------> Создали разметку
galleryItems.forEach((img) => {
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

// -------------------------------> Открытие окна
const fnOpen = (event) => {
    console.log('hello');
    modalRef.classList.add('is-open');
    // console.dir(event.target);
    const alt = event.target.alt;
    const src = event.target.dataset.source;
    modalImg.setAttribute('alt', alt)
    modalImg.setAttribute('src', src)
};
listRef.addEventListener('click', fnOpen);

// -------------------------------> Закрытие окна

const fnClose = (event) => {
    console.log('Bye-Bye');
    modalRef.classList.remove('is-open');
    modalImg.setAttribute('alt', '');
    modalImg.setAttribute('src', '');
};
buttonRef.addEventListener('click', fnClose);







