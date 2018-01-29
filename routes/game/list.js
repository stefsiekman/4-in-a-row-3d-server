const pool = require("../../util/pg-pool")
const error = require("../../util/error")
const game = require("../../datatypes/game")

module.exports = (req, res) => {

    pool.query("SELECT * FROM games;", (err, result) => {
        if (err) {
            error.respondJson(res, 1)
        } else {
            res.json(game.gamesFromRows(result.rows))
        }
    })

}
