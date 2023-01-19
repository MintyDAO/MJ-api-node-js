const JSONdb = require('simple-json-db')

const db = new JSONdb('DB_storage/nonce.json')


const getNonce = () => {
  return db.get("nonce")
}

const setNonce = (nonce) => {
  db.set("nonce", nonce)
}
