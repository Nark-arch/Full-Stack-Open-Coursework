import { useEffect, useRef, useContext } from 'react'

import { useNotificationSet } from './contexts/NotificationContext'
import LoginContext from './contexts/LoginContext'

import blogService from './requests/blogs'
import loginService from './requests/login'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

const App = () => {

  //contexts
  const [user, userDispatch] = useContext(LoginContext)
  const setNotification = useNotificationSet()
  const blogFormRef = useRef()

  //useEffect
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
  }, [userDispatch])

  //eventHandlers
  const handleLogin = async (user) => {
    try {
      const loggedInUser = await loginService.login(user)
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedInUser)
      )
      blogService.setToken(loggedInUser.token)
      userDispatch({ type: 'SET', payload: user })
      return
    } catch (error) {
      setNotification(error.response.data.error, true, 5)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch({ type: 'CLEAR' })
  }

  //return

  if (user === null) {
    return (
      <LoginForm handleLogin={handleLogin}>
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
