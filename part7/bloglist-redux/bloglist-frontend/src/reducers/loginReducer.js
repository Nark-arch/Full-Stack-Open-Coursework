import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogsService from '../services/blogs'

const loginSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setUser(state, action) {
      blogsService.setToken(action.payload.token)
      return action.payload
    },
    unsetUser(state, action) {
      return null
    },
  },
})

const { setUser, unsetUser } = loginSlice.actions

export const initializeLogin = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }
}

export const userLogin = (user) => {
  return async (dispatch) => {
    const loggedInUser = await loginService.login(user)
    window.localStorage.setItem(
      'loggedBlogappUser',
      JSON.stringify(loggedInUser)
    )
    dispatch(setUser(loggedInUser))
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(unsetUser())
  }
}
export default loginSlice.reducer
