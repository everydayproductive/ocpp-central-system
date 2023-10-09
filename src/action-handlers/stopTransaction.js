import { endTransaction } from '../transaction.js'

const stopTransaction = (pdu) => {
  console.log('[stopTransaction.req]:')
  console.log(JSON.stringify(pdu, undefined, '  '))
  const { transactionId, idTag } = pdu
  endTransaction(transactionId)
  if (idTag) {
    const idTagInfo = {
      status: 'Accepted'
    }
    return {
      idTagInfo
    }
  } else {
    return {}
  }
}

export { stopTransaction }
