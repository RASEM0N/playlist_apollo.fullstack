import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_BOOK_BY_ID } from '../query/book'

const Book = ({ id, onClose }) => {
    const { data: book, loading, error } = useQuery(GET_BOOK_BY_ID, {
        variables: {
            id: id,
        },
    })

    if (loading) {
        return <div>Loading ...</div>
    }

    console.log(book.book)
    return (
        <div onClick={() => onClose(false)}>
            <h1>Book</h1>
            <div>Имя: {book.book.name}</div>
            <div>Жанр: {book.book.genre}</div>
            <div>Автор: {book.book.author.name}</div>
        </div>
    )
}

export default Book