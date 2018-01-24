const express = require("express")
const pg = require("pg")
const error = require("../../util/error")
const ai = require("../../datatypes/ai")
const router = express.Router()

router.get("/", (req, res) => {
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
})

module.exports = router
