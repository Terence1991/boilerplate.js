// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv3 = require('uuid/v3')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

const clients = {

}



// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');



  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));

  ws.on('message', function (data) {
    console.log(data);
    let object = JSON.parse(data);
    console.log(`user ${object.username} said ${object.content}`)
     wss.broadcast(object);
  });
});

wss.broadcast = function broadcast(data) {
  console.log("brodcast is going through");
  wss.clients.forEach(function each(client) {
    console.log("for each client");
      client.send(JSON.stringify(checkTypeOf(data)));
  });
};


const addClient = (ws, color = "black", username = 'Anonymous') => {
  const userId = uuidv4();
  ws.userId = userId;
  clients[userId] = {id: userId, username , color}
  console.log("this is my client object ",clients); 
}

const checkTypeOf = (message) => {
  switch(message.type) {
    case "postMessage":
      message.type = "incomingMessage";
      break; 
    case "postNotification":  
      message.type = "incomingUserNotification";
      break;
  } 
  return message;
}