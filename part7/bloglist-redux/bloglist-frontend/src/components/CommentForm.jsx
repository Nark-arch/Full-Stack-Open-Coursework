import { useState } from 'react'

const CommentForm = ({ handleAddComment }) => {
  const [comment, setComment] = useState('')

  const addComment = async (event) => {
    event.preventDefault()
    await handleAddComment(comment)
    setComment('')
  }

  return (
    <form onSubmit={addComment} className="comment-form">
      <div>
        <input
          type="text"
          id="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          placeholder="enter comment here"
        />
      </div>
      <button id="add-comment-button" type="submit">
        add comment
      </button>
    </form>
  )
}

export default CommentForm
