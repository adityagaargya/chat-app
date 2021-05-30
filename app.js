const express = require("express");
const path = require('path')
const http = require("http");
const socketio = require("socket.io")

const app = express();
const server = http.createServer(app)
const io = socketio(server)
const formatMessage =require('./utils/messages')




app.use(express.static("public"))
const botName = "DissBot"

io.on('connection', socket=> {

    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord"));

    // Broadcast when a user connects
    socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));

    // This runs when client disconnects
    socket.on('disconnect', ()=> {
        io.emit('message', formatMessage(botName, 'A user has left the chat') )
    })

    // Listen for chat message
    socket.on('chatMessage', (msg)=> {
        io.emit('message',  formatMessage('USER', msg));
    })
})




const PORT = 8000 || process.env.PORT;
server.listen(PORT, ()=> {
    console.log("Server running on " + PORT);
})
