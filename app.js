require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./router')
const server = require('http').createServer(app)
const bodyParser = require('body-parser')
const cors = require('cors')
const runUpdater = require('./helpers/runUpdater')
const sockets = require('./sockets')
sockets.connect(server)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 9009

app.use('/api', router)

sockets.on()

server.listen(port, () => {
  console.log('Listening on port ' + port + " Version 17/01/23")
})


runUpdater()
