/* eslint-disable react/prop-types */
import "./comment.css"
import { reply, minus, plus } from "../../assets/icons/index"
import { useGlobalContext } from "../../context"
import { useState, useRef, useEffect } from "react"
import Reply from "../reply/Reply"
import CommentFormContainer from "../reply-form/CommentFormContainer"

const Comment = ({ comment }) => {
  const { id, content, createdAt, score, user } = comment
  const {
    increaseScore,
    decreaseScore,
    comments,
    setComments,
    data,
    showModal,
    updateComment,
  } = useGlobalContext()
  const [maxScore, setMaxScore] = useState(true)
  const [minScore, setMinScore] = useState(true)
  const [activeMaxScore, setActiveMaxScore] = useState(false)
  const [activeMinsScore, setActiveMinScore] = useState(false)
  const [isEdit, setIsEdit] = useState(true)
  const [value, setValue] = useState(content)
  const [showReply, setShowReply] = useState(false)

  const refUpdate = useRef(null)
  const idComment = id

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

  /* edit input */
  const showEdit = () => {
    setIsEdit(false)
  }

  useEffect(() => {
    if (!isEdit) {
      refUpdate.current.focus()
      refUpdate.current.setSelectionRange(value.length, value.length)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit])

  const handleReply = () => {
    setShowReply(!showReply)
  }
  return (
    <>
      <article className="comment">
        {/***          ***/}
        {/*    USER DATA   */}
        {/***          ***/}
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
            <textarea
              type="text"
              className="update-textarea"
              value={value}
              ref={refUpdate}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className="btn-update"
              onClick={() =>
                updateComment(id, value, isEdit, setIsEdit, idComment)
              }
            >
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

        {/***          ***/}
        {/* REPLY / DELETE / EDIT */}
        {/***          ***/}
        {user.username === data.currentUser.username ? (
          <div className={!isEdit ? "hide-btns" : "edit-delete-btn"}>
            <button
              className="delete-comment"
              onClick={() => showModal(id, idComment)}
            >
              delete
            </button>
            <button className="edit-comment" onClick={showEdit}>
              edit
            </button>
          </div>
        ) : (
          <button className="reply-btn" onClick={handleReply}>
            <span>
              <img src={reply} alt="" />
              reply
            </span>
          </button>
        )}
      </article>

      <CommentFormContainer
        showReply={showReply}
        setShowReply={setShowReply}
        username={user.username}
        id={id}
        idComment={id}
      />

      {comment.replies.length ? (
        <section className="reply-container">
          {comment.replies.map((reply) => {
            return <Reply key={reply.id} {...reply} idComment={id} />
          })}
        </section>
      ) : (
        ""
      )}
    </>
  )
}
export default Comment
