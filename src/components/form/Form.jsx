import "./form.css"
import { nanoid } from "nanoid"
import user from "../../constants/data.json"
import { useState, useRef } from "react"
import { useGlobalContext } from "../../context"

const Form = () => {
  const [value, setValue] = useState("")
  const { data, addComment } = useGlobalContext()
  const refForm = useRef(null)

  const comment = {
    id: nanoid(),
    content: value,
    createdAt: "today",
    score: 0,
    user: {
      image: {
        png: data.currentUser.image.png,
        webp: data.currentUser.image.webp,
      },
      username: data.currentUser.username,
    },
    replies: [],
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    value.trim() == "" ? null : addComment(comment)
    setValue("")
    refForm.current.focus()
  }

  return (
    <form className="main-form-container" onSubmit={handleSubmit}>
      <textarea
        type="text"
        placeholder="Add a comment..."
        className="main-input-form"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={refForm}
      />
      <div className="current-user-container">
        <img src={user.currentUser.image.png} alt="" className="current-user" />
      </div>
      <button className="btn-send ">send</button>
    </form>
  )
}
export default Form
