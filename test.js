const sockets = require('./sockets')

function emmit(to){
  sockets.emitTo(to, 'testEvent', 'whatever')
  console.log("emmit to", to)
}

emmit("Pb2tNdj5wOCFpLxKAAAB")
