const submitButton = document.querySelector(".submit-button");
const tableBody = document.getElementById("table-body");

let myLibrary = [];

if (localStorage.getItem("myLibrary")) {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  showBooks();
}

function Book(name, author, readStatus) {
  this.name = name;
  this.author = author;
  this.readStatus = readStatus;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  saveLibraryToLocalStorage()
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  saveLibraryToLocalStorage()
}

function toggleReadStatus(index) {
  const book = myLibrary[index];
  book.readStatus = book.readStatus === "Readed" ? "Not readed" : "Readed";
  saveLibraryToLocalStorage()
}

function saveLibraryToLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function showBooks() {
  
  tableBody.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = book.name;

    const authorCell = document.createElement("td");
    authorCell.textContent = book.author;

    const readStatusCell = document.createElement("td");
    readStatusCell.textContent = book.readStatus;

    const deleteButtonCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "DELETE";
    deleteButton.setAttribute("class", "delete-button");
    deleteButton.setAttribute("data-index", index);
    deleteButton.addEventListener("click", () => {
      deleteBook(index);
      showBooks();
    });
    deleteButtonCell.appendChild(deleteButton);

    const readStatusButtonCell = document.createElement("td");
    const readStatusButton = document.createElement("button");
    readStatusButton.textContent = "TOGGLE STATUS";
    readStatusButton.setAttribute("class", "readStatus-button");
    readStatusButton.setAttribute("data-index", index);
    readStatusButton.addEventListener("click", () => {
      toggleReadStatus(index);
      showBooks();
    });
    readStatusButtonCell.appendChild(readStatusButton);

    row.appendChild(nameCell);
    row.appendChild(authorCell);
    row.appendChild(readStatusCell);
    row.appendChild(deleteButtonCell);
    row.appendChild(readStatusButtonCell);

    tableBody.appendChild(row);
  });
}

document.getElementById("myForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const bookName = document.getElementById("book-name").value;
  const authorName = document.getElementById("book-author").value;
  const readStatus = document.getElementById("read-status").value;

  const newBook = new Book(bookName, authorName, readStatus);
  addBookToLibrary(newBook);

  showBooks();

  document.getElementById("book-name").value = "";
  document.getElementById("book-author").value = "";
  document.getElementById("read-status").value = "Readed";
});

