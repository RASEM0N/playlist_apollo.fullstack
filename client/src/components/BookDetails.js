import { useQuery } from '@apollo/client'
import React from 'react'
import { getBookQuery } from '../query'

const BookDetails = ({ bookId }) => {
    const { data, error, loading } = useQuery(getBookQuery, {
        variables: {
            id: bookId,
        },
    })
    return (
        <div className='book-details'>
            {loading || !data ? (
                <div>No book selected or loading...</div>
            ) : (
                <div>
                    <h2>{data.book.name}</h2>
                    <p>{data.book.genre}</p>
                    <p>{data.book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className='other-books'>
                        {data.book.author.books.map((item) => {
                            return <li key={item._id}>{item.name}</li>
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default BookDetails
