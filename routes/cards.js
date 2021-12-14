const express = require('express')
const router = express.Router()

// CONTROLLERS
const repo = require('../controllers/cards/repository')

// REPOSITORY
router.get('/github/repo/:username/:repo', repo.repoCard)

const cardsRouters = router
module.exports = cardsRouters
