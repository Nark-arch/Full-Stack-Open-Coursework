import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotificationSet } from '../contexts/NotificationContext'
import blogService from '../requests/blogs'

const BlogForm = ({ blogFormRef, children }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const setNotification = useNotificationSet()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      blogFormRef.current.toggleVisibility()
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.concat(newBlog).sort((a, b) => b.likes - a.likes)
      )
    },
    onError: (error) => {
      if (error.response.data.error) {
        setNotification(error.response.data.error, true, 5)
      } else {
        console.error(error)
      }
    },
  })

  const queryClient = useQueryClient()

  const onCreate = (event) => {
    event.preventDefault()
    newBlogMutation.mutate({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
    setNotification(`a new blog ${title} by ${author} added`, false, 5)
  }

  return (
    <div>
      {children}
      <form onSubmit={onCreate} className="blog-form">
        <div>
          title{'  '}
          <input
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="enter title here"
          />
        </div>
        <div>
          author{'  '}
          <input
            type="text"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="enter author here"
          />
        </div>
        <div>
          url{'  '}
          <input
            type="text"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="enter url here"
          />
        </div>
        <button id="create-blog-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
