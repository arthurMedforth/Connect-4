/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

function resetGameVars(){
    // Create game 2D array
    createGameStateArray()
    // Assign player colors
    firstPlayer = "red"
    secondPlayer = "blue"
    // Reset game variables
    winner = false
    gameOver = false
    // Red goes firsts
    currentTurn = firstPlayer
}

// Event handler for reset button
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
            // Get "counter" span element
            const currentCounter = document.getElementById(`row-${rowIndex}-column-${columnIndex}`).querySelector('span')
            // Make invisible - currently hard coded for white background
            currentCounter.style.backgroundColor = "white"
        }
    }
}

function drawGrid() {
    clearBoard()
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < grid[rowIndex].length; columnIndex++) {
            // Get "counter" span element
            const currentCounter = document.getElementById(`row-${rowIndex}-column-${columnIndex}`).querySelector('span')
            // Set element color depending on game state value
            if (grid[rowIndex][columnIndex]=="red"){
                currentCounter.style.backgroundColor = "red"
            }else if(grid[rowIndex][columnIndex]=="blue"){
                currentCounter.style.backgroundColor = "blue"
            }else{
                currentCounter.style.backgroundColor = "white"
            }
        }
    }
}

function takeTurn(columnIndex){
    // Assign row counter --> depth of column for connect 4
    let rowCount = grid.length-1
    // Initialize boolean for while loop
    let notAllowed = true
    while (notAllowed){
        if (rowCount<0){
            // Consider HTML message
            break
        }
        if (grid[rowCount][columnIndex]==null){
            // Current row in the selected column in empty
            // Place turn string into grid array
            grid[rowCount][columnIndex] = currentTurn
            // Change the "turn" global and update score
            if (currentTurn === firstPlayer){
                currentTurn = secondPlayer
                gameScore1--
            }else{
                currentTurn = firstPlayer
                gameScore2--
            }
            // Allow break of loop by flipping condition bool
            notAllowed = false
        }else{
            // Counter already on this row for the given column
            // Decrement to rowCount to row above and move to next iteration check
            rowCount--
        }    
    }
    return [!notAllowed,rowCount]
}

function reorderObjects(a,b) {
    if (a.highscore < b.highscore){
        return 1;
    } else if (a.highscore > b.highscore){
        return -1;
    } else {
        return 0;
    }
}

function createHighscoreTable(){
    // Add to table
    for (player of playerLog){
        console.log(player)
        const hsCell = document.createElement("td")
        const newRow = document.createElement("tr")
        const nameCell = document.createElement("td")

        nameCell.innerHTML = player.name
        hsCell.innerHTML = player.highscore

        newRow.append(nameCell)
        newRow.append(hsCell)
        document.getElementById("highscore-table-entries").appendChild(newRow)
    }
}

function endGame(){
    gameOver = true
    if (winner == firstPlayer && (gameScore1 > player1Obj.highscore)){
        player1Obj.highscore = gameScore1
        player1Obj.wins++
    }
    if (winner == secondPlayer && (gameScore2 > player2Obj.highscore)){
        player2Obj.highscore = gameScore2
        player1Obj.wins++
    }
    player1Obj.gamesPlayed++
    player2Obj.gamesPlayed++

    // Order playerLog for highscore table
    playerLog.sort(reorderObjects);
    // Create highscore table
    createHighscoreTable()

    // Create win message
    const winMessage = document.getElementById("winner-display")
    winMessage.innerText = "Winner is "+ winner
    winMessage.style.display = "block"
}

// Event handler for clicking column
function columnClick(columnIndex, event) {
    // Game not won yet
    if (!gameOver){
        // Take turn based on column click event
        let takeTurnArr = takeTurn(columnIndex)
        successfulTurn = takeTurnArr[0]
        rowIndex = takeTurnArr[1]
        // If this turn was allowed
        if (successfulTurn){
            let lastMove = [rowIndex,columnIndex]
            // Check game state grid for winning condition
            let checkWinnerArray = checkForWinner(grid,lastMove)
            winnerBool = checkWinnerArray[0]
            winner = checkWinnerArray[1]
            // Update the HTML container
            drawGrid()
            if (winnerBool){
                endGame()
            }else{
                console.log("No winner found let next user play")
            }
        }else{
            console.log("Column filled pick another one")
        }
    }else{
        console.log("Game over - press reset to play again")
    }
}

function createGameStateArray(){
    gameScore1 = numberOfCols.value*numberOfRows.value
    gameScore2 = numberOfCols.value*numberOfRows.value
    grid = [];
    for (let i = 0; i < numberOfRows.value; i++) {
         grid[i] = [];
         for (let j = 0; j < numberOfCols.value; j++){
            grid[i][j] = null
         }
    }
}

function createGrid(){
    Container.style.display = "grid"
    Container.innerHTML = '';
    Container.style.setProperty('--grid-rows', numberOfRows.value);
    Container.style.setProperty('--grid-cols', numberOfCols.value);
    createGameStateArray()
    for (rowIndex = 0; rowIndex < numberOfRows.value; rowIndex++) {
        for (columnIndex = 0; columnIndex < numberOfCols.value; columnIndex++) {
            const cell = document.createElement("div");
            cell.setAttribute("id",`row-${rowIndex}-column-${columnIndex}`)
            const counter = document.createElement("span")
            cell.appendChild(counter).className = "counter"
            container.appendChild(cell).className = "grid-item"
            counter.style.backgroundColor = "white"            
        }
    }
}

function createGamePage(){
    // Get user input for player name
    player1Name = name1Box.value
    player2Name = name2Box.value

    // Set default name values
    if (player1Name == ""){
        player1Name = "Player 1"
    }
    if (player2Name == ""){
        player2Name = "Player 2"
    }

    // Create two new player objects 
    player1Obj = new connect4Player(player1Name)
    player2Obj = new connect4Player(player2Name)

    // Push into player array
    playerLog.push(player1Obj, player2Obj)

    highscoreTableLabel.style.display = 'inline-block'

    createGrid()

    gameOver = false

    // Bind the click events for the grid.
    for (let columnIndex = 0; columnIndex < numberOfCols.value; columnIndex++) {
        for (let rowIndex = 0; rowIndex < numberOfRows.value; rowIndex++) {
            const gridPosition = document.getElementById(`row-${rowIndex}-column-${columnIndex}`);
            gridPosition.addEventListener("click", columnClick.bind(null, columnIndex));
        }
    }

    // Bind the click event for the reset button.
    resetButton.style.display = 'inline-block'
    resetButton.addEventListener("click", resetClick);
}

const startButton = document.getElementById("start-game");
startButton.addEventListener("click",createGamePage);

// Initialize 
let player1Name
let player2Name
let firstPlayer = "red"
let secondPlayer = "blue"
let winner = false
let currentTurn = firstPlayer
let potentialWinner
let gameOver = false
let gameScore1 
let gameScore2
let grid
const numberOfRows = document.getElementById("row-number=dropdown");
const numberOfCols =  document.getElementById("col-number=dropdown");
const Container = document.getElementById("container");
const name1Box = document.getElementById("p1")
const name2Box = document.getElementById("p2")
const name1Label = document.getElementById("p1Label")
const name2Label = document.getElementById("p2Label")
const highscoreTableLabel = document.getElementById("highscore-table-label")
const resetButton = document.getElementById("reset-button");
let playerLog = []
