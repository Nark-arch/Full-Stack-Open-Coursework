const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const { GraphQLError } = require('graphql')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author')
      // return sum of all matching books
      return books.reduce(
        (sum, book) => (book.author.name === root.name ? sum + 1 : sum),
        0,
      )
    },
  },
  Query: {
    me: async (_root, _args, { currentUser }) => currentUser,
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (_, args) => {
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
    createUser: async (_root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })
      return user.save().catch((error) => {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      })
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'epicpassword') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return {
        value: jwt.sign(userForToken, process.env.JWT_SECRET),
      }
    },
    addBook: async (_root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }
      // if no existing author new Author Object
      const existingAuthor = await Author.findOne({ name: args.author })
      const author = existingAuthor || new Author({ name: args.author })

      // if no existing Author new author object is saved
      if (!existingAuthor) {
        await author.save().catch((error) => {
          throw new GraphQLError(error.errors.name.message, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          })
        })
      }

      const book = new Book({ ...args, author: author })

      await book.save().catch((error) => {
        throw new GraphQLError(error.errors.title.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        })
      })
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (_root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }
      const author = await Author.findOne({ name: args.name })
      if (author) {
        author.born = args.setBornTo
        return author.save()
      }
      return null
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
