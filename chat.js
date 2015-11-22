var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var publicLobbyMembers =[];

io.on('connection', function(client){
  var clientName = "Guest " + Math.floor((Math.random() * 100) + 1);
  publicLobbyMembers.forEach(function(name) {client.emit("client connected",name);});
  publicLobbyMembers.push(clientName);

  client.emit("you connected",clientName);
  client.broadcast.emit("client connected", clientName);

  client.on("new message", function(msg, name) {
    client.broadcast.emit("message", msg, name);
    client.emit("your message", msg);
  });

  client.on("disconnect", function(name) {
    io.emit("client left", name);
    publicLobbyMembers.splice(publicLobbyMembers.indexOf(name), 1);
  });
});

module.exports = server;