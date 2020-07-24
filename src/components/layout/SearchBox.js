import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Table } from "react-bootstrap";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";

class SearchBox extends Component {
  render() {
    const { showSearchBox, setSearchShow, searchResult } = this.props;

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
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchResult !== null && searchResult.length !== 0 ? (
                  searchResult.map(
                    ({ sId, cid, pid, index, lastName, firstName, course }) => (
                      <tr>
                        <td>{sId}</td>
                        <td>
                          {firstName} {lastName}
                        </td>
                        <td>{course}</td>
                        <td>
                          {" "}
                          <OverlayTrigger
                            placement="top"
                            delay={{ hide: 100 }}
                            overlay={(props) => {
                              return (
                                <Tooltip id="button-tooltip" {...props}>
                                  View & Edit
                                </Tooltip>
                              );
                            }}
                          >
                            <Link
                              to={`/courses/${cid}/calendar/${pid}/students/${index}`}
                              className="btn btn-info btn-sm ml-2 mr-2"
                              onClick={setSearchShow}
                            >
                              {" "}
                              <i className="fas fa-eye"></i>{" "}
                            </Link>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colspan="4">
                      {" "}
                      <h2 style={{ textAlign: "center" }}>No record.</h2>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

SearchBox.propTypes = {
  showSearchBox: PropTypes.bool.isRequired,
  setSearchShow: PropTypes.func.isRequired,
  searchResult: PropTypes.array.isRequired,
};

export default SearchBox;
