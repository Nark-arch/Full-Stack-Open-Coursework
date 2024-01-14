import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
  }

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
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
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </div>
  )
}

export default AnecdoteList
