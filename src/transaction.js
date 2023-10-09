let nextTransactionId = 0
const activeTransactionIds = []

const getTransactionId = () => {
  return nextTransactionId++
}

const beginTransaction = (transactionId) => {
  activeTransactionIds.push(transactionId)
}

const endTransaction = (transactionId) => {
  const index = activeTransactionIds.findIndex((id) => id === transactionId)

  if (index === -1) {
    console.log(`Unexpected transactionId: ${transactionId}`)
  } else if (index !== 0) {
    activeTransactionIds.splice(index, 1)
    console.log(`Out-of-order transactionId: ${transactionId}`)
  } else {
    activeTransactionIds.shift()
    console.log(`Good! Expected transactionId: ${transactionId}`)
  }
}

export { getTransactionId, beginTransaction, endTransaction }
