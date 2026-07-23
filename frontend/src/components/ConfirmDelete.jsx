import { Button, Modal } from "react-bootstrap";

function ConfirmDelete({
  show,
  task,
  deleting,
  onClose,
  onConfirm,
}) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Are you sure you want to delete{" "}
        <strong>{task?.title}</strong>?
        This action cannot be undone.
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onClose}
          disabled={deleting}
        >
          Cancel
        </Button>

        <Button
          variant="danger"
          onClick={onConfirm}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmDelete;