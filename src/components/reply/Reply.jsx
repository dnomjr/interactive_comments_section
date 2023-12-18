/* eslint-disable react/prop-types */
import "./reply.css"
import { useState, useRef, useEffect } from "react"
import { reply, minus, plus } from "../../assets/icons/index"
import { useGlobalContext } from "../../context"
import { increaseScore, decreaseScore } from "../../utils/count-score"
import ReplyFormContainer from "../reply-form/ReplyFormContainer"

const Reply = ({
  user,
  createdAt,
  content,
  score,
  id,
  idComment,
  replyingTo,
}) => {
  const [isEdit, setIsEdit] = useState(true)
  const [activeMaxScore, setActiveMaxScore] = useState(false)
  const [activeMinsScore, setActiveMinScore] = useState(false)
  const [maxScore, setMaxScore] = useState(true)
  const [minScore, setMinScore] = useState(true)
  const [showReply, setShowReply] = useState(false)
  const [value, setValue] = useState(content)
  const [indent, setIndent] = useState()

  const { comments, setComments, data, showModal, updateComment } =
    useGlobalContext()
  const refUpdate = useRef(null)
  const refReplyName = useRef(null)

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

  useEffect(() => {
    if (!isEdit) {
      refUpdate.current.focus()
      refUpdate.current.setSelectionRange(value.length, value.length)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit])

  useEffect(() => {
    setIndent(refReplyName.current.getBoundingClientRect().width + 10 + "px")
  }, [])

  return (
    <>
      <div className="reply">
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
          <>
            <span className="reply-to" ref={refReplyName}>
              {replyingTo}
            </span>
            <p className="comment-text" style={{ textIndent: indent }}>
              {content}
            </p>
          </>
        ) : (
          <>
            <span className="reply-to-edit" ref={refReplyName}>
              {replyingTo}
            </span>
            <textarea
              type="text"
              className="update-textarea"
              value={value}
              ref={refUpdate}
              onChange={(e) => setValue(e.target.value)}
              style={{ textIndent: indent }}
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
            <button
              className="delete-comment"
              onClick={() => showModal(id, idComment)}
            >
              delete
            </button>
            <button className="edit-comment" onClick={() => setIsEdit(!isEdit)}>
              edit
            </button>
          </div>
        ) : (
          <button
            className="reply-btn"
            onClick={() => setShowReply(!showReply)}
          >
            <span>
              <img src={reply} alt="" />
              reply
            </span>
          </button>
        )}
      </div>
      <ReplyFormContainer
        showReply={showReply}
        setShowReply={setShowReply}
        username={user.username}
        id={id}
        idComment={idComment}
      />
    </>
  )
}
export default Reply
