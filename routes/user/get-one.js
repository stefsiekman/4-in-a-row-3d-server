const User = require("../../datatypes/user")
const Error = require("../../util/error")

module.exports = (req, res) => {

    User.getOne(res, req.params["userId"], (user) => {
        // If the user was not found
        if (!user) {
            return Error.respondJson(res, 21)
        }

        res.json(user)
    })

}
