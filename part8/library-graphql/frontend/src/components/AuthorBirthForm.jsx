import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR } from '../queries'

const AuthorBirthForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const submit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: name, setBornTo: parseInt(born) } })
    setBorn('')
  }

  return (
    <>
      <form onSubmit={submit}>
        <div>
          name
          <select onChange={({ target }) => setName(target.value)} required>
            <option value="" disabled></option>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            type="number"
            onChange={({ target }) => setBorn(target.value)}
            required
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  )
}

export default AuthorBirthForm
