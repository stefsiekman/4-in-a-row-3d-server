const pool = require("../../util/pg-pool")
const error = require("../../util/error")
const validator = require("../../util/validator")
const ai = require("../../datatypes/ai")
const uuid = require("uuid/v4")
const sha = require("sha256")

module.exports = (req, res) => {

    // Validate the provided name
    var name = req.body.name
    if (!validator.validAIName(name)) {
        error.respondJson(res, 3)
        return
    }

    // Generate a key
    var key = sha(uuid())
    var hashedKey = sha(key)

    // Prepare the statement
    var sql = "INSERT INTO ais (name, key) VALUES ($1, $2) RETURNING *;"
    var values = [name, hashedKey]

    pool.query(sql, values, (err, result) => {
        if (err) {
            error.respondJson(res, 1)
        } else {
            res.json({
                id: result.rows[0].id,
                name: result.rows[0].name,
                key: key
            })
        }
    })

}
