/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react'
import { useLoginDispatch } from './LoginContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload
  case 'CLEAR':
    return null
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const useNotificationSet = () => {
  const notificationDispatch = useNotificationDispatch()
  const userDispatch = useLoginDispatch()
  return (message, isError, time) => {
    if (message === 'token expired') {
      message = 'session has expired login again'
      userDispatch({ type: 'CLEAR' })
    }
    notificationDispatch({
      type: 'SET',
      payload: { message: message, isError: isError },
    })
    setTimeout(() => notificationDispatch({ type: 'CLEAR' }), time * 1000)
  }
}

export default NotificationContext
