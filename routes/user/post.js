const User = require('../../datatypes/user')
const Validator = require('../../util/field-validator')
const Error = require('../../util/error')

module.exports = (req, res) => {
    // Get the posted information
  var username = req.body.username
  var mail = req.body.mail
  var password = req.body.password

    // Make sure that all the fields are valid strings
  var stringFields = [ username, mail, password ]
  if (!Validator.requireNonEmptyStrings(stringFields)) {
    return Error.respondJson(res, 16)
  }

    // Validate the username
  if (!Validator.username(username)) {
    return Error.respondJson(res, 17)
  }

    // Validate the mail
  if (!Validator.mail(mail)) {
    return Error.respondJson(res, 18)
  }

    // Validate the password
  if (!Validator.password(password)) {
    return Error.respondJson(res, 19)
  }

  User.isUsernameAvailable(res, username, (usernameAvailable) => {
        // Give an error message if the username is taken
    if (!usernameAvailable) {
      return Error.respondJson(res, 20)
    }

        // Create the new user, and save to the database
    var user = new User(username, mail, password)
    user.insert(res, (user) => {
            // In case of success, we just want to send the user back
      res.json(user)
    })
  })
}
