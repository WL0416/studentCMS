import React, { Component } from "react";
// import firebase from "firebase/app";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

class EditCourse extends Component {
  state = {
    id: "",
    name: "",
    code: "",
    cricos: "",
    duration: "",
    term: "",
    // start: "",
    // end: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newCourse = this.state;
    const { firestore } = this.props;

    // firestore update document
    firestore
      .update({ collection: "courses", doc: newCourse.id }, newCourse)
      .then(() => this.props.history.push("/"));
  };

  onDelete = (e) => {
    e.preventDefault();
    const { firestore } = this.props;
    firestore
      .delete({ collection: "courses", doc: this.state.id })
      .then(() => this.props.history.push("/"));
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

  render() {
    if (this.state.id) {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-md-9">
              <h2>
                <i className="fas fa-edit"></i> Edit Course
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
                  <br />
                  <input
                    type="submit"
                    value="Update"
                    className="btn btn-success btn-block col-md-4 offset-md-4"
                  />
                </form>
                <button
                  className="btn btn-danger btn-block col-md-4 offset-md-4 mt-3"
                  onClick={this.onDelete}
                >
                  Delete
                </button>
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

export default compose(
  firestoreConnect((props) => [
    { collection: "courses", storeAs: "course", doc: props.match.params.id },
  ]),
  connect(({ firestore: { ordered } }) => ({
    course: ordered.course && ordered.course[0],
  }))
)(EditCourse);
