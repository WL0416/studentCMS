import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { inputDate, convertDate } from "../util/tools";
import Spinner from "../layout/Spinner";
import axios from "axios";

class EditStudent extends Component {
  state = {
    sId: "",
    firstName: "",
    lastName: "",
    birthday: "",
    passport: "",
    phone: "",
    email: "",
    address: "",
    status: "",
    cid: "",
    pid: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, isSaved: false });
  };

  componentDidUpdate() {
    const { student } = this.props;
    if (student != null && this.state.sId !== student.sId) {
      this.setState({
        ...student,
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { student, firestore } = this.props;

    const basicPath = `courses/${student.cid}/calendar/${student.pid}/students`;
    firestore
      .update(
        {
          collection: basicPath,
          doc: `${student.id}`,
        },
        this.state
      )
      .then(() => this.props.history.push(`/${basicPath}`));

    // axios
    //   .post(`http://localhost:3000/offerGenerate`, this.state)
    //   .then((response) => {
    //     console.log(
    //       response.headers,
    //       Object.keys(response),
    //       response.status,
    //       response.statusText,
    //       response.config,
    //       response.request
    //     );
    //     this.setState({
    //       ...this.state,
    //       isGenerated: true,
    //     });
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   });
  };

  render() {
    const { courses, course, date, student } = this.props;

    if (courses != null && course != null && date != null) {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-md-9">
              <h2>
                <i className="fas fa-kiwi-bird"></i> Edit Student
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <Link
                to={`/courses/${course.id}/calendar/${date.id}/students`}
                className="btn btn-link"
              >
                <i className="fas fa-arrow-circle-left"></i> Back To Class
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="form-group col-md-3">
                      <label htmlFor="firstName">Student ID</label>
                      <input
                        type="text"
                        className="form-control"
                        name="studentId"
                        onChange={this.onChange}
                        value={this.state.sId}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        required
                        onChange={this.onChange}
                        value={this.state.firstName}
                      />
                    </div>
                    <div className=" form-group col-md-3">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        onChange={this.onChange}
                        value={this.state.lastName}
                      />
                    </div>
                    <div className="form-group col-md-3 ">
                      <label htmlFor="passport">Passport</label>
                      <input
                        type="text"
                        className="form-control"
                        name="passport"
                        required
                        onChange={this.onChange}
                        value={this.state.passport}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className=" form-group col-md-3">
                      <label htmlFor="birthday">Birthday</label>
                      <input
                        type="date"
                        className="form-control"
                        name="birthday"
                        onChange={this.onChange}
                        value={this.state.birthday}
                        required
                      />
                    </div>
                    <div className="col-md-3 form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        onChange={this.onChange}
                        value={this.state.phone}
                      />
                    </div>
                    <div className="col-md-3 form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={this.onChange}
                        value={this.state.email}
                      />
                    </div>
                    <div className="col-md-3 form-group">
                      <label htmlFor="campus">Campus</label>
                      <select
                        name="campus"
                        className="form-control"
                        onChange={this.onChange}
                        value={this.state.campus}
                        required
                      >
                        <option key="Melbourne" value="Melbourne">
                          Melbourne
                        </option>
                        <option key="Brisbane" value="Brisbane">
                          Brisbane
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-8 form-group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        onChange={this.onChange}
                        value={this.state.address}
                      />
                    </div>
                    <div className="col-md-4 form-group">
                      <label htmlFor="status">Status</label>
                      <select
                        name="status"
                        className="form-control"
                        onChange={this.onChange}
                        value={this.state.status}
                        required
                      >
                        <option key="notEnrol" value="NotEnrol">
                          Not Enrol
                        </option>
                        <option key="enrolled" value="Enrolled">
                          Enrolled
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label htmlFor="courseName">Course</label>
                      <input
                        type="text"
                        name="defaultCourse"
                        className="form-control"
                        onChange={this.onChange}
                        value={course.name}
                        disabled
                      />
                    </div>

                    <div className="col-md-3 form-group">
                      <label htmlFor="start">Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="start"
                        minLength="2"
                        required
                        onChange={this.onChange}
                        value={inputDate(date.start.seconds)}
                        disabled
                      />
                    </div>

                    <div className="col-md-3 form-group">
                      <label htmlFor="end">End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="end"
                        minLength="2"
                        required
                        onChange={this.onChange}
                        value={inputDate(date.end.seconds)}
                        disabled
                      />
                    </div>
                  </div>

                  <br />
                  <div className="row">
                    <div className="col-md-4 offset-4">
                      <input
                        type="submit"
                        value="Update"
                        className="btn btn-info btn-block"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditStudent.propTypes = {
  firestore: PropTypes.object,
  // notify: PropTypes.object.isRequired,
  // notifyUser: PropTypes.func.isRequired,
};

export default compose(
  firestoreConnect((props) => [
    { collection: "courses" },
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
      collection: "courses",
      storeAs: "student",
      doc: props.match.params.cid,
      subcollections: [
        {
          collection: "calendar",
          doc: props.match.params.pid,
          subcollections: [
            { collection: "students", doc: props.match.params.sid },
          ],
        },
      ],
    },
  ]),
  connect(({ firestore: { ordered } }) => ({
    courses: ordered.courses,
    course: ordered.course && ordered.course[0],
    date: ordered.calendar && ordered.calendar[0],
    student: ordered.student && ordered.student[0],
    // notify: notify,
  }))
)(EditStudent);
