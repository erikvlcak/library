'use strict';

let btnHideSide = document.querySelector('.btnSideBar');
let addBook = document.querySelector('.btnAddBook');
let library = [];

let newTitle = document.querySelector('#newTitle');
let newAuthor = document.querySelector('#newAuthor');
let newPages = document.querySelector('#newPages');
let newGenre = document.querySelector('#newGenre');

function BookTemplate(id, title, author, pages, genre) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
}

function createLibrary() {

    let bookDiv = document.createElement('div');
    let titleDiv = document.createElement('div');
    let authorDiv = document.createElement('div');
    let pagesDiv = document.createElement('div');
    let genreDiv = document.createElement('div');
    let readBtn = document.createElement('button');
    let removeBtn = document.createElement('button');

    for (let item of library) {
        bookDiv.classList.add('book');
        titleDiv.classList.add('bookTitle');
        titleDiv.textContent = item.title;
        bookDiv.appendChild(titleDiv);
        authorDiv.classList.add('bookAuthor');
        authorDiv.textContent = item.author;
        bookDiv.appendChild(authorDiv);
        pagesDiv.classList.add('bookPages');
        pagesDiv.textContent = item.pages;
        bookDiv.appendChild(pagesDiv);
        genreDiv.classList.add('bookGenre');
        genreDiv.textContent = item.genre;
        bookDiv.appendChild(genreDiv);
        readBtn.classList.add('btnRead');
        readBtn.textContent = 'Read'; //need fix
        bookDiv.appendChild(readBtn);
        removeBtn.classList.add('btnRemove');
        removeBtn.textContent = 'Remove';
        bookDiv.appendChild(removeBtn);
        document.querySelector('#library').appendChild(bookDiv);
    }
}



addBook.addEventListener('click', (e) => {
    e.preventDefault();
    let id = library.length + 1;
    let title = newTitle.value;
    let author = newAuthor.value;
    let pages = newPages.value;
    let genre = newGenre.value;
    let newBook = new BookTemplate(id, title, author, pages, genre);
    library.push(newBook);
    createLibrary();

})







btnHideSide.addEventListener('click', (e) => {

    let sidebar = document.querySelector('.create');
    let article = document.querySelector('article');

    if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('hidden')
        article.style.gridTemplateColumns = '1fr 500px';
        e.target.textContent = 'Hide Sidebar';
    } else {
        sidebar.classList.add('hidden');
        article.style.gridTemplateColumns = '1fr';
        e.target.textContent = 'Add New Book';
    }

})