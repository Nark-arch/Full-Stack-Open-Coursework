import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [genres, setGenres] = useState([])

  const [viewGenre, setViewGenre] = useState(null)

  const result = useQuery(BOOKS_BY_GENRE, {
    skip: !props.show,
    variables: { genre: viewGenre },
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  if (genres.length === 0) {
    const resultGenres = new Set()
    result.data.allBooks.map((book) => {
      for (let i = 0; i < book.genres.length; i++) {
        resultGenres.add(book.genres[i])
      }
    })
    setGenres(resultGenres)
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
          {result.data.allBooks
            // filtered in if viewGenre is set and if the genres include the viewGenre
            .filter((book) => !viewGenre || book.genres.includes(viewGenre))
            .map((book) => {
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
        {Array.from(genres).map((genre) => (
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

