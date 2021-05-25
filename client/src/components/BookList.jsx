import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_BOOKS } from '../query/book'
import Book from './Book'

const BookList = () => {
    const { data, loading, error } = useQuery(GET_BOOKS)
    const [id, setId] = useState(null)
    const [open, setOpen] = useState(false)

    if (loading) {
        return <div>Loading...</div>
    }

    const handleClick = (id) => {
        setId(id)
        setOpen(true)
    }

    return (
        <div>
            <h1>Books List</h1>
            <ul>
                {data.books.map(book =>
                    <li key={book._id} onClick={() => handleClick(book._id)}>
                        <div>Имя: {book.name}</div>
                        <div>Жанр: {book.genre}</div>
                    </li>,
                )}
                {
                    open && id && <Book id={id} onClose={setOpen}/>
                }
            </ul>
        </div>
    )
}

export default BookList