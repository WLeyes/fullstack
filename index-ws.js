const express = require('express');
const server = require('http').createServer();
const app = express();

app.get('/', (req, res) => {
  res.sendFile('/index.html', { root: __dirname });
});

server.on('request', app);
server.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});

/** Begin websockets */
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ server });
wss.on('connection', (ws) => {
  const numClients = wss.clients.size;
  console.log(`New client connected. Total clients: ${numClients} State: ${ws.readyState}`);
  wss.broadcast(`New client connected. Total clients: ${numClients}`);

  if (ws.readyState === ws.OPEN) {
    ws.send('Welcome to the chat room!');
  };
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.broadcast(`Client disconnected. Total clients: ${wss.clients.size}`);
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    client.send(data);
  });
};
