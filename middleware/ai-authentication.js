const pool = require("../util/pg-pool")
const error = require("../util/error")
const sha = require("sha256")

// Middleware for varifying the provided AI id
module.exports = (req, res, next) => {

    // Extact the provided details
    var aiId = +req.body.ai_id
    var aiKey = req.body.ai_key

    // Return an error in case of missing information
    if (!aiId || !aiKey) {
        error.respondJson(res, 4)
        return
    }

    // Prepare the query
    var sql = "SELECT key FROM ais WHERE id = $1;"
    var values = [aiId]

    pool.query(sql, values, (err, result) => {
        if (err) {
            error.respondJson(res, 1)
        } else {
            // Check if there is a key match
            if (result.rows[0] &&
                result.rows[0].key == sha(aiKey)) {
                next()
            } else {
                error.respondJson(res, 5)
            }
        }
    })

}
