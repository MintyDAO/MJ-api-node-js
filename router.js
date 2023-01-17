require('dotenv').config()
const express = require('express')
const config = require('./config')
const fetchImagesFromChanel = require("./helpers/fetchImagesFromChanel")

const router = express.Router()

router.get('/', function(req, res) {
  res.json({ message: 'API is Online!' })
})

router.get('/get-all-images', async function(req, res) {
  const data = await fetchImagesFromChanel(
    process.env.DISCORD_OAUTH_TOKEN,
    config.chanelId,
    50)

  res.json({ data })
})

router.get('/get-latest-image', async function(req, res) {
  const data = await fetchImagesFromChanel(
    process.env.DISCORD_OAUTH_TOKEN,
    config.chanelId,
    50)

  res.json({ data:data[0] })
})


module.exports = router
