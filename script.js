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
    let titleText = document.createElement('div')
    let authorText = document.createElement('div')
    let pagesText = document.createElement('div')
    let genreText = document.createElement('div')
    let bookNum = document.createElement('div');
    let bookDiv = document.createElement('div');
    let titleDiv = document.createElement('div');
    let authorDiv = document.createElement('div');
    let pagesDiv = document.createElement('div');
    let genreDiv = document.createElement('div');
    let statusDiv = document.createElement('div');
    let readBtn = document.createElement('button');
    let removeBtn = document.createElement('button');

    for (let item of library) {

        bookDiv.classList.add('book');

        bookNum.classList.add('bookNumber');
        bookNum.textContent = '#' + item.id;
        bookDiv.appendChild(bookNum);

        titleText.classList.add('titleText');
        titleText.textContent = 'Book title: ';
        bookDiv.appendChild(titleText);

        titleDiv.classList.add('bookTitle');
        titleDiv.textContent = item.title;
        bookDiv.appendChild(titleDiv);

        authorText.classList.add('authorText');
        authorText.textContent = 'Book author: ';
        bookDiv.appendChild(authorText);

        authorDiv.classList.add('bookAuthor');
        authorDiv.textContent = item.author;
        bookDiv.appendChild(authorDiv);

        pagesText.classList.add('pagesText');
        pagesText.textContent = 'Number of pages: ';
        bookDiv.appendChild(pagesText);

        pagesDiv.classList.add('bookPages');
        pagesDiv.textContent = item.pages;
        bookDiv.appendChild(pagesDiv);

        genreText.classList.add('genreText');
        genreText.textContent = 'Book genre: ';
        bookDiv.appendChild(genreText);

        genreDiv.classList.add('bookGenre');
        genreDiv.textContent = item.genre;
        bookDiv.appendChild(genreDiv);

        statusDiv.classList.add('readingStatus');
        statusDiv.textContent = 'Reading progress:'
        bookDiv.appendChild(statusDiv);

        readBtn.classList.add('btnRead');
        readBtn.textContent = 'Completed'; //need fix
        bookDiv.appendChild(readBtn);

        removeBtn.classList.add('btnRemove');
        removeBtn.textContent = 'Remove book';
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

    if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('hidden')
        e.target.textContent = 'Hide Sidebar';
    } else {
        sidebar.classList.add('hidden');
        e.target.textContent = 'Add New Book';
    }

})