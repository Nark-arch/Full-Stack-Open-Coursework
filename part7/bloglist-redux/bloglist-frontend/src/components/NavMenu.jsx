import { Link } from 'react-router-dom'

const NavMenu = ({ children }) => {
  const navbarStyle = {
    backgroundColor: '#d3d3d3',
    padding: 10,
    marginBottom: 5,
  }
  return (
    <div style={navbarStyle}>
      <Link to="/">blogs</Link> <Link to="/users">users</Link> {children}
    </div>
  )
}

export default NavMenu
