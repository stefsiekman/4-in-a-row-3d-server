const pg = require("pg")
const error = require("../../util/error")
const ai = require("../../datatypes/ai")
const uuid = require("uuid/v4")
const sha = require("sha256")

module.exports = (req, res) => {

    // Validate the provided name
    // TODO: implement name validation
    var name = req.body.name

    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
        if (err) {
            error.respondJson(res, 1)
        } else {
            // Generate a key
            var key = sha(uuid())
            var hashedKey = sha(key)

            // Prepare the statement
            var sql = "INSERT INTO ais (name, key) VALUES ($1, $2) RETURNING *;"
            var values = [name, hashedKey]

            client.query(sql, values, (err, result) => {
                done();
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
    })

}
