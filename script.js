// dated 03.06.2026

//stores all the books
let myLibrary = [];

//book constructor
const Book = function (name, author, pages, status) {
  if (!new.target) {
    throw Error("forgot to add 'new' keyword");
  }
  // this.status = status;
  this.status = status;
  this.id = crypto.randomUUID();
  this.name = name;
  this.author = author;
  this.pages = pages;
};

Book.prototype.toggleIsReadStatus = function () {
  this.status = !this.status;
  // console.log(this.status);
};

// take params create new book and adds to library
function addBookToLibrary(name, author, pages, status) {
  const newBook = new Book(name, author, pages, status);
  myLibrary.push(newBook);
}

const sample = {
  name: "(Sample)1984",
  author: "George Orwell",
  pages: 370,
  status: false,
};
addBookToLibrary(sample.name, sample.author, sample.pages, sample.status);

//Table creator
function generateTable() {
  const dataTable = document.querySelector("#table-body");
  dataTable.innerHTML = ""; //clear the table
  myLibrary.forEach((book) => {
    const row = document.createElement("tr"); //creates row for each item
    row.classList.add("row");
    //data fields are generated from here
    Object.keys(book).forEach((val) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("wrapper");
      const cell = document.createElement("td");
      if (val === "id") return;
      else if (val === "status") {
        const helper = document.createElement("p");
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = book[val];
        checkBox.classList.add("checkBox");
        if (checkBox.checked === true) {
          helper.textContent = "read";
        } else {
          helper.textContent = "unread";
        }
        // Check / uncheck event listener
        checkBox.addEventListener("click", () => {
          book.toggleIsReadStatus();
          if (book.status !== true) {
            helper.textContent = "unread";
          } else {
            helper.textContent = "read";
          }
        });
        cell.appendChild(wrapper);
        wrapper.appendChild(checkBox);
        wrapper.appendChild(helper);
      } else {
        cell.textContent = book[val];
      }
      cell.classList.add("cell");
      row.appendChild(cell);
    });
    const actionCell = document.createElement("td");
    const deleteBtn = document.createElement("button"); // delete action
    deleteBtn.textContent = "Delete";

    //event listner
    deleteBtn.addEventListener("click", () => {
      deleteBook(book.id);
    });

    actionCell.appendChild(deleteBtn);
    row.appendChild(actionCell);
    dataTable.appendChild(row);
  });
}

// console.log(myLibrary);

// Delete book via ID
function deleteBook(itemId) {
  myLibrary = myLibrary.filter((book) => book.id !== itemId);
  console.log(`Just Deleted item with ID: ${itemId}`);
  generateTable();
}

// add new Book
function init() {
  const form = document.querySelector("form");
  const modal = document.querySelector(".modal");
  const buttons = document.querySelectorAll(".btn");
  const helper = document.querySelector(".helper");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (button.textContent === "Add New Book") {
        if (!modal.classList.contains("hidden")) {
          modal.classList.add("hidden");
        } else {
          modal.classList.remove("hidden");
        }
      } else if (button.textContent === "Cancel") {
        modal.classList.add("hidden");
      } else {
        //code runs after sumbiting form
        e.preventDefault();
        const data = {
          name: document.querySelector("#bookName").value,
          author: document.querySelector("#authorName").value,
          pages: document.querySelector("#pages").value,
          status: document.querySelector("#status").checked,
        };
        // console.log(myLibrary);
        addBookToLibrary(data.name, data.author, data.pages, data.status);
        generateTable();
        modal.classList.add("hidden");
        form.reset();
      }
    });
  });
}

init();

generateTable();
