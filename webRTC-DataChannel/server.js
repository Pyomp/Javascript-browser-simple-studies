'use strict'

import { createServer } from 'http'
import * as fs from 'fs'
import { WebSocketServer } from 'ws'

const server = createServer((request, response) => {
    if (request.url === '/client.js') {
        fs.readFile('./client.js', (error, content) => {
            if (error !== null) {
                response.writeHead(500)
                response.end('404')
            } else {
                response.writeHead(200, { 'Content-Type': 'text/javascript' })
                response.end(content, 'utf-8')
            }
        })
    } else {
        fs.readFile('./index.html', (error, content) => {
            if (error !== null) {
                response.writeHead(500)
                response.end('404')
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' })
                response.end(content, 'utf-8')
            }
        })
    }
})

const CLIENTS = new Set()
const wss = new WebSocketServer({ server })
wss.on('connection', (ws, req) => {
    const ip = req.socket.remoteAddress

    CLIENTS.add(ws)
    if (CLIENTS.size > 2) console.log('More than 2 clients')
    ws.onclose = (e) => {
        console.log(`WS Connexion from ${ip} closed.`)
    }

    ws.onerror = (e) => {
        console.log(`WS Error from ${ip}: `, e)
    }

    ws.onmessage = async (e) => {
        const message = e.data
        console.log(`WS Message from ${ip}: `, message)

        // broadcast
        for (const c of CLIENTS) {
            if (c !== ws) {
                c.send(message)
            }
        }
    }

    ws.onopen = (e) => {
        console.log(`WS Open from ${ip}: `, message)
    }
})

server.listen(80, '0.0.0.0')
