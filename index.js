// Node server, which will handle socket io connections
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app); 
const {Server} = require('socket.io');

const io = new Server(server);


const users = {};

app.use('/', express.static(path.join(__dirname,'public')))

// to establish the connection between all and listen all connections 

io.on('connection', socket =>{
// jese hi mujhe 'user-joined' event mila, jo ki client side se fire/emit hua he, i will listen it as follows
    //for a perticular connection 
    socket.on('new-user-joined', name =>{
// storing names in our users array at index(socket.id) as a key
        users[socket.id] = name; 
    // jisne join kiya usko chhod, baki sb ko event emit kr deta he
        socket.broadcast.emit('user-joined', name);

    });
// client side se event emit hua he send name ka, so listen to this event---
    socket.on('send', message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

// whenever a user disconnect
    socket.on('disconnect', name =>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id]
    });
    
});

const port = 3000;
server.listen(port, ()=>{

    console.log(`chat server is working at port ${port}`)

} )