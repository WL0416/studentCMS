import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

class ConfirmBox extends Component {
  render() {
    const {
      showConfirmBox,
      setConfirmShow,
      message,
      onConfirm,
      id,
    } = this.props;
    return (
      <>
        <Modal
          show={showConfirmBox}
          onHide={setConfirmShow}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Conformation
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Caution!</h4>
            <p>{message}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button name={id} variant="danger" onClick={onConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

ConfirmBox.propsTypes = {
  modelShow: PropTypes.bool.isRequired,
  setModelShow: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default ConfirmBox;
