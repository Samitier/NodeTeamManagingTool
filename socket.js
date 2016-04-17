var socketio = require('socket.io');

function init(server) {
    var io = socketio(server);

    io.on('connection', function (client) {
        client.emit("you connected");
        client.on("new message", function (msg) {
            client.broadcast.emit("message", msg);
            client.emit("your message", msg);
        });
    });
    return io;
};

module.exports = init;