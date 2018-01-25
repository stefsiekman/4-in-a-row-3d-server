// Class for the Game datatype
class Game {

    constructor(id, status, ai_a, ai_b, started) {
        this.id = id
        this.status = status
        this.ai_a = ai_a
        this.ai_b = ai_b
        this.started = started
    }

    createBoard(moves) {
        // Create an empty board
        this.board = []

        // 16 pillar of 4 in height
        for (var pos = 0; pos < 16; pos++) {
            var pillar = []
            for (var y = 0; y < 4; y++) {
                pillar.push(undefined)
            }
            this.board.push(pillar)
        }

        // Plot the moves on the board
        for (move of moves) {
            // Place on next availible spot in pillar
            for (var y = 0; y < 4; y++) {
                if (!this.board[move.position][y]) {
                    this.board[move.position][y] = move.ai
                    break
                }
            }
        }
    }

}

module.exports = {

    // Export the class
    Game: Game,

    // Method for extracting a list of Game instances from database rows
    gamesFromRows: (rows) => {
        // Clear empty array
        var games = []

        // Fill the array with AIs
        for (row of rows) {
            games.push(new Game(row.id, row.status, row.ai_a, row.ai_b,
                row.started))
        }

        // Return as list of instances
        return games
    }

}
