const express = require('express')
const router = express.Router()

const { makeBadge } = require('../utils/badge')

// MAIN
router.get('/', (req, res) => {
  const { type } = req.query

  makeBadge({
    label: 'WELCOME TO',
    message: 'Fibadge by Feri Irawan',
    type
  })
    .on('response', (remoteRes) => {
      remoteRes.headers['cache-control'] = 'max-age=0, s-maxage=0'
    })
    .pipe(res)
})

const mainRouter = router
module.exports = mainRouter
