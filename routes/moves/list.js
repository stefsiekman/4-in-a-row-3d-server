const pg = require("pg")
const error = require("../../util/error")
const move = require("../../datatypes/move")

module.exports = (req, res) => {

    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
        if (err) {
            error.respondJson(res, 1)
        } else {
            client.query("SELECT * FROM moves;", (err, result) => {
                done();
                if (err) {
                    error.respondJson(res, 1)
                } else {
                    res.json(move.movesFromRows(result.rows))
                }
            })
        }
    })

}
