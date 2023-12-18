/* eslint-disable react/prop-types */
import "./reply-form.css"
import { nanoid } from "nanoid"
import user from "../../constants/data.json"
import { useState, useRef, useEffect } from "react"
import { useGlobalContext } from "../../context"
import EditComment from "./EditComment"

const ReplyFormContainer = ({
  showReply,
  setShowReply,
  username,
  id,
  idComment,
}) => {
  const [value, setValue] = useState("")
  const { data, addReply } = useGlobalContext()
  const refTextarea = useRef(null)
  const refForm = useRef(null)
  const refName = useRef(null)

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
      refTextarea.current.setSelectionRange(value.length, value.length)
    }
  }, [showReply, value.length])

  const containerStyles = {
    height: showReply
      ? refForm.current.getBoundingClientRect().height + "px"
      : "0px",
    opacity: showReply ? 1 : 0,
  }

  const nameStyles = {
    textIndent:
      showReply && refName.current.getBoundingClientRect().width + 5 + "px",
  }

  const spanStyles = {
    visibility: showReply ? "visible" : "hidden",
  }

  return (
    <EditComment
      containerStyles={containerStyles}
      handleSubmit={handleSubmit}
      refForm={refForm}
      name={value}
      setName={setValue}
      refTextarea={refTextarea}
      user={user}
      username={username}
      refName={refName}
      nameStyles={nameStyles}
      spanStyles={spanStyles}
    />
  )
}
export default ReplyFormContainer
