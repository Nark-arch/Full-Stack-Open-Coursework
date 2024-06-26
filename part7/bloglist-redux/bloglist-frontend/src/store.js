import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import loginReducer from './reducers/loginReducer'

const store = configureStore({
  reducer: {
    login: loginReducer,
    blogs: blogsReducer,
    notification: notificationReducer,
  },
})

export default store
