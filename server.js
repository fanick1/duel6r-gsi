const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const serveStatic = require('serve-static')

let state = {};

app.use(bodyParser.json())
app.use('/', serveStatic(path.join(__dirname, 'public')));

app.post('/api/duel6r-gsi', function(request, response) {
//  console.log('POST /')
//  console.dir(request.body)

  state = request.body;

  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end()
})

app.get('/api/duel6r-gsi', function(request, response) {
//  console.log('GET /')
  
  response.writeHead(200, {'Content-Type': 'application/json'})
  response.end(JSON.stringify(state));
})
port = 3000
app.listen(port)
console.log(`Listening at http://localhost:${port}`)
