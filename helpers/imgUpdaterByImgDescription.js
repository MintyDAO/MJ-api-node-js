const dbManager = require('../dbManager.js')
const fetchAtachmentsFromChanel = require('./fetchAtachmentsFromChanel')
const config = require('../config.js')

module.exports = async (authorization, channelid, limit) => {
  console.log("run imgUpdaterByImgDescription for check updates")
  // requests
  let requests = dbManager.getAllRequests()

  // exit if no pending requets
  if(!requests)
    return

  let searchItems = Object.keys(requests);

  // atachments
  let jsonObjects = await fetchAtachmentsFromChanel(authorization, channelid, limit)


  // compare pending requests descriptions with latest 50 messages
  jsonObjects.forEach(jsonObject => {
    try{
      let match = searchItems.find(item =>  {

        const fileName = String(jsonObject.filename).toLowerCase()
        const key = String(item.replace(/\s/gi, "_")).toLowerCase()

        // update if found match
        if(fileName.includes(key)){
          console.log("Update for description", item, "uri", jsonObject.url)
          const emailHash = dbManager.getUserByRequest(item)
          dbManager.addUserImagesByEmailHashId(emailHash, jsonObject.url)
          dbManager.deleteUserByDescription(item)
        }
      });
    }catch(e){}
  });

  console.log(`next run after ${config.updatesPeriod / 1000} seconds`)
}