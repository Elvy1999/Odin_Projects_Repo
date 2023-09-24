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
// const game_board_cells = document.querySelectorAll(".cell"); 
// const menu_container = document.querySelector('.menu-container');
// const game_container = document.querySelector('.game-container');
// const play_btn = document.querySelector('#play_btn');
// const restart_btn = document.querySelector('.restart');
// const weapons_message = document.querySelector('#weapons_message'); 
// const allWeapons = document.querySelectorAll(".weapons")



// // code that switches between the menu container and the game container
// play_btn.addEventListener('click', () => {switch_container();});
// const menu_btn = document.querySelector('.menu');
// menu_btn.addEventListener('click', () => {switch_container();});
// restart_btn.addEventListener('click', () => {
//     for(let cell of game_board_cells){
//         cell.innerHTML = "";
//     }
// });
// // function for switching containers
// function switch_container(){
//     if(game_container.classList.contains("active")){
//         game_container.classList.remove("active");
//         menu_container.classList.add("active");
//         document.body.style.overflow = 'hidden'; // Disable scrolling, migh have to change this becasue of moible
//     }
//     else{
//         game_container.classList.add("active");
//         menu_container.classList.remove("active");
//         document.body.style.overflow = 'hidden'; // Enable scrolling
//     }   
// }
// let selectedWeapons = {
//     player1: null,
//     player2: null
// };


// document.querySelectorAll('.weapon-grid').forEach(grid => {
//     grid.addEventListener('click', selectWeapon);
// });

// function selectWeapon(event){
//     const weaponElement = event.target;
//     const player_id = weaponElement.closest(".player-menu").id;
//     const weaponSrc = weaponElement.src;

//     allWeapons.forEach(weapon=>{ // selects all weapons in both containers, can be optimized later
//         if(weapon.closest(".player-menu").id == player_id){
//             weapon.classList.remove("selected");
//         }
//     });
//     weaponElement.classList.add("selected");
//     selectedWeapons[player_id] = weaponSrc; // Update the selected weapon with its src value for the specific player
   
//     // testing adding the selected weapon image to the tic tac toe board
//     // this adds the selected image to the the 5th cell on the board
//     const cell_5 = document.getElementById("5");
//     if(cell_5.hasChildNodes()){cell_5.innerHTML = '';};
//     const imgElement = document.createElement("img");
//     imgElement.src = weaponSrc;
//     cell_5.appendChild(imgElement);
//     WeaponsSelected();
// }
// // Set the selected player option for oponent type
// let option_choice = null;
// const opponent_choices = document.querySelector(".opponent-choice");
// const buttons = opponent_choices.querySelectorAll("button");
// opponent_choices.addEventListener("click", (e)=>{
//     for( let btn of buttons){ btn.classList.remove("selected_option")};

//     const selected_option = e.target.closest('button');
//     console.log(selected_option);
//     selected_option.classList.add("selected_option");
//     option_choice = selected_option.id;
//     console.log(option_choice);
// });


// function win_check(board){
//     win_combos = [ 
//     [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
//     [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
//     [0, 4, 8], [2, 4, 6] //diagonal    
//     ]
//     for(let combo of win_combos){
//         let [a,b,c] = combo;
//         if(board[a] != " " && board[a] == board[b] && board[b] == board[c]){
//             return true;
//         }
//     }
//     return false;
// }

// function draw_check(board){
//     for(let spot in board){
//         if ( spot != " "){  
//             return false
//         }
//     }
//     return true;
// }


// const player = (playerName,playerImg) =>{
//     let playerScore = 0
//     const name = playerName;
//     const imgUrl = playerImg;
//     const getPlayerName = () => name;
//     const getImgUrl = () => imgUrl;
//     const getPlayerScore = () => playerScore;
    
//     return{
//         getPlayerName,
//         getImgUrl,
//         getPlayerScore
//     }
// }

// function WeaponsSelected(){
//     if(player1 != null && player2 != null){
//         play_btn.style.display = "flex";
//         weapons_message.style.display = "none";
//     }
//     else if(player1 == null && player2 == null){
//         play_btn.style.display = "none";
//         weapons_message.style.display = "block";
//     }
// }

(function() {
    // creating module pattern for tick tac toe board
    const Gameboard = (() => {
        let gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        const getBoard = () => {return gameBoard;};
        const resetBoard = () => {gameBoard.fill(" ");};
        const placeMarker = (marker,position) => {gameBoard[position] = marker;};
        return{getBoard,resetBoard,placeMarker}
    })();

    const Player = (name, weapon, playerType = "Human") =>{
        let score  = 0;
     
        const getName = () => {return name;}
        const getWeapon = () => {return weapon;};
        const addPoint = () => {score++;};
        const getPlayerType = () => {return playerType;};
        const setPlayerType = (type) => { playerType = type;};
        const resetScore = () => {score = 0;};
        return {getName,getWeapon,addPoint,getPlayerType,resetScore,setPlayerType};
    }

    const displayController= (() => {
        
        const weapons_message = document.querySelector("#weapons_message");
        const play_btn = document.querySelector("#play_btn");
        const opponent_choice = document.querySelector(".opponent-choice");
        const player1_weapons = document.querySelector("#player1");
        const player2_weapons = document.querySelector("#player2");

        let player1 = null;
        let player2 = null;
        option_choice = null;
       
        const initGame = () => {
            play_btn.addEventListener("click", switch_container);
            player1_weapons.addEventListener("click", setPlayerWeapon);
            player2_weapons.addEventListener("click", setPlayerWeapon);
            opponent_choice.addEventListener("click", getOpponentChoice);
        };
        //creates a player object with the weapon image that  the respective player has selected
        function setPlayerWeapon(e) {
            const weaponElement = e.target;
            const parent_container = weaponElement.parentNode;
            const weaponSrc = weaponElement.src;
            removeSelectedWeapon(parent_container);
            weaponElement.classList.add("selected");
            if(parent_container.id == "player1")
            {
                player1 = Player("Ninja 1",weaponSrc);
            }
            else if(parent_container.id == "player2"){
                if(option_choice != null){
                    player2 = Player("Ninja 2", weaponSrc, option_choice)
                }
                else{
                    player2 = Player("Ninja 2", weaponSrc);
                }
            }
            WeaponsSelected();
            console.log(player2.getName(), player2.getPlayerType());
        }
        //removes the selected class from all the weapons in the container
        const removeSelectedWeapon = (parent_container) => {
            const allWeapons = parent_container.querySelectorAll(".weapons");
            allWeapons.forEach(weapon => {
                weapon.classList.remove("selected");
            });
        }
        // displays the play button if both players have selected a weapon from thier respective containers
        function WeaponsSelected(){
            if(player1 != null && player2 != null){
                play_btn.style.display = "flex";
                weapons_message.style.display = "none";
            }
            else if(player1 == null && player2 == null){
                play_btn.style.display = "none";
                weapons_message.style.display = "block";
            }
        }
        // gets the selected choice for the type of opponent player1 will be facing
        function getOpponentChoice(e){
            const opponent_choices = document.querySelector(".opponent-choice");
            const buttons = opponent_choices.querySelectorAll("button");
            for( let btn of buttons){ btn.classList.remove("selected_option")};
            const selected_option = e.target.closest('button');
            selected_option.classList.add("selected_option");
            option_choice = selected_option.id;
            if(player2 != null){
                player2.setPlayerType(option_choice);
            }
            console.log(player2.getPlayerType());
        }
        
        function switch_container(){
            const menu_container = document.querySelector('.menu-container');
            const game_container = document.querySelector('.game-container');
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


        return{
            initGame
        }

    })(); 



displayController.initGame();


})();


