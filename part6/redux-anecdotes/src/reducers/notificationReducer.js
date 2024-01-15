import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationSet(state, action) {
      const notification = action.payload
      return notification
    },
    notificationReset() {
      return null
    },
  },
})

export const { notificationSet, notificationReset } = notificationSlice.actions
export default notificationSlice.reducer
