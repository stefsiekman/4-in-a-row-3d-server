const pool = require('../util/pg-pool')
const error = require("../util/error")
const listMovesByGame = require("./move").listByGame

// Class for the Game datatype
class Game {

    constructor(id, status, ai_a, ai_b, started, winner, gaveup) {
        this.id = id
        this.status = status
        this.ai_a = ai_a
        this.ai_b = ai_b
        this.started = started
        this.winner = winner
        this.gaveup = gaveup
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
        for (let move of moves) {
            // Place on next availible spot in pillar
            for (var y = 0; y < 4; y++) {
                if (!this.board[move.position][y]) {
                    this.board[move.position][y] = move.ai
                    break
                }
            }
        }

        return this.board
    }

    createPossibleMoves() {
        if (!this.board) {
            console.error("Could not generate possible moves, not game board generated")
            return
        }

        this.possible_moves = []

        // Add all the non-full pillars to the possible moves list
        for (var pillar = 0; pillar < 16; pillar++) {
            if (!this.board[pillar][3]) {
                this.possible_moves.push(pillar)
            }
        }
    }

    createToMoveField() {
        // Only set the field if the game is in progress
        if (!this.status == 2) {
            return
        }

        if (!this.moves) {
            console.error("Could not generate the to move field, without the game's moves loaded")
            return
        }

        // If no moves have been made, set ai A
        if (this.moves.length < 1) {
            this.to_move = this.ai_a
        } else {
            // Otherwise, the opposite of the last move
            var lastMove = this.moves[this.moves.length - 1]
            var lastAi = lastMove.ai
            this.to_move = lastAi == this.ai_a ? this.ai_b : this.ai_a
        }
    }

    loadBoard(res, callback) {
        listMovesByGame(res, this, (moves) => {
            this.createBoard(moves)
            this.moves = moves
            callback(this)
        })
    }

    finishTied(res, callback) {
        // Prepare and execute query
        var sql = "UPDATE games SET status=3 WHERE id=$1 RETURNING *;"
        var values = [ this.id ]
        pool.query(sql, values, (err, result) => {
            // Check for errors
            if (err || !result.rows[0]) {
                error.respondJson(res, 1)
                return
            }

            // Update this instance's status, and call callback
            this.status = 3
            callback()
        })
    }

    finishWon(res, winner, callback) {
        // Prepare and execute query
        var sql = "UPDATE games SET status=3, winner=$1 WHERE id=$2 "
                + "RETURNING *;"
        var values = [ +winner, this.id ]
        pool.query(sql, values, (err, result) => {
            // Check for errors
            if (err || !result.rows[0]) {
                error.respondJson(res, 1)
                return
            }

            // Update this instance's status, and call callback
            this.status = 3
            this.winner = winner
            callback()
        })
    }

    // Function to list all the games in the database
    static list(res, callback) {
        pool.query("SELECT * FROM games ORDER BY id DESC;", (err, result) => {
            // Check for errors
            if (err) {
                error.respondJson(res, 1, err)
                return
            }

            // Add all the rows
            var games = []
            result.rows.forEach((row) => games.push(this.fromRow(row)))

            callback(games)
        })
    }

    static getById(res, id, callback) {
        pool.query("SELECT * FROM games WHERE id=$1;", [id], (err, result) => {
            // Check for errors
            if (err) {
                error.respondJson(res, 1, err)
                return
            }

            // Check if there is no game found
            if (!result.rows[0]) {
                callback(undefined)
            } else {
                callback(this.fromRow(result.rows[0]))
            }
        })
    }

    static fromRow(row) {
        return new Game(row.id, row.status, row.ai_a, row.ai_b, row.started, row.winner, row.gaveup)
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
                row.started, row.winner, row.gaveup))
        }

        // Return as list of instances
        return games
    }

}
