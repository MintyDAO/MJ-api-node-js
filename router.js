require('dotenv').config()
const express = require('express')
const config = require('./config')
const stripe = require('stripe')(process.env.STRIPE_API_KEY)
const router = express.Router()

const fetchImagesFromChanel = require("./helpers/fetchImagesFromChanel")
const generateImageInChanel = require("./helpers/generateImageInChanel")
const dbManager = require("./dbManager")


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
router.route('/get-user-images/:user_id').get(async (req, res) => {
  const user_id = req.params.user_id
  const data = dbManager.getUserImagesByEmailHashId(user_id)

  res.json({ data })
})

// Trigger bot for create new IMG in chanel by user request
// Register user email hash by this request if user not exist
router.route('/trigger-bot').post(async function(req, res) {
   const image_name = req.body.image_name
   const email_hash_id = req.body.email_hash_id

   if(!image_name || !email_hash_id)
     return res.status(400).send("Bad request")

   try{
     // generate image
     generateImageInChanel(
       process.env.DISCORD_OAUTH_TOKEN,
       image_name
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


router.route('/webhook').post(express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  console.log("trigger webhook")
  console.log("req.body", req.body)

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_ENDPOINT_SECRET);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log("event.type", event.type)

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;

      // console.log("paymentIntent", paymentIntent)
      const customer = await stripe.customers.retrieve(
        paymentIntent.customer
      );

      email = customer['email']
      payTime = customer['created']

      console.log(client_email, pay_time)

      dbManager.updateUserPayments(email, payTime)

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return res.status(200).send("Success")
});


// NOT used 

// // Update user images, using by BOT listener
// // TODO add secret token oauth for using only from bot
// router.route('/update-user-db').post(async (req, res) => {
//   const image_name = req.body.image_name
//   const img_uri = req.body.image_uri
//
//   if(!image_name || !img_uri)
//     return res.status(400).send("Bad request")
//
//   try{
//     const emailHash = dbManager.getUserByRequest(image_name)
//     dbManager.addUserImagesByEmailHashId(emailHash, img_uri)
//     dbManager.deleteUserByDescription(image_name)
//
//     return res.status(200).send("Success")
//   }
//   catch(e){
//     console.log("update user db error: ", e)
//     return res.status(500).send("Server error")
//   }
// })



module.exports = router
