import React, { useState } from 'react'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../query'
import { useMutation, useQuery } from '@apollo/client'

const AddBook = () => {
    const { data, loading, error } = useQuery(getAuthorsQuery)
    const [addBook, response] = useMutation(addBookMutation)

    const [state, setState] = useState({
        name: '',
        genre: '',
        author: '',
    })

    const onSubmit = async (e) => {
        e.preventDefault()

        console.log(state)
        await addBook({
            variables: {
                name: state.name,
                genre: state.genre,
                authorId: state.author,
            },
            refetchQueries: [
                {
                    query: getBooksQuery,
                },
            ],
        })

        setState({
            name: '',
            genre: '',
            author: '',
        })
    }

    const onChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    return (
        <form className='add-book' onSubmit={onSubmit}>
            <div className='field'>
                <label>Book name:</label>
                <input type='text' name='name' value={state.name} onChange={onChange} />
            </div>
            <div className='field'>
                <label>Genre:</label>
                <input type='text' name='genre' value={state.genre} onChange={onChange} />
            </div>
            <div className='field'>
                <label>Author:</label>
                <select name='author' onChange={onChange}>
                    <option value=''>Select author</option>
                    {
                        !loading && data.authors.map(author =>
                            <option key={author._id} value={author._id}>{author.name}</option>,
                        )
                    }
                </select>
            </div>
            <button disabled={!state.author || !state.genre || !state.name}>+</button>
        </form>
    )
}

export default AddBook
