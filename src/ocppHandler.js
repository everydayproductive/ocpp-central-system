import { handlers } from './handlers.js'

import { CALLERROR, CALLRESULT } from './messageTypeIds.js'
import { popPendingRequest } from './pendingRequests.js'

const ocppHandler = (data) => {
  console.log('')
  console.log('##############################################')
  console.log('received: %s', data)
  const json = JSON.parse(data)
  if (!json) {
    console.log('this is not JSON! Ignoring! (see 4.1.3 p. 10 of the spec)')
    return null
  }
  const [messageTypeId, uniqueId, ...rest] = json
  if (messageTypeId === CALLRESULT) {
    const [payload] = rest
    const { action } = popPendingRequest(uniqueId)
    if (action) {
      console.log(`${action}.conf:`)
    }
    console.log(JSON.stringify(payload, undefined, '  '))
    return null
  }
  if (messageTypeId === CALLERROR) {
    console.log(popPendingRequest(uniqueId))
    return null
  }
  const [action, payload] = rest
  console.log('messageTypeId:', messageTypeId)
  console.log('uniqueId:', uniqueId)
  console.log('action:', action)
  console.log('payload:', JSON.stringify(payload, undefined, '  '))

  if (Object.keys(handlers).includes(action)) {
    const pdu = handlers[action](payload)
    return JSON.stringify([CALLRESULT, uniqueId, pdu])
  } else {
    console.log(`ERROR: action ${action} NotImplemented!`)
    return JSON.stringify([CALLERROR, uniqueId, 'NotImplemented', '', {}])
  }
}

export { ocppHandler }
