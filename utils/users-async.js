const axios = require('axios')
const { githubVisitor } = require('./github')

const DATABASE_PATH = 'https://fistorage.feriirawann.repl.co/api'
const APIKEY = process.env.APIKEY

// Mendapatkan semua users
const loadUsers = async () => {
  const users = (await axios.get(`${DATABASE_PATH}/load/visitor?key=${APIKEY}`))
    .data

  return users.data
}

// Menyimpan semua users
const saveUsers = (users) => {
  axios.put(`${DATABASE_PATH}/update/visitor?key=${APIKEY}`, users)
}

// Mencari user
const findUser = async (user) => {
  const users = await loadUsers()

  if (users.content.length === 0) return // Jika tidak ada user

  const result = users.content.find(
    ({ username }) => username.toLowerCase() === user.username.toLowerCase()
  )

  return result
}

// Mencari repository
const findRepo = async (user) => {
  const userData = await findUser(user)
  const userRepos = userData ? userData.repos : undefined

  if (!userRepos) return // Jika tidak ada repositori

  const repo = userRepos.find(
    ({ name }) => name.toLowerCase() === user.repo.toLowerCase()
  )

  return repo
}

// Membuat id user
const makeUserId = async () => {
  const users = await loadUsers()

  if (users.content.length === 0) return 1

  return users.content.slice(-1)[0].id + 1
}

// Membuat id repo
const makeRepoId = async (user) => {
  const repos = (await findUser(user)).repos

  if (repos.length === 0) return 1

  return repos.slice(-1)[0].id + 1
}

// Menambah user
const addUser = async (user) => {
  const users = await loadUsers()

  if (!(await findUser(user))) {
    const TODAY = new Date()
    users.content.push({
      id: await makeUserId(),
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
const addRepo = async (user) => {
  const users = await loadUsers()

  if (await findUser(user)) {
    if (!(await findRepo(user))) {
      const userIndex = users.content.findIndex(
        ({ username }) => username === user.username
      )

      const TODAY = new Date()
      users.content[userIndex].repos.push({
        id: await makeRepoId(user),
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
  const users = await loadUsers()
  const repos = (await findUser(user)).repos
  const userIndex = users.content.findIndex(
    ({ username }) => username === user.username
  )
  const repoIndex = repos.findIndex(({ name }) => name === user.repo)
  const TODAY = new Date()

  // Memperbarui tanggal updated_at pada database
  users.updated_at = TODAY

  // Memperbarui tanggal updated_at pada user
  users.content[userIndex].updated_at = TODAY

  // Cek apakah user menyertakan token?
  if (user.token) {
    const ghVisitor = await githubVisitor(user)

    // Menambah visitor
    users.content[userIndex].repos[repoIndex].visitor =
      ghVisitor ?? repos[repoIndex].visitor + 1

    // Memperbarui status github_token jika berhasil mengambil visitor dari github
    if (ghVisitor) users.content[userIndex].repos[repoIndex].github_token = true
    // Memperbarui status github_token jika gagal mengambil visitor dari github
    else users.content[userIndex].repos[repoIndex].github_token = false
  } else {
    // Menambah visitor
    users.content[userIndex].repos[repoIndex].visitor =
      repos[repoIndex].visitor + 1

    // Memperbarui status github_token jika tidak ada token
    users.content[userIndex].repos[repoIndex].github_token = false
  }

  // Memperbarui tanggal updated_at pada repo
  users.content[userIndex].repos[repoIndex].updated_at = TODAY

  saveUsers(users)
}

// console.log(addUser(user))
// console.log(addRepo(user))
// console.log(addVisitor(user))
// console.log(findRepo(user))
// loadUsers().then((res) => console.log(res))

// Main
const user = async (user) => {
  await addUser(user)
  await addRepo(user)
  await addVisitor(user)

  return await findRepo(user)
}

module.exports = {
  user,
  loadUsers,
  findUser,
  findRepo
}
