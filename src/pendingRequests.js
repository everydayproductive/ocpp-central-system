const pendingRequests = []

const addPendingRequest = (req) => {
  pendingRequests.push(req)
}

const popPendingRequest = (uniqueId) => {
  const index = pendingRequests.findIndex(({ uniqueId: id }) => id === uniqueId)

  if (index === -1) {
    console.log(
      `Unexpected response from the Charge Point: uniqueId: ${uniqueId}`
    )
    return { uniqueId }
  }

  if (index !== 0) {
    const { action } = pendingRequests.splice(index, 1)
    console.log(
      `Out-of-order response from the Charge Point: action: ${action}, uniqueId: ${uniqueId}`
    )
    return { uniqueId, action }
  }

  const { action } = pendingRequests.shift()
  console.log(
    `Good! Expected response from the Charge Point: action: ${action}, uniqueId: ${uniqueId}`
  )
  return { uniqueId, action }
}

export { addPendingRequest, popPendingRequest }
