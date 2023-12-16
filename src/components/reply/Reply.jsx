/* eslint-disable react/prop-types */
import "./reply.css"
import data from "../../constants/data.json"
import { useState } from "react"
import { reply, minus, plus } from "../../assets/icons/index"
import { useGlobalContext } from "../../context"
import { increaseScore, decreaseScore } from "../../utils/count-score"

const Reply = ({ user, createdAt, content, score, id, idComment }) => {
  const [isEdit, setIsEdit] = useState(true)
  const [activeMaxScore, setActiveMaxScore] = useState(false)
  const [activeMinsScore, setActiveMinScore] = useState(false)
  const [maxScore, setMaxScore] = useState(true)
  const [minScore, setMinScore] = useState(true)

  const { comments, setComments, data } = useGlobalContext()

  /* increase score function */
  const increase = () => {
    increaseScore(
      comments,
      idComment,
      id,
      maxScore,
      setComments,
      minScore,
      setMaxScore,
      setMinScore,
      setActiveMaxScore,
      setActiveMinScore,
      score
    )
  }
  /* increase score function */
  const decrease = () => {
    decreaseScore(
      comments,
      idComment,
      id,
      maxScore,
      setComments,
      minScore,
      setMaxScore,
      setMinScore,
      setActiveMaxScore,
      setActiveMinScore,
      score
    )
  }

  return (
    <div className="reply ">
      <div className="comment-title">
        <img src={user.image.png} className="user-img"></img>
        <p className="user-name">{user.username}</p>

        {user.username === data.currentUser.username && (
          <div className="you">you</div>
        )}

        <p className="create-info">{createdAt}</p>
      </div>

      {/***          ***/}
      {/* TEXT / TEXTAREA */}
      {/***          ***/}
      {isEdit ? (
        <p className="comment-text">{content}</p>
      ) : (
        <>
          <textarea type="text" className="update-textarea" value="a" />
          <button className="btn-update" onClick={() => ""}>
            update
          </button>
        </>
      )}

      {/***          ***/}
      {/*     SCORE     */}
      {/***          ***/}
      <div className="score-btn">
        <img
          src={minus}
          alt=""
          onClick={decrease}
          className={activeMinsScore ? "active-score" : ""}
        />
        <p>{score}</p>
        <img
          src={plus}
          alt=""
          onClick={increase}
          className={activeMaxScore ? "active-score" : ""}
        />
      </div>

      {/***          ***/}
      {/* REPLY / DELETE / EDIT */}
      {/***          ***/}
      {user.username === data.currentUser.username ? (
        <div className={!isEdit ? "hide-btns" : "edit-delete-btn"}>
          <button className="delete-comment" onClick={() => ""}>
            delete
          </button>
          <button className="edit-comment" onClick={""}>
            edit
          </button>
        </div>
      ) : (
        <button className="reply-btn">
          <span>
            <img src={reply} alt="" />
            reply
          </span>
        </button>
      )}
    </div>
  )
}
export default Reply
