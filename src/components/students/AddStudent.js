import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
// import firebase from "firebase/app";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { notifyUser } from "../../actions/notifyActions";
import Alert from "../layout/Alert";
import download from "js-file-download";
import axios from "axios";
import Spinner from "../layout/Spinner";

class AddStudent extends Component {
  state = {
    studentId: "",
    firstName: "",
    lastName: "",
    birthday: "",
    passport: "",
    phone: "",
    email: "",
    address: "",
    enrolFee: "",
    issueDate: "",
    courseName: "",
    code: "",
    cricos: "",
    start: "",
    end: "",
    duration: "",
    term: "",
    tuition: "",
    materialsFee: "",
    totalFee: "",
    balance: "",
    campus: "",
    campusAddress: "",
    officerName: "",
    tuitionFirst: "",
    totalDue: "",
    template: "",
    isSaved: false,
    isGenerated: false,
  };

  onClick = (e) => {
    e.preventDefault();

    // const { firestore } = this.props;
    const { courses } = this.props;
    const { code, cricos, duration, term } = Object.values(courses).filter(
      (course) => course.name === this.state.courseName
    )[0];
    const { enrolFee, tuition, materialsFee, tuitionFirst } = this.state;

    const totalDue = (
      parseFloat(enrolFee) +
      parseFloat(tuitionFirst) +
      parseFloat(materialsFee)
    ).toFixed(2);
    const totalFee = (
      parseFloat(enrolFee) +
      parseFloat(tuition) +
      parseFloat(materialsFee)
    ).toFixed(2);
    let balance = (totalFee - totalDue).toFixed(2);

    let campusAddress = "";
    if (this.state.campus === "Melbourne") {
      campusAddress = "Level 10, 190 Queen St., Melbourne, VIC 3000";
    } else {
      campusAddress = "98 Cleveland Street, Greenslopes, QLD 4120";
    }

    let period2 = 0,
      period3 = 0,
      period4 = 0;

    if (parseInt(term) < 4) {
      period2 = balance;
      period3 = "0.00";
      period4 = "0.00";
    } else {
      const eachTermFee = (parseFloat(tuition) / 4).toFixed(2);

      period2 = eachTermFee;
      period3 = eachTermFee;
      period4 = (
        parseFloat(tuition) -
        (eachTermFee * 2 + tuitionFirst)
      ).toFixed(2);
    }

    let issueDate = new Date();
    let day = issueDate.getDate();
    day = day > 10 ? day : "0" + day;
    let month = issueDate.getMonth() + 1;
    month = month > 10 ? month : "0" + month;
    issueDate = day + "/" + month + "/" + issueDate.getFullYear();

    // const birthday = convertDate(this.state.birthday);
    // const start = convertDate(this.state.start);
    // const end = convertDate(this.state.end);

    this.setState({
      ...this.state,
      code,
      cricos,
      duration,
      term,
      issueDate,
      totalDue,
      totalFee,
      balance,
      campusAddress,
      period2,
      period3,
      period4,
      enrolFee: parseFloat(enrolFee).toFixed(2),
      tuitionFirst: parseFloat(tuitionFirst).toFixed(2),
      tuition: parseFloat(tuition).toFixed(2),
      materialsFee: parseFloat(materialsFee).toFixed(2),
      isSaved: true,
    });

    // // parse string of date to the format of firebase accepted.
    // newOffer.birthday = firebase.firestore.Timestamp.fromDate(
    //   new Date(newOffer.birthday)
    // );

    // firestore
    //   .add({ collection: "offers" }, newOffer)
    //   .then(() => this.props.history.push("/"));
  };

  onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:3000/offerGenerate`, this.state)
      .then((response) => {
        console.log(
          response.headers,
          Object.keys(response),
          response.status,
          response.statusText,
          response.config,
          response.request
        );
        this.setState({
          ...this.state,
          isGenerated: true,
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  onDownload = (e) => {
    e.preventDefault();

    axios
      .get("http://localhost:3000/offerGenerate")
      .then((response) => {
        console.log(
          response.headers,
          Object.keys(response),
          response.status,
          response.statusText,
          response.config,
          response.request
        );
        download(response.data, "test.xlsx");
      })
      .catch((error) => {
        alert(error);
      });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, isSaved: false });
  };

  // componentDidUpdate() {
  //   const { courses } = this.props;
  //   if (courses && this.state.id !== courses.id) {
  //     this.setState({
  //       ...course,
  //       // start: inputDate(course.start.seconds),
  //       // end: inputDate(course.end.seconds),
  //     });
  //   }
  // }

  alertUser = () => {
    const { notifyUser } = this.props;
    notifyUser("Please select a course to generate an offer...", "error");
  };

  render() {
    const { courses, course, date } = this.props;

    if (courses != null && course != null && date != null) {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-md-9">
              <h2>
                <i className="fas fa-kiwi-bird"></i> New Student
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
                        value={this.state.studentId}
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
                        value={this.state.firstname}
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
                        <option value=""> -- Select an option -- </option>
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
                    <div className="col-md-6 form-group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        onChange={this.onChange}
                        value={this.state.address}
                      />
                    </div>
                    <div className="col-md-3 form-group">
                      <label htmlFor="enrolFee">Enrol $</label>
                      <input
                        type="number"
                        className="form-control"
                        name="enrolFee"
                        onChange={this.onChange}
                        value={this.state.enrolFee}
                        required
                      />
                    </div>
                    <div className="col-md-3 form-group">
                      <label htmlFor="officerName">Officer Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="officerName"
                        onChange={this.onChange}
                        value={this.state.officerName}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label htmlFor="courseName">Course</label>
                      <select
                        name="courseName"
                        className="form-control"
                        onChange={this.onChange}
                        value={this.state.courseName}
                        required
                      >
                        <option value=""> -- Select an option -- </option>
                        {courses
                          ? Object.values(courses).map((course) => (
                              <option key={course.name} value={course.name}>
                                {course.name}
                              </option>
                            ))
                          : null}
                      </select>
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
                        value={this.state.start}
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
                        value={this.state.end}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 form-group">
                      <label htmlFor="tuition">Tuition</label>
                      <input
                        type="number"
                        className="form-control"
                        name="tuition"
                        onChange={this.onChange}
                        value={this.state.tuition}
                        required
                      />
                    </div>
                    <div className="col-md-3 form-group">
                      <label htmlFor="materialsFee">Materials Fee</label>
                      <input
                        type="number"
                        className="form-control"
                        name="materialsFee"
                        onChange={this.onChange}
                        value={this.state.materialsFee}
                        required
                      />
                    </div>
                    <div className="col-md-3 form-group">
                      <label htmlFor="tuitionFirst">Tution First Pay</label>
                      <input
                        type="number"
                        className="form-control"
                        name="tuitionFirst"
                        onChange={this.onChange}
                        value={this.state.tuitionFirst}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="appendCourse"></label>
                      <input
                        type="button"
                        value="Add more course"
                        className="btn btn-secondary btn-block mt-2"
                        disabled
                      />
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="template">Offer Template</label>
                      <input
                        type="file"
                        name="template"
                        className="form-control-file"
                        onChange={this.onChange}
                        value={this.state.template}
                      />
                    </div>
                  </div> */}
                  <br />
                  <div className="row">
                    <div className="col-md-4">
                      <input
                        type="button"
                        value="Save"
                        onClick={
                          this.state.courseName ? this.onClick : this.alertUser
                        }
                        className="btn btn-info btn-block"
                      />
                    </div>

                    <div className="col-md-4">
                      {" "}
                      {this.state.isSaved ? (
                        <input
                          type="submit"
                          value="Generate Offer"
                          className="btn btn-success btn-block"
                        />
                      ) : (
                        <input
                          type="submit"
                          value="Generate Offer"
                          className="btn btn-secondary btn-block"
                          disabled
                        />
                      )}
                    </div>

                    <div className="col-md-4">
                      {" "}
                      {this.state.isGenerated ? (
                        <input
                          type="button"
                          value="Download"
                          className="btn btn-primary btn-block"
                          onClick={this.onDownload}
                        />
                      ) : (
                        <input
                          type="button"
                          value="Download"
                          className="btn btn-secondary btn-block"
                          disabled
                          onClick={this.onDownload}
                        />
                      )}
                    </div>
                  </div>

                  {/* <a
                    href="http://127.0.0.1:8887/output.docx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click me
                  </a> */}

                  <br />
                  {/* {message ? (
                    <Alert message={message} messageType={messageType} />
                  ) : null} */}
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

AddStudent.propTypes = {
  firestore: PropTypes.object,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired,
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
  ]),
  connect(({ firestore: { ordered }, notify }) => ({
    courses: ordered.courses,
    course: ordered.course && ordered.course[0],
    date: ordered.calendar && ordered.calendar[0],
    notify: notify,
  }))
)(AddStudent);
