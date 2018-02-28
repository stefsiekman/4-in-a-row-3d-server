const express = require("express")
const error = require("../../util/error")
const router = express.Router()

router.post("/", require("./post"))
router.get("/:userId(\\d+)", require("./get-one"))

module.exports = router
