#!/usr/bin/env node

import express from 'express'
import http from 'http'
import { WebSocketServer } from 'ws'

import { ocppHandler } from './ocppHandler.js'
import { sendCommandToCharger } from './sendCommandToCharger.js'

const acceptedChargePointIds = ['prompt', 'cp-1']
let ocppSocket

function onSocketError(err) {
  console.error(err)
}

const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ noServer: true })

server.on('upgrade', (request, socket, head) => {
  socket.on('error', onSocketError)
  console.log('received connection on:', request.url)
  const auth = request.headers.authorization
  console.log('authorization=', auth)
  // if (auth !== `Basic QWxhZGRpbjpvcGVuJTIwc2VzYW1l`) {
  //   socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
  //   socket.destroy()
  //   return
  // }
  const chargePointId = request.url?.slice(1)
  console.log('chargePointId:', chargePointId)

  if (chargePointId && acceptedChargePointIds.includes(chargePointId)) {
    console.log('CHARGE POINT ACCEPTED!')
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request)
    })
  } else {
    socket.write('HTTP/1.1 404 Not Found\r\n\r\n')
    socket.destroy()
  }
})

wss.on('headers', (headers, req) => {
  const protocol = req.headers['sec-websocket-protocol']
  console.log('protocol:', protocol)
  if (!['ocpp1.6', 'prompt'].includes(protocol)) {
    console.log(`${protocol} is not supported!`)
    const index = headers.findIndex((header) =>
      header.startsWith('Sec-WebSocket-Protocol')
    )
    headers.splice(index, 1)
  } else {
    console.log(`protocol ${protocol} ACCEPTED!`)
  }
})

wss.on('connection', function connection(ws) {
  const protocol = ws.protocol
  ws.on('error', console.error)
  if (protocol === 'ocpp1.6') {
    ocppSocket = ws
    ws.on('message', (data) => {
      const response = ocppHandler(data)
      if (response) {
        ws.send(response)
      }
    })
  } else {
    ws.on('message', (data) => {
      const command = JSON.parse(data)
      console.log('command=', JSON.stringify(command, undefined, '  '))
      if (!ocppSocket) {
        console.log('No Charge Point connected! Ignoring!')
        return
      }
      sendCommandToCharger(ocppSocket, command)
    })
  }
})

server.listen(8080, '0.0.0.0', function () {
  const { address, port } = server.address()
  console.log(`Listening on http://${address}:${port}`)
})
