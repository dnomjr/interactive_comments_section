export const increaseScore = (
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
) => {
  const newScore = score + 1
  let thisComment = comments.find((comment) => {
    return comment.id === idComment
  })

  let findReply = thisComment.replies.find((reply) => {
    return reply.id === id
  })
  let updateReply = { ...findReply, score: newScore }

  let updateReplies = thisComment.replies.map((reply) => {
    return reply.id === id ? updateReply : reply
  })
  let updateComment = { ...thisComment, replies: updateReplies }
  let updateComments = comments.map((comment) => {
    return comment.id === idComment ? updateComment : comment
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

export const decreaseScore = (
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
) => {
  const newScore = score - 1
  let thisComment = comments.find((comment) => {
    return comment.id === idComment
  })

  let findReply = thisComment.replies.find((reply) => {
    return reply.id === id
  })
  let updateReply = { ...findReply, score: newScore }

  let updateReplies = thisComment.replies.map((reply) => {
    return reply.id === id ? updateReply : reply
  })
  let updateComment = { ...thisComment, replies: updateReplies }
  let updateComments = comments.map((comment) => {
    return comment.id === idComment ? updateComment : comment
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
