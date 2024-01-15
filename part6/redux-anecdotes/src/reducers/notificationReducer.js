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

export const { notificationSet, notificationReset } = notificationSlice.actions

export const setNotification = (content, time) => {
  return (dispatch) => {
    dispatch(notificationSet(content))
    setTimeout(() => {
      dispatch(notificationReset())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
