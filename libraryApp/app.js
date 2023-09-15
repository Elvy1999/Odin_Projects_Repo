// create access to dom elements
const add_book_btn = document.getElementById("add_book");
const overlay_id = document.getElementById("overlay");
const book_form = document.querySelector(".book-form");
const books_content = document.querySelector(".books_content");
const all_books = books_content.querySelectorAll(".book");

let books_array = [{author: "Marcus Aurelius", book_name: "Meditations", "page-number": 7, "read":true, id:"book-1"}
,{author: "James Clear", book_name: "Atomic Habits", "page-number": 25, "read":true,id:"book-2"}
,{author: "Sherife Abdelmsddh", book_name: "Meditations", "page-number": 7, "read":true,id:"book-3"}
];


books_content.addEventListener("click", function(event){
    let readBtn = event.target.closest(".read");
    if(readBtn){
        let book = event.target.closest(".book");
        let status = book.querySelector(".status");
        let book_id = book.id;
        let book_index = books_array.findIndex(obj => obj.id == book_id);
        if(status.textContent === "Completed"){
            status.textContent = "In Progress";
            books_array[book_index]["read"] = false;
        }
        else{
            status.textContent = "Completed";
            books_array[book_index]["read"] = true;
        }
        console.log(books_array)
    }
    let deleteBtn = event.target.closest(".delete");
    if(deleteBtn){
        // propagates up the dom tree from the event that triggered it to find an element that has the 
        // the class or id specified, in this case its looking for an element with the book class
        let book = event.target.closest(".book"); 
        let book_id = book.id; // get the id element of the div found with the class book
        book.remove();
        let book_index = books_array.findIndex(obj => obj.id == book_id);
        books_array.splice(book_index, 1);
        console.log(books_array);
    }
    
});







// event listeners for the page

add_book_btn.addEventListener("click", ()=>{
    let overlay = overlay_id;
    if (overlay.style.right === "0px"){
        overlay.style.right = "-100%";
    }
    else{
        overlay.style.right = "0px";
    }  
});

book_form.addEventListener("submit",function(event){
    event.preventDefault(); // Prevents the form from submitting normally
    const formElements = this.elements; // form elements
    const formData = {} // create an object to store form data
    for(let i=0; i< formElements.length; i++){
        const element = formElements[i]; // access the first element in the form
        if(element.type !== "submit"){
            formData[element.name] = element.type === "checkbox" ? element.checked : element.value;
        }
    }
    formData["id"] = formData["book_name"]+formData["author"];

    // resets form 
    book_form.reset();
    overlay.style.right = "-100%";
    books_array.push(formData);
    book_to_html(formData);
});

function book_to_html(book){
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

