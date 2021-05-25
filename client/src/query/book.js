import { gql } from '@apollo/client'

export const GET_BOOKS = gql`
    query {
        books {
            _id, name, genre
        }
    }
`

export const GET_BOOK_BY_ID = gql`
    query book($id: ID!){
        book(_id: $id){
            _id,
            name,
            genre,
            author {
                _id,
                name,
                age
            }
        }
    }
`