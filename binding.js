/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function resetGameVars(){
    // Number of rows and columns
    let numberOfRows = document.getElementById("row-number=dropdown");
    let numberOfCols =  document.getElementById("col-number=dropdown");
 
    gameScore1 = numberOfCols.value*numberOfRows.value
    gameScore2 = numberOfCols.value*numberOfRows.value

    grid = [];
    for (let i = 0; i < numberOfRows.value; i++) {
         grid[i] = [];
         for (let j = 0; j < numberOfCols.value; j++){
            grid[i][j] = null
         }
    }

    firstPlayer = "red"
    secondPlayer = "blue"

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
                if (potentialWinner==firstPlayer&&gameScore1>highScore){
                    highScore = gameScore1
                    //Add to table
                    let nameCell = document.createElement("td")
                    let hsCell = document.createElement("td")
                    let newRow = document.createElement("tr")

                    nameCell.innerHTML = player1Name
                    hsCell.innerHTML = highScore
                    newRow.append(nameCell)
                    newRow.append(hsCell)

                    document.getElementById("highscore-table-entries").appendChild(newRow)
                }
                if (potentialWinner==secondPlayer&&gameScore2>highScore){
                    highScore = gameScore2
                    let nameCell = document.createElement("td")
                    let hsCell = document.createElement("td")
                    let newRow = document.createElement("tr")

                    nameCell.innerHTML = player2Name
                    hsCell.innerHTML = highScore
                    newRow.append(nameCell)
                    newRow.append(hsCell)

                    document.getElementById("highscore-table-entries").appendChild(newRow)
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

    // Number of rows and columns
    let numberOfRows = document.getElementById("row-number=dropdown");
    let numberOfCols =  document.getElementById("col-number=dropdown");
 
    gameScore1 = numberOfCols.value*numberOfRows.value
    gameScore2 = numberOfCols.value*numberOfRows.value

    grid = [];
    for (let i = 0; i < numberOfRows.value; i++) {
         grid[i] = [];
         for (let j = 0; j < numberOfCols.value; j++){
            grid[i][j] = null
         }
    }

    Container.style.setProperty('--grid-rows', numberOfRows.value);
    Container.style.setProperty('--grid-cols', numberOfCols.value);

    for (rowIndex = 0; rowIndex < numberOfRows.value; rowIndex++) {
        for (columnIndex = 0; columnIndex < numberOfCols.value; columnIndex++) {
            let cell = document.createElement("div");
            cell.setAttribute("id",`row-${rowIndex}-column-${columnIndex}`);

            container.appendChild(cell).className = "grid-item";
        }
    }
    return [numberOfRows.value,numberOfCols.value]
}


function createGamePage(){
    const name1Box = document.getElementById("p1")
    const name2Box = document.getElementById("p2")
    const name1Label = document.getElementById("p1Label")
    const name2Label = document.getElementById("p2Label")
    const highscoreTableLabel = document.getElementById("highscore-table-label")

    player1Name = name1Box.value
    player2Name = name2Box.value

    if (player1Name == ""){
        player1Name = "Player 1"
    }
    if (player2Name == ""){
        player2Name = "Player 2"
    }

    name1Box.style.display = "none"
    name1Label.style.display = "none"
    name2Box.style.display = "none"
    name2Label.style.display = "none"

    highscoreTableLabel.style.display = "block"

    let dims = createGrid()

    gameOver = false
    // Bind the click events for the grid.
    for (let columnIndex = 0; columnIndex < dims[1]; columnIndex++) {
        for (let rowIndex = 0; rowIndex < dims[0]; rowIndex++) {
            const gridPosition = document.getElementById(`row-${rowIndex}-column-${columnIndex}`);
            gridPosition.addEventListener("click", columnClick.bind(null, columnIndex));
        }
    }

    // Bind the click event for the reset button.
    const resetButton = document.getElementById("reset-button");
    resetButton.style.display = 'block'
    resetButton.addEventListener("click", resetClick);
}


const startButton = document.getElementById("start-game");
startButton.addEventListener("click",createGamePage);


// Initialize variables
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
let highScore = 0
let grid