const statusDisplay = document.querySelector('.game-status');
let gameActive = true;
let currentPlayer = "X"; // can be X or Y ..used as user identification and user
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw`;
const currentPlayerTurn = () => `Its ${currentPlayer}'s turn`;

const winningConditions = [
    [{ position: 0, class: 'horizontal' }, { position: 1, class: 'horizontal' }, { position: 2, class: 'horizontal' }],
    [{ position: 3, class: 'horizontal' }, { position: 4, class: 'horizontal' }, { position: 5, class: 'horizontal' }],
    [{ position: 6, class: 'horizontal' }, { position: 7, class: 'horizontal' }, { position: 8, class: 'horizontal' }],
    [{ position: 0, class: 'vertical' }, { position: 3, class: 'vertical' }, { position: 6, class: 'vertical' }],
    [{ position: 1, class: 'vertical' }, { position: 4, class: 'vertical' }, { position: 7, class: 'vertical' }],
    [{ position: 2, class: 'vertical' }, { position: 5, class: 'vertical' }, { position: 8, class: 'vertical' }],
    [{ position: 0, class: 'diagonal-left' }, { position: 4, class: 'diagonal-left' }, { position: 8, class: 'diagonal-left' }],
    [{ position: 2, class: 'diagonal-right' }, { position: 4, class: 'diagonal-right' }, { position: 6, class: 'diagonal-right' }]
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

function computerPlay(){
    const availablePositions =  gameState.map((val, index) => val ==="" ? index :undefined).filter(val=> val !==undefined);
    const max = availablePositions.length-1;
    const min = 0;
    const positionToPlay = Math.floor(Math.random()*(max-min+1)) + min;
    return availablePositions[positionToPlay];

}

function handleResultValidation() {

    let won = false;
    let winningCondition;
    // there are 9 possible win condition iterate for each condition and 
    // check if any one of them is valid
    for (let i = 0; i < 8; i++) {
        const winCondition = winningConditions[i];
        let position1 = gameState[winCondition[0].position];
        let position2 = gameState[winCondition[1].position];
        let position3 = gameState[winCondition[2].position];
        if (position1 === '' || position2 === '' || position3 === '') {
            continue;
        }

        if (position1 === position2 && position2 === position3) {
            won = true;
            winningCondition = winCondition;
            break;
        }
    }

    if (won) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return winningCondition;
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
    let winningResult = handleResultValidation();
    if (!!winningResult) {
        addWinningLine(winningResult);
        return;
    }
    
    const computerPlayPosition = computerPlay();
    cellElement= document.querySelector(`cell[data-cell-index="${computerPlayPosition}"]`);
    handleCellPlayed(cellElement , computerPlayPosition);
     winningResult = handleResultValidation();
    if (!!winningResult) {
        addWinningLine(winningResult);
    }
    

}

function addWinningLine(winningResult) {
    const winningCell1 = document.querySelector(`cell[data-cell-index="${winningResult[0].position}"]`);
    const winningCell2 = document.querySelector(`cell[data-cell-index="${winningResult[1].position}"]`);
    const winningCell3 = document.querySelector(`cell[data-cell-index="${winningResult[2].position}"]`);
    winningCell1.insertAdjacentHTML('beforeend', `<hr class="${winningResult[0].class}">`)
    winningCell2.insertAdjacentHTML('beforeend', `<hr class="${winningResult[1].class}">`)
    winningCell3.insertAdjacentHTML('beforeend', `<hr class="${winningResult[2].class}">`)
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
