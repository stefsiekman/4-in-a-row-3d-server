const pg = require("pg")
const ai = require("../../datatypes/ai")

module.exports = (req, res) => {

    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
        if (err) {
            error.respondJson(res, 1)
        } else {
            client.query("SELECT * FROM ais WHERE id=1;", (err, result) => {
                done();
                if (err) {
                    error.respondJson(res, 1)
                } else {
                    res.json(ai.aisFromRows(result.rows))
                }
            })
        }
    })

}
