const express = require('express');
const path = require('path');
const http = require('http')
const app = express();
const server = http.createServer(app);
const {Server} = require("socket.io");

const io = new Server(server);

app.use(express.static(path.join(__dirname,"../frontend")));

app.get('/',(req,res)=>{
    res.sendFile(__dirname,"../frontend/index.html");
})

io.on('connection', (socket)=>{
    socket.on("chat message",(msg)=>{
    io.emit("message", msg);

    })
})
server.listen(3000,()=>{
    console.log("server is listening at port 3000")
})
