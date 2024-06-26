import { useState } from 'react'
import { useLoginValue } from '../contexts/LoginContext'

const Blog = ({ blog, removeBlogMutation, updateBlogMutation }) => {

  const user = useLoginValue()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const addLike = async (event) => {
    event.preventDefault()
    updateBlogMutation.mutate({
      updateObject: {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      },
      id: blog.id,
    })
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlogMutation.mutate(blog.id)
    }
  }

  const [showDetails, setShowDetails] = useState(false)

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
            <button onClick={removeBlog}>remove</button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default Blog
