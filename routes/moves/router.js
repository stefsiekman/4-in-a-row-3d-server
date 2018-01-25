const express = require("express")
const error = require("../../util/error")
const router = express.Router({ mergeParams: true })
const validateGame = require("../../middleware/validate-game")

router.get("/", validateGame, require("./list"))

module.exports = router
