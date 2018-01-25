const express = require("express")
const error = require("../../util/error")
const router = express.Router()

router.get("/", require("./list"))
router.post("/", require("../../util/ai-authentication"), require("./post"))

module.exports = router
