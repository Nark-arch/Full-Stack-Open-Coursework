import { useDispatch } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { userLogout } from '../reducers/loginReducer'
import { addComment } from '../reducers/blogsReducer'

import CommentForm from './CommentForm'
import ListGroup from 'react-bootstrap/ListGroup'

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
      <h2>Comments</h2>
      <CommentForm handleAddComment={handleAddComment} />
      <ListGroup as="ul" variant="flush">
        {blog.comments.map((comment, index) => (
          <ListGroup.Item as="li" key={index}>
            {comment}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}

export default Comments
