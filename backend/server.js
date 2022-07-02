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
      });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
      });

    socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
        //start of conversation
        opening = "Hello, I am your personal AI assistant, what recipe are you looking for?"
        socket.emit("opening", opening);
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
    /* //user's question
    socket.on("question", (data) => {
        console.log("recieved question: "+data)
        // place your bot-code here !!!
        const fs = require('fs')

        //write the question (keyword) to a text file
        fs.writeFile('keywords.txt', data, err => {
          if (err) {
            console.error(err)
            return
          }
        })
        //answer of the bot
        new_answer= "I have found several " + data + " recipes. Here are the results:"
        socket.emit("new question", new_answer)
        fs.readFile('sublist.txt', 'utf8', (err, data1) => {
          if (err) {
            console.error(err);
            return;
          }
          data1 =  data1.toString().split("\n");
          return data1;
        });
        //looking for the keyword in the file
        for (let i = 0; i <  data1.length; i++) {
            if (data1[i] == data) {
                list = []
                j = i + 1
                while (data1[j].length > 30) {
                    list += data[j]
                }
            }
        }
        //socket.emit()
        socket.emit("list", list)
        if (list.length < 1) {
            answer = "I am dumb, I cannot answer to \"" + data + "\" yet, can you rephrase?";
            socket.emit("answer", answer);
        }
    });*/
  }); 
}); 
