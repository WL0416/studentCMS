import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Button, Modal, Table } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import { firestoreConnect } from "react-redux-firebase";

class SearchBox extends Component {
  render() {
    const { showSearchBox, setSearchShow, searchResults } = this.props;
    return (
      <>
        <Modal
          show={showSearchBox}
          onHide={setSearchShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Search Results
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Start</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody></tbody>
            </Table> */}
            <h2 style={{ textAlign: "center" }}>No record for this student.</h2>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

SearchBox.propTypes = {
  searchWith: PropTypes.string.isRequired,
};

export default SearchBox;
