const graphql = require('graphql')
const lodash = require('lodash')


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
} = graphql

const books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
]

const authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    }),
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
    }),
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
    },
})

const schema = new GraphQLSchema({
    query: RootQuery,
})
module.exports = schema