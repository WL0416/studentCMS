import React from "react";
import { Link } from "react-router-dom";
import Sticky from "react-sticky-el";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

const Sidebar = (props) => {
  const { isStudent, cid, pid } = props;
  return (
    <>
      <Sticky topOffset={0}>
        <Card>
          <Card.Body>
            <Link to="/courses/add" className="btn btn-success btn-block">
              <i className="fas fa-plus">Course</i>
            </Link>
            {isStudent ? (
              <Link
                to={`/courses/${cid}/calendar/${pid}/newstudent`}
                className="btn btn-info btn-block"
              >
                <i className="fas fa-plus">Student</i>
              </Link>
            ) : null}
          </Card.Body>
        </Card>
      </Sticky>
    </>
  );
};

Sidebar.propTypes = {
  isStudent: PropTypes.bool.isRequired,
};

export default Sidebar;
