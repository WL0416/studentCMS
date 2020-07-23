import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import { Col, Row, Card, Form, Button, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { inputDate, convertDate } from "../util/tools";
import ConfirmBox from "../layout/ConfirmBox";
import Sidebar from "../layout/Sidebar";

class Students extends Component {
  state = {
    cid: "",
    pid: "",
    showConfirmBox: false,
  };

  componentDidUpdate() {
    const { course, date } = this.props;
    if (course && this.state.cid !== course.id && date != null) {
      this.setState({
        cid: course.id,
        pid: date.id,
        name: course.name,
        start: convertDate(inputDate(date.start.seconds)),
      });
    }
  }

  setConfirmShow = () => {
    this.setState({
      showConfirmBox: !this.state.showConfirmBox,
    });
  };

  onConfirmDelete = (e) => {
    e.preventDefault();
    const { firestore } = this.props;
    const { cid, pid } = this.state;
    firestore.delete({
      collection: `courses/${cid}/calendar/${pid}/students`,
      doc: e.target.name,
    });
    this.setState(this.setConfirmShow());
  };

  onClickDelete = (e) => {
    e.preventDefault();
    this.setConfirmShow();
  };

  render() {
    const { students } = this.props;
    const { cid, pid, name, start, showConfirmBox } = this.state;
    if (students) {
      return (
        <>
          <Row>
            <Col md={12}>
              <h2>
                <i className="far fa-graduate"></i> {name} {start}
              </h2>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Link to={`/courses/${cid}/calendar`} className="btn btn-link">
                <i className="fas fa-arrow-circle-left"></i> Back To Calendar
              </Link>
            </Col>
          </Row>
          <Row>
            <div className="col-md-10 mb-5">
              <Card>
                <Card.Header>Students</Card.Header>
                <Card.Body>
                  {typeof students != "undefined" &&
                  students != null &&
                  students.length != null &&
                  students.length > 0 ? (
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Student ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {students.map((student) => (
                          <tr key={student.id}>
                            <td>{student.sId}</td>
                            <td>
                              {student.firstName} {student.lastName}
                            </td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>{student.status}</td>
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
                                  to={`students/${student.id}`}
                                  className="btn btn-info btn-sm ml-2 mr-2"
                                >
                                  {" "}
                                  <i className="fas fa-eye"></i>{" "}
                                </Link>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="top"
                                delay={{ hide: 100 }}
                                overlay={(props) => {
                                  return (
                                    <Tooltip id="button-tooltip" {...props}>
                                      Delete
                                    </Tooltip>
                                  );
                                }}
                              >
                                <Button
                                  variant="danger"
                                  size="sm"
                                  name={student.id}
                                  onClick={this.onClickDelete}
                                >
                                  <i className="fas fa-times"></i>
                                </Button>
                              </OverlayTrigger>
                              <ConfirmBox
                                showConfirmBox={showConfirmBox}
                                setConfirmShow={this.setConfirmShow}
                                message="Are you sure to remove this student?"
                                onConfirm={this.onConfirmDelete}
                                id={student.id}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <h2 style={{ textAlign: "center" }}>No students </h2>
                  )}
                </Card.Body>
              </Card>
            </div>
            <Col md={2}>
              <Sidebar isStudent={true} cid={cid} pid={pid} />
            </Col>
          </Row>
        </>
      );
    } else {
      return <Spinner />;
    }
  }
}

Students.propTypes = {
  students: PropTypes.array,
};

export default compose(
  firestoreConnect((props) => [
    {
      collection: "courses",
      storeAs: "course",
      doc: props.match.params.cid,
    },
    {
      collection: "courses",
      storeAs: "calendar",
      doc: props.match.params.cid,
      subcollections: [{ collection: "calendar" }],
    },
    {
      storeAs: "students",
      collection: "courses",
      doc: props.match.params.cid,
      subcollections: [
        {
          collection: "calendar",
          doc: props.match.params.pid,
          subcollections: [{ collection: "students" }],
        },
      ],
    },
  ]),
  connect(({ firestore: { ordered } }) => ({
    course: ordered.course && ordered.course[0],
    date: ordered.calendar && ordered.calendar[0],
    students: ordered.students,
  }))
)(Students);
