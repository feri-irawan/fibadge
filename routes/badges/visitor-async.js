// VISITOR BADGE
// Ini digunakan jika tempat penyimpanan data visitor berada di server lain.
// ----------------------------------------------
const { makeBadge } = require('../../utils/badge')
const { user } = require('../../utils/users-async')

//  Root route
const rootRoute = (app) => {
  app.get('/visitor', (req, res) => {
    const { type } = req.query
    makeBadge({
      label: 'WELCOME TO',
      message: 'VISITOR BADGE by Feri Irawan',
      type
    })
      .on('response', (remoteRes) => {
        remoteRes.headers['cache-control'] = 'max-age=0, s-maxage=0'
      })
      .pipe(res)
  })
}

// Username route
const userRoute = (app) => {
  app.get('/visitor/:username', (req, res) => {
    const { type } = req.query
    makeBadge({
      label: 'Error',
      color: 'red',
      message: 'Ops, kami juga butuh nama repositorimu!',
      type
    })
      .on('response', (remoteRes) => {
        remoteRes.headers['cache-control'] = 'max-age=0, s-maxage=0'
      })
      .pipe(res)
  })
}

// Visitor visitor route
const visitorRoute = (app) => {
  app.get('/visitor/:username/:repo', async (req, res) => {
    const { label, style, color, type, logo, token } = req.query

    const { visitor } = await user({
      username: req.params.username,
      repo: req.params.repo,
      token
    })

    makeBadge({ label, style, color, type, logo, message: visitor })
      .on('response', (remoteRes) => {
        remoteRes.headers['cache-control'] = 'no-cache, max-age=0, s-maxage=0'
        remoteRes.headers['expires'] = new Date().toGMTString()
        remoteRes.headers['last-modified'] = new Date().toGMTString()
      })
      .pipe(res)
  })
}

const visitorBadgeRouteAsync = (app) => {
  rootRoute(app)
  userRoute(app)
  visitorRoute(app)
}

module.exports = visitorBadgeRouteAsync
