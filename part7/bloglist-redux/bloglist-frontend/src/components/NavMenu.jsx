import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const NavMenu = ({ children }) => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <Link to="/">
            <Navbar.Brand>Blogs</Navbar.Brand>
          </Link>
          <Link to="/users">
            <Navbar.Brand>Users</Navbar.Brand>
          </Link>
        </Nav>
        <Navbar.Brand>{children}</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default NavMenu
