const pool = require('../util/pg-pool')
const error = require('../util/error')

// Class for the Move datatype
class Move {
  constructor (id, game, ai, position, started, completed) {
    this.id = id
    this.game = game
    this.ai = ai
    this.position = position
    this.started = started
    this.completed = completed
  }
}

// Method for extracting a list of Move instances from database rows
function movesFromRows (rows) {
    // Clear empty array
  var moves = []

    // Fill the array with AIs
  for (row of rows) {
    moves.push(new Move(row.id, row.game, row.ai, row.position, row.started,
                row.completed))
  }

    // Return as list of instances
  return moves
}

module.exports = {

    // Export the class
  Move: Move,
  movesFromRows: movesFromRows,

    // Method to list all the moves that belong to a game
  listByGame: (res, game, callback) => {
        // Prepare and execute query
    var sql = 'SELECT * FROM moves WHERE game = $1;'
    var values = [ game.id ]
    pool.query(sql, values, (err, result) => {
      if (err) {
        error.respondJson(res, 1)
      } else {
        callback(movesFromRows(result.rows))
      }
    })
  }

}
