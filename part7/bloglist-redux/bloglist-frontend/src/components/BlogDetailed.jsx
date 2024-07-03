import { Button } from 'react-bootstrap'

const BlogDetailed = ({ blog, addLike }) => {
  return (
    <>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <h5>
        {blog.likes} likes <Button onClick={addLike}>like</Button>
      </h5>
      <p>added by {blog.user.name}</p>
    </>
  )
}

export default BlogDetailed
