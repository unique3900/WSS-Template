"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const express = require('express');
const app = express();
const httpServer = app.listen(8080);
const wss = new ws_1.WebSocketServer({ server: httpServer });
wss.on("connection", (socket) => {
    socket.on('error', (err) => {
        console.log("Error in Web Socket", err);
    });
    console.log("Socket Connection Established");
    socket.on("message", (data) => {
        console.log("New Message Received");
        wss.clients.forEach((client) => {
            if (client.readyState == ws_1.WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
    socket.send("Web Socket Connected Successfully");
});
