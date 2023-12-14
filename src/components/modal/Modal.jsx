import { useGlobalContext } from "../../context"
import "./modal.css"

const Modal = () => {
const {isActiveModal, showModal, deleteComment} = useGlobalContext()

  return (
    <div
      className={isActiveModal ? "modal-overlay show-modal" : "modal-overlay"}
    >
      <div className="modal-container">
        <h2>Delete comment</h2>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone.
        </p>
        <button className="cancel" onClick={showModal}>
          no, cancel
        </button>
        <button className="delete" onClick={deleteComment}>
          yes, delete
        </button>
      </div>
    </div>
  )
}
export default Modal