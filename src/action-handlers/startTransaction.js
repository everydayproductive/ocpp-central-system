import { beginTransaction, getTransactionId } from '../transaction.js'

const startTransaction = (pdu) => {
  console.log('[StartTransaction.req]:')
  console.log(pdu)
  const idTagInfo = {
    status: 'Accepted'
  }
  const transactionId = getTransactionId()
  console.log('transactionId=', transactionId)
  beginTransaction(transactionId)
  const response = {
    idTagInfo,
    transactionId
  }
  return response
}

export { startTransaction }
