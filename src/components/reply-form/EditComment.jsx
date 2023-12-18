/* eslint-disable react/prop-types */
const EditComment = ({
  containerStyles,
  handleSubmit,
  refForm,
  refTextarea,
  user,
  name,
  setName,
  username,
  refName,
  nameStyles,
  spanStyles,
}) => {
  return (
    <section className="reply-input-container" style={containerStyles}>
      <form className="reply-input" onSubmit={handleSubmit} ref={refForm}>
        <span className="username-span" ref={refName} style={spanStyles}>
          {"@" + username + " "}
        </span>
        <textarea
          type="text"
          placeholder="Add a comment..."
          className="reply-textarea"
          value={name}
          onChange={(e) => setName(e.target.value)}
          ref={refTextarea}
          autoFocus
          style={nameStyles}
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
