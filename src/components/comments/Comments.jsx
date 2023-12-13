/* eslint-disable react/prop-types */
import { useState } from "react"
import { useGlobalContext } from "../../context"
import "./comments.css"
import Comment from "../comment/Comment"
import Reply from "../reply/Reply"

const Comments = () => {
  const { comments } = useGlobalContext()

  useState
  return (
    <section className="comments-container">
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <Comment comment={comment} />

            {comment.replies.map((reply) => {
              return <Reply key={reply.id}/>
            })}
          </div>
        )
      })}
    </section>
  )
}
export default Comments
