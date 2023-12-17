/* eslint-disable react/prop-types */
const EditComment = ({
  containerStyles,
  handleSubmit,
  refForm,
  value,
  setValue,
  refTextarea,
  user,
}) => {
  return (
    <section className="reply-input-container" style={containerStyles}>
      <form className="reply-input" onSubmit={handleSubmit} ref={refForm}>
        <textarea
          type="text"
          placeholder="Add a comment..."
          className="reply-textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          ref={refTextarea}
          autoFocus
        />
        <div className="current-user-container">
          <img
            src={user.currentUser.image.png}
            alt=""
            className="current-user"
          />
        </div>
        <button className="btn-send">reply</button>
      </form>
    </section>
  )
}
export default EditComment
