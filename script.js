"use strict";

let btnHideSide = document.querySelector(".library__btn--add-book");
let addBook = document.querySelector(".library__btn--add");
let libraryDisplay = document.querySelector(".library__content");
let library = [];
let dialog = document.querySelector(".library__dialog");

let newTitle = document.querySelector(".library__input-newTitle");
let newAuthor = document.querySelector(".library__input-newAuthor");
let newPages = document.querySelector(".library__input-newPages");
let newGenre = document.querySelector(".library__select-newGenre");
let newCurrentPage = document.querySelector(".library__input--current-page");
let newReadStatus = document.querySelectorAll(".library__read-options");
let newReadSelected = null;
let sidebar = document.querySelector(".library__create");
let hideBtn = document.querySelector(".library__btn--hide-sidebar");

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
    libraryCopy.push(book);
    libraryCopy[index].id = newId;
    newId++;
    index++;
  }
  library.length = 0;
  for (let book of libraryCopy) {
    library.push(book);
  }
  libraryCopy.length = 0;
  libraryDisplay.innerHTML = "";
};

libraryDisplay.addEventListener("click", (e) => {
  if (library) {
    if (e.target.classList.contains("btnRemoveBook")) {
      let bookindex = getBookIndex(e.target);
      library[bookindex].deleteBook(bookindex);
      createLibrary();
    } else if (e.target.classList.contains("btnChangeProgress")) {
      let bookindex = getBookIndex(e.target);
      library[bookindex].changeProgress(bookindex);
    }
  }
});

function getBookIndex(e) {
  return e.parentElement.parentElement.querySelector(".bookNumber").textContent.slice(1) - 1;
}

BookTemplate.prototype.changeProgress = function (changedIndex) {
  dialog.querySelector(
    ".library__dialog-summary"
  ).textContent = `${library[changedIndex].title}, written by ${library[changedIndex].author}.`;
  dialog.showModal();

  let fieldsetUpdatePage = dialog.querySelector(".library__fieldset--edit");
  let dialogEventsInitialized = false;

  dialog.addEventListener("click", (e) => {
    if (dialogEventsInitialized) {
      e.stopPropagation();
      return;
    }

    fieldsetUpdatePage.classList.add("displayNone");

    if (e.target.classList.contains("library__btn--progress-finished")) {
      library[changedIndex].currentPage = library[changedIndex].pages;
      e.target.style.backgroundColor = "gold";
      dialog.querySelector(".library__btn--progress-changed").style.backgroundColor = "#f7eeee";
      fieldsetUpdatePage.classList.remove("displayGrid");
      fieldsetUpdatePage.classList.add("displayNone");
      fieldsetUpdatePage.style.display = "none";
      dialog.querySelector(".library__btn--progress-changed").style.backgroundColor = "#f7eeee";
    }

    if (e.target.classList.contains("library__btn--progress-changed")) {
      if (fieldsetUpdatePage.classList.contains("displayNone")) {
        dialog.querySelector(".library__btn--progress-finished").style.backgroundColor = "#f7eeee";
        fieldsetUpdatePage.classList.remove("displayNone");
        fieldsetUpdatePage.classList.add("displayGrid");
        fieldsetUpdatePage.style.display = "grid";
        e.target.style.backgroundColor = "gold";
      } else if (fieldsetUpdatePage.classList.contains("displayGrid")) {
        fieldsetUpdatePage.classList.remove("displayGrid");
        fieldsetUpdatePage.classList.add("displayNone");
        fieldsetUpdatePage.style.display = "none";
        e.target.style.backgroundColor = "#f7eeee";
      }

      dialog.querySelector(".library__number-page-old").textContent = library[changedIndex].currentPage;
      dialog.querySelector(".library__input--new-progress").value =
        +dialog.querySelector(".library__number-page-old").textContent;
      dialog
        .querySelector(".library__input--new-progress")
        .setAttribute("min", +dialog.querySelector(".library__number-page-old").textContent);
      dialog.querySelector(".library__input--new-progress").setAttribute("max", +library[changedIndex].pages);
    }

    if (e.target.classList.contains("library__btn--save-change")) {
      fieldsetUpdatePage.querySelector(".library__number-page-old").textContent = +dialog.querySelector(
        ".library__input--new-progress"
      ).value;

      if (
        fieldsetUpdatePage.style.display == "grid" &&
        +dialog.querySelector(".library__input--new-progress").value < library[changedIndex].pages
      ) {
        library[changedIndex].currentPage = +dialog.querySelector(".library__input--new-progress").value;
      }
      if (
        fieldsetUpdatePage.style.display == "grid" &&
        +dialog.querySelector(".library__input--new-progress").value == library[changedIndex].pages
      ) {
        library[changedIndex].currentPage = +library[changedIndex].pages;
      }
      dialogEventsInitialized = true;
      fieldsetUpdatePage.style.display = "none";
      libraryDisplay.innerHTML = "";
      console.table(library);
      createLibrary();
      dialog.close();
    }

    if (e.target.classList.contains("library__btn--close-dialog")) {
      fieldsetUpdatePage.classList.remove("displayNone");
      fieldsetUpdatePage.classList.remove("displayGrid");
    }
  });
};

dialog.querySelector(".library__btn--close-dialog").addEventListener("click", () => {
  dialog.querySelector(".library__fieldset--edit").style.display = "none";
  dialog.querySelectorAll(".dialogBtns button").forEach((item) => {
    item.style.backgroundColor = "#f7eeee";
  });
  dialog.close();
});

//change styles of 'have you finished reading' items
newReadStatus.forEach((item) => {
  item.addEventListener("click", (e) => {
    addBook.disabled = false;
    addBook.style.opacity = 1;
    if (e.target.classList.contains("library__btn--read-yes")) {
      e.target.style.backgroundColor = "gold";
      e.target.style.opacity = "1";
      e.target.nextElementSibling.style.opacity = 0.5;
      e.target.nextElementSibling.style.backgroundColor = "#f7eeee";
      newReadSelected = "yes";
      document.querySelector(".library__label--current-page").style.opacity = 0.5;
      document.querySelector(".library__input--current-page").disabled = true;
      document.querySelector(".library__label--current-page").style.display = "none";
      document.querySelector(".library__input--current-page").style.display = "none";
      document.querySelector(".library__read-options").style.gridTemplateRows = "none";
    } else if (e.target.classList.contains("library__btn--read-no")) {
      e.target.style.backgroundColor = "gold";
      e.target.style.opacity = "1";
      e.target.previousElementSibling.style.opacity = 0.5;
      e.target.previousElementSibling.style.backgroundColor = "#f7eeee";
      document.querySelector(".library__label--current-page").style.opacity = 1;
      document.querySelector(".library__input--current-page").disabled = false;
      document.querySelector(".library__label--current-page").style.display = "block";
      document.querySelector(".library__input--current-page").style.display = "block";
      document.querySelector(".library__read-options").style.gridTemplateRows = "repeat(3, 1fr)";
      let currentPage = document.querySelector(".library__input--current-page");
      let totalPage = document.querySelector("#newPages");
      totalPage.setAttribute("min", 1);
      currentPage.setAttribute("max", totalPage.value - 1);
      currentPage.setAttribute("min", 0);
      newReadSelected = "no";
    }
  });
});

//add new book as an object to library array via BookTemplate constructor function

addEventListener("DOMContentLoaded", () => {
  addBook.disabled = true;
  addBook.style.opacity = 0.5;
});

function calculateProgress(currentPage, totalPages) {
  return (currentPage / totalPages) * 100 + "%";
}

addBook.addEventListener("click", (e) => {
  if (
    newReadSelected == "yes" ||
    (newReadSelected == "no" && document.querySelector(".library__input--current-page").value)
  ) {
    if (verification()) {
      sidebar.querySelector(".library__fieldset--details").style.border = "var(--border-thin)";
      e.preventDefault();
      let id = library.length + 1;
      let title = newTitle.value;
      let author = newAuthor.value;
      let pages = +newPages.value;
      let genre = newGenre.value;
      let readStatus = newReadSelected;
      let currentPage = +newCurrentPage.value;
      if (+newCurrentPage.value > +newPages.value) {
        currentPage = pages;
      }
      let newBook = new BookTemplate(id, title, author, pages, genre, readStatus, currentPage);
      library.push(newBook);
      libraryDisplay.innerHTML = "";
      newReadSelected = null;
      createLibrary();

      addBook.disabled = true;
      addBook.style.opacity = 0.5;
    }
  } else {
    sidebar.querySelector(".library__fieldset--details").style.border = "var(--border-red)";
  }
});

function resetSidebar() {
  let btnsYesNo = document.querySelectorAll(".library__read-options button");
  let sidebarInputs = sidebar.querySelectorAll("input");
  let sidebarSelect = sidebar.querySelector("select");
  document.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("library__btn--reset") ||
      e.target.classList.contains("library__btn--hide-sidebar") ||
      e.target.classList.contains("library__btn--add-book") ||
      (e.target.classList.contains("library__btn--add") && verification())
    ) {
      btnsYesNo.forEach((item) => {
        item.style.opacity = 1;
        item.style.backgroundColor = "#f7eeee";
      });
      sidebarInputs.forEach((item) => {
        item.value = "";
      });
      sidebarSelect.value = "Action Adventure";
      document.querySelector(".library__label--current-page").style.display = "none";
      document.querySelector(".library__input--current-page").style.display = "none";
      document.querySelector(".library__read-options").style.gridTemplateRows = "none";

      addBook.disabled = true;
      addBook.style.opacity = 0.5;
    }
  });
}

function verification() {
  let ok = 0;
  sidebar.querySelectorAll(".library__form-items input").forEach((item) => {
    if (item.value != "") {
      ++ok;
    }
  });
  if (ok == 3) {
    return true;
  } else {
    return false;
  }
}

hideBtn.addEventListener("click", () => {
  sidebar.classList.add("hidden");
  libraryDisplay.style.gridArea = "2/1/3/3";
  btnHideSide.textContent = "Add New Book";
  resetSidebar();
});

//show or hide sidebar
btnHideSide.addEventListener("click", (e) => {
  if (sidebar.classList.contains("hidden")) {
    //if closed then open
    sidebar.classList.remove("hidden");
    e.target.textContent = "Hide Sidebar";
    libraryDisplay.style.gridArea = "2/1/3/2";
  } else {
    //if open then close
    sidebar.classList.add("hidden");
    e.target.textContent = "Add New Book";
    libraryDisplay.style.gridArea = "2/1/3/3";
  }
  resetSidebar();
});

function createLibrary() {
  for (let item of library) {
    let topSection = document.createElement("div");
    let titleText = document.createElement("div");
    let authorText = document.createElement("div");
    let pagesText = document.createElement("div");
    let genreText = document.createElement("div");
    let bookNum = document.createElement("div");
    let bookDiv = document.createElement("div");
    let titleDiv = document.createElement("div");
    let authorDiv = document.createElement("div");
    let pagesDiv = document.createElement("div");
    let genreDiv = document.createElement("div");
    let statusDiv = document.createElement("div");
    let readBtn = document.createElement("button");
    let removeBtn = document.createElement("button");
    let progressBar = document.createElement("div");
    let progressNumbers = document.createElement("div");
    let progress = document.createElement("div");
    let progressUpdateBtn = document.createElement("button");

    bookDiv.classList.add("book");

    topSection.classList.add("topSection");

    bookNum.classList.add("bookNumber");
    bookNum.textContent = "#" + item.id;
    topSection.appendChild(bookNum);

    removeBtn.classList.add("btnRemoveBook");
    removeBtn.textContent = "Remove book";
    topSection.appendChild(removeBtn);

    bookDiv.appendChild(topSection);

    titleText.classList.add("titleText");
    titleText.textContent = "Title: ";
    bookDiv.appendChild(titleText);

    titleDiv.classList.add("bookTitle");
    titleDiv.textContent = item.title;
    bookDiv.appendChild(titleDiv);

    authorText.classList.add("authorText");
    authorText.textContent = "Author: ";
    bookDiv.appendChild(authorText);

    authorDiv.classList.add("bookAuthor");
    authorDiv.textContent = item.author;
    bookDiv.appendChild(authorDiv);

    pagesText.classList.add("pagesText");
    pagesText.textContent = "Length: ";
    bookDiv.appendChild(pagesText);

    pagesDiv.classList.add("bookPages");
    pagesDiv.textContent = item.pages + " pages";
    bookDiv.appendChild(pagesDiv);

    genreText.classList.add("genreText");
    genreText.textContent = "Genre: ";
    bookDiv.appendChild(genreText);

    genreDiv.classList.add("bookGenre");
    genreDiv.textContent = item.genre;
    bookDiv.appendChild(genreDiv);

    statusDiv.classList.add("readingStatus");
    statusDiv.textContent = "Reading progress:";
    bookDiv.appendChild(statusDiv);

    readBtn.classList.add("btnChangeReadStatusBook");
    if (item.readStatus == "yes" || item.pages == item.currentPage) {
      readBtn.textContent = "Finished!";
      bookDiv.appendChild(readBtn);
    } else if (item.readStatus == "no") {
      progressUpdateBtn.classList.add("btnChangeProgress");
      progressUpdateBtn.textContent = "Update progress";
      topSection.appendChild(progressUpdateBtn);
      progressBar.classList.add("progressBar");
      progressNumbers.classList.add("progressNumbers");
      progress.classList.add("progress");

      progressNumbers.textContent = `${item.currentPage} / ${item.pages}`;
      progressBar.style.width = calculateProgress(item.currentPage, item.pages);

      progress.appendChild(progressBar);
      progress.appendChild(progressNumbers);
      bookDiv.appendChild(progress);
    }

    libraryDisplay.appendChild(bookDiv);
  }
}
