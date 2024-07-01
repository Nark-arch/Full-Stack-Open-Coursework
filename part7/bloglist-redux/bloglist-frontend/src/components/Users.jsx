import { useSelector } from 'react-redux'
import { Route, Routes, useMatch } from 'react-router-dom'

import User from './User'
import UserList from './UserList'

const Users = () => {
  const match = useMatch('/users/:id')
  const users = useSelector((state) => state.users)

  if (!users) {
    return null
  }

  const user = match
    ? users.find((user) => user.id === String(match.params.id))
    : null

  return (
    <div>
      <Routes>
        <Route path="/" element={<UserList users={users} />} />
        <Route path="/:id" element={<User user={user} />} />
      </Routes>
    </div>
  )
}

export default Users
