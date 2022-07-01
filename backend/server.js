/*
 * Import packages
 */
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const fs = require("fs");
const io = new Server(server);

server.listen(5000, function () {
    console.log("server started at port 5000");
});

app.use(express.static('../frontend/public'));

io.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);

    socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
        //start of conversation
        opening = "Hello, I am your personal AI assistant, what recipe are you looking for?"
        socket.emit("opening", opening);
    });

    //user's question
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
    });
});
