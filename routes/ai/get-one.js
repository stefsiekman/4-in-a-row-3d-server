const pool = require("../../util/pg-pool")
const ai = require("../../datatypes/ai")
const error = require("../../util/error")

module.exports = (req, res) => {

    var sql = "SELECT * FROM ais WHERE id = $1;"
    var values = [ req.params.aiId ]
    pool.query(sql, values, (err, result) => {
        if (err) {
            error.respondJson(res, 1)
        } else if (!result.rows[0]) {
            error.respondJson(res, 15)
        } else {
            res.json(ai.aisFromRows(result.rows)[0])
        }
    })

}
