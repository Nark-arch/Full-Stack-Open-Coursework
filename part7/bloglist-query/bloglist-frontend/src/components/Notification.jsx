import { useNotificationValue } from '../contexts/NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()
  if (notification === null) {
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
