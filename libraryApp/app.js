const add_book_btn = document.getElementById("add_book");
const overlay_id = document.getElementById("overlay");
const book_form = document.querySelector(".book-form");
const books_content = document.querySelector(".books_content");

let defaultBooks = [
    {author: "Marcus Aurelius", book_name: "Meditations", "page-number": 7, "read": true, id: "book-1"},
    {author: "James Clear", book_name: "Atomic Habits", "page-number": 25, "read": false, id: "book-2"},
    {author: "Sherife Abdelmsddh", book_name: "Super Vision", "page-number": 7, "read": true, id: "book-3"}
  ];
// Check if 'books_array' already exists in localStorage
if (!localStorage.getItem('books_array_web_storage')) {
    // If not, add default books
    localStorage.setItem('books_array_web_storage', JSON.stringify(defaultBooks));
  }
  // gets all the book values from localStorage in the book_array_web_storage
  // and adds them to the books_array array in the javascript file
  let books_array = JSON.parse(localStorage.getItem('books_array_web_storage')) || []; 
  
  function saveBooksToLocalStorage() {
    localStorage.setItem('books_array_web_storage', JSON.stringify(books_array));
  }
  // Add default books if books_array is empty
if (books_array.length === 0) {
    books_array = defaultBooks;
    saveBooksToLocalStorage();
  }
  
  // Function to update status when a book is marked as read
  function updateBookStatus(book) {
    let status = book.querySelector(".status");
    let book_id = book.id;
    let book_index = books_array.findIndex(obj => obj.id == book_id);
    if (status.textContent === "Completed") {
      status.textContent = "In Progress";
      books_array[book_index]["read"] = false;
    } else {
      status.textContent = "Completed";
      books_array[book_index]["read"] = true;
    }
    saveBooksToLocalStorage(); // Save changes to localStorage
   
  }
  
  // Function to delete a book
  function deleteBook(book) {
    let book_id = book.id;
    book.remove();
    let book_index = books_array.findIndex(obj => obj.id == book_id);
    books_array.splice(book_index, 1);
    saveBooksToLocalStorage(); // Save changes to localStorage
  }
  
  // Add event listeners
  
  books_content.addEventListener("click", function(event) {
    let readBtn = event.target.closest(".read");
    if (readBtn) {
      let book = event.target.closest(".book");
      updateBookStatus(book);
    }
  
    let deleteBtn = event.target.closest(".delete");
    if (deleteBtn) {
      let book = event.target.closest(".book");
      deleteBook(book);
    }
  });
  
  add_book_btn.addEventListener("click", () => {
    let overlay = overlay_id;
    if (overlay.style.right === "0px") {
      overlay.style.right = "-100%";
    } else {
      overlay.style.right = "0px";
    }
  });
  
  book_form.addEventListener("submit", function(event) {
    event.preventDefault();
    const formElements = this.elements;
    const formData = {}
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      if (element.type !== "submit") {
        formData[element.name] = element.type === "checkbox" ? element.checked : element.value;
      }
    }
    formData["id"] = formData["book_name"] + formData["author"];
    book_form.reset();
    overlay.style.right = "-100%";
    books_array.push(formData);
    book_to_html(formData);
    saveBooksToLocalStorage(); // Save changes to localStorage
  });
function book_to_html(book){ // adds a book to the books_content container in the html file
    let bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.id = book["id"];
    let infoDiv = document.createElement("div");
    infoDiv.classList.add("info");
    let titleH2 = document.createElement("h2");
    titleH2.classList.add("title");
    titleH2.textContent = `Title: ${book["book_name"]}`;
    infoDiv.appendChild(titleH2);
    let authorH3 = document.createElement("h3");
    authorH3.classList.add("author");
    authorH3.textContent = `Author: ${book["author"]}`;
    infoDiv.appendChild(authorH3);
    let currentPageP = document.createElement("p");
    currentPageP.classList.add("current-page");
    currentPageP.textContent = `Current Page:${book["page-number"]}`;
    infoDiv.appendChild(currentPageP);
    bookDiv.appendChild(infoDiv);
    let book_btnsDiv = document.createElement("div");
    book_btnsDiv.classList.add("book_btns");
    let readBtn = document.createElement("button");
    readBtn.classList.add("read");
    readBtn.textContent = "Read";
    book_btnsDiv.appendChild(readBtn);
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = "Delete";
    book_btnsDiv.appendChild(deleteBtn);
    bookDiv.appendChild(book_btnsDiv);
    let statusDiv = document.createElement("div");
    statusDiv.classList.add("status");
    statusDiv.textContent = book['read'] == true ? "Completed" : "In Progress";
    bookDiv.appendChild(statusDiv);
    books_content.appendChild(bookDiv);
}

books_array.forEach(book => { // populates the book_content containter with books when the page first loads
    book_to_html(book);
  });

