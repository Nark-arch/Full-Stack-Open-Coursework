import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer.js'
import { userLogin } from '../reducers/loginReducer.js'

import { Form, Button } from 'react-bootstrap'

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
    <div className="container">
      {children}
      <Form onSubmit={doLogin} className="login-form">
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Passsword</Form.Label>
          <Form.Control
            type="text"
            value={password}
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button
          variant="outline-success"
          style={{ marginTop: 10 }}
          id="login-button"
          type="submit"
        >
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
