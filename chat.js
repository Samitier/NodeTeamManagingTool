var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client){
  console.log("client connected");
  client.on("new message", function(msg) {
    client.broadcast.emit("message", msg);
    client.emit("your message", msg);
  });
});

module.exports = server;