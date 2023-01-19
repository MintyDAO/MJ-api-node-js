// const users = require('./DB_logic/users.js')
//
// const email = "mirovruslanf@gmail.com"
// const emailHash = Buffer.from(email).toString('base64')
//
// users.registerUser(
//   email,
//   emailHash
// )


const prevNonce = "1065365874740822023"
const nonce = String(BigInt(prevNonce) + BigInt("1"))

console.log("Nonce", prevNonce, nonce)
