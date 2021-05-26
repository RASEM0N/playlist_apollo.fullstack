import BookList from './components/BookList'
import AddBook from './components/AddBook'

const App = () => {
    return (
        <div className="main">
            <h1>Application</h1>
            <BookList />
             <AddBook />
        </div>
    )
}

export default App
