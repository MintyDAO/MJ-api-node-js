require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./router')
const server = require('http').createServer(app)
const bodyParser = require('body-parser')
const cors = require('cors')
const runUpdater = require('./helpers/runUpdater')

global.io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 9009

app.use('/api', router)

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`)
  socket.emit("me", socket.id)
})

server.listen(port, () => {
  console.log('Listening on port ' + port + " Version 17/01/23")
})


runUpdater()
