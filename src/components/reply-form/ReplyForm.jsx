/* eslint-disable react/prop-types */
import "./reply-form.css"
import { nanoid } from "nanoid"
import user from "../../constants/data.json"
import { useState, useRef, useEffect } from "react"
import { useGlobalContext } from "../../context"

const ReplyForm = ({ showReply, setShowReply, username, id }) => {
  const [value, setValue] = useState("")
  const { data, addReply } = useGlobalContext()
  const refTextarea = useRef(null)
  const refForm = useRef(null)

  const reply = {
    id: nanoid(),
    content: value,
    createdAt: "today",
    score: 0,
    replyingTo: username,
    user: {
      image: {
        png: data.currentUser.image.png,
        webp: data.currentUser.image.webp,
      },
      username: data.currentUser.username,
    },
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    value.trim() == "" ? null : addReply(reply, id, setShowReply)
    setValue("")
    refTextarea.current.focus()
    /*     setShowReply(!showReply)
     */
  }

  useEffect(() => {
    if (showReply) {
      refTextarea.current.focus()
      refTextarea.current.setSelectionRange(value.length, value.length)
    }
  }, [showReply, value.length])

  const containerStyles = {
    height: showReply
      ? refForm.current.getBoundingClientRect().height + "px"
      : "0px",
    opacity: showReply ? 1 : 0,
  }

  return (
    <section className="reply-input-container" style={containerStyles}>
      <form className="reply-input" onSubmit={handleSubmit} ref={refForm}>
        <textarea
          type="text"
          placeholder="Add a comment..."
          className="reply-textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          ref={refTextarea}
          autoFocus
        />
        <div className="current-user-container">
          <img
            src={user.currentUser.image.png}
            alt=""
            className="current-user"
          />
        </div>
        <button className="btn-send">reply</button>
      </form>
    </section>
  )
}
export default ReplyForm
