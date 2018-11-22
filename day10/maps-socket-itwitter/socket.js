const Server = require('http').Server;
const IO = require('socket.io');
let IO_SOCKET = null;

module.exports = app => {
    if (!IO_SOCKET) {
        const server = Server(app);
        IO_SOCKET = IO(server);
        IO_SOCKET.server = server;
    }

    return IO_SOCKET;
};
