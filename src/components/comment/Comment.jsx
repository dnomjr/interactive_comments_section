/* eslint-disable react/prop-types */
import "./comment.css"
import { reply, minus, plus } from "../../assets/icons/index"
import { useGlobalContext } from "../../context"
import { useState } from "react"

const Comment = ({ comment }) => {
  const { id, content, createdAt, score, user } = comment
  const { increaseScore, decreaseScore, comments, setComments, data } =
    useGlobalContext()
  const [maxScore, setMaxScore] = useState(true)
  const [minScore, setMinScore] = useState(true)
  const [activeMaxScore, setActiveMaxScore] = useState(false)
  const [activeMinsScore, setActiveMinScore] = useState(false)

  /* increase score function */
  const increase = (newScore) => {
    let thisComment = comments.find((comment) => {
      return comment.id == id
    })
    let updateComment = { ...thisComment, score: newScore }
    let updateComments = comments.map((comment) => {
      return comment.id === id ? updateComment : comment
    })

    if (maxScore) {
      setComments(updateComments)
      setMaxScore(!maxScore)
    } else if (!minScore) {
      setComments(updateComments)
      setMinScore(!minScore)
    }

    setActiveMaxScore(true)
    setActiveMinScore(false)
  }

  /* decrease score function */
  const decrease = (newScore) => {
    let thisComment = comments.find((comment) => {
      return comment.id == id
    })
    let updateComment = { ...thisComment, score: newScore }
    let updateComments = comments.map((comment) => {
      return comment.id === id ? updateComment : comment
    })

    if (!maxScore) {
      setComments(updateComments)
      setMaxScore(!maxScore)
    } else if (minScore) {
      setComments(updateComments)
      setMinScore(!minScore)
    }
    setActiveMaxScore(false)
    setActiveMinScore(true)
  }

  return (
    <article className="comment">
      <div className="comment-title">
        <img src={user.image.png} className="user-img"></img>
        <p className="user-name">{user.username}</p>

        {user.username === data.currentUser.username && (
          <div className="you">you</div>
        )}

        <p className="create-info">{createdAt}</p>
      </div>

      <p className="comment-text">{content}</p>

      <div className="score-btn">
        <img
          src={minus}
          alt=""
          onClick={() => decreaseScore(score, decrease)}
          className={activeMinsScore ? "active-score" : ""}
        />
        <p>{score}</p>
        <img
          src={plus}
          alt=""
          onClick={() => increaseScore(score, increase)}
          className={activeMaxScore ? "active-score" : ""}
        />
      </div>

      {user.username === data.currentUser.username ? (
        <div className="edit-delete-btn">
          <button className="delete-comment">delete</button>
          <button className="edit-comment">edit</button>
        </div>
      ) : (
        <button className="reply-btn">
          <span>
            <img src={reply} alt="" />
            reply
          </span>
        </button>
      )}
    </article>
  )
}
export default Comment
