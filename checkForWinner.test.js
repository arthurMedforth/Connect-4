/* eslint-disable no-undef */
const checkWinnerFunc = require('./checkForWinner');

describe('When calling the checkForWinner function', () => {
    test("We return no winner for empty array", () => {
        // Consider descriptive test names:
        // "When place is called on an empty row the counter goes to the bottom of the row"

        // Arrange
        let grid = [
            [null, null, null, null,null,null,null], 
            [null, null, null, null,null,null,null], 
            [null, null, null, null,null,null,null], 
            [null, null, null, null,null,null,null],
            [null, null, null, null,null,null,null],
            [null, null, null, null,null,null,null]
        ];

        let lastTurn = []

        let expectedOutput = [false, 'no one'];

        // Act
        const actualOutput = checkWinnerFunc.checkForWinner(grid,lastTurn);
        // Assert
        expect(actualOutput).toStrictEqual(expectedOutput);
    });

    test("No winner declared when less than 4 counters has been played by either player", () => {
        // Consider descriptive test names:
        // "When place is called on an empty row the counter goes to the bottom of the row"

        // Arrange
        let grid = [
            [null, null, null, null,null,null,null], 
            [null, null, null, null,null,null,null], 
            [null, null, null, null,null,null,null], 
            [null, 'red', null, null,null,null,null],
            [null, 'red', 'blue', null,null,null,null],
            [null, 'red', 'blue', null,null,null,null]
        ];

        let lastTurn = [3,1]

        let expectedOutput = [false, 'no one'];

        // Act
        const actualOutput = checkWinnerFunc.checkForWinner(grid,lastTurn);
        // Assert
        expect(actualOutput).toStrictEqual(expectedOutput);
    });

    test("No winner declared when no space left on board and no winning pattern", () => {
        // Consider descriptive test names:
        // "When place is called on an empty row the counter goes to the bottom of the row"

        // Arrange
        let grid = [
            ['red' , 'blue', 'red' , 'blue','blue','blue','red'], 
            ['blue', 'red' , 'blue', 'red' ,'blue','red' ,'blue'], 
            ['red' , 'blue', 'blue', 'blue','red' ,'blue','blue'], 
            ['blue', 'red' , 'red' , 'blue','red' ,'blue','red'],
            ['red' , 'red' , 'blue', 'red' ,'blue','red' ,'red'],
            ['blue', 'red' , 'blue', 'red' ,'red' ,'blue','red']
        ];

        let lastTurn = [0,0]

        let expectedOutput = [false, 'no one'];

        // Act
        const actualOutput = checkWinnerFunc.checkForWinner(grid,lastTurn);
        // Assert
        expect(actualOutput).toStrictEqual(expectedOutput);
    });

    test("Correct winner declared for horizontal win", () => {
        // Consider descriptive test names:
        // "When place is called on an empty row the counter goes to the bottom of the row"

        // Arrange
        let grid = [
            [null, null, null, null,null,null,null], 
            [null, null, null, null,null,null,null], 
            [null, null, null, null,null,null,null], 
            [null, 'red', null, null,null,null,null],
            [null, 'red', 'blue', null,null,null,null],
            [null, 'red', 'blue', 'blue','blue','blue',null]
        ];

        let lastTurn = [5,5]

        let expectedOutput = [true, 'blue'];

        // Act
        const actualOutput = checkWinnerFunc.checkForWinner(grid,lastTurn);
        // Assert
        expect(actualOutput).toStrictEqual(expectedOutput);
    });

    test("Correct winner declared for vertical win", () => {
        // Consider descriptive test names:
        // "When place is called on an empty row the counter goes to the bottom of the row"

        // Arrange
        let grid = [
            [null, null, null, null,null,null,null], 
            [null, null, null, null,null,null,null], 
            [null, 'red', null, null,null,null,null], 
            [null, 'red', null, null,null,null,null],
            [null, 'red', 'blue', null,null,null,null],
            [null, 'red', 'blue', 'blue','blue','red',null]
        ];

        let lastTurn = [2,1]

        let expectedOutput = [true, 'red'];

        // Act
        const actualOutput = checkWinnerFunc.checkForWinner(grid,lastTurn);
        // Assert
        expect(actualOutput).toStrictEqual(expectedOutput);
    });

    test("Correct winner declared for diagonal win", () => {
        // Consider descriptive test names:
        // "When place is called on an empty row the counter goes to the bottom of the row"

        // Arrange
        let grid = [
            [null, null, null, null,null,null,null], 
            [null, null, null, null,null,null,null], 
            [null, null, null, 'red',null,null,null], 
            [null, 'red', 'red', 'blue',null,null,null],
            [null, 'red', 'blue', 'blue',null,null,null],
            ['red', 'red', 'blue', 'blue','blue','red',null]
        ];

        let lastTurn = [2,3]

        let expectedOutput = [true, 'red'];

        // Act
        const actualOutput = checkWinnerFunc.checkForWinner(grid,lastTurn);
        // Assert
        expect(actualOutput).toStrictEqual(expectedOutput);
    });
});