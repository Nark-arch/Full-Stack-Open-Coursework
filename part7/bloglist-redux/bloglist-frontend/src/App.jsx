import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList.jsx'
import Togglable from './components/Togglable'

import { initializeLogin, userLogout } from './reducers/loginReducer.js'
import { initializeBlogs } from './reducers/blogsReducer.js'
import { useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  //useEffect
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeLogin())
  }, [dispatch])

  //useRef
  const blogFormRef = useRef()

  //eventHandlers
  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(userLogout())
  }

  //return
  if (user === null) {
    return (
      <LoginForm>
        <h2>Log in to application</h2>
        <Notification />
      </LoginForm>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user.name} logged in{' '}
      <button type="logout" onClick={handleLogout}>
        logout
      </button>
      <Togglable
        showButtonLabel="new blog"
        hideButtonLabel="cancel"
        ref={blogFormRef}
      >
        <BlogForm blogFormRef={blogFormRef}>
          <h2>create new</h2>
        </BlogForm>
      </Togglable>
      <BlogList />
    </div>
  )
}

export default App
