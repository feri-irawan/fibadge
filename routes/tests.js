const express = require('express')
const router = express.Router()

// CONTROLLERS
const { index } = require('../controllers/tests')

// MAIN
router.get('/', index)

const testsRouter = router
module.exports = testsRouter
