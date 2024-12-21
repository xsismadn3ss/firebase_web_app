import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import app from './configuration'
import { getDatabase, ref, onValue, push } from 'firebase/database'
import './App.css'

function App() {
  const [data, setData] = useState([])

  const addBook = (newBook) => {
    const db = getDatabase(app)
    const collectionRef = ref(db, 'books')
    push(collectionRef, newBook)
  }

  useEffect(() => {
    const db = getDatabase(app)
    const collectionRef = ref(db, 'books')
    const fetchData = () => {
      onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val()

        if (dataItem) {
          const displaItem = Object.values(dataItem)
          setData(displaItem)
        }
      })
    }
    fetchData()
  }, [])

  const [bookData, setBookData] = useState({
    author: null,
    genre: null,
    publicationYear: null,
    publisher: null,
    summary: null,
    title: null
  })
  const handleChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.placeholder]: e.target.value
    })
  }

  // Example usage of addBook function
  const handleAddBook = () => {
    if (Object.values(bookData).every(value => value === null && value === '')) {
      alert('Please fill in all fields')
    } else {
      alert('Book added successfully')
      addBook(bookData)
    }
  }

  console.log(data)
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <div>
          <input type="text" placeholder='author' value={bookData.author} onChange={handleChange} />
          <br />
          <input type="text" placeholder='genre' value={bookData.genre} onChange={handleChange} />
          <br />
          <input type="number" placeholder='publicationYear' value={bookData.publicationYear} onChange={handleChange} />
          <br />
          <input type="text" placeholder='publisher' value={bookData.publisher} onChange={handleChange} />
          <br />
          <input type="text" placeholder='summary' value={bookData.summary} onChange={handleChange} />
          <br />
          <input type="text" placeholder='title' value={bookData.title} onChange={handleChange} />
        </div>
        <br />
        <button onClick={handleAddBook}>Add New Book</button>
        <div>
          <h1>My books</h1>
          <ul>
            {data.map((item, key) => {
              return <li key={key}>{item.author} - {item.title}</li>
            })}
          </ul>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
