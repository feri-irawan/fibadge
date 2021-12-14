const { makeBadge } = require('../../utils/badge')

exports.index = (req, res) => {
  const { type } = req.params
  makeBadge({
    label: 'WELCOME TO',
    message: 'BADGE by Feri Irawan',
    type
  })
    .on('response', (remoteRes) => {
      remoteRes.headers['cache-control'] = 'max-age=0, s-maxage=0'
    })
    .pipe(res)
}
