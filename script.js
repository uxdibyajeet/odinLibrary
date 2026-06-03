// dated 03.06.2026

//stores all the books
const myLibrary = [];

//book constructor
const Book = function (name, author, pages, status) {
  if (!new.target) {
    throw Error("forgot to add 'new' keyword");
  }
  this.status = status;

  this.id = crypto.randomUUID();
  this.name = name;
  this.author = author;
  this.pages = pages;
};

// take params create new book and adds to library
function addBookToLibrary(name, author, pages, status) {
  const newBook = new Book(name, author, pages, status);
  console.log(newBook);
  myLibrary.push(newBook);
}

const sample = {
  name: "Book Name",
  author: "Author Name",
  pages: 89,
  status: true,
};
addBookToLibrary(sample.name, sample.author, sample.pages, sample.status);
addBookToLibrary(sample.name, sample.author, sample.pages, sample.status);
addBookToLibrary(sample.name, sample.author, sample.pages, sample.status);

//Table creator

function generateTable() {
  const dataTable = document.querySelector("#table-body");
  dataTable.innerHTML = ""; //clear the table
  myLibrary.forEach((book) => {
    const row = document.createElement("tr");
    row.classList.add("row");
    Object.values(book).forEach((val) => {
      const cell = document.createElement("td");
      cell.classList.add("cell");
      cell.textContent = val;
      row.appendChild(cell);
    });
    const actionCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    //event listner
    deleteBtn.addEventListener("click", () => {
      deleteRow(book.id);
    });

    actionCell.appendChild(deleteBtn);
    row.appendChild(actionCell);
    dataTable.appendChild(row);
  });
}

console.log(myLibrary);

function deleteRow(itemId) {
  myLibrary.splice(itemId, 1);
  generateTable();
}

generateTable();
