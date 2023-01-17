require('dotenv').config()
const express = require('express')
const config = require('./config')
const fetchImagesFromChanel = require("./helpers/fetchImagesFromChanel")

const router = express.Router()

router.get('/', function(req, res) {
    res.json({ message: 'API is Online!' })
})

// get all images from latests 50 messages from discord chanel
router.route('/get-all-images').get(async function(req, res) {
  const data = await fetchImagesFromChanel(
    process.env.DISCORD_OAUTH_TOKEN,
    config.chanelId,
    50)

  res.json({ data })
})

// get latest image from latests 50 messages from discord chanel
router.route('/get-latest-image').get(async function(req, res) {
  const data = await fetchImagesFromChanel(
    process.env.DISCORD_OAUTH_TOKEN,
    config.chanelId,
    50)

  res.json({ data:data[0] })
})



module.exports = router
