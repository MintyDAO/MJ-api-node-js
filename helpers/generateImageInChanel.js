const axios = require('axios');

// WARNING THIS SCRIPT BIND WITH HARDCODED CHANEL
const url = 'https://discord.com/api/v9/interactions'
// const url2 = "https://discord.com/api/v9/channels/1051817637925105767/messages/1058340394359865344/ack"


// module.exports = async (authorization, image_name, nonce) => {
const test = async (authorization, image_name, nonce) => {

  const data = {
      "type":2,
      "application_id":"936929561302675456",
      "guild_id":"1051817636876517386",
      "channel_id":"1051817637925105767",
      "session_id":"bce08c212d396338dcba8426849200f6",
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
          "default_permission":"true",
          "default_member_permissions":"null",
          "type":1,
          "nsfw":"false",
          "name":"imagine",
          "description":"There are endless possibilities...",
          "dm_permission":"true",
          "options":[
            {
              "type":3,
              "name":"prompt",
              "description":"The prompt to imagine",
              "required":"true"
            }
          ]
          },
          "attachments":[]},
          "nonce":nonce
        }

    try{
      const res = await axios.post(url, data, {
  			headers: {
  				"authorization": authorization
  			}
  		})

      console.log("res 1", res.status)

      // const res2 = await axios.post(url2, {
  		// 	headers: {
  		// 		"authorization": authorization
  		// 	}
  		// })

      // console.log("res 2", res2.status)
    }catch(e){
      console.log("Err", e)
    }
}

test(
  "ODIzMjMwODIwMDA1MDUyNDE2.GpITzs.KR5sEDNjiL5h8JaFbjOJ3V_HUOx8I21FKQeitY",
  "Ukraine soldier art",
  "1065365874740822021"
)
