const express = require("express")
const error = require("../../util/error")
const router = express.Router()

router.post("/", require("./post"))

module.exports = router
