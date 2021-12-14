const express = require('express')
const router = express.Router()

// CONTROLLERS
const { index } = require('../controllers/badges')
const clones = require('../controllers/badges/clones')
const visitors = require('../controllers/badges/visitors-async')
// const visitors = require('../controllers/badges/visitors')

// MAIN
router.get('/', index)

// CLONES
router.get('/clones', clones.index)
router.get('/clones/:username/:repo/:token', clones.clonesBadge)

// VISITOR
router.get('/visitors', visitors.index)
router.get('/visitors/:username', visitors.user)
router.get('/visitors/:username/:repo', visitors.visitorBadge)

const badgesRouter = router
module.exports = badgesRouter
