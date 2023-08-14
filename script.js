'use strict';

let btnHideSide = document.querySelector('.btnSideBar');
let addBook = document.querySelector('.btnAddBook');
let libraryDisplay = document.querySelector('#library');
let library = [];
let dialog = document.querySelector('dialog')

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

BookTemplate.prototype.deleteBook = function (deletedIndex) {
    library.splice(deletedIndex, 1);
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
    for (let book of libraryCopy) {
        library.push(book);
    }
    libraryCopy.length = 0;
    libraryDisplay.innerHTML = '';
}

BookTemplate.prototype.changeProgress = function (changedIndex, chosenBook) {
    dialog.showModal();

    let fieldsetUpdatePage = dialog.querySelector('.fieldsetEdit');

    dialog.querySelector('.progressFinished').addEventListener('click', (e) => {
        library[changedIndex].currentPage = library[changedIndex].pages;
        e.target.style.backgroundColor = 'gold';
        dialog.querySelector('.progressChanged').style.backgroundColor = '#f7eeee';
        fieldsetUpdatePage.classList.replace('displayGrid', 'displayNone');
        fieldsetUpdatePage.style.display = 'none'
        dialog.querySelector('.progressChanged').style.backgroundColor = '#f7eeee';


    })

    dialog.querySelector('.progressChanged').addEventListener('click', (e) => {
        dialog.querySelector('.progressFinished').style.backgroundColor = '#f7eeee';
        if (fieldsetUpdatePage.classList.contains('displayNone')) {
            fieldsetUpdatePage.classList.replace('displayNone', 'displayGrid');
            fieldsetUpdatePage.style.display = 'grid';
            e.target.style.backgroundColor = 'gold';
        } else {
            fieldsetUpdatePage.classList.replace('displayGrid', 'displayNone');
            fieldsetUpdatePage.style.display = 'none'
            e.target.style.backgroundColor = '#f7eeee';
        }


        dialog.querySelector('.numberPageOld').textContent = library[changedIndex].currentPage;
    })

    dialog.querySelector('.changeSave').addEventListener('click', () => {
        if ((fieldsetUpdatePage.style.display == 'grid') && (dialog.querySelector('#numberPageNew').value < library[changedIndex].pages)) {
            library[changedIndex].currentPage = dialog.querySelector('#numberPageNew').value;
        }
        else if ((fieldsetUpdatePage.style.display == 'grid') && (dialog.querySelector('#numberPageNew').value == library[changedIndex].pages)) {
            library[changedIndex].currentPage = library[changedIndex].pages;
        }
        fieldsetUpdatePage.style.display = 'none';
        dialog.querySelectorAll('.dialogBtns button').forEach(item => {
            item.style.backgroundColor = '#f7eeee';
        })
        libraryDisplay.innerHTML = '';
        createLibrary();
        dialog.close();
    })
}

//change styles of 'have you finished reading' items
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

//add new book as an object to library array via BookTemplate constructor function
addBook.addEventListener('click', (e) => {

    //INPUTY MUSIA MAT VALUE inak nespravi knihu

    // e.preventDefault();
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

})

//show or hide sidebar
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
        document.querySelectorAll('.book').forEach(item => {
            item.addEventListener('click', (e) => {
                let chosenBook = e.target.parentElement.parentElement;
                if (e.target.classList.contains('btnRemoveBook')) {
                    library[getBookIndex(e)].deleteBook(getBookIndex(e));
                    createLibrary();
                } else if (e.target.classList.contains('btnChangeProgress')) {
                    library[getBookIndex(e)].changeProgress(getBookIndex(e), chosenBook);
                }
            });
        });
    }
}
);


function calculateProgress(currentPage, totalPages) {
    return ((currentPage / totalPages) * 100) + '%';
}

function getBookIndex(e) {
    return e.target.parentElement.querySelector('.bookNumber').textContent.slice(1) - 1;
}

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
        let progressNumbers = document.createElement('div');
        let progress = document.createElement('div')
        let progressUpdateBtn = document.createElement('button');

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
        if ((item.readStatus == 1) || (item.pages == item.currentPage)) {
            readBtn.textContent = 'Finished!';
            bookDiv.appendChild(readBtn);
        } else if (item.readStatus == 0) {
            progressUpdateBtn.classList.add('btnChangeProgress');
            progressUpdateBtn.textContent = 'Update progress'
            topSection.appendChild(progressUpdateBtn);
            progressBar.classList.add('progressBar');
            progressNumbers.classList.add('progressNumbers');
            progress.classList.add('progress');

            progressNumbers.textContent = `${item.currentPage} / ${item.pages}`;
            progressBar.style.width = calculateProgress(item.currentPage, item.pages);

            progress.appendChild(progressBar);
            progress.appendChild(progressNumbers);
            bookDiv.appendChild(progress);
        }

        libraryDisplay.appendChild(bookDiv);
    }
}

function clearValues() {
    newTitle.value = '';
    newAuthor.value = '';
    newPages.value = '';
}

dialog.querySelector('.changeClose').addEventListener('click', (e) => {
    dialog.querySelector('.fieldsetEdit').style.display = 'none';
    dialog.close();
})
