
import blogService from '../requests/blogs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Blog from './Blog'
import { useNotificationSet } from '../contexts/NotificationContext'

const BlogList = () => {

  const setNotification = useNotificationSet()
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
    onError: (error) => {
      if (error.response.data.error) {
        setNotification(error.response.data.error, true, 5)
      } else {
        console.error(error)
      }
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs
          .map((blog) => (updatedBlog.id === blog.id ? updatedBlog : blog))
          .sort((a, b) => b.likes - a.likes)
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

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError || result.isPending) {
    return <div>anecdote server not available due to problems in server</div>
  }

  const blogs = result.data.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {blogs
        ? blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            removeBlogMutation={removeBlogMutation}
            updateBlogMutation={updateBlogMutation}
          />
        ))
        : null}
    </div>
  )
}

export default BlogList
