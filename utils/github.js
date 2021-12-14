const { Octokit } = require('@octokit/core')

// Mendapatkan visitor dari github.
// Ini akan digunakan jika user menyertakan querystring token=PERSONAL_ACCESS_TOKEN miliknya
const githubVisitor = async (user) => {
  const octokit = new Octokit({ auth: user.token })

  const { data } = await octokit
    .request('GET /repos/{owner}/{repo}/traffic/views', {
      owner: user.username,
      repo: user.repo
    })
    .then((res) => res)
    .catch((err) => err)

  return data ? data.count : undefined
}

// Mendapatkan jumlah clone suatu repo dari github
const githubClones = async (user) => {
  const octokit = new Octokit({ auth: user.token })

  const { data } = await octokit
    .request('GET /repos/{owner}/{repo}/traffic/clones', {
      owner: user.username,
      repo: user.repo
    })
    .then((res) => res)
    .catch((err) => err)

  return data ? data.count : 0
}

// Mendapatkan data repositori dari github
const githubRepo = async (user) => {
  const octokit = new Octokit({ auth: user.token })

  const response = await octokit.request('GET /repos/{owner}/{repo}', {
    owner: user.username,
    repo: user.repo
  })

  return response.data
}

// Mendapatkan data user dari githubb
const githubUser = async (user) => {
  const octokit = new Octokit({ auth: user.token })

  const response = await octokit.request('GET /users/{username}', {
    username: user.login
  })

  return response.data
}

module.exports = {
  githubVisitor,
  githubClones,
  githubRepo,
  githubUser
}
