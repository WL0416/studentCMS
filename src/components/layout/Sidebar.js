import React from "react";
import { Link } from "react-router-dom";
import Sticky from "react-sticky-el";
import { Card } from "react-bootstrap";

function Sidebar() {
  return (
    <>
      <Sticky topOffset={0}>
        <Card>
          <Card.Body>
            <Link to="/courses/add" className="btn btn-success btn-block">
              <i className="fas fa-plus">Course</i>
            </Link>
            <Link to="/student/add" className="btn btn-info btn-block">
              <i className="fas fa-plus">Student</i>
            </Link>
          </Card.Body>
        </Card>
      </Sticky>
    </>
  );
}

export default Sidebar;
