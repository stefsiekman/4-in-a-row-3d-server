const express = require("express")
const pg = require("pg")
const router = express.Router()

router.get("/", (req, res) => {
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
        client.query("SELECT * FROM ais;", (err, result) => {
            done();
            if (err) {
                console.error(err)
                res.json({
                    error_code: 1,
                    error_message: "Database connection error"
                })
            } else {
                res.json(result.rows)
            }
        })
    })
})

module.exports = router
