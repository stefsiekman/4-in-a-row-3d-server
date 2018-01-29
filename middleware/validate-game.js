const pool = require("../util/pg-pool")
const error = require("../util/error")
const game = require("../datatypes/game")

module.exports = (req, res, next) => {

    // Get the game id
    var gameId = +req.params.gameId

    // Game id is required
    if (!gameId) {
        error.respondJson(res, 6)
        return
    }

    // Prepare and execute query
    var sql = "SELECT * FROM games WHERE id=$1;"
    var values = [ gameId ]
    pool.query(sql, values, (err, result) => {
        // Check for errors
        if (err) {
            error.respondJson(res, 1)
            return
        }

        // Go to next, or give 404
        if (result.rows[0]) {
            // Update the parameters to add game instance
            req.params.game = game.gamesFromRows(result.rows)[0]

            next()
        } else {
            res.status(404).end()
        }
    })

}
