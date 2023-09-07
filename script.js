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
let sidebar = document.querySelector('.create');
let hideBtn = document.querySelector('.btnHideSidebar');

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

libraryDisplay.addEventListener('click', (e) => {

    if (library) {
        if (e.target.classList.contains('btnRemoveBook')) {

            let bookindex = getBookIndex(e.target);
            library[bookindex].deleteBook(bookindex);
            createLibrary();
        }
        else if (e.target.classList.contains('btnChangeProgress')) {
            let bookindex = getBookIndex(e.target);
            library[bookindex].changeProgress(bookindex);
        }
    }
}
);

function getBookIndex(e) {
    return e.parentElement.parentElement.querySelector('.bookNumber').textContent.slice(1) - 1;
}

BookTemplate.prototype.changeProgress = function (changedIndex) {

    dialog.querySelector('.bookSummary').textContent = `${library[changedIndex].title}, written by ${library[changedIndex].author}.`
    dialog.showModal();

    let fieldsetUpdatePage = dialog.querySelector('.fieldsetEdit');
    let dialogEventsInitialized = false;

    dialog.addEventListener('click', (e) => {

        if (dialogEventsInitialized) {
            e.stopPropagation();
            return;
        }

        fieldsetUpdatePage.classList.add('displayNone');



        if ((e.target.classList.contains('progressFinished'))) {


            library[changedIndex].currentPage = library[changedIndex].pages;
            e.target.style.backgroundColor = 'gold';
            dialog.querySelector('.progressChanged').style.backgroundColor = '#f7eeee';
            fieldsetUpdatePage.classList.remove('displayGrid');
            fieldsetUpdatePage.classList.add('displayNone');
            fieldsetUpdatePage.style.display = 'none';
            dialog.querySelector('.progressChanged').style.backgroundColor = '#f7eeee';
        }

        if (e.target.classList.contains('progressChanged')) {


            if (fieldsetUpdatePage.classList.contains('displayNone')) {
                dialog.querySelector('.progressFinished').style.backgroundColor = '#f7eeee';
                fieldsetUpdatePage.classList.remove('displayNone');
                fieldsetUpdatePage.classList.add('displayGrid');
                fieldsetUpdatePage.style.display = 'grid';
                e.target.style.backgroundColor = 'gold';
            } else if (fieldsetUpdatePage.classList.contains('displayGrid')) {
                fieldsetUpdatePage.classList.remove('displayGrid');
                fieldsetUpdatePage.classList.add('displayNone');
                fieldsetUpdatePage.style.display = 'none';
                e.target.style.backgroundColor = '#f7eeee';
            }

            dialog.querySelector('.numberPageOld').textContent = library[changedIndex].currentPage;
            dialog.querySelector('#numberPageNew').value = +dialog.querySelector('.numberPageOld').textContent;
            dialog.querySelector('#numberPageNew').setAttribute('min', +dialog.querySelector('.numberPageOld').textContent);
            dialog.querySelector('#numberPageNew').setAttribute('max', +library[changedIndex].pages);

        }

        if (e.target.classList.contains('changeSave')) {

            fieldsetUpdatePage.querySelector('.numberPageOld').textContent = (+(dialog.querySelector('#numberPageNew').value));


            if ((fieldsetUpdatePage.style.display == 'grid') && (+(dialog.querySelector('#numberPageNew').value) < library[changedIndex].pages)) {
                library[changedIndex].currentPage = +(dialog.querySelector('#numberPageNew').value);

            }
            if ((fieldsetUpdatePage.style.display == 'grid') && (+(dialog.querySelector('#numberPageNew').value) == library[changedIndex].pages)) {
                library[changedIndex].currentPage = +library[changedIndex].pages;

            }
            dialogEventsInitialized = true;
            fieldsetUpdatePage.style.display = 'none';
            libraryDisplay.innerHTML = '';
            console.table(library)
            createLibrary();
            dialog.close();
        }

        if (e.target.classList.contains('changeClose')) {
            fieldsetUpdatePage.classList.remove('displayNone');
            fieldsetUpdatePage.classList.remove('displayGrid');
        }
    })
}


































dialog.querySelector('.changeClose').addEventListener('click', () => {
    dialog.querySelector('.fieldsetEdit').style.display = 'none';
    dialog.querySelectorAll('.dialogBtns button').forEach(item => {
        item.style.backgroundColor = '#f7eeee';
    })
    dialog.close();
})




//change styles of 'have you finished reading' items
newReadStatus.forEach(item => {
    item.addEventListener('click', (e) => {
        addBook.disabled = false;
        addBook.style.opacity = 1;
        if (e.target.classList.contains('readYes')) {
            e.target.style.backgroundColor = 'gold';
            e.target.style.opacity = '1'
            e.target.nextElementSibling.style.opacity = 0.5;
            e.target.nextElementSibling.style.backgroundColor = '#f7eeee';
            newReadSelected = 'yes';
            document.querySelector('.labelCurrentPage').style.opacity = 0.5;
            document.querySelector('#currentPage').disabled = true;
            document.querySelector('.labelCurrentPage').style.display = 'none';
            document.querySelector('#currentPage').style.display = 'none';
            document.querySelector('.btnsReadIt').style.gridTemplateRows = 'none';
        } else if (e.target.classList.contains('readNo')) {
            e.target.style.backgroundColor = 'gold';
            e.target.style.opacity = '1'
            e.target.previousElementSibling.style.opacity = 0.5;
            e.target.previousElementSibling.style.backgroundColor = '#f7eeee';
            document.querySelector('.labelCurrentPage').style.opacity = 1;
            document.querySelector('#currentPage').disabled = false;
            document.querySelector('.labelCurrentPage').style.display = 'block';
            document.querySelector('#currentPage').style.display = 'block';
            document.querySelector('.btnsReadIt').style.gridTemplateRows = 'repeat(3, 1fr)';
            let currentPage = document.querySelector('#currentPage');
            let totalPageValue = document.querySelector('#newPages').value;
            currentPage.setAttribute('max', totalPageValue - 1);
            newReadSelected = 'no';
        }
    })
})



//add new book as an object to library array via BookTemplate constructor function

addEventListener("DOMContentLoaded", () => {
    addBook.disabled = true;
    addBook.style.opacity = 0.5;
});

function calculateProgress(currentPage, totalPages) {
    return ((currentPage / totalPages) * 100) + '%';
}



addBook.addEventListener('click', (e) => {
    if ((newReadSelected == 'yes') || ((newReadSelected == 'no') && (document.querySelector('#currentPage').value))) {
        if ((verification())) {
            sidebar.querySelector('.fieldAdd').style.border = 'var(--border-thin)';
            e.preventDefault();
            let id = library.length + 1;
            let title = newTitle.value;
            let author = newAuthor.value;
            let pages = +newPages.value;
            let genre = newGenre.value;
            let readStatus = newReadSelected;
            let currentPage = +newCurrentPage.value;
            let newBook = new BookTemplate(id, title, author, pages, genre, readStatus, currentPage);
            library.push(newBook);
            libraryDisplay.innerHTML = '';
            newReadSelected = null;
            createLibrary();

            addBook.disabled = true;
            addBook.style.opacity = 0.5;
        }
    } else {
        sidebar.querySelector('.fieldAdd').style.border = 'var(--border-red)';
        console.log('nevybral si yes ani no')
    }




})

function resetSidebar() {
    let btnsYesNo = document.querySelectorAll('.btnsReadIt button');
    let sidebarInputs = sidebar.querySelectorAll('input');
    let sidebarSelect = sidebar.querySelector('select');
    // let btnReset = sidebar.querySelector('.btnResetForm');
    document.addEventListener('click', (e) => {
        if ((e.target.classList.contains('btnResetForm')) || (e.target.classList.contains('btnHideSidebar')) ||
            (e.target.classList.contains('btnSideBar')) || ((e.target.classList.contains('btnAddBook')) && (verification()))) {
            btnsYesNo.forEach(item => {
                item.style.opacity = 1;
                item.style.backgroundColor = '#f7eeee';
            })
            sidebarInputs.forEach(item => {
                item.value = '';
            })
            sidebarSelect.value = 'Action Adventure';
            document.querySelector('.labelCurrentPage').style.display = 'none';
            document.querySelector('#currentPage').style.display = 'none';
            document.querySelector('.btnsReadIt').style.gridTemplateRows = 'none';

            addBook.disabled = true;
            addBook.style.opacity = 0.5;
        }
    })

}

function verification() {
    let ok = 0;
    sidebar.querySelectorAll('.formItems input').forEach(item => {
        if (item.value != '') {
            ++ok
        }
    })
    if (ok == 3) {
        return 1
    } else {
        return
    }
}



hideBtn.addEventListener('click', () => {
    sidebar.classList.add('hidden');
    libraryDisplay.style.gridArea = '2/1/3/3';
    btnHideSide.textContent = 'Add New Book';
    resetSidebar()
})

//show or hide sidebar
btnHideSide.addEventListener('click', (e) => {

    if (sidebar.classList.contains('hidden')) { //if closed then open
        sidebar.classList.remove('hidden')
        e.target.textContent = 'Hide Sidebar';
        libraryDisplay.style.gridArea = '2/1/3/2'

    } else { //if open then close
        sidebar.classList.add('hidden');
        e.target.textContent = 'Add New Book';
        libraryDisplay.style.gridArea = '2/1/3/3';
    }
    resetSidebar();
}
)






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
        if ((item.readStatus == 'yes') || (item.pages == item.currentPage)) {
            readBtn.textContent = 'Finished!';
            bookDiv.appendChild(readBtn);
        } else if (item.readStatus == 'no') {
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

