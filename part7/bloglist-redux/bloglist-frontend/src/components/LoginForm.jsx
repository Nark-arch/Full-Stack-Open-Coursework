import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer.js'
import { userLogin } from '../reducers/loginReducer.js'

const LoginForm = ({ children }) => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const doLogin = async (event) => {
    event.preventDefault()

    const user = { username: username, password: password }
    try {
      await dispatch(userLogin(user))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true, 5))
    }
  }

  return (
    <div>
      {children}
      <form onSubmit={doLogin} className="login-form">
        <div>
          username{'  '}
          <input
            type="text"
            value={username}
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <div>
            passsword{'  '}
            <input
              type="text"
              value={password}
              id="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
