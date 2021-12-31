require('dotenv').config()
const axios = require('axios')
const { githubVisitor } = require('./github')

const DATABASE_PATH = process.env.DATABASE_PATH
const STORAGE_ID = process.env.STORAGE_ID
const APIKEY = process.env.APIKEY

// Mendapatkan semua users
const loadUsers = async () => {
  const users = (
    await axios.get(`${DATABASE_PATH}/contents/${STORAGE_ID}`, {
      headers: {
        Authorization: `token ${APIKEY}`
      }
    })
  ).data

  return users.data.contents
}

// Menyimpan semua users
const saveUsers = (users) => {
  axios.put(
    `${DATABASE_PATH}/update/${STORAGE_ID}`,
    { contents: users },
    {
      headers: {
        Authorization: `token ${APIKEY}`
      }
    }
  )
}

// Mencari user
const findUser = async (user) => {
  const users = await loadUsers()

  if (users.length === 0) return // Jika tidak ada user

  const result = users.find(
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

  if (users.length === 0) return 1

  return users.slice(-1)[0].id + 1
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
    users.push({
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
      const userIndex = users.findIndex(
        ({ username }) => username === user.username
      )

      const TODAY = new Date()
      users[userIndex].repos.push({
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
  const userIndex = users.findIndex(
    ({ username }) => username === user.username
  )
  const repoIndex = repos.findIndex(({ name }) => name === user.repo)
  const TODAY = new Date()

  // Memperbarui tanggal updated_at pada database
  users.updated_at = TODAY

  // Memperbarui tanggal updated_at pada user
  users[userIndex].updated_at = TODAY

  // Cek apakah user menyertakan token?
  if (user.token) {
    const ghVisitor = await githubVisitor(user)

    // Menambah visitor
    users[userIndex].repos[repoIndex].visitor =
      ghVisitor ?? repos[repoIndex].visitor + 1

    // Memperbarui status github_token jika berhasil mengambil visitor dari github
    if (ghVisitor) users[userIndex].repos[repoIndex].github_token = true
    // Memperbarui status github_token jika gagal mengambil visitor dari github
    else users[userIndex].repos[repoIndex].github_token = false
  } else {
    // Menambah visitor
    users[userIndex].repos[repoIndex].visitor = repos[repoIndex].visitor + 1

    // Memperbarui status github_token jika tidak ada token
    users[userIndex].repos[repoIndex].github_token = false
  }

  // Memperbarui tanggal updated_at pada repo
  users[userIndex].repos[repoIndex].updated_at = TODAY

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
