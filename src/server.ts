
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import bodyParser from 'body-parser'
import serveStatic from 'serve-static'
import expressWs from 'express-ws'
import * as ws from 'ws'

const {app} = expressWs(express())

let state : DuelGSI.DuelState = {}

app.use(bodyParser.json())


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.use('/', serveStatic('public'))

app.post('/api/duel6r-gsi', function (request, response) {
    //  console.log('POST /')
    //  console.dir(request.body)
    console.log('received state')
    state = request.body
    broadcastState()
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end()
})


const connections = new Set()

function connect(ws: ws.WebSocket) {
    console.log('websocket opened')
    updateClientState(ws)
    connections.add(ws)
}

function disconnect(ws: ws.WebSocket) {
    connections.delete(ws)
}

function updateClient(ws: ws.WebSocket, message: string) {
    console.log('sending out')
    ws.send(message)
}

function updateClientState(ws: ws.WebSocket) {
    console.log('updating single client')
    updateClient(ws, JSON.stringify(state))
}

function broadcast(data: unknown) {
    console.log('broadcasting')
    const message = JSON.stringify(data)
    connections.forEach(ws => updateClient(ws as ws.WebSocket, message))
}

function broadcastState() {
    console.log('broadcasting state')
    broadcast(state)
}

app.ws('/api/duel6r-gsi-ws', function (websocket: ws.WebSocket, req) {
    connect(websocket)
    websocket.on('message', function (msg) {
        console.log('msg', { msg })
    })
    websocket.on('close', function () {
        console.log('closing websocket')
        disconnect(websocket)
    })
    websocket.on('error', function () {
        console.log('closing websocket because of error', { ws: websocket })
        disconnect(websocket)
    })
})

const cnt = 0


function rand(max: number): number {
    return Math.floor(Math.random() * max)
}
function randPlayer(name: string) : DuelGSI.PlayerRecord{
    return {
        name: name,
        team: rand(5),
        ping: rand(150),
        reloadTime: rand(40) / 10,
        reloadInterval: rand(100) / 100,
        alive: true,
        timeSinceHit: 81.4201,
        health: rand(10) + 90,
        air: rand(50) + 150,
        points: rand(10),
        kills: rand(10),
        roundKills: rand(10),
        deaths: rand(10),
        bonus: 'invisibility',
        bonusRemainingTime: 9.45583,
        ammo: rand(5) + 10,
        weapon: 'machine gun'
    }
}
function getRandomData(): DuelGSI.GameState {
    return {
        state: 'GAME',
        round: rand(10),
        maxRounds: 10,
        roundLimit: false,
        waterRising: false,
        players: Array(10).fill(0).map((n, i) => randPlayer(`Player${i}`))
    }
}

app.get('/api/test', function (request, response) {
    //  console.log('GET /')
    state = getRandomData()
    broadcastState()
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(state))
})


app.get('/api/duel6r-gsi', function (request, response) {
    //  console.log('GET /')

    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(state))
})
const port = 3000
app.listen(port)
console.log(`Listening at http://localhost:${port}`)


export {} 