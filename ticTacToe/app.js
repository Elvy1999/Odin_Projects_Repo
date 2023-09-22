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
const weapons_message = document.querySelector('#weapons_message'); 
const allWeapons = document.querySelectorAll(".weapons")



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
        allWeapons.forEach(weapon=>{ weapon.classList.remove("selected");});
        selectedWeapons.player1 = null;
        selectedWeapons.player2 = null;
        WeaponsSelected();

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
    const weaponElement = event.target;
    const player_id = weaponElement.closest(".player-menu").id;
    const weaponSrc = weaponElement.src;

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
    WeaponsSelected();
}
// Set the selected player option for oponent type
let menu_choice = null;
const menu_options = document.querySelector(".menu-options");
const buttons = menu_options.querySelectorAll("button");
menu_options.addEventListener("click", (e)=>{
    for( let btn of buttons){ btn.classList.remove("selected_option")};
    const selected_option = e.target.closest('button');
    console.log(selected_option);
    selected_option.classList.add("selected_option");
    menu_choice = selected_option.id;
    console.log(menu_choice);
});


function win_check(board){
    win_combos = [ 
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] //diagonal    
    ]
    for(let combo of win_combos){
        let [a,b,c] = combo;
        if(board[a] != " " && board[a] == board[b] && board[b] == board[c]){
            return true;
        }
    }
    return false;
}

function draw_check(board){
    for(let spot in board){
        if ( spot != " "){  
            return false
        }
    }
    return true;
}


const player = (playerName,playerImg) =>{
    let playerScore = 0
    const name = playerName;
    const imgUrl = playerImg;
    const getPlayerName = () => name;
    const getImgUrl = () => imgUrl;
    const getPlayerScore = () => playerScore;
    
    return{
        getPlayerName,getImgUrl,getPlayerScore
    }
}

function WeaponsSelected(){
    if(selectedWeapons.player1 != null && selectedWeapons.player2 != null){
        play_btn.classList.add("active");
        play_btn.style.display = "flex";
        weapons_message.style.display = "none";
    }
    else if(selectedWeapons.player1 == null && selectedWeapons.player2 == null){
        play_btn.style.display = "none";
        weapons_message.style.display = "block";
        weapons_message.classList.add("active");
    }
}



