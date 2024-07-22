import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        id
        born
        bookCount
      }
      published
      id
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBookMutation(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      id
      genres
    }
  }
`
export const EDIT_AUTHOR = gql`
  mutation editAuthorMutation($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      id
      born
    }
  }
`