import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';

const server = http.createServer(function(request: any, response: any) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("hi there");
});

const wss = new WebSocketServer({ server });
let usercount:number=0;
wss.on('connection', function connection(ws:WebSocket) {
  ws.on('error', console.error);
console.log("User Count",++usercount)
  ws.on('message', function message(data:WebSocket.RawData, isBinary:boolean) {
    wss.clients.forEach(function each(client:WebSocket) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send('Hello! Message From Server!!');
});

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});