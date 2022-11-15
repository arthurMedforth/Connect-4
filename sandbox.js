/* eslint-disable no-unused-vars */
/* let hashMap = new Map([])

console.log("Printing whole hash map...")
hashMap["Arthur"] = 14;

console.log(hashMap)

console.log("Hashmap entries")
console.log(hashMap[14])

console.log(hashMap.keySet())
 */
function reorderObjects(a,b) {
    if (a.highscore < b.highscore){
        return 1;
    } else if (a.highscore > b.highscore){
        return -1;
    } else {
        return 0;
    }
}

class connect4Player{
    constructor(name, highscore=0, wins=0, gamesPlayed=0){
        this.name = name
        this.highscore = highscore
        this.wins = wins
        this.gamesPlayed = gamesPlayed
    }
}

let playerLog = []
// Check if name in current object array
let player1 = new connect4Player("Arthur")
let player2 = new connect4Player("Jonny")
let player3 = new connect4Player("Michael")
let player4 = new connect4Player("Seth")
let player5 = new connect4Player("Ben")

player1.highscore = 31
player2.highscore = 35
player3.highscore = 34
player4.highscore = 31
player5.highscore = 28

playerLog.push(player1,player2,player3,player4,player5)
playerLog.sort(reorderObjects);
console.log(playerLog)

/* 
const arr = [101, 102, 103];
const index = [1, 0, 2];

const output = index.map(i => arr[i]);
console.log(output);
 */

  
