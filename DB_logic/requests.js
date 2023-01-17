// DB used
// https://www.npmjs.com/package/simple-json-db

const JSONdb = require('simple-json-db')
const database = new JSONdb('DB_storage/requests.json')


exports.addNewRequest = (description, emailHashId) => {
  database.set(description, emailHashId)
}

exports.getUserByRequest = (description) => {
  return database.get(description)
}

exports.deleteUserByDescription = (description) => {
  database.delete(description)
}
