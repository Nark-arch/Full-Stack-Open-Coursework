import { useState } from 'react'
import { useSelector } from 'react-redux'

const Blog = ({ blog, handleUpdateBlog, handleRemoveBlog }) => {
  const user = useSelector((state) => state.login)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [showDetails, setShowDetails] = useState(false)

  const addLike = async (event) => {
    event.preventDefault()
    const modifiedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    await handleUpdateBlog(modifiedBlog, blog.id)
  }

  const blogRemove = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleRemoveBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails ? (
        <div className="blog-details">
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={addLike}>like</button>
          </p>
          <p>{blog.user.name}</p>
          {blog.user.username === user.username ? (
            <button onClick={blogRemove}>remove</button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default Blog
