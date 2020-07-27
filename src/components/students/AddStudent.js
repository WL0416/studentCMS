import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
// import firebase from "firebase/app";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
// import { notifyUser } from "../../actions/notifyActions";
// import Alert from "../layout/Alert";
import download from "js-file-download";
import axios from "axios";
import Spinner from "../layout/Spinner";
import { inputDate, convertDate } from "../util/tools";

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
    enrolFee: 0,
    issueDate: "",
    courseName: "",
    code: "",
    cricos: "",
    start: "",
    end: "",
    duration: "",
    term: "",
    tuition: 0,
    materialsFee: 0,
    totalFee: 0,
    balance: 0,
    campus: "Melbourne",
    campusAddress: "Level 10, 190 Queen St., Melbourne, VIC 3000",
    officerName: "",
    tuitionFirst: 0,
    totalDue: 0,
    template: "",
    isEnrolled: "NotEnrol",
    isSaved: false,
  };

  onClickSave = (e) => {
    e.preventDefault();

    // const { firestore } = this.props;
    const { course, date, firestore } = this.props;
    const { code, cricos, duration, term } = course;
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
      const eachTermFee = tuition / 4;

      period2 = eachTermFee;
      period3 = eachTermFee;
      period4 = (tuition - (eachTermFee * 2 + tuitionFirst)).toFixed(2);
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

    const newStudent = {
      sId: this.state.studentId,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      birthday: this.state.birthday,
      passport: this.state.passport,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address,
      status: this.state.isEnrolled,
      cid: course.id,
      pid: date.id,
      campus: this.state.campus,
      indexId: course.id + this.state.passport,
    };

    firestore
      .add(
        { collection: `courses/${course.id}/calendar/${date.id}/students` },
        newStudent
      )
      .catch((err) => {
        alert(err);
      });

    setTimeout(() => {
      // student actual data
      let studentIndex = this.props.students.filter((student) => {
        return student.passport === this.state.passport;
      })[0];

      const indexRef = studentIndex.indexId;
      studentIndex = {
        index: studentIndex.id,
        cid: studentIndex.cid,
        pid: studentIndex.pid,
        sId: studentIndex.sId,
        firstName: studentIndex.firstName,
        lastName: studentIndex.lastName,
        course: this.state.courseName,
      };

      firestore
        .collection("studentsIndex")
        .doc(indexRef)
        .set(studentIndex)
        .catch((err) => {
          alert(err);
        })
        .then(alert("successful"));
    }, 500);
  };

  onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:8888/offerGenerate`, this.state)
      .then((response) => {
        console.log(
          response.headers,
          Object.keys(response),
          response.status,
          response.statusText,
          response.config,
          response.request
        );

        let file_name = response.data.split("\\");
        file_name = file_name[file_name.length - 1];
        window.open(`http://127.0.0.1:8888/${file_name}`);
      })
      .catch((error) => {
        alert(error);
      });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, isSaved: false });
  };

  alertUser = () => {
    alert("Please tpye in student's name, birthday and passport number.");
    // notifyUser(
    //   "Please tpye in student's name, birthday and passport number.",
    //   "error"
    // );
  };

  componentDidUpdate() {
    const { course, date } = this.props;
    if (course != null && date != null && this.state.id !== course.id) {
      this.setState({
        id: course.id,
        courseName: course.name,
        start: convertDate(inputDate(date.start.seconds)),
        end: convertDate(inputDate(date.end.seconds)),
      });
    }
  }

  render() {
    const { course, date } = this.props;

    if (course != null && date != null) {
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
                  </div> */}

                  {/* Template file section */}
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
                    <div className="col-md-4 offset-2">
                      <input
                        type="button"
                        value="Save"
                        onClick={
                          this.state.firstName &&
                          this.state.birthday &&
                          this.state.passport
                            ? this.onClickSave
                            : this.alertUser
                        }
                        className="btn btn-info btn-block"
                      />
                    </div>

                    <div className="col-md-4">
                      {" "}
                      {this.state.isSaved ? (
                        <input
                          type="submit"
                          value="Generate Offer & Download"
                          className="btn btn-success btn-block"
                        />
                      ) : (
                        <input
                          type="submit"
                          value="Generate Offer & Download"
                          className="btn btn-secondary btn-block"
                          disabled
                        />
                      )}
                    </div>
                  </div>

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
  // notify: PropTypes.object.isRequired,
  // notifyUser: PropTypes.func.isRequired,
};

export default compose(
  firestoreConnect((props) => [
    { collection: "studentsIndex" },
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
      doc: props.match.params.cid,
      storeAs: "students",
      subcollections: [
        {
          collection: "calendar",
          doc: props.match.params.pid,
          subcollections: [{ collection: "students" }],
        },
      ],
    },
  ]),
  connect(({ firestore: { ordered }, notify }) => ({
    // courses: ordered.courses,
    course: ordered.course && ordered.course[0],
    date: ordered.calendar && ordered.calendar[0],
    students: ordered.students,
    studentsIndex: ordered.studentsIndex,
    // notify: notify,
  }))
)(AddStudent);
