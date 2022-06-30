/*
 * Import packages
    npm init
    npm install express nodemonn
    npm install socket.io
    npm install -D nodem
 */
const express = require('express');
const app = express();
const path = require('path')

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server()

server.listen(5000, function () {
    console.log("server started at port 5000");
});

app.use(express.static('../frontend/public'));

// Routing
app.get('/', (req, res)=>{
  res.sendFile('./frontend/public/index.html', {root: __dirname})
})
app.get('/chat', (req, res)=>{
  res.sendFile('chat.html', {root: path.join(__dirname, '../frontend/public')})
})
app.use((req, res)=>{
  res.sendFile('error.html', {root: path.join(__dirname, '../frontend/public')})
})


io.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);

    //  when a user joins the chat 
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
      });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
      });
    
    /* 
    // in the app.js // frontend
      import { useEffect }from 'react'
      
      

      // for index page
      const[username, setUsername] = useState(" ");
      const[room, setRoom] = useState(" ");

      const joinRoom = () => { 
        if(username !== " " && room !== " "){
            socket.emit("join_room", room);
        }
      }
      
      [message, setMessage ] = useState("");
      const send_message () => {
        socket.emit("send_message", message)
      }

      useEffect(() => {
        socket.on("receive_message", (data) => {
          // do action with data received , publish, alert or anything
        })
      }, [socket])

      <input placeholder = "Message ..." 
      onChange = {(event)=> setMessage(event.target.value)} > </input> 
      */
    socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
    });

    socket.on("question", (user_input) => {
        console.log("recieved question: " + user_input)
        // place your bot-code here !!!
        const bot_answer = questions_list[user_input.toLowerCase()];
            if (bot_answer) {
              socket.to(user_input.room).emit("bot_answer", bot_answer); 
            }else{
              bot_answer = "I am sorry, I cannot answer  \"" + user_input + "\" yet, Can you paraphrase it?";
              socket.to(user_input.room).emit("bot_answer", bot_answer);
            }
    });
});


/*
import { useState } from "react";

const socket = io.connect("http://localhost:5000");

function App(){
    const[username, setUsername] = useState(" ");
    const[room, setRoom] = useState(" ");

    const joinRoom = () => { 
        if(username !== " " && room !== " "){
            socket.emit("join_room", room);
        }
    }

    return (
        <div> 
            <h3> Chat </h3>
            
            <input type = "text" placeholder="Here...." 
            onChange={(event)=> {
                setUsername(event.target.value);
            }}/>

            <input type = "text" placeholder="Room ID...." 
            onChange={(event)=> {
                setRoom(event.target.value);
            }}/>
            <button onClick={joinRoom}> Join a Room</button>

            <chat socket = {socket} username = {username}> room = {room} </chat>
        </div>
    )
}

export default App;

*/
