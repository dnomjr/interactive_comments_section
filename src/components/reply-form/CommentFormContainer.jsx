/* eslint-disable react/prop-types */
import "./reply-form.css"
import { nanoid } from "nanoid"
import user from "../../constants/data.json"
import { useState, useRef, useEffect } from "react"
import { useGlobalContext } from "../../context"
import EditComment from "./EditComment"

const CommentFormContainer = ({
  showReply,
  setShowReply,
  username,
  id,
  idComment,
  name,
  setName,
}) => {
  const [value, setValue] = useState("@" + username + " ")
  const { data, addReply } = useGlobalContext()
  const refTextarea = useRef(null)
  const refForm = useRef(null)
  const refName = useRef(null)

  const reply = {
    id: nanoid(),
    content: name,
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
    name.trim() == "" ? null : addReply(reply, id, setShowReply, idComment)
    setName("")
    refTextarea.current.focus()
  }

  useEffect(() => {
    if (showReply) {
      refTextarea.current.focus()
      /* refTextarea.current.setSelectionRange(value.length, value.length) */
      refTextarea.current.selectionStart = name.length
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showReply])

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
      value={value}
      setValue={setValue}
      refTextarea={refTextarea}
      user={user}
      name={name}
      setName={setName}
      username={username}
      refName={refName}
      nameStyles={nameStyles}
      spanStyles={spanStyles}
    />
  )
}
export default CommentFormContainer
