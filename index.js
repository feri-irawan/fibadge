const express = require('express')
const { pageNotFound } = require('./controllers/errors')
const mainRouter = require('./routes/main')
const apisRouter = require('./routes/apis')
const badgesRouter = require('./routes/badges')
const cardsRouters = require('./routes/cards')
const testsRouter = require('./routes/tests')

// Express app
const app = express()

// Routes
app.use(mainRouter)
app.use('/apis', apisRouter)
app.use('/badges', badgesRouter)
app.use('/cards', cardsRouters)
app.use('/tests', testsRouter)
app.use(pageNotFound)

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is online!`))
