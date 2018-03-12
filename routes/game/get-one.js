const pool = require('../../util/pg-pool')
const error = require('../../util/error')
const game = require('../../datatypes/game')

module.exports = (req, res) => {
  req.params.game.loadBoard(res, (game) => {
    game.createPossibleMoves()
    game.createToMoveField()
    res.json(game)
  })
}
