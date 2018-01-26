const pg = require("pg")
const ai = require("../../datatypes/ai")
const error = require("../../util/error")

module.exports = (req, res) => {

    console.log("Getting one ai", req.params.aiId)

    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
        if (err) {
            error.respondJson(res, 1)
            done()
        } else {
            var sql = "SELECT * FROM ais WHERE id = $1;"
            var values = [ req.params.aiId ]
            client.query(sql, values, (err, result) => {
                done()

                if (err) {
                    error.respondJson(res, 1)
                } else if (!result.rows[0]) {
                    error.respondJson(res, 15)
                } else {
                    res.json(ai.aisFromRows(result.rows)[0])
                }
            })
        }
    })

}
