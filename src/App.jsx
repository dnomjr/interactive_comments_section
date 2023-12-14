import Comments from "./components/comments/Comments"
import Form from "./components/form/Form"
import Modal from "./components/modal/Modal"

import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

import "./app.css"

import data from "./constants/data.json"

function App() {
  return (
    <main className="container">
      <ToastContainer />
      <Comments comments={data.comments} />
      <Form />
      <Modal />
    </main>
  )
}

export default App
