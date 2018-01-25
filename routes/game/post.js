const joinGame = require("../../util/join-game")

module.exports = (req, res) => {

    // Get the id of the AI
    var aiId = +req.body.ai_id

    // Join a game
    joinGame(res, aiId, (game) => {
        res.json(game)
    })

}
