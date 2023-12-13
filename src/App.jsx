import Comments from "./components/comments/Comments"
import Form from "./components/form/Form"

import "./app.css"

import data from './constants/data.json'
import { useState } from "react"



function App() {

  const [comments, setComments] = useState(data.comments)

  return (
    <main className="container">
      <Comments comments={comments}/>
      <Form />
    </main>
  )
}

export default App
