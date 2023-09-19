document.addEventListener('DOMContentLoaded', function() {
    // Get the header elements
    const headerElements = document.querySelectorAll('header');

    // Apply transition effect after a short delay (adjust as needed)
    setTimeout(function() {
        headerElements.forEach(function(element) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        });
    }, 600); // Adjust the delay in milliseconds (0.5 seconds in this example)
});


const play_btn = document.querySelector('#play_btn');
play_btn.addEventListener('click', () => {
    console.log("I've been clicked");

});

const menu_container = document.querySelector('.menu-container');
const game_container = document.querySelector('.game-container');
const title = document.querySelector(".title");
title.addEventListener("click", () => { 
    if(game_container.classList.contains("active")){
        game_container.classList.remove("active");
        menu_container.classList.add("active");
        document.body.style.overflow = 'hidden'; // Disable scrolling
    }
    else{
        game_container.classList.add("active");
        menu_container.classList.remove("active");
        document.body.style.overflow = 'hidden'; // Enable scrolling
    }
});
