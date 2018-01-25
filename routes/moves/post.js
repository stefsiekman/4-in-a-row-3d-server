const pg = require("pg")
const error = require("../../util/error")
const movesFromRows = require("../../datatypes/move").movesFromRows
const listMovesByGame = require("../../datatypes/move").listByGame

function updateStartedMove(res, client, move, callback) {
    // Prepare and execute query
    var sql = "UPDATE moves SET position=$1, completed=CURRENT_TIMESTAMP "
            + "WHERE id=$2 RETURNING *;"
    var values = [ move.position, move.id ]
    client.query(sql, values, (err, result) => {
        // Check for errors
        if (err || !result.rows[0]) {
            error.respondJson(res, 1)
            return
        }

        // Nothing to do, just call callback
        callback(movesFromRows(result.rows)[0])
    })
}

function insertUnstartedMove(res, client, game, move, prevMove, callback) {
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
    client.query(sql, values, (err, result) => {
        // Check for errors
        if (err || !result.rows[0]) {
            error.respondJson(res, 1)
            return
        }

        // Nothing to do, just call callback
        callback(movesFromRows(result.rows)[0])
    })
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

    // Fetch the move information
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
        // Check for errors
        if (err) {
            error.respondJson(res, 1)
            return
        }

        // Fetch the moves from this game
        listMovesByGame(res, client, game, (moves) => {
            // If there aren't any moves yet
            if (moves.length < 1) {
                // Check that this is AI A
                if (aiId != game.ai_a) {
                    error.respondJson(res, 11)
                    return
                }

                // Otherwise, this must be the unstarted move of AI A

                insertUnstartedMove(res, client, game, req.body.move,
                        undefined, (insertedMove) => {
                    res.json(insertedMove)
                })
            } else {
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

                    updateStartedMove(res, client, lastMove, (updatedMove) => {
                        // Send the updated move to the client
                        res.json(updatedMove)
                    })

                    return
                }

                // Must be provided AI turn, but the move wasn't started explicitly
                insertUnstartedMove(res, client, game, req.body.move,
                        lastMove, (insertedMove) => {
                    res.json(insertedMove)
                })
            }
        })
    })

}
