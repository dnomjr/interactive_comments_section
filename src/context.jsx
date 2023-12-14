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

  /* *****            *****  */
  /* *** ADD NEW COMMENT *** */
  /* *****            *****  */
  const addComment = (comment) => {
    let newComment = [...comments, comment]
    setComments(newComment)
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
  const showModal = (id) => {
    setIsActiveModal(!isActiveModal)
    setDeleteId(id)
  }
  /* *****            *****  */
  /* *** DELETE COMMENT *** */
  /* *****            *****  */
  const deleteComment = () => {
    const filterComments = comments.filter((c) => {
      return c.id !== deleteId
    })
    setComments(filterComments)
    setIsActiveModal(!isActiveModal)
    toast.error("Comment successfully removed!", {
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
  /* *** UPDATE COMMENT *** */
  /* *****            *****  */
  const updateComment = (id, text, isEdit, setIsEdit) => {
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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}
