import { authorize } from './action-handlers/authorize.js'
import { bootNotification } from './action-handlers/bootNotification.js'
import { heartbeat } from './action-handlers/heartbeat.js'
import { meterValues } from './action-handlers/meterValues.js'
import { startTransaction } from './action-handlers/startTransaction.js'
import { statusNotification } from './action-handlers/statusNotification.js'
import { stopTransaction } from './action-handlers/stopTransaction.js'

const handlers = {
  BootNotification: bootNotification,
  Heartbeat: heartbeat,
  StatusNotification: statusNotification,
  Authorize: authorize,
  StartTransaction: startTransaction,
  StopTransaction: stopTransaction,
  MeterValues: meterValues
}

export { handlers }
