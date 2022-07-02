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

/* // Routing
app.get('/', (req, res)=>{
  res.sendFile('./frontend/public/index.html', {root: __dirname})
})
app.get('/chat', (req, res)=>{
  res.sendFile('chat.html', {root: path.join(__dirname, '../frontend/public')})
})
app.use((req, res)=>{
  res.sendFile('error.html', {root: path.join(__dirname, '../frontend/public')})
})
*/

io.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);


    //  when a user joins the chat 
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
        // Opening the Chat, when the user joins the Chat
        const opening = 'Hello, I am your personal AI assistant, what recipe are you looking for?'
        socket.emit("opening", opening)
      });


    // receive the user message --> then shows it in the chat
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
      });


    socket.on("user_input", (user_input) => {
        console.log("recieved question: " + user_input)
        // place your bot-code here !!!
        const bot_answer = questions_list[user_input.toLowerCase()];  // This is the remaining part only
            if (bot_answer) {
              socket.to(user_input.room).emit("bot_answer", bot_answer); 
            }else{
              bot_answer = "I am sorry, I cannot answer  \"" + user_input + "\" yet, Can you paraphrase it?";
              socket.to(user_input.room).emit("bot_answer", bot_answer);
            }
  }); 


  // Ending the Chat when the user leaves
  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
    //End of conversation
    bye = "Goodbye! I hope I've been helpful!"
    socket.emit("bye", bye);
  });
}); 
