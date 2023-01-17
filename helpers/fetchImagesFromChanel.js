const axios = require('axios');

module.exports = async (authorization, channelid, limit) => {
  const res = await axios.get(
		`https://discord.com/api/v9/channels/${channelid}/messages?limit=${limit}`,
		{
			headers: {
				"authorization": authorization
			}
		}
	);

  const data = res.data

  const images = []

  for(let i = 0; i < data.length; i++) {
    try{
      // console.log(data[i]["attachments"])
      uri = data[i]["attachments"][0]["url"]
      images.push(uri)
    }
    catch(e){
      // console.log("err", e)
    }
  }

  return images
}
