const JSONdb = require('simple-json-db')
const db = new JSONdb('DB_storage/sockets.json')

exports.getSocket = (emailHash) => {
  return db.get(emailHash)
}

exports.setSocket = (emailHash, socket) => {
  db.set(emailHash, socket)
}
