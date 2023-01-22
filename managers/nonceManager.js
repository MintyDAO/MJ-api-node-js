const JSONdb = require('simple-json-db')

const db = new JSONdb('DB_storage/nonce.json')


exports.getNonce = () => {
  return db.get("nonce")
}

exports.setNonce = (nonce) => {
  db.set("nonce", nonce)
}
