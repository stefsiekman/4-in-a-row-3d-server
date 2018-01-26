const pg = require("pg")
const error = require("./error")

function joinExistingGame(res, aiId, game, client, callback) {
    // Prepare the query
    var sql = "UPDATE games SET status=2, ai_b=$1 WHERE id=$2 RETURNING *;";
    var values = [ aiId, game.id ]

    // Execute!!
    client.query(sql, values, (err, result) => {
        // Check for errors
        if (err) {
            error.respondJson(res, 1)
            done()
            return
        }

        // Return the updated game
        callback(result.rows[0])
    })
}

function joinNewGame(res, aiId, client, callback) {
    // Prepare the query
    var sql = "INSERT INTO games (ai_a) VALUES ($1) RETURNING *;";
    var values = [ aiId ]

    // Execute!!
    client.query(sql, values, (err, result) => {
        // Check for errors
        if (err) {
            error.respondJson(res, 1)
            done()
            return
        }

        // Return the updated game
        callback(result.rows[0])
    })
}

// Method to get next possible game to join
module.exports = (res, aiId, callback) => {

    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
        // Check whether to send an error message
        if (err) {
            throw err
            error.respondJson(res, 1)
            done()
            return
        }

        // Get all the open games (should be 1 or 0)
        var sql = "SELECT * FROM games WHERE status=1 AND ai_b IS NULL "
                + "AND ai_a != $1;"
        var values = [ aiId ]
        client.query(sql, values, (err, result) => {
            // Check for errors
            if (err) {
                error.respondJson(res, 1)
                done()
                return
            }

            // Callback for when a game is joined
            var gameJoinedCallback = (game) => {
                done()
                callback(game)
            }

            // If something is returned, that game can be joined
            if (result.rows[0]) {
                joinExistingGame(res, aiId, result.rows[0], client,
                    gameJoinedCallback)
            } else {
                joinNewGame(res, aiId, client, gameJoinedCallback)
            }
        })
    })

}
