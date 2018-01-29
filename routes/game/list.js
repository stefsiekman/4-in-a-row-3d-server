const pool = require("../../util/pg-pool")
const error = require("../../util/error")
const Game = require("../../datatypes/game").Game

module.exports = (req, res) => {

    Game.list((games) => {
        res.json(games)
    })

}
