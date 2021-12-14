// VISITOR BADGE
// Ini digunakan jika tempat penyimpanan data visitor berada di server lain.
// ----------------------------------------------
const { makeBadge } = require('../../utils/badge')
const { user } = require('../../utils/users-async')

//  Root route
exports.index = (req, res) => {
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
}

// Username route
exports.user = (req, res) => {
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
}

// Visitor visitor route
exports.visitorBadge = async (req, res) => {
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
}
