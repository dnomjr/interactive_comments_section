/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react"
import data from "./constants/data.json"

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [comments, setComments] = useState(data.comments)

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

  return (
    <AppContext.Provider
      value={{
        comments,
        data,
        addComment,
        increaseScore,
        decreaseScore,
        setComments,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}
