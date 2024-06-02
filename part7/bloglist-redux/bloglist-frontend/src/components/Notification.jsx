import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (!notification.message) {
    return null
  }
  const errorStyle = {
    color: 'red',
  }

  if (notification.isError) {
    return (
      <div className="notification" style={errorStyle}>
        {notification.message}
      </div>
    )
  }
  return <div className="notification">{notification.message}</div>
}

export default Notification
