const pg = require("../util/pg-pool")
const error = require("../util/error")
const uuid = require("uuid/v4")
const sha = require("sha256")

class User {

    constructor(username, mail, password) {
        this.username = username
        this.mail = mail
        this.password = password
    }

    // Inserts this user as a new entry to the database, make sure all the validation has already been performed
    insert(res, callback) {
        var salt = sha(uuid())
        var saltedPassword = sha(this.password + salt)

        var sql = "INSERT INTO users(username, mail, password, salt) VALUES($1,$2,$3,$4) RETURNING *;"
        var values = [ this.username, this.mail, saltedPassword, salt ]

        pg.query(sql, values, (err, result) => {
            // Check for errors
            if (err || !result.rows[0]) {
                return error.respondJson(res, 1, err)
            }

            // Save the id of this user
            this.id = result.rows[0].id

            // Remove the password, no need to send that back
            delete this.password

            // Return to the caller
            callback(this)
        })
    }

    static getOne(res, id, callback) {
        var sql = "SELECT * FROM users WHERE id=$1;"
        var values = [ id ]

        pg.query(sql, values, (err, result) => {
            // Check for errors
            if (err) {
                return error.respondJson(res, 1, err)
            }

            // If no user was found
            if (result.rows.length < 1) {
                return callback(undefined)
            }

            // Otherwise, create and strip the user
            var user = this.fromRow(result.rows[0])
            delete user.mail
            callback(user)
        })
    }

    static fromRow(row) {
        var user = new User(row.username, row.mail, undefined)
        delete user.password
        return user
    }

    static isUsernameAvailable(res, username, callback) {
        // Select the users from the database the with give username
        var sql = "SELECT username FROM users WHERE username = $1"
        var values = [ username ]
        pg.query(sql, values, (err, res) => {
            // Check for errors
            if (err) {
                return error.respondJson(res, 1)
            }

            // Return to the callback whether a user with the username is in the database
            if (res.rows[0]) {
                callback(false)
            } else {
                callback(true)
            }
        })
    }

}

module.exports = User
