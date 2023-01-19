
const dbManager = require('../dbManager.js')
// const fetchAtachmentsFromChanel = require('./fetchAtachmentsFromChanel')
//
// const test = async (authorization, channelid, limit) => {
//   const attachments = await fetchAtachmentsFromChanel(authorization, channelid, limit)
//   console.log(attachments)
// }
//
//
// test(
//   "OTk2NzA3MTE0NzEyMDQzNTgx.GF6HJZ.nc-s6PblSSar4KJzN9UAIfQs-V8FH8ZerQxT64",
//   "1051817637925105767",
//   50
// )


// let string= "Rus_white_girl_d45ed1bd-4381-4430-8464-c7d0e7ca6cda.png";
// const substring = String("white girl").replace(/\s/gi, "_")
// console.log(substring)
//
// console.log(string.includes(substring));


// console.log(dbManager.getAllRequests())


// let object = dbManager.getAllRequests()
// let array = [2, 4, 5, 4,4,4,4, "tropico girl"];
//
// const requests = Object.keys(object);
//
//
// let commonItems = array.filter(item => requests.includes(item));
//
// console.log(commonItems)

// step 1 get requests
// step 2 get postem messges
// step 3 find duplicates
// step 4 update by duplicates DB
// step 5 remove updated requests


// requests
let requests = dbManager.getAllRequests()
let array = Object.keys(object);

// atachments
let jsonArray = await fetchAtachmentsFromChanel(authorization, channelid, limit)

array.every(item => jsonArray.some((jsonItem) => {
  // check if image have same decription
  if(jsonItem.filename.includes(item.replace(/\s/gi, "_"))){
    console.log("Found uri " jsonItem.url, "for descriprion ", item)

    // remove request
    // update user DB
  }

}))
