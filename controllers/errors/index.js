const { makeBadge } = require('../../utils/badge')

exports.pageNotFound = (req, res) => {
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
}
