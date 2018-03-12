const Error = require('../util/error')
const uuid = require('uuid/v4')
const sha = require('sha256')
const ip = require('../util/ip')
const pg = require('../util/pg-pool')

class Session {
  constructor (username, key, ip, expires) {
    this.username = username
    this.key = key
    this.ip = ip
    this.expires = expires
  }

    // Saves the session as a new session in the database, removes any old sessions of this user first
  insert (res, callback) {
        // First we have to remove any old sessions
    this.removeOldUserSessions(res, () => {
            // Then we can insert the new one
      var sql = 'INSERT INTO sessions (user_id, key, ip) VALUES ((SELECT id FROM users WHERE username=$1),$2,$3)' +
                    ' RETURNING expiration;'
      var values = [ this.username, this.key, this.ip ]
      pg.query(sql, values, (err, result) => {
                // Check for errors
        if (err || !result.rows[0]) {
          return Error.respondJson(res, 1, err)
        }

                // Set the expiration saved in the database
        this.expires = result.rows[0].expiration

                // Callback if required
        if (callback) callback(this)
      })
    })
  }

  removeOldUserSessions (res, callback) {
    var sql = 'DELETE FROM sessions WHERE user_id = (SELECT id FROM users WHERE username = $1)'
    var values = [ this.username ]
    pg.query(sql, values, (err, result) => {
            // Check for errros
      if (err) {
        return Error.respondJson(res, 1, err)
      }

            // Otherwise, we have successfully deleted
      callback()
    })
  }

  static generate (req, res, username, callback) {
    var session = new Session(username, sha(uuid()), ip(req), undefined)
    session.insert(res, callback)
  }
}

module.exports = Session
