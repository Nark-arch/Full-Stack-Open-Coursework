const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('strictQuery', false)

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author')
      //return sum of all matching books
      return books.reduce(
        (sum, book) => (book.author.name === root.name ? sum + 1 : sum),
        0
      )
    },
  },
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}
      if (args.author) {
        filter.author = await Author.findOne({ name: args.author })
      }
      if (args.genre) {
        filter.genres = args.genre
      }
      const books = await Book.find(filter).populate('author')
      return books
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      //if no existing author new Author Object
      const existingAuthor = await Author.findOne({ name: args.author })
      const author = existingAuthor || new Author({ name: args.author })

      //if no existing Author new author object is saved
      if (!existingAuthor) {
        await author.save()
      }

      const book = new Book({ ...args, author: author })
      return book.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (author) {
        author.born = args.setBornTo
        return author.save()
      }
      return null
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
