// BADGE JUMLAH CLONE REPO GITHUB
const { makeBadge } = require('../../utils/badge')
const { githubClones } = require('../../utils/github')

// Index
exports.index = (req, res) => {
  const { type } = req.query

  makeBadge({
    label: 'WELCOME TO',
    message: 'CLONES BADGE by Feri Irawan',
    type
  })
    .on('response', (remoteRes) => {
      remoteRes.headers['cache-control'] = 'max-age=0, s-maxage=0'
    })
    .pipe(res)
}

// Clones badge
exports.clonesBadge = async (req, res) => {
  const { username, repo, token } = req.params

  const { label, style, color, type, logo } = req.query

  const clones = await githubClones({ username, repo, token })

  makeBadge({
    label: label || 'CLONES',
    style,
    color,
    type,
    logo,
    message: clones
  })
    .on('response', (remoteRes) => {
      remoteRes.headers['cache-control'] = 'no-cache, max-age=0, s-maxage=0'
      remoteRes.headers['expires'] = new Date().toGMTString()
      remoteRes.headers['last-modified'] = new Date().toGMTString()
    })
    .pipe(res)
}
