import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    login: loginReducer,
    users: usersReducer,
    blogs: blogsReducer,
    notification: notificationReducer,
  },
})

export default store
