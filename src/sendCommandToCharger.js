import { v4 } from 'uuid'
import { getPDUForCommand } from './getPDUForCommand.js'
import { addPendingRequest } from './pendingRequests.js'

const sendCommandToCharger = (ocppSocket, { cmd, params }) => {
  const pdu = getPDUForCommand({
    cmd,
    params
  })
  const uniqueId = v4()
  addPendingRequest({ uniqueId, action: cmd })
  ocppSocket.send(JSON.stringify([2, uniqueId, cmd, pdu]))
}

export { sendCommandToCharger }
