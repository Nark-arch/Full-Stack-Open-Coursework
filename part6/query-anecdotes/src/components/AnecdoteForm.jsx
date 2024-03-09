import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdotes } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (newNote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newNote))
    },
    onError: (error) => {
      if (error.response.data.error) {
        notificationDispatch({
          type: 'SET',
          payload: `anecdote '${error.response.data.error}' added`,
        })
        setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
      } else {
        console.error(error)
      }
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({
      type: 'SET',
      payload: `anecdote '${content}' added`,
    })
    setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

