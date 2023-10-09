const authorize = ({ idTag }) => {
  console.log('[Authorize.req]: received idTag:', idTag)
  const idTagInfo = {
    status: 'Accepted'
  }
  const response = {
    idTagInfo
  }
  return response
}

export { authorize }
