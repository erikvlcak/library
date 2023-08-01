'use strict';

let btnHideSide = document.querySelector('.btnSideBar');
let addBook = document.querySelector('.btnAddBook');
let libraryDisplay = document.querySelector('#library');
let library = [];

let newTitle = document.querySelector('#newTitle');
let newAuthor = document.querySelector('#newAuthor');
let newPages = document.querySelector('#newPages');
let newGenre = document.querySelector('#newGenre');
let newReadStatus = document.querySelectorAll('.btnsReadIt');
let newReadSelected = null;

function BookTemplate(id, title, author, pages, genre, readStatus) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.readStatus = readStatus;
}


newReadStatus.forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.classList.contains('readYes')) {
            e.target.style.backgroundColor = 'gold';
            e.target.style.opacity = '1'
            e.target.nextElementSibling.style.opacity = 0.5;
            e.target.nextElementSibling.style.backgroundColor = '#f7eeee';
            newReadSelected = 1;
        } else if (e.target.classList.contains('readNo')) {
            e.target.style.backgroundColor = 'gold';
            e.target.style.opacity = '1'
            e.target.previousElementSibling.style.opacity = 0.5;
            e.target.previousElementSibling.style.backgroundColor = '#f7eeee';
            newReadSelected = 0;
        }
    })
})


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
        titleText.textContent = 'Title: ';
        bookDiv.appendChild(titleText);

        titleDiv.classList.add('bookTitle');
        titleDiv.textContent = item.title;
        bookDiv.appendChild(titleDiv);

        authorText.classList.add('authorText');
        authorText.textContent = 'Written by: ';
        bookDiv.appendChild(authorText);

        authorDiv.classList.add('bookAuthor');
        authorDiv.textContent = item.author;
        bookDiv.appendChild(authorDiv);

        pagesText.classList.add('pagesText');
        pagesText.textContent = 'Length: ';
        bookDiv.appendChild(pagesText);

        pagesDiv.classList.add('bookPages');
        pagesDiv.textContent = item.pages + ' pages';
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

        readBtn.classList.add('btnChangeReadStatusBook');
        if (item.readStatus == 1) {
            readBtn.textContent = 'Finished!';
        } else if (item.readStatus == 0) {
            readBtn.textContent = 'Reading...';
        }
        bookDiv.appendChild(readBtn);

        removeBtn.classList.add('btnRemoveBook');
        removeBtn.textContent = 'Remove book';
        bookDiv.appendChild(removeBtn);

        libraryDisplay.appendChild(bookDiv);

    }
}



addBook.addEventListener('click', (e) => {
    e.preventDefault();
    let id = library.length + 1;
    let title = newTitle.value;
    let author = newAuthor.value;
    let pages = newPages.value;
    let genre = newGenre.value;
    let readStatus = newReadSelected;
    let newBook = new BookTemplate(id, title, author, pages, genre, readStatus);
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


libraryDisplay.addEventListener('mouseenter', () => {
    if (library) {
        libraryDisplay.querySelectorAll('.btnRemoveBook').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                console.table(library);
                let deletedId = e.target.parentElement.querySelector('.bookNumber').textContent.slice(1);
                console.log('vymazavam knihu cislo' + (e.target.parentElement.querySelector('.bookNumber').textContent.slice(1)))
                library.splice(deletedId - 1, 1);
                console.table(library);
                libraryDisplay.innerHTML = '';
                createLibrary();
            })
        })

    }
})
