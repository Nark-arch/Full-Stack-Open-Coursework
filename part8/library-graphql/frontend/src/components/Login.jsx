import { LOGIN } from '../queries'

import { useState } from 'react'
import { useMutation } from '@apollo/client'

const Login = ({ show, notify, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login] = useMutation(LOGIN, {
    onCompleted: (result) => {
      const token = result.login.value
      localStorage.setItem('library-user-token', token)
      setToken(token)
    },
    onError: (error) => {
      if (error.graphQLErrors) {
        notify(error.graphQLErrors[0].message)
      } else {
        console.log(error)
      }
    },
  })

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
