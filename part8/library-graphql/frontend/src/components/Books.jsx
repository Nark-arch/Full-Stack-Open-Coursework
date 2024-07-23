import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [genres, setGenres] = useState([])

  const [viewGenre, setViewGenre] = useState(null)

  const { loading, data } = useQuery(BOOKS_BY_GENRE, {
    skip: !props.show,
    variables: { genre: viewGenre },
    onCompleted: (result) => {
      const resultGenres = new Set(genres)
      for (let i = 0; i < result.allBooks.length; i++) {
        for (let k = 0; k < result.allBooks[i].genres.length; k++) {
          resultGenres.add(result.allBooks[i].genres[k])
        }
      }
      setGenres(Array.from(resultGenres))
    },
    fetchPolicy: 'network-only',
  })

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((book) => {
            return (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setViewGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setViewGenre(null)}>all</button>
      </div>
    </div>
  )
}

export default Books

