var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client){
  console.log("client connected");
  client.on("message", function(msg) {
    console.log(msg);
  });
});

module.exports = server;