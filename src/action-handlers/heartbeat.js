const heartbeat = () => {
  const response = {
    currentTime: new Date().toISOString()
  }
  return response
}

export { heartbeat }
