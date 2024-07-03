import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

const Blog = ({ blog }) => {
  return (
    <Link
      to={`/blogs/${blog.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <ListGroup.Item as="li" key={blog.id} action>
        {blog.title} {blog.author}
      </ListGroup.Item>
    </Link>
  )
}

export default Blog
