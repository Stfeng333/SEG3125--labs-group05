const express = require('express')
const cors = require('cors')
const { config } = require('./config')
const { notesRouter } = require('./routes/notes')
const { requestsRouter } = require('./routes/requests')
const { communitiesRouter } = require('./routes/communities')

const app = express()

app.use(
  cors({
    origin: config.app.frontendOrigin,
  }),
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api', communitiesRouter)
app.use('/api', notesRouter)
app.use('/api', requestsRouter)

app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(500).json({ message: 'Internal server error' })
})

module.exports = { app }
