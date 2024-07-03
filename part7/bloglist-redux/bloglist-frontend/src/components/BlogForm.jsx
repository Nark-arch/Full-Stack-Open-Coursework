import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { userLogout } from '../reducers/loginReducer'

import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ children, blogFormRef }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    try {
      blogFormRef.current.toggleVisibility()
      await dispatch(createBlog(newBlog))
      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          false,
          5
        )
      )
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

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      {children}
      <Form onSubmit={addBlog} className="blog-form">
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="enter title here"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="enter author here"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="enter url here"
          />
        </Form.Group>
        <Button
          variant="outline-success"
          style={{ marginTop: 10 }}
          id="create-blog-button"
          type="submit"
        >
          Create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
