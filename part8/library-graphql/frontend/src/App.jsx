import { useState } from 'react'
import { useEffect } from 'react'

import {
  useApolloClient,
  useQuery,
  useMutation,
  useSubscription,
} from '@apollo/client'

import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Authors from './components/Authors'
import Notify from './components/Notify'
import RecommendedBooks from './components/RecommendedBooks'
import { BOOK_ADDED, BOOKS_BY_GENRE } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)
      client.refetchQueries({ include: [BOOKS_BY_GENRE] })
    },
  })

  useEffect(() => {
    const value = localStorage.getItem('library-user-token')
    if (value) {
      setToken(value)
    }
    setPage('authors')
  }, [token])

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Notify notification={notification} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <>
            <button onClick={() => setPage('login')}>login</button>
          </>
        )}
      </div>
      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      <Login show={page === 'login'} notify={notify} setToken={setToken} />
      <NewBook show={page === 'add'} notify={notify} />
      <RecommendedBooks show={page === 'recommend'} />
    </div>
  )
}

export default App
