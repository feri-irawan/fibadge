const express = require('express')
const router = express.Router()

// CONTROLLERS
const { index } = require('../controllers/apis')
const visitors = require('../controllers/apis/visitors-async')
// const visitor = require('../controllers/apis/visitors')

// MAIN
router.get('/', index)

// VISITOR
router.get('/visitors', visitors.index)
router.get('/visitors/:username', visitors.user)
router.get('/visitors/:username/:repo', visitors.findRepo)

const apisRouter = router
module.exports = apisRouter
