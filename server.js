const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const serveStatic = require('serve-static')
const expressWs = require('express-ws');
let state = {};
expressWs(app)
app.use(bodyParser.json())
app.use('/', serveStatic(path.join(__dirname, 'public')));

app.post('/api/duel6r-gsi', function(request, response) {
//  console.log('POST /')
//  console.dir(request.body)
  console.log('received state')
  state = request.body;
  broadcastState(state)
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end()
})


const connections = new Set()

function connect(ws){
  console.log('websocket opened')
  updateClientState(ws)
  connections.add(ws)
}
function disconnect(ws){
  connections.delete(ws)
}

function updateClient(message, ws){
  console.log('sending out')
  ws.send(message)
}

function updateClientState(ws){
  console.log('updating single client')
  updateClient(JSON.stringify(state), ws)
}

function broadcast(data){
  console.log('broadcasting')
  const message = JSON.stringify(data) 
  connections.forEach(updateClient.bind(null, message))
}

function broadcastState(){
  console.log('broadcasting state')
  broadcast(state)
}

app.ws('/api/duel6r-gsi-ws', function(ws, req) {
  connect(ws)
  ws.on('message', function(msg) {
    console.log('msg', {msg});
  });
  ws.on('close', function(args){
    console.log('closing websocket')
    disconnect(ws)
  })
  ws.on('error', function(args){
    console.log('closing websocket because of error', {ws})
    disconnect(ws)
  })
});

let cnt = 0;


function rand(max){
  return Math.floor(Math.random() * max)
}
function randPlayer(name){
  return {
    "name":name,
      "team":0,
      "ping":rand(150),
      "reloadTime":rand(40) / 10,
      "reloadInterval":rand(100) / 100,
      "alive":true,
      "timeSinceHit":81.4201,
      "health":rand(10) + 90,
      "air":rand(50) + 150,
      "points":rand(10),
      "kills":rand(10),
      "deaths":rand(10),
      "bonus":"invisibility",
      "bonusRemainingTime":9.45583,
      "ammo":rand(5)+10,
      "weapon":"machine gun"
  }
}
function getRandomData(){
  return {
    "state":"GAME",
    "rounds":rand(10),
    "maxRounds":10,
    "roundLimit":false,
    "waterRising":false,
    "players":[randPlayer('Player1'), randPlayer('Player2')]
    }
}

app.get('/api/test', function(request, response) {
//  console.log('GET /')
  state = getRandomData()
  broadcastState()
  response.writeHead(200, {'Content-Type': 'application/json'})
  response.end(JSON.stringify(state));
})


app.get('/api/duel6r-gsi', function(request, response) {
//  console.log('GET /')
  
  response.writeHead(200, {'Content-Type': 'application/json'})
  response.end(JSON.stringify(state));
})
port = 3000
app.listen(port)
console.log(`Listening at http://localhost:${port}`)
