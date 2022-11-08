/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function resetGameVars(){
    grid = [[null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null]]

    firstPlayer = "red"
    secondPlayer = "blue"
    gameScore1 = 42
    gameScore2 = 42
    winner = false
    gameOver = false
    currentTurn = firstPlayer
}

function resetClick(){
    resetGameVars()
    const winMessage = document.getElementById("winner-display")
    winMessage.style.display = "None";
    clearBoard();
}

// Clear down the elements drawn on the board.
function clearBoard() {
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < grid[rowIndex].length; columnIndex++) {
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).innerHTML = ""
        }
    }
}

function drawGrid(grid) {
    clearBoard()
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < grid[rowIndex].length; columnIndex++) {
            if (grid[rowIndex][columnIndex]===null) {
                continue;
            }
            const cellText = grid[rowIndex][columnIndex] === "red" ? "🔴" : "🔵";
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).innerText = cellText;
        }
    }
}

function takeTurn(columnIndex){
    let rowCount = grid.length-1
    let notAllowed = true
    let successfulFlag = false
    while (notAllowed){
        if (rowCount<0){
            console.log('COLUMN FILLED')
            // Consider HTML message
            break
        }

        if (grid[rowCount][columnIndex]==null){
            grid[rowCount][columnIndex] = currentTurn
            if (currentTurn === firstPlayer){
                currentTurn = secondPlayer
                gameScore1--
            }else{
                currentTurn = firstPlayer
                gameScore2--
            }
            successfulFlag = true
            notAllowed = false
        }else{
            rowCount--
        }    
    }
    return [grid,successfulFlag]
}

function columnClick(columnIndex, event) {
    potentialWinner = currentTurn
    if (!gameOver){
        returnedArr = takeTurn(columnIndex)
        if (returnedArr[1]){
            grid=returnedArr[0]
            winner = checkForWinner(grid)
            drawGrid(grid)
            if (winner){
                gameOver = true
                const highScoreDisp = document.getElementById("highscore");
                if (potentialWinner==firstPlayer&&gameScore1>highScore){
                    highScoreDisp.innerText = gameScore1
                    highScore = gameScore1
                }
                if (potentialWinner==secondPlayer&&gameScore2>highScore){
                    highScoreDisp.innerText = gameScore2
                    highScore = gameScore2
                }
                const winMessage = document.getElementById("winner-display")
                winMessage.innerText = "Winner is "+potentialWinner
                console.log(gameScore1)
                winMessage.style.display = "block"
            }
        }    
    }else{
        console.log("Game over - press reset to play again")
    }

}

function createGrid(){
    let Container = document.getElementById("container");
    Container.style.display = "grid"
    Container.innerHTML = '';
  
    let numberOfRows = prompt("How many rows do you want?");
    let i = 0;
    let x = numberOfRows * numberOfRows; 
    document.documentElement.style.setProperty("--columns-row", numberOfRows);
    for (i =  0; i < x ; i++) {
      var div = document.createElement("div");
      document.getElementById("container").appendChild(div);
  }
}


function createGamePage(){

    createGrid()
/* 
    // Bind the click events for the grid.
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
            const gridPosition = document.getElementById(`row-${rowIndex}-column-${columnIndex}`);
            gridPosition.addEventListener("click", columnClick.bind(null, columnIndex));
        }
    }

    // Bind the click event for the reset button.
    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", resetClick); */
}


const startButton = document.getElementById("start-game");
startButton.addEventListener("click",createGamePage);


// Initialize variables
let firstPlayer = "red"
let secondPlayer = "blue"
let winner = false
let currentTurn = firstPlayer
let potentialWinner
let gameOver = false
let gameScore1 = 42
let gameScore2 = 42
let highScore = 0
let grid = [[null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null]]