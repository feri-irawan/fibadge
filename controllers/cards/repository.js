const { githubRepo } = require('../../utils/github')
const { makeGithubRepoCard } = require('../../utils/repo-card')

exports.repoCard = async (req, res, next) => {
  const { username, repo } = req.params
  const {
    line,
    icon,
    background,
    outlineWidth,
    imgOutline,
    imgOutlineWidth,
    userLogin,
    repoName,
    text,
    addVisitor
  } = req.query

  try {
    const result = await githubRepo({
      username,
      repo,
      token: process.env.GITHUB_PAT
    })

    res
      .type('svg')
      .header('cache-control', 'no-cache, max-age=0, s-maxage=0')
      .header('expires', new Date().toGMTString())
      .header('last-modified', new Date().toGMTString())
      .send(
        await makeGithubRepoCard(result, {
          lineColor: line,
          iconColor: icon,
          cardBackground: background,
          cardOutlineWidth: outlineWidth,
          imgOutlineColor: imgOutline,
          imgOutlineWidth: imgOutlineWidth,
          userLoginColor: userLogin,
          repoNameColor: repoName,
          textColor: text,
          addVisitor: addVisitor
        })
      )
  } catch (error) {
    console.log(error)
    next()
  }
}
