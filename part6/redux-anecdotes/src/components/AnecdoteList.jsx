import { useSelector, useDispatch } from 'react-redux'
import { addVote, updateAnecdote } from '../reducers/anecdoteReducer'
import {
  notificationReset,
  notificationSet,
} from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    const voteUpdatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    dispatch(updateAnecdote(voteUpdatedAnecdote))
    dispatch(notificationSet(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(notificationReset())
    }, 5000)
  }

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  })

  return (
    <div>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </div>
  )
}

export default AnecdoteList
