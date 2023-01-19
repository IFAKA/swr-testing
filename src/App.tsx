import { useState } from 'react'
import useSWR from 'swr'
import './App.css'

const url = 'https://jsonplaceholder.typicode.com/posts/'
const fetcher = (url: string) => fetch(url).then(r => r.json())

function App() {
  const [page, setPage] = useState(1)
  const { data } = useSWR(`${url}${page}`, fetcher)
  const next = () => setPage(page + 1)
  const empty = () => setPage(0)
  return (
    <div className="App">
      {data
        ?
        Object.keys(data).length !== 0
          ? (
            <div>
              <div>{data?.id}</div>
              <h1>{data?.title}</h1>
              <p>{data?.body}</p>
            </div>
          )
          : <div>No data</div>
        : <div>Loading...</div>
      }
      <button onClick={next}>Next</button>
      <button onClick={empty}>Empty</button>
    </div>
  )
}

export default App
