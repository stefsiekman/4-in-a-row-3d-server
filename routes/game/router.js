const express = require("express")
const error = require("../../util/error")
const router = express.Router()
const aiAuth = require("../../middleware/ai-authentication")

router.get("/", require("./list"))
router.post("/", aiAuth, require("./post"))

router.use("/:gameId/moves", require("../moves/router"))

module.exports = router
