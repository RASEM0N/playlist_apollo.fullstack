import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { getBooksQuery } from '../query'
import BookDetails from './BookDetails'

const BookList = () => {
    const [selected, setSelected] = useState(null)
    const { loading, error, data } = useQuery(getBooksQuery)

    const onSelect = (id) => {
        setSelected(id)
    }

    return (
        <div>
            <ul className='book-list'>
                {loading ? (
                    <div>Loading books ...</div>
                ) : (
                    data.books.map((book) => (
                        <li key={book._id} onClick={() => onSelect(book._id)}>
                            {book.name}
                        </li>
                    ))
                )}
            </ul>
            <BookDetails bookId={selected} />
        </div>
    )
}

export default BookList
