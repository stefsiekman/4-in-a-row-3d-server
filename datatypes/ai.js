const pool = require("../util/pg-pool")
const error = require("../util/error")

// Class for the AI datatype
class AI {

    constructor(id, name) {
        this.id = id
        this.name = name
    }

    static list(res, callback) {
        pool.query("SELECT * FROM ais ORDER BY id DESC;", (err, result) => {
            // Check for errors
            if (err) {
                error.respondJson(res, 1, err)
                return
            }

            // Add all the AIs
            var ais = []
            result.rows.forEach((row) => ais.push(this.fromRow(row)))
            callback(ais)
        })
    }

    static fromRow(row) {
        return new AI(row.id, row.name)
    }

}

module.exports = {

    // Export the class
    AI: AI,

    // Method for extracting a list of AI instances from database rows
    aisFromRows: (rows) => {
        // Clear empty array
        var ais = []

        // Fill the array with AIs
        for (row of rows) {
            ais.push(new AI(row.id, row.name))
        }

        // Return as list of instances
        return ais
    }

}
