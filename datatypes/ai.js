const pool = require('../util/pg-pool')
const Game = require('./game').Game
const error = require('../util/error')

// Class for the AI datatype
class AI {
  constructor (id, name) {
    this.id = id
    this.name = name
  }

  listGames (res, callback) {
    var sql = 'SELECT * FROM games WHERE ai_a=$1 OR ai_b=$1 ORDER BY id DESC;'
    pool.query(sql, [this.id], (err, result) => {
            // Check for errors
      if (err) {
        error.respondJson(res, 1, err)
        return
      }

            // Add all the AIs
      var games = []
      result.rows.forEach((row) => games.push(Game.fromRow(row)))
      callback(games)
    })
  }

  static list (res, callback) {
    pool.query('SELECT * FROM ais ORDER BY id DESC;', (err, result) => {
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

  static fromRow (row) {
    return new AI(row.id, row.name)
  }

  static getById (res, id, callback) {
    pool.query('SELECT * FROM ais WHERE id = $1;', [id], (err, result) => {
            // Check for errors
      if (err) {
        error.respondJson(res, 1, err)
        return
      }

            // Check if there is even something found
      if (!result.rows[0]) {
        callback(undefined)
      } else {
                // Otherwise, return an AI instance
        callback(this.fromRow(result.rows[0]))
      }
    })
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
