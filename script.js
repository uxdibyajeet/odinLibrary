console.log("hello world!");
// dated 03.06.2026

const myLibrary = [];

//book constructor
const book = function (name, author, pages, status) {
  if (!new.target) {
    throw Error("forgot to add 'new' keyword");
  }
  this.id = crypto.randomUUID();
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.status = status;
};

// take params create new book adds to library
function addBookToLibrary() {
  const newBook = new book("name", "author", 69, "reading"); //hard coded
  myLibrary.push(newBook);
}

for (let i = 0; i <= 2; i++) {
  addBookToLibrary();
}
console.log(myLibrary);
