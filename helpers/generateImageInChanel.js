// WARNING THIS SCRIPT BIND WITH HARDCODED CHANEL

const axios = require('axios');
const nonceManager = require('../nonceManager.js');

const url = 'https://discord.com/api/v9/interactions'
// const url2 = "https://discord.com/api/v9/channels/1051817637925105767/messages/1058340394359865344/ack"


module.exports = async (authorization, image_name) => {
  
  const prevNonce = nonceManager.getNonce()
  const nonce = String(BigInt(prevNonce) + BigInt("1"))

  console.log("Prev nonce: ", prevNonce, "new nonce: ", nonce)

  const data = {
    "type":2,
    "application_id":"936929561302675456",
    "channel_id":"1056982126471422003",
    "session_id":"92c258ee1fb2ab346c67971ea3965dad",
    "data":{
      "version":"994261739745050686",
      "id":"938956540159881230",
      "name":"imagine",
      "type":1,
      "options":[
        {
          "type":3,
          "name":"prompt",
          "value":image_name
        }
      ],
      "application_command":{
        "id":"938956540159881230",
        "application_id":"936929561302675456",
        "version":"994261739745050686",
        "default_permission":true,
        "default_member_permissions":null,
        "type":1,
        "nsfw":false,
        "name":"imagine",
        "description":"There are endless possibilities...",
        "dm_permission":true,
        "options":[
          {
            "type":3,
            "name":"prompt",
            "description":"The prompt to imagine",
            "required":true
          }
        ]},
        "attachments":[]
        },
        "nonce":nonce
      }

    try{
      const res = await axios.post(url, data, {
  			headers: {
  				"authorization": authorization
  			}
  		})
      console.log("res 1", res.status)

      // update nonce
      nonceManager.setNonce(nonce)
    }catch(e){
      console.log("Err", e)
    }
}
