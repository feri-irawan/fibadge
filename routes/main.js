const { makeBadge } = require('../utils/badge')

const mainRoute = (app) => {
  app.get('/', (req, res) => {
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

module.exports = mainRoute
