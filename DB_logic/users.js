// DB used
// https://www.npmjs.com/package/simple-json-db

const JSONdb = require('simple-json-db')
const db = new JSONdb('DB_storage/users.json')

const isEmailHashIdRegistred = (emailHashId) => {
  return db.has(emailHashId)
}

const registerUser = (email, emailHashId) => {
  if(!db.has(emailHashId))
    db.set(emailHashId, {
      email,
      email_hash_id:emailHashId,
      img_uri:images:[],
      pay_time:0
  })
}

const getUserImagesByEmailHashId = (emailHashId) => {
  if(!db.has(emailHashId))
    return []

  const res = db.get(emailHashId)
  return res['img_uri']
}

const addUserImagesByEmailHashId = (emailHashId, img) => {
  if(!db.has(emailHashId))
    return

  let images = getValueByKey(emailHashId, 'img_uri')

  if(!images)
    images = []

  images.push(img)

  updateValueByKey(emailHashId, 'img_uri', images)
}

// Helpers
const updateValueByKey = (emailHashId, key, value) => {
  if(!db.has(emailHashId))
   return

  let current = db.get(emailHashId)
  current[key] = value

  db.set(emailHashId, current);
}

const getValueByKey = (emailHashId, key) => {
  if(!db.has(emailHashId))
   return null

  const current = db.get(emailHashId)
  return current[key]
}
