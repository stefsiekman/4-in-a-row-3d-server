const Game = require("../datatypes/game").Game
const generateRows = require("../util/row-generator")

function getWinner(rows) {
    var winner = undefined

    for (row of rows) {
        // The first AI should be in all four
        var aiToCheck = row[0]

        // If first is undefined, the AI can't have won this row
        if (!aiToCheck) continue

        // Balls 1, 2, 3 must also be the same as the one to check
        var allSameAi = true
        for (var i = 1; allSameAi && i < 4; i++) {
            allSameAi &= row[i] == aiToCheck
        }

        // If we find four in a row, declare the winner
        if (allSameAi) {
            winner = aiToCheck
            break
        }
    }

    return winner
}

module.exports = {

    // Function to check whether a move at a certain position is possible
    possibleMove: (moves, position) => {
        var count = 0

        // Check if there are already 4 balls at the position
        for (move of moves) {
            if (move.position == position) {
                count++
            }
        }

        return count < 4
    },

    gameIsOver: (moves) => {
        return moves.length >= 4 * 4 * 4
    },

    gameIsWon: (moves) => {
        // Create a board
        var board = new Game().createBoard(moves)

        // Generate all possible rows
        var rows = generateRows(board)

        // Return if there is a winner
        return getWinner(rows)
    }

}
