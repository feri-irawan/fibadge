const { loadUsers, findUser, findRepo } = require('../../utils/users-async')

// Route root
exports.index = async (req, res) => {
  res.json({
    title: 'Database - Visitor Badge',
    description: 'Menampung semua pengguna yang sudah membuat visitor badge',
    author: {
      name: 'Feri Irawan',
      github: 'feri-irawan'
    },
    created_at: '2021-11-25T14:05:55.000Z',
    updated_at: '2021-11-25T14:05:55.000Z',
    data: (await loadUsers()).content
  })
}

// Route mencari user
exports.user = async (req, res) => {
  const { username } = req.params

  const result = (await findUser({ username })) || null
  const title = 'Pengguna - Visitor Badge'

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
}

// Route mencari repo
exports.findRepo = async (req, res) => {
  const { username, repo } = req.params

  const result = (await findRepo({ username, repo })) || null
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
}
