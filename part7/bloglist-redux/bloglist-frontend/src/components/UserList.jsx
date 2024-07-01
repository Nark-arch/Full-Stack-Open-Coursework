import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  return (
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users
            ? users.map((user) => (
              <tr key={user.username}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            ))
            : null}
        </tbody>
      </table>
    </>
  )
}

export default UserList
