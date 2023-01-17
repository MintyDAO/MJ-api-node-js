// HERE can be add/replace logic from any DB mysql, mongo ect

const users = require('./DB_logic/users.js')

// return true if succsses
const registerUser = (email, emailHashId) => {
  return users.registerUser(email, emailHashId)
}

// return true if exist
const isEmailHashIdRegistred = (emailHashId) => {
  return users.isEmailHashIdRegistred(emailHashId)
}

const getUserImagesByEmailHashId = (emailHashId) => {
  users.getUserImagesByEmailHashId(emailHashId)
}

const addUserImagesByEmailHashId = (emailHashId, img) => {
  users.addUserImagesByEmailHashId(emailHashId, img)
}

const updateUserPayments = (email, payTime) => {
  users.updateUserPayments(email, payTime)
}
