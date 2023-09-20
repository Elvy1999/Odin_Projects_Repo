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
const game_board_cells = document.querySelectorAll(".cell"); 
const menu_container = document.querySelector('.menu-container');
const game_container = document.querySelector('.game-container');
const play_btn = document.querySelector('#play_btn');
const restart_btn = document.querySelector('.restart');



// code that switches between the menu container and the game container
play_btn.addEventListener('click', () => {switch_container();});
const menu_btn = document.querySelector('.menu');
menu_btn.addEventListener('click', () => {switch_container();});
restart_btn.addEventListener('click', () => {
    for(let cell of game_board_cells){
        cell.innerHTML = "";
    }
});
// function for switching containers
function switch_container(){
    if(game_container.classList.contains("active")){
        game_container.classList.remove("active");
        menu_container.classList.add("active");
        document.body.style.overflow = 'hidden'; // Disable scrolling, migh have to change this becasue of moible
    }
    else{
        game_container.classList.add("active");
        menu_container.classList.remove("active");
        document.body.style.overflow = 'hidden'; // Enable scrolling
    }
}
let selectedWeapons = {
    player1: null,
    player2: null
};


document.querySelectorAll('.weapon-grid').forEach(grid => {
    grid.addEventListener('click', selectWeapon);
});

function selectWeapon(event){
    console.log("Hello Fucker");
    const weaponElement = event.target;
    const player_id = weaponElement.closest(".player-menu").id;
    const weaponSrc = weaponElement.src;
    const allWeapons = document.querySelectorAll(".weapons")

    allWeapons.forEach(weapon=>{ // selects all weapons in both containers, can be optimized later
        if(weapon.closest(".player-menu").id == player_id){
            weapon.classList.remove("selected");
        }
    });
    weaponElement.classList.add("selected");
    selectedWeapons[player_id] = weaponSrc; // Update the selected weapon with its src value for the specific player
    
    // testing adding the selected weapon image to the tic tac toe board
    // this adds the selected image to the the 5th cell on the board
    const cell_5 = document.getElementById("5");
    if(cell_5.hasChildNodes()){cell_5.innerHTML = '';};
    const imgElement = document.createElement("img");
    imgElement.src = weaponSrc;
    cell_5.appendChild(imgElement);
}







