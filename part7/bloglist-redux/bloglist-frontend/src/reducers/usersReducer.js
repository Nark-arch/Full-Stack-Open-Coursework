import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const userSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    unsetUsers(state, action) {
      return null
    },
  },
})

const { setUsers, unsetUsers } = userSlice.actions

export const getUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch(setUsers(users))
  }
}

export const clearUsers = () => {
  return async (dispatch) => {
    dispatch(unsetUsers())
  }
}
export default userSlice.reducer
