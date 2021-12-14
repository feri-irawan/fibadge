const fs = require('fs')
const { githubVisitor } = require('./github')

const DATABASE_PATH = __dirname + '/../data/visitor.json'

// Mendapatkan semua users
const loadUsers = () => {
  const users = fs.readFileSync(DATABASE_PATH, 'utf-8')
  return JSON.parse(users)
}

// Menyimpan semua users
const saveUsers = (users) => {
  fs.writeFileSync(DATABASE_PATH, JSON.stringify(users))
}

// Mencari user
const findUser = (user) => {
  const users = loadUsers()

  if (users.data.length === 0) return // Jika tidak ada user

  const result = users.data.find(
    ({ username }) => username.toLowerCase() === user.username.toLowerCase()
  )

  return result
}

// Mencari repository
const findRepo = (user) => {
  const userData = findUser(user)
  const userRepos = userData ? userData.repos : undefined

  if (!userRepos) return // Jika tidak ada repositori

  const repo = userRepos.find(
    ({ name }) => name.toLowerCase() === user.repo.toLowerCase()
  )

  return repo
}

// Membuat id user
const makeUserId = () => {
  const users = loadUsers()

  if (users.data.length === 0) return 1

  return users.data.slice(-1)[0].id + 1
}

// Membuat id repo
const makeRepoId = (user) => {
  const repos = findUser(user).repos

  if (repos.length === 0) return 1

  return repos.slice(-1)[0].id + 1
}

// Menambah user
const addUser = (user) => {
  const users = loadUsers()

  if (!findUser(user)) {
    const TODAY = new Date()
    users.data.push({
      id: makeUserId(),
      username: user.username,
      created_at: TODAY,
      updated_at: TODAY,
      repos: []
    })

    saveUsers(users)
    return true
  }

  return false
}

// Menambah repository
const addRepo = (user) => {
  const users = loadUsers()

  if (findUser(user)) {
    if (!findRepo(user)) {
      const userIndex = users.data.findIndex(
        ({ username }) => username === user.username
      )

      const TODAY = new Date()
      users.data[userIndex].repos.push({
        id: makeRepoId(user),
        name: user.repo,
        visitor: 0,
        github_token: false,
        created_at: TODAY,
        updated_at: TODAY
      })

      saveUsers(users)
      return true
    }
  }

  return false
}

// Menambah jumlah visitor
const addVisitor = async (user) => {
  const users = loadUsers()
  const repos = findUser(user).repos
  const userIndex = users.data.findIndex(
    ({ username }) => username === user.username
  )
  const repoIndex = repos.findIndex(({ name }) => name === user.repo)
  const TODAY = new Date()

  // Memperbarui tanggal updated_at pada database
  users.updated_at = TODAY

  // Memperbarui tanggal updated_at pada user
  users.data[userIndex].updated_at = TODAY

  // Cek apakah user menyertakan token?
  if (user.token) {
    const ghVisitor = await githubVisitor(user)

    // Menambah visitor
    users.data[userIndex].repos[repoIndex].visitor =
      ghVisitor ?? repos[repoIndex].visitor + 1

    // Memperbarui status github_token jika berhasil mengambil visitor dari github
    if (ghVisitor) users.data[userIndex].repos[repoIndex].github_token = true
    // Memperbarui status github_token jika gagal mengambil visitor dari github
    else users.data[userIndex].repos[repoIndex].github_token = false
  } else {
    // Menambah visitor
    users.data[userIndex].repos[repoIndex].visitor =
      repos[repoIndex].visitor + 1

    // Memperbarui status github_token jika tidak ada token
    users.data[userIndex].repos[repoIndex].github_token = false
  }

  // Memperbarui tanggal updated_at pada repo
  users.data[userIndex].repos[repoIndex].updated_at = TODAY

  saveUsers(users)
}

// console.log(addUser(user))
// console.log(addRepo(user))
// console.log(addVisitor(user))
// console.log(findRepo(user))
// console.log(loadUsers())

// Main
const user = (user) => {
  addUser(user)
  addRepo(user)
  addVisitor(user)

  return findRepo(user)
}

module.exports = {
  user,
  loadUsers,
  findUser,
  findRepo
}
