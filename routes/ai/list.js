const pool = require("../../util/pg-pool")
const AI = require("../../datatypes/ai").AI

module.exports = (req, res) => {

    AI.list(res, (ais) => {
        res.json(ais)
    })

}
