import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import app from './configuration'
import { getDatabase, ref, onValue } from 'firebase/database'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])

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
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
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
