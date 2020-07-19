import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <Link to="/courses/add" className="btn btn-success btn-block">
        <span className="fas fa-plus">Course</span>
      </Link>
      <Link to="/offer/add" className="btn btn-info btn-block">
        <i className="fas fa-plus">Offer</i>
      </Link>
    </>
  );
}

export default Sidebar;
