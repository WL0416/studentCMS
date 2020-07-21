import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Spinner from "../layout/Spinner";

function Courses() {
  // hook to sync the data from firestore to local state
  useFirestoreConnect(["courses"]);
  const courses = useSelector((state) => state.firestore.ordered.courses);

  if (!isLoaded(courses)) {
    return <Spinner />;
  }

  if (isEmpty(courses)) {
    return <h1>There is no courses registered...</h1>;
  }

  const coursesArray = Object.values(courses);

  return (
    <table className="table table-striped" id="courseTable">
      <thead className="thead-inverse">
        <tr>
          <th>Name</th>
          <th>Code</th>
          <th>CRICOS</th>
          <th>Terms</th>
          <th>Duration</th>
          <th>Detail</th>
        </tr>
      </thead>
      <tbody>
        {coursesArray.map((course) => (
          <tr key={course.id}>
            <td>{course.name}</td>
            <td>{course.code}</td>
            <td>{course.cricos}</td>
            <td>{course.term}</td>
            <td>{course.duration} weeks</td>
            <td>
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
                <Link
                  to={`/courses/edit/${course.id}`}
                  className="btn btn-success btn-sm ml-2"
                >
                  <i className="fas fa-pencil-alt"></i>
                </Link>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                delay={{ hide: 100 }}
                overlay={(props) => {
                  return (
                    <Tooltip id="button-tooltip" {...props}>
                      Calendar
                    </Tooltip>
                  );
                }}
              >
                <Link
                  to={`/courses/${course.id}/calendar`}
                  className="btn btn-warning btn-sm ml-2"
                >
                  <i className="fas fa-calendar-alt"></i>
                </Link>
              </OverlayTrigger>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Courses;
