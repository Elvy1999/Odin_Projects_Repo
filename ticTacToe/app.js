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


(function() {
    // creating module pattern for tick tac toe board
    const Gameboard = (() => {
        let gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        const getBoard = () => {return gameBoard;};
        const resetBoard = () => {gameBoard.fill(" ");};
        const placeMarker = (marker,position) => {gameBoard[position] = marker;};
        const checkWin = () => {
            win_combos = [ 
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] //diagonal    
            ]
            for(let combo of win_combos){
                let [a,b,c] = combo;
                if(gameBoard[a] != " " && gameBoard[a] == gameBoard[b] && gameBoard[b] == gameBoard[c]){
                    return true;
                }
            }
            return false;
        }
        const checkDraw = () =>{
            for(let spot of gameBoard){if(spot == " "){return false;}}
            console.log("Hello");
            return true;
        }
        
        
        return{getBoard,resetBoard,placeMarker,checkWin,checkDraw}
    })();

    const Player = (name, weapon, playerType = "Human") =>{
        let score  = 0;
     
        const getName = () => {return name;}
        const getWeapon = () => {return weapon;};
        const addPoint = () => {score++;};
        const getPlayerType = () => {return playerType;};
        const setPlayerType = (type) => { playerType = type;};
        const getScore = () => {return score;};
        const resetScore = () => {score = 0;};
        return {getName,getWeapon,addPoint,getPlayerType,resetScore,setPlayerType,getScore};
    }

    const displayController= (() => {
        
        const visual_board =  document.querySelector('.board');
        const opponent_choices = document.querySelector(".opponent-choice");
        const buttons = opponent_choices.querySelectorAll("button");
        const play_btn = document.querySelector("#play_btn");

        let player1 = null;
        let player2 = null;
        let turn = 1;
        option_choice = null;
        
        // creates player1 and player2 Player objects, sets opponent choice, inititates game when
        // the play buttton is pressed
        const initGame = () => {
            game_started = true;
            const player1_weapons = document.querySelector("#player1");
            const player2_weapons = document.querySelector("#player2");
            visual_board.addEventListener("click", (e) => addMarker(e));
            play_btn.addEventListener("click", begin_game);
            player1_weapons.addEventListener("click", setPlayerWeapon);
            player2_weapons.addEventListener("click", setPlayerWeapon);
            opponent_choices.addEventListener("click", getOpponentChoice);
            
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
                play_btn.style.pointerEvents = 'none';
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
            const play_btn = document.querySelector("#play_btn");
            const menu_container = document.querySelector('.menu-container');
            const game_container = document.querySelector('.game-container');
            if(menu_container.classList.contains("active")){
                game_container.classList.add("active");
                menu_container.classList.remove("active");
                document.body.style.overflow = 'hidden'; // Disable scrolling, migh have to change this becasue of moible
                play_btn.style.display = "none";
            }
            else{
                game_container.classList.remove("active");
                menu_container.classList.add("active");
                document.body.style.overflow = 'hidden'; // Enable scrolling
                play_btn.style.display = "flex";

            }   
        }

        const begin_game = () => {
            switch_container();
            menu_btn = document.querySelector('.menu');
            restart_btn = document.querySelector('.restart');
            menu_btn.addEventListener("click",reset_game);
            restart_btn.addEventListener("click",restart_game);
        }

        const reset_game = () =>{
            const allWeapons = document.querySelectorAll('.weapons');
            const bothScores = document.querySelectorAll('.score');
            allWeapons.forEach((weapon) => {
                weapon.classList.remove("selected");
            })
            bothScores.forEach((score) => {score.innerHTML = 0;})
            player1 = null;
            player2 = null;
            option_choice = null;
            reset_boards();
            removeOpponentChoice()
            WeaponsSelected()
            switch_container();
        
        }

        const restart_game = () => {
            player1_score = document.getElementById("player-1");
            player2_score = document.getElementById("player-2");
            player1_score.textContent = player2_score.textContent = "0";
            player1.resetScore();
            player2.resetScore();
        }

        // adds player marker to the webpage gameboard and the Gamboard array
        function addMarker (e){
            let player = playerTurn();
            if(updateDisplayBoard(player,e) == true)
            {
                const game_message = document.querySelector(".game-message");
                let result = updateGameboard(player,e);
                if(result == "win"){
                    player.addPoint();
                    let id = player.getName() == "Ninja 1" ? "player-1" : "player-2";
                    let color =  player.getName() == "Ninja 1" ? "#052a75" : "#fdcb50"
                    const player_score = document.getElementById(id)
                    player_score.innerHTML = player.getScore();
                    game_message.style.color = color;
                    game_message.textContent = `${player.getName()} Won!`
                    showMessage();
                    reset_boards();
                }
                else if(result == "draw"){
                    game_message.style.color = "#ffffff";
                    game_message.textContent = `Its a Draw!`;
                    showMessage()
                    reset_boards();
                }
                // subtracting one from the turn so that it doesnt skip the next players turn
            }
            else{
                turn--;
            }
        }
       
        // updates the tictactoe board on the wepage
        function updateDisplayBoard(player,e){
            const cell = e.target;
            if(cell.hasChildNodes()){
                return false;}
            const imgElement = document.createElement("img");
            imgElement.src = player.getWeapon();
            cell.appendChild(imgElement);
            return true;
        }
        
        function updateGameboard(player,e){
            array_location = Number(e.target.id)
            const symbol = player.getName() == "Ninja 1" ? "X": "O";
            Gameboard.placeMarker(symbol,array_location);
            if(Gameboard.checkWin() == true){return "win";}
            if(Gameboard.checkDraw() == true){return "draw";}
        }
        
        

        //determines whos turn it is to play
        const playerTurn = () => {
            const currentPlayer = turn % 2 === 0 ? player2 : player1;
            turn++; // Increment turn after using it
            return currentPlayer;
        }

        const reset_boards = () => {
            const all_cells = document.querySelectorAll('.cell');
            disableClicks();
            Gameboard.resetBoard();
            turn = 1;
            setTimeout(() =>{
            //clears visual gameboard
            all_cells.forEach((cell) => {if(cell.childElementCount != 0){
                cell.removeChild(cell.firstElementChild)}})
            //reset gameboard array
            //reset turn
            enableClicks()
        }, 2000);
            
        }

        const disableClicks = () => {
            visual_board.style.pointerEvents = 'none';
        }
        
        const enableClicks = () => {
            visual_board.style.pointerEvents = 'auto';
        }
        
        function showMessage() {
            const messageElement = document.querySelector('.game-message');
            messageElement.classList.add('show');
            setTimeout(() => {
              messageElement.classList.remove('show');
            }, 2000);
          }


        return{
            initGame
        }

    })(); 



displayController.initGame();


})();


