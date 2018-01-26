const error = require("../util/error")
const sha = require("sha256")
const pg = require("pg")

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

    // Validate the key otherwise
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
        if (err) {
            error.respondJson(res, 1)
            done()
        } else {
            // Prepare the query
            var sql = "SELECT key FROM ais WHERE id = $1;"
            var values = [aiId]

            client.query(sql, values, (err, result) => {
                done()

                if (err) {
                    error.respondJson(res, 1)
                } else {
                    // Check if there is a key match
                    if (result.rows[0] &&
                        result.rows[0].key == sha(aiKey)) {
                        return next()
                    } else {
                        error.respondJson(res, 5)
                    }
                }
            })
        }
    })

}
