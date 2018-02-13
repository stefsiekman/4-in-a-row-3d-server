// Middleware to be used with all API requests, to close expired games
module.exports = (req, res, next) => {
     // The request should continue, in case no errors were encountered
     return next()
}
