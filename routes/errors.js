const { makeBadge } = require('../utils/badge')

const pageNotFound = (app) => {
  app.use((req, res) => {
    const { type } = req.query

    makeBadge({
      label: 'ERROR 404',
      message: 'Page Not Found!',
      color: 'red',
      type
    })
      .on('response', (remoteRes) => {
        remoteRes.statusCode = 404
      })
      .pipe(res)
  })
}

module.exports = {
  pageNotFound
}
