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
        

        const opponent_choices = document.querySelector(".opponent-choice");
        const buttons = opponent_choices.querySelectorAll("button");

        let player1 = null;
        let player2 = null;
        let turn = 1;
        option_choice = null;
        
        // creates player1 and player2 Player objects, sets opponent choice, inititates game when
        // the play buttton is pressed
        const initGame = () => {
            const play_btn = document.querySelector("#play_btn");
            const player1_weapons = document.querySelector("#player1");
            const player2_weapons = document.querySelector("#player2");
            play_btn.addEventListener("click", begin_game);
            player1_weapons.addEventListener("click", setPlayerWeapon);
            player2_weapons.addEventListener("click", setPlayerWeapon);
            opponent_choices.addEventListener("click", getOpponentChoice);
            
        };
        
        //creates a player object with the weapon image that  the respective player has selected
        function setPlayerWeapon(e) {
            const weaponElement = e.target;
            console.log(weaponElement);
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
            
        }
       
        //removes the selected class from all the weapons in the container
        const removeSelectedWeapon = (parent_container) => {
            const allWeapons = parent_container.querySelectorAll(".weapons");
            allWeapons.forEach(weapon => {
                weapon.classList.remove("selected");
            });
        }

        const removeOpponentChoice = () => {
            for( let btn of buttons){ btn.classList.remove("selected_option")};
        }
        
        // displays the play button if both players have selected a weapon from thier respective containers
        function WeaponsSelected(){
            const weapons_message = document.querySelector("#weapons_message");
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
            for( let btn of buttons){ btn.classList.remove("selected_option")};
            const selected_option = e.target.closest('button');
            selected_option.classList.add("selected_option");
            option_choice = selected_option.id;
            if(player2 != null){
                player2.setPlayerType(option_choice);
            }
            // console.log(player2.getName(), player2.getPlayerType(), player2.getWeapon());
            // console.log(player1.getName(), player1.getPlayerType(), player1.getWeapon());
        }
        
        // switches the display from the menu container to the game container and vise versa
        function switch_container(){
            const menu_container = document.querySelector('.menu-container');
            const game_container = document.querySelector('.game-container');
            if(menu_container.classList.contains("active")){
                game_container.classList.add("active");
                menu_container.classList.remove("active");
                document.body.style.overflow = 'hidden'; // Disable scrolling, migh have to change this becasue of moible
                
            }
            else{
                game_container.classList.remove("active");
                menu_container.classList.add("active");
                document.body.style.overflow = 'hidden'; // Enable scrolling

            }   
        }

        const begin_game = () => {
            switch_container();
            menu_btn = document.querySelector('.menu');
            restart_btn = document.querySelector('.restart');
            menu_btn.addEventListener("click",reset_game);
            // //restart_btn.addEventListener("click",pass);
        }

        const reset_game = () =>{
            const allWeapons = document.querySelectorAll('.weapons');
            allWeapons.forEach((weapon) => {
                weapon.classList.remove("selected");
            })
            player1 = null;
            player2 = null;
            option_choice = null;
            Gameboard.resetBoard();
            turn = 1;
            removeOpponentChoice()
            WeaponsSelected()
            switch_container();
        }


        function addMarker (){
            let player = playerTurn();
        }

        function updateGameboard(player){
            array_location = Number(e.target.id)
            const symbol = player.getName() == "Ninja 1" ? "X": "O";
            Gameboard.placeMarker(symbol,array_location);
            //check for win
            //check for draw or stalemate
            //break out of the main function if one of these conditions is true
        }

        // function updateDisplayBoard(player){
        //     const cell = e.target;
        //     if(cell.hasChildNodes())

        // }

        const playerTurn = () => {
            const currentPlayer = turn % 2 === 0 ? player2 : player1;
            turn++; // Increment turn after using it
            return currentPlayer;
        }




        











        return{
            initGame
        }

    })(); 



displayController.initGame();


})();


