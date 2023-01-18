require('dotenv').config()
const express = require('express')
const config = require('./config')
const fetchImagesFromChanel = require("./helpers/fetchImagesFromChanel")
const generateImageInChanel = require("./helpers/generateImageInChanel")
const dbManager = require("./helpers/dbManager")
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

// get user images by email hash id
router.route('/user-pending-count/:user_id').get(async (req, res) => {
  const user_id = req.params.user_id
  const data = dbManager.getUserImagesByEmailHashId(user_id)

  res.json({ data })
})

// Trigger bot for create new IMG in chanel by user request
// Register user email hash by this request if user not exist
router.route('/trigger-bot').post(async function(req, res) {
   const image_name = req.body.image_name
   const email_hash_id = req.body.email_hash

   if(!image_name || !email_hash_id)
     return res.status(400).send("Bad request")

   try{
     // generate image
     generateImageInChanel(
       process.env.DISCORD_OAUTH_TOKEN,
       image_name,
       nonce
     )

     // register user if not exist
     if(!dbManager.isEmailHashIdRegistred(email_hash_id)){
       const email = Buffer.from(email_hash_id, 'base64').toString()
       dbManager.registerUser = (email, email_hash_id)
     }

     // add new pending requests
     dbManager.addNewRequest(image_name, email_hash_id)

     // update nonce
     config.nonce = config.nonce + 1;

     return res.status(200).send("Success")
   }catch(e){
     console.log("Trigger bot error: ", e)
     return res.status(500).send("Server error")
   }
})



module.exports = router
