import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Col, Row, Card, Form, Button, Table } from "react-bootstrap";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

class Calendar extends Component {
  state = {
    id: "",
    start: "",
    end: "",
    editId: "",
    periods: [],
  };

  componentDidUpdate() {
    const { course } = this.props;
    if (course && this.state.id !== course.id) {
      this.setState({
        ...course,
        // start: inputDate(course.start.seconds),
        // end: inputDate(course.end.seconds),
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { id, periods } = this.state;
    if (id) {
      return (
        <>
          <Row>
            <Col md={9}>
              <h2>
                <i className="far fa-calendar"></i> Course Calendar
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
          <Card>
            <Card.Header>Add Period</Card.Header>
            <Card.Body>
              <Row>
                <Col md={5}>
                  <Form>
                    <Form.Group controlId="formStartDate">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control type="date"></Form.Control>
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={5}>
                  <Form>
                    <Form.Group controlId="formEndDate">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control type="date"></Form.Control>
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={2} style={{ margin: "auto" }}>
                  <Button variant="warning" type="submit" block>
                    Add
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <br />
          <Card>
            <Card.Header>Course Classes</Card.Header>
            <Card.Body>
              {periods.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {periods.map((period) => (
                      <tr>
                        <td>{period.start}</td>
                        <td>{period.end}</td>
                        <td>
                          {" "}
                          <OverlayTrigger
                            placement="top"
                            delay={{ hide: 100 }}
                            overlay={(props) => {
                              return (
                                <Tooltip id="button-tooltip" {...props}>
                                  Edit
                                </Tooltip>
                              );
                            }}
                          >
                            <Button variant="success" size="sm">
                              <i className="fas fa-pencil-alt"></i>
                            </Button>
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
                            <Button variant="danger" size="sm">
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
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
        </>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default compose(
  firestoreConnect((props) => [
    { collection: "courses", storeAs: "course", doc: props.match.params.id },
  ]),
  connect(({ firestore: { ordered } }) => ({
    course: ordered.course && ordered.course[0],
  }))
)(Calendar);
