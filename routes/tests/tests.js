const { githubRepo } = require('../../utils/github')
const { makeGithubRepoCard } = require('../../utils/repo-card')

const testsRoute = (app) => {
  app.get('/tests/github-card/:username/:repo', async (req, res, next) => {
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
        token: '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'
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
  })
}

module.exports = testsRoute
