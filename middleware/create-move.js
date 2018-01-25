const Move = require("../datatypes/move").Move;
// Middleware for creating a move variable out of the provided information
// Must be added after validate-game, ai-authentication and validate-position
// middleware
module.exports = (req, res, next) => {

    // Extract all posible information
    var id = undefined
    var game = req.params.game.id
    var ai = +req.body.ai_id
    var position = req.body.position
    var started = undefined
    var completed = undefined

    // Save the move
    req.body.move = new Move(id, game, ai, position, started, completed)

    next()

}
