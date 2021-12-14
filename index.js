const express = require('express')

const mainRoute = require('./routes/main')
const apiRoute = require('./routes/apis/api')
const { pageNotFound } = require('./routes/errors')

const visitorBadgeRouteAsync = require('./routes/badges/visitor-async')
const clonesBadgeRoute = require('./routes/badges/clones')
const testsRoute = require('./routes/tests/tests')

const app = express()

// Main route
mainRoute(app)

// API route
apiRoute(app)

// Badge route
visitorBadgeRouteAsync(app)
clonesBadgeRoute(app)

// Tests route
testsRoute(app)

// Error pages
pageNotFound(app)

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () =>
  console.log(`Server is online! ${new Date().toGMTString()}`)
)
