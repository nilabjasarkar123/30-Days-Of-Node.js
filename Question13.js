const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    ws.send(message); // Echo back the received message
  });
});

app.get("/websocket", function (req, res) {
  res.sendFile(__dirname + "/public/index2.html");
});

server.listen(3000, function () {
  console.log("Server started on port 3000");
});
