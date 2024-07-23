import { useLazyQuery, useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE, ME } from '../queries'

const RecommendedBooks = ({ show }) => {
  const [getBooksByGenre, booksResult] = useLazyQuery(BOOKS_BY_GENRE, {
    skip: !show,
  })

  const userResult = useQuery(ME, {
    skip: !show,
    onCompleted: (result) =>
      getBooksByGenre({
        variables: { genre: result.me.favoriteGenre },
      }),
  })

  if (!show) {
    return null
  }

  if (userResult.loading || !booksResult.data) {
    return <>loading...</>
  }

  const recommendedBooks = booksResult.data.allBooks

  return (
    <div>
      <h2>recommended books</h2>
      books of your favorite genre <b>{userResult.data.me.favoriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendedBooks
