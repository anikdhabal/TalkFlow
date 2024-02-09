"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});
let activeUsers = [];
io.on("connection", (socket) => {
    socket.on('new-user-connected', (user) => {
        if (!activeUsers.some((activeUser) => activeUser.username == user.username)) {
            activeUsers.push({
                socketId: socket.id,
                username: user.username
            });
        }
        console.log(user);
    });
    socket.on('send-message', (data) => {
        const user = activeUsers.find((user) => user.username === data.user);
        if (user) {
            io.to(user.socketId).emit('receive-message', data);
        }
    });
    socket.on('disconnect', () => {
        activeUsers = activeUsers.filter((user) => user.socketId != socket.id);
    });
});
const PORT = 8800;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
