/* eslint-disable react/prop-types */
import { useState } from "react"
import { useGlobalContext } from "../../context"
import "./comments.css"
import Comment from "../comment/Comment"

const Comments = () => {
  const { comments } = useGlobalContext()

  useState
  return (
    <section className="comments-container">
      {comments.map((comment) => {
        return (
          <>
            <Comment key={comment.id} comment={comment} />
          </>
        )
      })}
    </section>
  )
}
export default Comments
