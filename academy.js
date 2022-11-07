
// Make your changes to store and update game state in this file
let firstPlayer = "nought"
let secondPlayer = "cross"
let moveCount = 0
let turn = firstPlayer
let continuePlayBool = true
let board = [[null, null, null], 
             [null, null, null], 
             [null, null, null]];
             
let randomComputer=null
let flipRandom=null
let cleverComputer=null
console.log(randomComputer===null&&flipRandom===null)
const element = document.getElementById("mode");
let player1Name
let player2Name
element.addEventListener("change", (e) => {
    const value = e.target.value;
    const text = element.options[element.selectedIndex].text;
    console.log(text)
    if (randomComputer===null&&flipRandom===null){
        if (text==="Random Computer"){
            document.getElementById("userInput2").style.display = 'none';
            document.getElementById("userInput2Label").style.display = 'none';
            document.getElementById("userInput2SubBut").style.display = 'none';

            randomComputer = true
            flipRandom = true
        }else if(text==="Two player"){
            randomComputer = false
            flipRandom = false
        }else{
            console.log('error')
        }
    
        if (value) {
          document.getElementById("pick").textContent = `Playing in mode: ${value}`;
        } else {
          document.getElementById("pick").textContent = "";
        }
    }else{
        
    }
    
});

function othername1() {
    player1Name = document.getElementById("userInput1").value;
    console.log(player1Name);
}
function othername2() {
    player2Name = document.getElementById("userInput2").value;
    console.log(player2Name);
}


  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
  
function getRandomMove(board){
    //pick two random numbers between 0 and 2
    let randRow = randomIntFromInterval(0, 2)
    let randCol = randomIntFromInterval(0, 2)
    if (board[randRow][randCol]===null){
        return [randRow,randCol]
    }else{
        returnAnswer = getRandomMove(board)
    }
    return returnAnswer
}

function getCleverMove(board){
    // First check that you aren't one away from winning
    // Loop rows and columns

}

function takeTurn(row, column) {

    console.log("takeTurn was called with row: "+row+", column:"+column);    
    if (board[row][column]===null&&moveCount<=9&&continuePlayBool){
        board[row][column] = turn
        turn = turn === firstPlayer ? secondPlayer:firstPlayer
        moveCount++
        if (flipRandom&&moveCount>1){
            randomComputer = !randomComputer
        }
    }
}

function checkForDiagonalWin(board){
    if (board[0][0]==="nought"&&board[1][1]==="nought"&&board[2][2]==="nought"||board[2][0]==="nought"&&board[1][1]==="nought"&&board[0][2]==="nought"){
        return player1Name
    }else if(board[0][0]==="cross"&&board[1][1]==="cross"&&board[2][2]==="cross"||board[2][0]==="cross"&&board[1][1]==="cross"&&board[0][2]==="cross"){
        if (flipRandom){
            return "Computer"
        }else{
            return player2Name
        }
    }else{
        return "no diagonal winner"
    }

}

function checkForHorizontalWin(board){
    for (rowIndex in board){
        if (JSON.stringify(board[rowIndex]) === JSON.stringify(['nought','nought','nought'])){
            return player1Name
        }else if((JSON.stringify(board[rowIndex]) === JSON.stringify(['cross','cross','cross']))){
            if (flipRandom){
                return "Computer"
            }else{
                return player2Name
            }
        }else{
            continue
        }
    }
    return "no horizontal winner"
}

function checkForVerticalWin(board){
    for (colIndex in board){
        if (board[0][colIndex]==="nought"&&board[1][colIndex]==="nought"&&board[2][colIndex]==="nought"){
            return player1Name
        }else if(board[0][colIndex]==="cross"&&board[1][colIndex]==="cross"&&board[2][colIndex]==="cross"){
            if (flipRandom){
                return "Computer"
            }else{
                return player2Name
            }
        }else{
            continue
        }
    }
    return "no vertical winner"
}

// Return either "noughts", "crosses" or "nobody" if the game is over.
// Otherwise return null to continue playing.
function checkWinner() {
    console.log("checkWinner was called");
    let returnMessage 
    returnMessage = checkForDiagonalWin(board)
    returnMessage = returnMessage === "no diagonal winner" ? null:returnMessage
    if (returnMessage===null){
        returnMessage = checkForHorizontalWin(board)
        returnMessage = returnMessage === "no horizontal winner" ? null:returnMessage
        if (returnMessage===null){
            returnMessage = checkForVerticalWin(board)
            returnMessage = returnMessage === "no vertical winner" ? null:returnMessage
        }
    }
    if (returnMessage!=null){
        continuePlayBool = false        
    }else if(moveCount==9){
        returnMessage="nobody"
    }else{
        returnMessage = null
    }
    return returnMessage;
}

// Set the game state back to its original state to play another game.
function resetGame() {
    document.getElementById("mode").selectedIndex = 0;
    randomComputer=null
    flipRandom=null
    cleverComputer=null
    moveCount = 0
    continuePlayBool = true
    turn = firstPlayer
    console.log("resetGame was called");
    board = [[null, null, null], 
             [null, null, null], 
             [null, null, null]];
}

// Return the current board state with either a "nought" or a "cross" in
// each position. Put a null in a position that hasn't been played yet.
function getBoard() {
    console.log("getBoard was called");
    return board;
}

if (typeof exports === 'object') {
    console.log("Running in Node")
    // Node. Does not work with strict CommonJS, but only CommonJS-like 
    // environments that support module.exports, like Node.
    module.exports = {
        takeTurn,
        checkWinner,
        resetGame,
        getBoard,
    }
} else {
    console.log("Running in Browser")
}
