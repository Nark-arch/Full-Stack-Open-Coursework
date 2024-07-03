import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const UserList = ({ users }) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Users</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users
            ? users.map((user) => (
              <tr key={user.username}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))
            : null}
        </tbody>
      </Table>
    </>
  )
}

export default UserList
