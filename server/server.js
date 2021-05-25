const dotenv = require('dotenv')
const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP
const schema = require('./schema/schema')
dotenv.config({ path: './.env.dev' })

const app = express()

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    }),
)

const PORT = process.env.PORT || 1488

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})
