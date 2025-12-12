(function(){
    "use strict";
    console.log("reading js");

    // game variables
    let currentPlayer = 1;
    let player1Character = null;
    let player2Character = null;
    let player1Confirmed = false;
    let gameBoard = ['', '', '', '', '', '', '', '', '']; // represents the 9 cells of the board
    let gameActive = false;
    let scores = { player1: 0, player2: 0 }; // keeps track of wins for each player

    // character images
    const characters = {
        cat: 'images/cat.png',
        dumpling: 'images/dumpling.png',
        star: 'images/star.png',
        letter: 'images/letter.png'
    };

    // audio files
    const placeSound = new Audio('audio/click.m4a');
    const winSound = new Audio('audio/clap.m4a');

    // all possible winning combinations (rows, columns, diagonals)
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // grabs all the DOM elements
    const selectionScreen = document.querySelector('#selectionScreen');
    const gameScreen = document.querySelector('#gameScreen');
    const selectionTitle = document.querySelector('#selectionTitle');
    const characterButtons = document.querySelectorAll('.characterButton');
    const selectNextPlayerButton = document.querySelector('#selectNextPlayerButton');
    const startGameButton = document.querySelector('#startGameButton');
    const cells = document.querySelectorAll('.cell');

    const player1Text = document.querySelector('#player1Text');
    const player2Text = document.querySelector('#player2Text');
    const player1Icon = document.querySelector('#player1Icon');
    const player2Icon = document.querySelector('#player2Icon');
    const player1IconDisplay = document.querySelector('#player1IconDisplay');
    const player2IconDisplay = document.querySelector('#player2IconDisplay');
    const player1ScoreSpan = document.querySelector('#player1Score');
    const player2ScoreSpan = document.querySelector('#player2Score');

    const endGameButton = document.querySelector('#endGameButton');
    const winnerModal = document.querySelector('#winnerModal');
    const winnerText = document.querySelector('#winnerText');
    const winnerIconImage = document.querySelector('#winnerIconImage');
    const playAgainButton = document.querySelector('#playAgainButton');
    const exitModal = document.querySelector('#exitModal');
    const cancelExitButton = document.querySelector('#cancelExitButton');
    const confirmExitButton = document.querySelector('#confirmExitButton');

    // handles character selection clicks
    characterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (this.style.display === 'none') {
                return;
            }
            
            characterButtons.forEach(function(characterButton) {
                characterButton.classList.remove('selected');
            });

            this.classList.add('selected');
            const character = this.dataset.character;
            
            // player 1's turn to pick spot on board
            if (!player1Confirmed) {
                player1Character = character;
                selectNextPlayerButton.style.display = 'inline-block';
                selectNextPlayerButton.disabled = false;
            } 
            // player 2's turn to pick
            else {
                player2Character = character;
                startGameButton.style.display = 'inline-block';
                startGameButton.disabled = false;
            }
        });
    });

    // handles next player button click
    selectNextPlayerButton.addEventListener('click', function() {
        if (player1Character) {
            player1Confirmed = true;
            
            // show player 1's chosen character
            player1Icon.src = characters[player1Character];
            player1Icon.alt = player1Character + ' character';
            
            selectionTitle.textContent = 'Player 2: Choose your character';
            
            // hide player 1's chosen character so that player 2 can't pick it
            characterButtons.forEach(function(button) {
                button.classList.remove('selected');
                if (button.dataset.character === player1Character) {
                    button.style.display = 'none';
                }
            });
            
            selectNextPlayerButton.style.display = 'none';
        }
    });

    // handles start game button click
    startGameButton.addEventListener('click', function() {
        if (player1Character && player2Character) {
            // shows player 2's chosen character
            player2Icon.src = characters[player2Character];
            player2Icon.alt = player2Character + ' character';
            
            // switches from selection screen to game screen
            selectionScreen.classList.remove('active');
            gameScreen.classList.add('active');
            gameActive = true;
            currentPlayer = 1;
            updateTurnDisplay();
        }
    });

    // handles clicks on game board cells
    cells.forEach(function(cell) {
        cell.addEventListener('click', function() {
            const cellIndex = parseInt(this.dataset.cell);
            
            // allows moves on empty cells when game is active
            if (gameBoard[cellIndex] === '' && gameActive) {
                const image = document.createElement('img');
                
                // places current player's character in the cell
                if (currentPlayer === 1) {
                    gameBoard[cellIndex] = player1Character;
                    image.src = characters[player1Character];
                    image.alt = player1Character + ' character';
                    image.width = 100;
                    image.height = 100;
                } else {
                    gameBoard[cellIndex] = player2Character;
                    image.src = characters[player2Character];
                    image.alt = player2Character + ' character';
                    image.width = 100;
                    image.height = 100;
                }
                
                this.appendChild(image);
                this.classList.add('taken');
                
                placeSound.currentTime = 0;
                placeSound.play();
                
                // checks if current player won
                if (checkWinner()) {
                    endGame(currentPlayer);
                } 
                // checks if board is full and is a tied game
                else if (gameBoard.every(function(cell) {
                    return cell !== '';
                })) {
                    endGame(0);
                }
                else {
                    currentPlayer = currentPlayer === 1 ? 2 : 1;
                    updateTurnDisplay();
                }
            }
        });
    });

    // updates the display to show whose turn it is
    function updateTurnDisplay() {
        if (currentPlayer === 1) {
            player1Text.textContent = "It's Player 1's turn!";
            player2Text.textContent = "Your turn is next...";
            player1IconDisplay.style.backgroundColor = '#1E56CD';
            player2IconDisplay.style.backgroundColor = '#ECF2FF';
        } else {
            player1Text.textContent = "Your turn is next...";
            player2Text.textContent = "It's Player 2's turn!";
            player1IconDisplay.style.backgroundColor = '#ECF2FF';
            player2IconDisplay.style.backgroundColor = '#1E56CD';
        }
    }

    // checks if the current player has won
    function checkWinner() {
        const currentCharacter = currentPlayer === 1 ? player1Character : player2Character;
        
        return winningCombos.some(function(combo) {
            return combo.every(function(index) {
                return gameBoard[index] === currentCharacter;
            });
        });
    }

    // ends the game and shows winner modal
    function endGame(winner) {
        gameActive = false;
        
        // plays win sound if there's a winner
        if (winner !== 0) {
            winSound.currentTime = 0;
            winSound.play();
        }
        
        if (winner === 0) {
            winnerText.textContent = "It's a Tie!";
            winnerIconImage.src = 'images/star.png';
            winnerIconImage.alt = 'Tie game - star';
        } 
        // displays winner message and updates score
        else {
            winnerText.textContent = 'Player ' + winner + ' Wins!';
            const winningCharacter = winner === 1 ? player1Character : player2Character;
            winnerIconImage.src = characters[winningCharacter];
            winnerIconImage.alt = winningCharacter + ' character wins';
            
            if (winner === 1) {
                scores.player1++;
                player1ScoreSpan.textContent = scores.player1;
            } else {
                scores.player2++;
                player2ScoreSpan.textContent = scores.player2;
            }
        }
        
        winnerModal.classList.add('active');
    }

    playAgainButton.addEventListener('click', function() {
        resetBoard();
        winnerModal.classList.remove('active');
        gameActive = true;
    });

    endGameButton.addEventListener('click', function() {
        exitModal.classList.add('active');
    });

    cancelExitButton.addEventListener('click', function() {
        exitModal.classList.remove('active');
    });

    confirmExitButton.addEventListener('click', function() {
        exitModal.classList.remove('active');
        resetGame();
        gameScreen.classList.remove('active');
        selectionScreen.classList.add('active');
    });

    // clears the game board but keeps characters and scores
    function resetBoard() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(function(cell) {
            cell.innerHTML = '';
            cell.classList.remove('taken');
        });
        currentPlayer = 1;
        updateTurnDisplay();
    }

    function resetGame() {
        resetBoard();
        player1Character = null;
        player2Character = null;
        player1Confirmed = false;
        scores = { player1: 0, player2: 0 };
        player1ScoreSpan.textContent = '0';
        player2ScoreSpan.textContent = '0';
        player1Icon.src = '';
        player2Icon.src = '';
        selectionTitle.textContent = 'Player 1: Choose your character';
        characterButtons.forEach(function(button) {
            button.classList.remove('selected');
            button.style.display = 'flex';
        });
        selectNextPlayerButton.style.display = 'none';
        selectNextPlayerButton.disabled = true;
        startGameButton.style.display = 'none';
        startGameButton.disabled = true;
        gameActive = false;
    }
})();