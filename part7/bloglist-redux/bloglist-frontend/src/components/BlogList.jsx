import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { userLogout } from '../reducers/loginReducer'

import Blog from './Blog'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

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

  const handleRemoveBlog = async (id) => {
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

  return (
    <div>
      {blogs
        ? blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleRemoveBlog={handleRemoveBlog}
            handleUpdateBlog={handleUpdateBlog}
          />
        ))
        : null}
    </div>
  )
}

export default BlogList
