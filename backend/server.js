/*
 * Import packages
    npm init
    npm install express nodemonn
    npm install socket.io
    npm install -D nodem
 */

const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const cors = require("cors");
app.use(cors());

const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5000",
      methods: ["GET", "POST"],
    },
  });
  


server.listen(5000, function () {
    console.log("server started at port 5000");
});

//app.use(express.static('../frontend/public'));

io.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);
    
    // To welcome the current user 
    socket.emit('message', 'Welcome to Recepicoo!');

    //  when a user joins the chat 
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
      });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
      });
      
    socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
    });


    socket.on("question", (data) => {
        console.log("recieved question: " + data)
        // place your bot-code here !!!
        answer = "I am dumb, i cannot answer to \"" + data + "\" yet";
        socket.emit("answer", answer);
    });
});

