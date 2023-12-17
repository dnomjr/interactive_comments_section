/* eslint-disable react/prop-types */
import "./reply-form.css"
import { nanoid } from "nanoid"
import user from "../../constants/data.json"
import { useState, useRef, useEffect } from "react"
import { useGlobalContext } from "../../context"
import EditForm from "./EditComment"

const CommentFormContainer = ({
  showReply,
  setShowReply,
  username,
  id,
  idComment,
}) => {
  const [value, setValue] = useState("@"+username+" ")
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
    value.trim() == "" ? null : addReply(reply, id, setShowReply, idComment)
    setValue("")
    refTextarea.current.focus()
  }

  useEffect(() => {
    if (showReply) {
      refTextarea.current.focus()
      /* refTextarea.current.setSelectionRange(value.length, value.length) */
      refTextarea.current.selectionStart = value.length
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showReply])

  const containerStyles = {
    height: showReply
      ? refForm.current.getBoundingClientRect().height + "px"
      : "0px",
    opacity: showReply ? 1 : 0,
  }

  return (
    <EditForm
      containerStyles={containerStyles}
      handleSubmit={handleSubmit}
      refForm={refForm}
      value={value}
      setValue={setValue}
      refTextarea={refTextarea}
      user={user}
    />
  )
}
export default CommentFormContainer
