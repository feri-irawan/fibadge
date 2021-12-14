const axios = require('axios')
const fs = require('fs')
const wrap = require('word-wrap')
const langColors = require('../data/lang-colors')
const { githubUser } = require('./github')
const { numberFormatK } = require('./string')
const { findRepo, user } = require('./users-async')

// Fungsi filter object
Object.filter = (obj, predicate) =>
  Object.fromEntries(Object.entries(obj).filter(predicate))

// Membuat github repo card
const makeGithubRepoCard = async (repoData, options) => {
  // Warna utama
  let primaryColor = 'rgb(3, 228, 150)'

  // Pengaturan default
  let defaultOptions = {
    lineColor: primaryColor,
    iconColor: primaryColor,
    cardBackground: 'rgb(40, 40, 40)',
    cardOutlineWidth: 1.5,
    imgOutlineColor: primaryColor,
    imgOutlineWidth: 1.5,
    userLoginColor: 'rgb(181, 181, 181)',
    repoNameColor: 'rgb(255, 204, 0)',
    textColor: 'rgb(255, 255, 255)',
    addVisitor: false
  }

  // Mendapatkan informasi user
  const user = await githubUser({ login: repoData.owner.login })
  // Informasi repositori
  const repo = repoData
  // Memformat description
  const repoDescription = repoDescriptionFormat(repo.description)

  // // Menimpa defaultOption jika parameter option terisi
  if (options)
    defaultOptions = {
      ...defaultOptions,
      ...Object.filter(
        options,
        ([key, value]) => value !== undefined && value !== ''
      )
    }

  // theme diambil dari parameter
  // switch (theme) {
  //   case 'light':
  //     defaultOptions = {
  //       ...defaultOptions,
  //       iconColor: 'rgb(150, 150, 150)',
  //       lineColor: 'rgb(230, 230, 230)',
  //       imgOutlineColor: 'rgb(200, 200, 200)',
  //       cardBackground: 'rgb(255, 255, 255)',
  //       textColor: 'rgb(60, 60, 60)',
  //       repoNameColor: 'rgb(9, 96, 165)'
  //     }
  //     break

  //   case 'darklight':
  //     defaultOptions = {
  //       ...defaultOptions,
  //       iconColor: 'rgb(160, 160, 160)',
  //       lineColor: 'rgb(230, 230, 230)',
  //       imgOutlineColor: 'rgb(200, 200, 200)',
  //       repoNameColor: 'rgb(255, 255, 255)'
  //     }
  //     break

  //   default:
  //     break
  // }

  // Mendapatkan template card
  const template = fs.readFileSync(
    __dirname + '/../templates/repo-card.html',
    'utf-8'
  )

  // Mengatur tinggi (height) card
  const height = cardHeight(repoDescription.array.length)
  // Mengatur isi card
  let card = template
    .replace('{title}', repo.name)
    .replace('{description}', repo.description)
    .replace('{userName}', user.name)
    .replace('{userLogin}', user.login)
    .replace('{avatarUrl}', await imageToBase64(user.avatar_url))

    .replace('{lineColor}', defaultOptions.lineColor)

    .replace('{iconColor}', defaultOptions.iconColor)
    .replace('{textColor}', defaultOptions.textColor)
    .replace('{cardHeight}', height)
    .replace('{cardBackground}', defaultOptions.cardBackground)
    .replace('{cardOutlineWidth}', defaultOptions.cardOutlineWidth)

    .replace('{imgOutlineColor}', defaultOptions.imgOutlineColor)
    .replace('{imgOutlineWidth}', defaultOptions.imgOutlineWidth)
    .replace('{userLoginColor}', defaultOptions.userLoginColor)
    .replace('{userRightLineWidth}', height - 20) // 130 adalah panjang garis minimal

    .replace('{repoName}', repo.name)
    .replace('{repoNameColor}', defaultOptions.repoNameColor)
    .replace('{repoDescription}', repoDescription.html)

    .replace('{repoStatsMarginTop}', height - 85)
    .replace('{langColor}', findLangColor(repo.language))
    .replace('{lang}', repo.language)
    .replace('{stars}', numberFormatK(repo.stargazers_count))
    .replace('{forks}', numberFormatK(repo.forks_count))
    .replace(
      '{visitors}',
      numberFormatK(
        await getVisitor({
          username: user.login,
          repo: repo.name,
          add: defaultOptions.addVisitor
        })
      )
    )

  return card
}

// Mencari warna bahasa permrograman repo
const findLangColor = (language) => {
  return langColors[language].color || 'gray'
}

// Format description ke multiline
const repoDescriptionFormat = (description) => {
  // Jika description kosong
  if (!description)
    return {
      array: [],
      html: ''
    }

  // Membuat string multiline
  const newDesc = wrap(description, { width: 40 })
  // Memecah setiap line jadi array
  const descArr = newDesc.split('\n').map((v) => v.trim())

  return {
    array: descArr,
    html: descArr.map((v) => `<tspan dy="1rem" x="0">${v}</tspan>`).join()
  }
}

// Mengatur tinggi card
const cardHeight = (lineCount) => {
  const minHeight = lineCount > 1 ? 150 : 130
  const lineHeight = 10

  return minHeight + lineCount * lineHeight
}

// Get visitor
const getVisitor = async ({ username, repo, add = false }) => {
  try {
    if (add === 'true' || add === true) {
      // Gunakan user() jika ingin menambah visitor juga
      return (await user({ username, repo })).visitor
    } else {
      // Jika hanya ingin mengambil visitor
      return (await findRepo({ username, repo })).visitor
    }
  } catch (error) {
    return 0
  }
}

// Image to base64
const imageToBase64 = async (url) => {
  const base64 = await axios
    .get(url, {
      responseType: 'arraybuffer'
    })
    .then((response) => Buffer.from(response.data, 'binary').toString('base64'))

  return `data:image/png;base64,${base64}`
}

module.exports = {
  makeGithubRepoCard,
  imageToBase64
}
