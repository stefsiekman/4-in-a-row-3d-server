const pool = require('../../util/pg-pool')
const error = require('../../util/error')
const move = require('../../datatypes/move')

module.exports = (req, res) => {
  move.listByGame(res, req.params.game, (moves) => {
    res.json(moves)
  })
}
