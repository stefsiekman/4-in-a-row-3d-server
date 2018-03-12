const express = require('express')
const error = require('../../util/error')
const router = express.Router()

router.get('/', require('./list'))
router.post('/', require('./post'))
router.get('/:aiId(\\d+)', require('./get-one'))

module.exports = router
