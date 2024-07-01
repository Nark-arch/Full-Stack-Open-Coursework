import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { userLogout } from '../reducers/loginReducer'
import { Route, Routes, useMatch } from 'react-router-dom'

import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogDetailed from './BlogDetailed'
import Comments from './Comments'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const match = useMatch('/blogs/:id')

  const blogFormRef = useRef()

  if (!blogs) {
    return null
  }

  const blog = match
    ? blogs.find((blog) => blog.id === String(match.params.id))
    : null

  const handleUpdateBlog = async (modifiedBlog, id) => {
    try {
      await dispatch(updateBlog(modifiedBlog, id))
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === 'token expired'
      ) {
        dispatch(setNotification('session has expired login again', true, 5))
        dispatch(userLogout())
      } else {
        console.log(error)
      }
    }
  }

  /*const handleRemoveBlog = async (id) => {
    try {
      await dispatch(removeBlog(id))
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === 'token expired'
      ) {
        dispatch(setNotification('session has expired login again', true, 5))
        dispatch(userLogout())
      } else {
        console.log(error)
      }
    }
  }

  const blogRemove = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleRemoveBlog(blog.id)
    }
  }*/

  const addLike = async (event) => {
    const modifiedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      comments: blog.comments,
    }
    await handleUpdateBlog(modifiedBlog, blog.id)
  }

  return (
    <div>
      <Togglable
        showButtonLabel="new blog"
        hideButtonLabel="cancel"
        ref={blogFormRef}
      >
        <BlogForm blogFormRef={blogFormRef}>
          <h2>create new</h2>
        </BlogForm>
      </Togglable>
      <Routes>
        <Route
          path="blogs/:id"
          element={
            <>
              <BlogDetailed blog={blog} addLike={() => addLike()} />
              <Comments blog={blog} handleUpdateBlog={handleUpdateBlog} />
            </>
          }
        />
        <Route
          path="/"
          element={
            blogs
              ? blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
              : null
          }
        />
      </Routes>
    </div>
  )
}

export default BlogList
