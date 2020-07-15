import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
// import firebase from "firebase/app";
import PropTypes from "prop-types";

class AddCourse extends Component {
  state = {
    name: "",
    code: "",
    cricos: "",
    duration: "",
    term: "",
    // start: "",
    // end: "",
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newCourse = this.state;
    const { firestore } = this.props;

    // parse string of date to the format of firebase accepted.
    // newCourse.start = firebase.firestore.Timestamp.fromDate(
    //   new Date(newCourse.start)
    // );
    // newCourse.end = firebase.firestore.Timestamp.fromDate(
    //   new Date(newCourse.end)
    // );

    firestore
      .add({ collection: "courses" }, newCourse)
      .then(() => this.props.history.push("/"));
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-9">
            <h2>
              <i className="fas fa-folder-plus"></i> Add Course
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
                <div className="form-group">
                  <label htmlFor="name">Course Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    minLength="2"
                    required
                    onChange={this.onChange}
                    value={this.state.name}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label htmlFor="code">Course Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="code"
                      minLength="2"
                      required
                      onChange={this.onChange}
                      value={this.state.code}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label htmlFor="cricos">CRICOS</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cricos"
                      minLength="2"
                      required
                      onChange={this.onChange}
                      value={this.state.cricos}
                    />
                  </div>
                </div>

                <div className="row">
                  {" "}
                  <div className="col-md-6 form-group">
                    <label htmlFor="duration">Course Duration</label>
                    <input
                      type="number"
                      className="form-control"
                      name="duration"
                      required
                      onChange={this.onChange}
                      value={this.state.duration}
                    />
                  </div>{" "}
                  <div className="col-md-6 form-group">
                    <label htmlFor="term">Term</label>
                    <input
                      type="number"
                      className="form-control"
                      name="term"
                      required
                      onChange={this.onChange}
                      value={this.state.term}
                    />
                  </div>
                </div>
                {/* <div className="row">
                <div className="col-md-6 form-group">
                    <label htmlFor="start">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="start"
                      minLength="2"
                      required
                      onChange={this.onChange}
                      value={this.state.start.valueAsNumber}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label htmlFor="end">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="end"
                      minLength="2"
                      required
                      onChange={this.onChange}
                      value={this.state.end.valueAsNumber}
                    />
                  </div>
                </div> */}
                <br />
                <input
                  type="submit"
                  value="Add"
                  className="btn btn-success btn-block col-md-4 offset-md-4"
                />
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

AddCourse.propTypes = {
  firestore: PropTypes.object,
};

export default firestoreConnect()(AddCourse);
