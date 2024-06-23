import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notificationSet(state, action) {
      return action.payload
    },
    notificationReset() {
      return null
    },
  },
})

const { notificationSet, notificationReset } = notificationSlice.actions

export const setNotification = (message, isError, time) => {
  return (dispatch) => {
    dispatch(notificationSet({ message: message, isError: isError }))
    setTimeout(() => {
      dispatch(notificationReset())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
