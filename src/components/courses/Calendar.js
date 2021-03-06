import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Col, Row, Card, Form, Button, Table } from "react-bootstrap";
import { firestoreConnect } from "react-redux-firebase";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { inputDate, convertDate } from "../util/tools";
import Sidebar from "../layout/Sidebar";
import ConfirmBox from "../layout/ConfirmBox";
import PropTypes from "prop-types";

class Calendar extends Component {
  state = {
    id: "",
    start: "",
    end: "",
    showConfirmBox: false,
    deleteDocName: "",
  };

  componentDidUpdate() {
    const { course } = this.props;
    if (course && this.state.id !== course.id) {
      this.setState({
        ...course,
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
    const { id } = this.state;
    firestore.delete({
      collection: `courses/${id}/calendar`,
      doc: e.target.name,
    });
    this.setState(this.setConfirmShow());
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { id, start, end } = this.state;
    const { firestore } = this.props;
    console.log("clicked");
    if (!start || !end) {
      alert("Need start or end date!");
    } else {
      // parse string of date to the format of firebase accepted.
      const formatStart = firebase.firestore.Timestamp.fromDate(
        new Date(start)
      );
      const formatEnd = firebase.firestore.Timestamp.fromDate(new Date(end));

      firestore.add(
        { collection: `courses/${id}/calendar` },
        { start: formatStart, end: formatEnd }
      );
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClickDelete = (e) => {
    e.preventDefault();
    this.setConfirmShow();
  };

  render() {
    const { id, name, showConfirmBox } = this.state;
    const { calendar } = this.props;
    if (id) {
      return (
        <>
          <Row>
            <Col md={9}>
              <h2>
                <i className="far fa-calendar"></i> {name}
              </h2>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left"></i> Back To Dashboard
              </Link>
            </Col>
          </Row>
          <Row>
            <div className="col-md-10 mb-5">
              <Card>
                <Card.Header>Add Class</Card.Header>
                <Card.Body>
                  <Form onSubmit={this.onSubmit}>
                    <Row>
                      <Col md={5}>
                        <Form.Group controlId="formStartDate">
                          <Form.Label>Start Date</Form.Label>
                          <Form.Control
                            type="date"
                            name="start"
                            onChange={this.onChange}
                            value={this.state.start}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={5}>
                        <Form.Group controlId="formEndDate">
                          <Form.Label>End Date</Form.Label>
                          <Form.Control
                            type="date"
                            name="end"
                            onChange={this.onChange}
                            value={this.state.end}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={2} style={{ margin: "auto" }}>
                        <Button variant="warning" type="submit" block>
                          Add
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
              <br />
              <Card>
                <Card.Header>Classes</Card.Header>
                <Card.Body>
                  {typeof calendar != "undefined" &&
                  calendar != null &&
                  calendar.length != null &&
                  calendar.length > 0 ? (
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {calendar.map((period) => (
                          <tr key={period.id}>
                            <td>
                              {convertDate(inputDate(period.start.seconds))}
                            </td>
                            <td>
                              {convertDate(inputDate(period.end.seconds))}
                            </td>
                            <td>
                              {" "}
                              <OverlayTrigger
                                placement="top"
                                delay={{ hide: 100 }}
                                overlay={(props) => {
                                  return (
                                    <Tooltip id="button-tooltip" {...props}>
                                      Students
                                    </Tooltip>
                                  );
                                }}
                              >
                                <Link
                                  to={`/courses/${id}/calendar/${period.id}/students`}
                                  className="btn btn-info btn-sm ml-2 mr-2"
                                >
                                  {" "}
                                  <i className="fas fa-user-graduate"></i>{" "}
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
                                  name={period.id}
                                  onClick={this.onClickDelete}
                                >
                                  <i className="fas fa-times"></i>
                                </Button>
                              </OverlayTrigger>
                              <ConfirmBox
                                showConfirmBox={showConfirmBox}
                                setConfirmShow={this.setConfirmShow}
                                message="Are you sure to delete this class?"
                                onConfirm={this.onConfirmDelete}
                                id={period.id}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <h2 style={{ textAlign: "center" }}>No classes </h2>
                  )}
                </Card.Body>
              </Card>
            </div>
            <Col md={2}>
              <Sidebar />
            </Col>
          </Row>
        </>
      );
    } else {
      return <Spinner />;
    }
  }
}

Calendar.propTypes = {
  course: PropTypes.object,
  calendar: PropTypes.array,
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
  ]),
  connect(({ firestore: { ordered } }) => ({
    course: ordered.course && ordered.course[0],
    calendar: ordered.calendar,
  }))
)(Calendar);
