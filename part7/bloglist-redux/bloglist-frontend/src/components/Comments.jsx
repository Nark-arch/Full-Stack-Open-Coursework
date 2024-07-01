import { useDispatch } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { userLogout } from '../reducers/loginReducer'
import { addComment } from '../reducers/blogsReducer'

import CommentForm from './CommentForm'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()
  const handleAddComment = async (newComment) => {
    try {
      await dispatch(addComment(newComment, blog.id))
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
    <>
      <h2>comments</h2>
      <CommentForm handleAddComment={handleAddComment} />
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </>
  )
}

export default Comments
