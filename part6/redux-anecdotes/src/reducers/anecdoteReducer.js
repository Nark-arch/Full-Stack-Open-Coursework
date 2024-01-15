import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    modifyAnecdote(state, action) {
      const id = action.payload.id
      return state.map((anecdote) =>
        anecdote.id === id ? action.payload : anecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
  },
})

export const { addVote, setAnecdotes, modifyAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const createdAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(createdAnecdote))
  }
}

export const updateAnecdote = (modifiedAnecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateOne(modifiedAnecdote)
    dispatch(modifyAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
