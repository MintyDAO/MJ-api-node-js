const socketIO = require('socket.io');
let io = null;

module.exports = {
    connect: function(server) {
        io = socketIO(server, {
        	cors: {
        		origin: "*",
        		methods: [ "GET", "POST" ]
        	}
        });
    },

    on: function(){
      if(io){
        io.on('connection', (socket) => {
          console.log(`User ${socket.id} connected`)
          socket.emit("me", socket.id)
        })
      }
      else{
        console.log("IO not connected")
      }
    },

    emitTo: function(to, eventName, values) {
        if (io) {
          io.to(to).emit(eventName, values);
          console.log("emmit to", to)
        }
        else{
          console.log("IO not connected")
        }
    },

    emit: function(eventName, eventObj) {
        if (io) {
          io.emit(eventName, values);
          console.log("emmit", eventName, eventObj)
        }
        else{
          console.log("IO not connected")
        }
    }
}
