// HERE can be add/replace logic from any DB mysql, mongo ect
const users = require('./DB_logic/users.js')
const requests = require('./DB_logic/requests.js')

// USERS DB actions

// return true if succsses
const registerUser = (email, emailHashId) => {
  return users.registerUser(email, emailHashId)
}

// return true if exist
const isEmailHashIdRegistred = (emailHashId) => {
  return users.isEmailHashIdRegistred(emailHashId)
}

const getUserImagesByEmailHashId = (emailHashId) => {
  return users.getUserImagesByEmailHashId(emailHashId)
}

const addUserImagesByEmailHashId = (emailHashId, img) => {
  users.addUserImagesByEmailHashId(emailHashId, img)
}

const updateUserPayments = (email, payTime) => {
  users.updateUserPayments(email, payTime)
}

// REQUESTS DB actions

const addNewRequest = (description, emailHashId) => {
  requests.addNewRequest(description, emailHashId)
}

const getUserByRequest = (description) => {
  requests.getUserByRequest(description)
}

const deleteUserByDescription = (description) => {
  requests.deleteUserByDescription(description)
}


// TEST

const email = "test1@mail.com"
const emailHash = Buffer.from(email).toString('base64');

console.log(emailHash)
console.log(Buffer.from(emailHash, 'base64').toString())

console.log("isRegistred", isEmailHashIdRegistred(emailHash))

registerUser(email, emailHash)

console.log("isRegistred", isEmailHashIdRegistred(emailHash))

addUserImagesByEmailHashId(emailHash, "1.jpg")
addUserImagesByEmailHashId(emailHash, "2.jpg")
addUserImagesByEmailHashId(emailHash, "3.jpg")

console.log(getUserImagesByEmailHashId(emailHash))
