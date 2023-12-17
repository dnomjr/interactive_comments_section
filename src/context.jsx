/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react"
import data from "./constants/data.json"

import { toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [comments, setComments] = useState(data.comments)
  const [isActiveModal, setIsActiveModal] = useState(false)
  const [deleteId, setDeleteId] = useState("")
  const [idComment, setIdComment] = useState()
  const [idReply, setIdReply] = useState()

  /* *****            *****  */
  /* *** ADD NEW COMMENT *** */
  /* *****            *****  */
  const addComment = (comment) => {
    let newComment = [...comments, comment]
    setComments(newComment)

    toast.success("Comment successfully added!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }
  /* *****            *****  */
  /* *** INCREASE SCORE *** */
  /* *****            *****  */
  const increaseScore = (score, increase) => {
    const newScore = score + 1
    increase(newScore)
  }
  /* *****            *****  */
  /* *** DECREASE SCORE *** */
  /* *****            *****  */
  const decreaseScore = (score, decrease) => {
    const newScore = score - 1
    decrease(newScore)
  }
  /* *****            *****  */
  /* *** SHOW DELETE MODAL *** */
  /* *****            *****  */
  const showModal = (id, idComment) => {
    setIsActiveModal(!isActiveModal)
    setDeleteId(id)
    setIdComment(idComment)
  }
  /* *****            *****  */
  /* *** DELETE COMMENT & REPLY *** */
  /* *****            *****  */
  const deleteComment = () => {
    let findComment = comments.find((c) => {
      return c.id === idComment
    })
    if (findComment.id === deleteId) {
      const filterComments = comments.filter((c) => {
        return c.id !== deleteId
      })
      setComments(filterComments)
      setIsActiveModal(!isActiveModal)
      toast.error("Comment successfully removed!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
    let deleteReply = findComment.replies.filter((c) => {
      return c.id !== deleteId
    })
    let updateComment = { ...findComment, replies: deleteReply }
    let updateComments = comments.map((comment) => {
      return comment.id === idComment ? updateComment : comment
    })
    setComments(updateComments)
    setIsActiveModal(!isActiveModal)
    toast.error("Comment successfully removed!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }
  /* *****            *****  */
  /* *** UPDATE COMMENT *** */
  /* *****            *****  */
  const updateComment = (id, text, isEdit, setIsEdit, idComment) => {
    if (id !== idComment) {
      let findComment = comments.find((c) => {
        return c.id === idComment
      })
      let findReply = findComment.replies.find((reply) => {
        return reply.id === id
      })
      let changeContent = { ...findReply, content: text }
      let updateReplies = findComment.replies.map((reply) => {
        return reply.id === id ? changeContent : reply
      })
      let updateComment = { ...findComment, replies: updateReplies }
      let updateComments = comments.map((c) => {
        return c.id === idComment ? updateComment : c
      })
      setComments(updateComments)
      setIsEdit(!isEdit)
    } else {
      const findComment = comments.find((c) => {
        return c.id === id
      })
      const changeComment = { ...findComment, content: text }
      const updateComments = comments.map((c) => {
        return c.id === id ? changeComment : c
      })
      setComments(updateComments)
      setIsEdit(!isEdit)
    }
  }
  /* *****            *****  */
  /* *** ADD REPLY *** */
  /* *****            *****  */
  const addReply = (reply, id, setShowReply, idComment) => {
    let findComment = comments.find((c) => {
      return idComment === c.id
    })
    if (findComment.id === idComment) {
      let addReply = [...findComment.replies, reply]
      let updateReply = { ...findComment, replies: addReply }
      let updateComment = comments.map((c) => {
        return c.id === idComment ? updateReply : c
      })

      setComments(updateComment)
      setShowReply(false)
    }
        toast.success("Reply successfully added!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
  }

  return (
    <AppContext.Provider
      value={{
        comments,
        data,
        addComment,
        increaseScore,
        decreaseScore,
        setComments,
        isActiveModal,
        showModal,
        deleteComment,
        updateComment,
        addReply,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}
