const Notify = ({ notification }) => {
  if (!notification) {
    return null
  }
  return <div style={{ color: 'red' }}> {notification} </div>
}

export default Notify
