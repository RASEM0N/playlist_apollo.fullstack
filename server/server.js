import dotenv from 'dotenv'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'

const app = express()
dotenv.config({ path: './.env.dev' })

app.use('/graphql', graphqlHTTP({}))

const PORT = process.env.PORT || 1488

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})
