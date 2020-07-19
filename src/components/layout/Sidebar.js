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
              <span className="fas fa-plus">Course</span>
            </Link>
            <Link to="/offer/add" className="btn btn-info btn-block">
              <i className="fas fa-plus">Offer</i>
            </Link>
          </Card.Body>
        </Card>
      </Sticky>
    </>
  );
}

export default Sidebar;
