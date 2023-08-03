'use strict';

let btnHideSide = document.querySelector('.btnSideBar');
let addBook = document.querySelector('.btnAddBook');
let libraryDisplay = document.querySelector('#library');
let library = [];

let newTitle = document.querySelector('#newTitle');
let newAuthor = document.querySelector('#newAuthor');
let newPages = document.querySelector('#newPages');
let newGenre = document.querySelector('#newGenre');
let newCurrentPage = document.querySelector('#currentPage');
let newReadStatus = document.querySelectorAll('.btnsReadIt');
let newReadSelected = null;

function BookTemplate(id, title, author, pages, genre, readStatus, currentPage) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.readStatus = readStatus;
    this.currentPage = currentPage;
}


newReadStatus.forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.classList.contains('readYes')) {
            e.target.style.backgroundColor = 'gold';
            e.target.style.opacity = '1'
            e.target.nextElementSibling.style.opacity = 0.5;
            e.target.nextElementSibling.style.backgroundColor = '#f7eeee';
            newReadSelected = 1;
            document.querySelector('.labelCurrentPage').style.opacity = 0.5;
            document.querySelector('#currentPage').disabled = true;
        } else if (e.target.classList.contains('readNo')) {
            e.target.style.backgroundColor = 'gold';
            e.target.style.opacity = '1'
            e.target.previousElementSibling.style.opacity = 0.5;
            e.target.previousElementSibling.style.backgroundColor = '#f7eeee';
            document.querySelector('.labelCurrentPage').style.opacity = 1;
            document.querySelector('#currentPage').disabled = false;
            newReadSelected = 0;
        }
    })
})


function createLibrary() {


    for (let item of library) {

        let topSection = document.createElement('div');
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
        let progressBar = document.createElement('div');
        let progress = document.createElement('div');

        bookDiv.classList.add('book');

        topSection.classList.add('topSection');

        bookNum.classList.add('bookNumber');
        bookNum.textContent = '#' + item.id;
        topSection.appendChild(bookNum);

        removeBtn.classList.add('btnRemoveBook');
        removeBtn.textContent = 'Remove book';
        topSection.appendChild(removeBtn);

        bookDiv.appendChild(topSection);

        titleText.classList.add('titleText');
        titleText.textContent = 'Title: ';
        bookDiv.appendChild(titleText);

        titleDiv.classList.add('bookTitle');
        titleDiv.textContent = item.title;
        bookDiv.appendChild(titleDiv);

        authorText.classList.add('authorText');
        authorText.textContent = 'Author: ';
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
        genreText.textContent = 'Genre: ';
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
            bookDiv.appendChild(readBtn);
        } else if (item.readStatus == 0) {
            progressBar.classList.add('progressBar');
            progress.classList.add('progress');
            progressBar.textContent = `${item.currentPage} / ${item.pages}`;
            progress.style.width = ((item.currentPage / 100) * item.pages) + '%';
            progressBar.appendChild(progress);
            bookDiv.appendChild(progressBar);

        }





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
    let currentPage = newCurrentPage.value;
    let newBook = new BookTemplate(id, title, author, pages, genre, readStatus, currentPage);
    library.push(newBook);
    libraryDisplay.innerHTML = '';
    createLibrary();
    clearValues();
    console.table(library)
})

function clearValues() {
    newTitle.value = '';
    newAuthor.value = '';
    newPages.value = '';
}

// function clearReading








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
                let deletedId = e.target.parentElement.querySelector('.bookNumber').textContent.slice(1);
                library.splice(deletedId - 1, 1);

                let libraryCopy = [];
                let newId = 1;
                let index = 0;
                for (let book of library) {
                    libraryCopy.push(book)
                    libraryCopy[index].id = newId;
                    newId++;
                    index++;
                }

                library.length = 0;

                for (let item of libraryCopy) {
                    library.push(item);
                }

                libraryCopy.length = 0;

                libraryDisplay.innerHTML = '';

                createLibrary();
            })
        })

    }
})