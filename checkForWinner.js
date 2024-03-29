/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

function getNextElement(current_row,current_col,current_trend){

    switch(current_trend) {
        case "left":
            rowToCheck = current_row
            colToCheck = current_col-1
            break;
        case "right":
            rowToCheck = current_row
            colToCheck = current_col+1
            break;
        case "up":
            rowToCheck = current_row-1
            colToCheck = current_col
            break;
        case "down":
            rowToCheck = current_row+1
            colToCheck = current_col
            break;
        case "diagUpRight":
            rowToCheck = current_row-1
            colToCheck = current_col+1
            break;
        case "diagDownRight":
            rowToCheck = current_row+1
            colToCheck = current_col+1
            break;
        case "diagDownLeft":
            rowToCheck = current_row+1
            colToCheck = current_col-1
            break;
        case "diagUpLeft":
            rowToCheck = current_row-1
            colToCheck = current_col-1
            break;
        default:
          console.log("Error must have occurred, any instance of 'directionString' in this function should not be null")
    }

    return [rowToCheck,colToCheck]
    
}

function patternFinder(direction,numberInPattern,row,col,grid){
    let directionArray = ["left","right","up","down","diagUpRight","diagDownRight","diagDownLeft","diagUpLeft"]
    let rowToCheck
    let colToCheck
    let winnerFound = false
    let goodRow = parseInt(row)
    let goodCol = parseInt(col)
    let winner = 'no one'
    
    // Check neighboring cells - 
    if (direction == null){
        // Check all directions recursively
        for (dir of directionArray){
            numberInPattern = 1
            retArray = patternFinder(dir,numberInPattern,goodRow,goodCol,grid)
            direction = retArray[0]
            numberInPattern = parseInt(retArray[1])
            winnerFound = retArray[4]
            if (winnerFound){
                return retArray
            }
        }

    }else{
        // insert switch-case to find indices of element to check
        checkIndx = getNextElement(row,col,direction)
        rowToCheck = checkIndx[0]
        colToCheck = checkIndx[1]

        if ((rowToCheck<0 || colToCheck<0 || rowToCheck>grid.length-1 || colToCheck>grid[row].length-1)){
            winnerFound = false
            winner = 'no one'
            return [direction,numberInPattern,row,col,winnerFound,winner]
        }else{
            // Check only the relevant term 
            if (grid[rowToCheck][colToCheck]===grid[row][col]){
                numberInPattern++
                if (numberInPattern===4){
                    winnerFound = true
                    winner = grid[row][col]
                    return [direction,numberInPattern,rowToCheck,colToCheck,winnerFound,grid[rowToCheck][colToCheck],winner]
                }else{
                    retArray = patternFinder(direction,numberInPattern,rowToCheck,colToCheck,grid)
                    direction = retArray[0]
                    numberInPattern = parseInt(retArray[1])
                    row = parseInt(retArray[2])
                    col = parseInt(retArray[3])
                    winnerFound = retArray[4]
                    winner = retArray[5]
                }
            }else{
                winnerFound = false
                winner = 'no one'
                return [direction,numberInPattern,row,col,winnerFound,winner]        
            }
        }       
    }
    return [direction,numberInPattern,row,col,winnerFound,winner]
}

function checkForWinner(gridArray,lastMove){
    if (!Array.isArray(gridArray)||lastMove.length!==2){
        throw('checkForWinner(_,_) input parameters are of incorrect type - not arrays')
    } else {
        console.log('input params are OK')
    }
    
    let directionString = null
    let winnerBool = false
    let numberInPattern
    let winner = 'no one'
    let lastMoveRow = lastMove[0]
    let lastMoveCol = lastMove[1]

    numberInPattern = 0
    directionString = null
    numberInPattern = 1

    resultArray = patternFinder(directionString,numberInPattern,lastMoveRow,lastMoveCol,gridArray)
    winnerBool = resultArray[4]
    winner = resultArray[5]
    if (winnerBool===true){
        // Winner was found
        console.log("Winning pattern ends at: " + [resultArray[2],resultArray[3]])
        console.log("Direction is "+ resultArray[0])
        console.log("Number in pattern is:" + resultArray[1])
        console.log(winner+" wins")
    }
    return [winnerBool,winner]
}
