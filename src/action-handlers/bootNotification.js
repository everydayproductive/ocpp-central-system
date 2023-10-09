const bootNotification = () => {
  const response = {
    status: 'Accepted',
    currentTime: new Date().toISOString(),
    heartbeatInterval: 60
  }
  return response
}

export { bootNotification }
