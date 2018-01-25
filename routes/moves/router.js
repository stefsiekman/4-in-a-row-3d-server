const express = require("express")
const error = require("../../util/error")
const router = express.Router({ mergeParams: true })
const validateGame = require("../../middleware/validate-game")
const validatePosition = require("../../middleware/validate-position")
const createMove = require("../../middleware/create-move")
const aiAuth = require('../../middleware/ai-authentication')

router.get("/", validateGame, require("./list"))
router.post("/", validateGame, aiAuth, validatePosition, createMove,
        require("./post"))

module.exports = router
