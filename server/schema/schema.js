const graphql = require('graphql')
const lodash = require('lodash')


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql

const books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '3' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '1' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '2' },
]

const authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    // если мы зависим от какого-то типа и он не определен выше
    // то () => ({})
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // parent = book was finder by id
                return lodash.find(authors, {
                    id: parent.authorId,
                })
            },
        },
    }),
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    // если мы зависим от типа и он определен выше
    // просто {}, можно и () => ({})
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return lodash.filter(books, {
                    authorId: parent.id,
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
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return lodash.find(books, {
                    id: args.id,
                })
            },
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return lodash.find(authors, { id: args.id })
            },
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            },
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            },
        },
    },
})

const schema = new GraphQLSchema({
    query: RootQuery,
})
module.exports = schema