const pg = require("pg")
const error = require("../../util/error")
const game = require("../../datatypes/game")

module.exports = (req, res) => {

    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
        if (err) {
            error.respondJson(res, 1)
        } else {
            client.query("SELECT * FROM games;", (err, result) => {
                done();
                if (err) {
                    error.respondJson(res, 1)
                } else {
                    res.json(game.gamesFromRows(result.rows))
                }
            })
        }
    })

}
