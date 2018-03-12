const Error = require("../util/error")
// This middleware evaluates the Authorization header, and sets the req.session object accordingly

module.exports = (required, userAuthOK, aiAuthOK) => {

  function exitAuthCheck(req, res, next, errorCode) {
    // Return an error or go on depending on whether required
    if (required) {
      Error.respondJson(res, errroCode)
    } else {
      next()
    }
  }

  // We want the ability to set whether session authentication is required for this route
  return (req, res, next) => {

    var header = req.get("Authorization")
    var headerParts = header.split(/\s+/)

    // Authentication always requires two parts
    if (headerParts.length != 2) {
      // We have an invalid authorization header
      return exitAuthCheck(req, res, next, 24)
    }

    // Name the parts of the authorization header
    var authType = headerParts[0]
    var authToken = headerParts[1]

    // Authentication must be either user or AI type
    if (!["user", "ai"].includes(authType)) {
      // Invalid authentication type
      return exitAuthCheck(req, res, next, 25)
    }

  }

}
