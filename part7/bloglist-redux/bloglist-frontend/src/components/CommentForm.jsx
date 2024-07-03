import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const CommentForm = ({ handleAddComment }) => {
  const [comment, setComment] = useState('')

  const addComment = async (event) => {
    event.preventDefault()
    await handleAddComment(comment)
    setComment('')
  }

  return (
    <Form onSubmit={addComment} className="comment-form">
      <Form.Group>
        <Form.Control
          type="text"
          id="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          placeholder="enter comment here"
        />
      </Form.Group>
      <Button
        variant="outline-success"
        style={{ marginTop: 10 }}
        id="add-comment-button"
        type="submit"
      >
        add comment
      </Button>
    </Form>
  )
}

export default CommentForm
