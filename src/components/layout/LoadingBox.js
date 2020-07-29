import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import Spinner from "./Spinner";

class LoadingBox extends Component {
  render() {
    const { isLoading, setLoading, message } = this.props;
    return (
      <>
        <Modal
          show={isLoading}
          onHide={setLoading}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              {message}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Spinner />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

LoadingBox.propTypes = {
  isDownloading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  message: PropTypes.string,
};

export default LoadingBox;
