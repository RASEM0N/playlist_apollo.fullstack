const graphql = require('graphql')
const lodash = require('lodash')
const Author = require('../models/author')
const Book = require('../models/book')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql

const BookType = new GraphQLObjectType({
    name: 'Book',
    // если мы зависим от какого-то типа и он не определен выше
    // то () => ({})
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorId)
            },
        },
    }),
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    // если мы зависим от типа и он определен выше
    // просто {}, можно и () => ({})
    fields: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({
                    authorId: parent._id,
                })
            },
        },
    },
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return Book.findById(args._id)
            },
        },
        author: {
            type: AuthorType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return Author.findById(args._id)
            },
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find()
            },
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find()
            },
        },
    },
})

const Mutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            async resolve(parent, args) {
                return await Author.create({
                    name: args.name,
                    age: args.age,
                })
            },
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent, args) {

                const author = await Author.findById(args.authorId)

                if (!author) {
                    return Error('Author not found')
                }

                return Book.create({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
                })
            },
        },
    },
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})
module.exports = schema