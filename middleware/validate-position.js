const error = require('../util/error')
const validator = require('../util/validator')

// Middleware for validating the provided position for a move
module.exports = (req, res, next) => {
    // Extract the position information
  var position = +req.body.position

    // Check position presence
  if (req.body.position === null || req.body.position === undefined) {
    error.respondJson(res, 12)
    return
  }

    // Check position value
  if (!validator.validPosition(position)) {
    error.respondJson(res, 13)
    return
  }

    // Update the stored position
  req.body.position = position

  next()
}
