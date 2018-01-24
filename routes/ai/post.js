const error = require("../../util/error")

module.exports = (req, res) => {

    error.respondJson(res, 2)

}
