import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
// import firebase from "firebase/app";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { convertDate } from "../util/tools";
import { offerGenerate } from "../util/tools";

class AddOffer extends Component {
  state = {
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
  };

  onSubmit = (e) => {
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
      period3 = "0";
      period4 = "0";
    } else {
      const eachTermFee = (parseFloat(tuition) / 4).toFixed(2);

      period2 = eachTermFee;
      period3 = eachTermFee;
      period4 = (parseFloat(tuition) - eachTermFee * 2).toFixed(2);
    }

    this.setState({
      ...this.state,
      code,
      cricos,
      duration,
      term,
      issueDate: Date.now(),
      totalDue,
      totalFee,
      balance,
      campusAddress,
      birthday: convertDate(this.state.birthday),
      start: convertDate(this.state.start),
      end: convertDate(this.state.end),
      period2,
      period3,
      period4,
    });

    // // parse string of date to the format of firebase accepted.
    // newOffer.birthday = firebase.firestore.Timestamp.fromDate(
    //   new Date(newOffer.birthday)
    // );

    // firestore
    //   .add({ collection: "offers" }, newOffer)
    //   .then(() => this.props.history.push("/"));
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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

  render() {
    const { courses } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-9">
            <h2>
              <i className="fas fa-kiwi-bird"></i> New Offer
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left"></i> Back To Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="row">
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
                </div>

                <div className="row">
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
                </div>
                <div className="row">
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
                  <div className="form-group col-md-6">
                    <label htmlFor="template">Offer Template</label>
                    <input
                      type="file"
                      name="template"
                      className="form-control-file"
                      onChange={this.onChange}
                      value={this.state.template}
                      required
                    />
                  </div>
                </div>
                <br />
                <input
                  type="submit"
                  value="Generate Offer"
                  className="btn btn-success btn-block col-md-4 offset-md-4"
                />
              </form>
              <script>
                {`function clikeMe() {
                console.log("I am Clicked")
              }`}
              </script>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

AddOffer.propTypes = {
  firestore: PropTypes.object,
};

export default compose(
  firestoreConnect(() => ["courses"]),
  connect((state) => ({
    courses: state.firestore.data.courses,
  }))
)(AddOffer);
