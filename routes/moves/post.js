const pool = require("../../util/pg-pool")
const error = require("../../util/error")
const movesFromRows = require("../../datatypes/move").movesFromRows
const listMovesByGame = require("../../datatypes/move").listByGame
const mechanics = require("../../util/game-mechanics")

function updateStartedMove(res, game, move, moves, callback) {
    // Prepare and execute query
    var sql = "UPDATE moves SET position=$1, completed=CURRENT_TIMESTAMP "
            + "WHERE id=$2 RETURNING *;"
    var values = [ move.position, move.id ]
    pool.query(sql, values, (err, result) => {
        // Check for errors
        if (err || !result.rows[0]) {
            error.respondJson(res, 1)
            return
        }

        // Update the moves array
        moves[moves.length - 1] = movesFromRows(result.rows)[0]

        // Do checks after move
        afterMoveChecks(res, game, moves, callback)
    })
}

function insertUnstartedMove(res, game, move, prevMove, moves,
        callback) {
    // The SQL is the same for every new move
    var sql = "INSERT INTO moves (game, ai, position, started, completed) "
                + " VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *;"

    // Prepare and execute query
    if (!prevMove) {
        // In case of first move
        values = [ game.id, move.ai, move.position, game.started ]
    } else {
        // In case of move number 2 or later
        values = [ game.id, move.ai, move.position, prevMove.completed ]
    }
    pool.query(sql, values, (err, result) => {
        // Check for errors
        if (err || !result.rows[0]) {
            error.respondJson(res, 1)
            return
        }

        // Update the array of moves
        moves.push(movesFromRows(result.rows)[0])

        // Do checks after move
        afterMoveChecks(res, game, moves, callback)
    })
}

function afterMoveChecks(res, game, moves, callback) {
    game.createBoard(moves)

    // Check if the game is won
    var winner = mechanics.gameIsWon(moves)
    if (winner) {
        // Finish the game with the winner
        game.finishWon(res, winner, () => {
            callback(game, moves)
        })

        return
    }

    // Check if the game is over
    if (mechanics.gameIsOver(moves)) {
        // Finish the game without winner, or give up-er
        game.finishTied(res, () => {
            callback(game, moves)
        })

        return
    }

    // Otherwise, just call the callback
    callback(game, moves)
}

// Posting new moves to a game
module.exports = (req, res) => {

    // Extract important information
    var game = req.params.game
    var aiId = +req.body.ai_id

    // The game must be in progress
    if (game.status != 2) {
        error.respondJson(res, 7)
        return
    }

    // The AI must be one of the playing AIs
    if (aiId != game.ai_a && aiId != game.ai_b) {
        error.respondJson(res, 8)
        return
    }

    var finalCallback = (game, moves) => {
        res.json({
            game: game,
            move: moves[moves.length - 1],
            moves: moves
        })
    }

    // Fetch the move information
    // Fetch the moves from this game
    listMovesByGame(res, game, (moves) => {
        // Check whether move is possible
        if (!mechanics.possibleMove(moves, req.body.move.position)) {
            error.respondJson(res, 14)
            return
        }

        // If there aren't any moves yet
        if (moves.length < 1) {
            // Check that this is AI A
            if (aiId != game.ai_a) {
                error.respondJson(res, 11)
                return
            }

            // Otherwise, this must be the unstarted move of AI A

            insertUnstartedMove(res, game, req.body.move,
                    undefined, [], finalCallback)
        } else {
            // If there are moves already
            var lastMove = moves[moves.length - 1]

            // If we're waiting for the other AI's (started) move
            if (!lastMove.completed && lastMove.ai != aiId) {
                error.respondJson(res, 9)
                return
            }

            // If the other AI hasn't started it's move yet
            if (lastMove.completed && lastMove.ai == aiId) {
                error.respondJson(res, 10)
                return
            }

            // If provided AI turn, and turn was already started
            if (!lastMove.completed && lastMove.ai == aiId) {
                // Update the position of the last move, to update in database
                lastMove.position = +req.body.position

                updateStartedMove(res, game, lastMove, moves,
                    finalCallback)

                return
            }

            // Must be provided AI turn, but the move wasn't started explicitly
            insertUnstartedMove(res, game, req.body.move,
                    lastMove, moves, finalCallback)
        }
    })

}
