import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: null,
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    appendBlogs(state, action) {
      state.sort((a, b) => b.likes - a.likes).push(action.payload)
    },
    modifyBlogs(state, action) {
      return state
        .map((blog) => (blog.id === action.payload.id ? action.payload : blog))
        .sort((a, b) => b.likes - a.likes)
    },
    dropBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

const { setBlogs, appendBlogs, modifyBlogs, dropBlog } = blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const response = await blogsService.create(newBlog)
    dispatch(appendBlogs(response))
  }
}

export const updateBlog = (updatedBlog, id) => {
  return async (dispatch) => {
    const response = await blogsService.update(updatedBlog, id)
    dispatch(modifyBlogs(response))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogsService.remove(id)
    dispatch(dropBlog(id))
  }
}

export const addComment = (newComment, id) => {
  return async (dispatch) => {
    const response = await blogsService.comment(newComment, id)
    dispatch(modifyBlogs(response))
  }
}

export default blogsSlice.reducer
