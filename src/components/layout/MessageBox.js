import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

class MessageBox extends Component {
  render() {
    const { isShow, setShow, message } = this.props;
    return (
      <>
        <Modal
          show={isShow}
          onHide={setShow}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="text-center">
            <Modal.Title id="contained-modal-title-vcenter">
              Information
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={setShow}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

MessageBox.propTypes = {
  isShow: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  message: PropTypes.string,
};

export default MessageBox;
