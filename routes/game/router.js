const express = require("express")
const error = require("../../util/error")
const router = express.Router()
const aiAuth = require("../../middleware/ai-authentication")
const validateGame = require("../../middleware/validate-game")

router.get("/", require("./list"))
router.post("/", aiAuth, require("./post"))

router.get("/:gameId", validateGame, require("./get-one"))
router.use("/:gameId/moves", require("../moves/router"))

module.exports = router
