const Validator = require('../../util/field-validator')
const User = require('../../datatypes/user')
const Session = require('../../datatypes/session')
const Error = require('../../util/error')

module.exports = (req, res) => {
  var username = req.body.username
  var password = req.body.password

    // Require a username and password
  if (!username || !password) {
    return Error.respondJson(res, 22)
  }

    // Check for valid username
  if (!Validator.username(username)) {
    return Error.respondJson(res, 17)
  }

    // Check for valid password
  if (!Validator.password(password)) {
    return Error.respondJson(res, 19)
  }

    // Validate the credentials
  User.validateCredentials(res, username, password, (validCredentials) => {
        // In case of invalid credentials
    if (!validCredentials) {
      return Error.respondJson(res, 23)
    }

        // Otherwise, we can start the session
    var session = Session.generate(req, res, username, (session) => {
      res.json(session)
    })
  })
}
