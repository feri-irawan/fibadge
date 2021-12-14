const { loadUsers, findUser, findRepo } = require('../../utils/users')

// Route root
const rootRoute = (app) => {
  app.get('/api/visitor', (req, res) => {
    res.json(loadUsers())
  })
}

// Route mencari user
const findUserRoute = (app) => {
  app.get('/api/visitor/:username', (req, res) => {
    const { username } = req.params

    const result = findUser({ username }) || null
    const title = 'Cari pengguna - Visitor Badge'

    if (!result) {
      res.json({
        status: 404,
        title,
        message: `Pengguna dengan username "${username}" tidak ditemukan.`,
        result
      })
    } else {
      res.json({
        status: 200,
        title,
        message: `Pengguna dengan username "${username}" ditemukan.`,
        result
      })
    }
  })
}

// Route mencari repo
const findRepoRoute = (app) => {
  app.get('/api/visitor/:username/:repo', (req, res) => {
    const { username, repo } = req.params

    const result = findRepo({ username, repo }) || null
    const title = 'Cari repositori - Visitor Badge'

    if (!result) {
      res.json({
        status: 404,
        title,
        message: `Repositori dengan nama ${repo} tidak ditemukan!`,
        result
      })
    } else {
      res.json({
        status: 200,
        title,
        message: 'Repositori ditemukan!',
        result
      })
    }
  })
}

const apiVisitorRoute = (expressApp) => {
  const app = expressApp

  rootRoute(app)
  findUserRoute(app)
  findRepoRoute(app)
}

module.exports = apiVisitorRoute
