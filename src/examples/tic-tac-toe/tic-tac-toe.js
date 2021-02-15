const statusDisplay = document.querySelector('.game-status');
let gameActive = true;
let currentPlayer = "X"; // can be X or Y ..used as user identification and user
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw`;
const currentPlayerTurn = () => `Its ${currentPlayer}'s turn`;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
 
    let won = false;
    // there are 9 possible win condition iterate for each condition and 
    // check if any one of them is valid
    for (let i = 0; i < 8; i++) {
        const winCondition = winningConditions[i];
        let position1 = gameState[winCondition[0]];
        let position2 = gameState[winCondition[1]];
        let position3 = gameState[winCondition[2]];
        if (position1 === '' || position2 === '' || position3 === '') {
            continue;
        }

        if (position1 === position2 && position2 === position3) {
            won = true;
            break;
        }
    }

    if (won) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();  
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);
