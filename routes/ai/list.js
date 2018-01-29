const pool = require("../../util/pg-pool")
const ai = require("../../datatypes/ai")

module.exports = (req, res) => {

    pool.query("SELECT * FROM ais;", (err, result) => {
        if (err) {
            error.respondJson(res, 1)
        } else {
            res.json(ai.aisFromRows(result.rows))
        }
    })

}
