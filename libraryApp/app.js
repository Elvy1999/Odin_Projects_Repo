// create access to dom elements
const add_book_btn = document.getElementById("add_book");
const overlay_id = document.getElementById("overlay");
const book_form = document.querySelector(".book-form");



















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
    const formElements = this.elements;
    const formData = {}
    for(let i=0; i< formElements.length; i++){
        const element = formElements[i];
        if(element.type !== "submit"){
            formData[element.name] = element.type === "checkbox" ? element.checked : element.value;
        }
    }
    console.log(formData)
    


});

