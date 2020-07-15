import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <Link to="/courses/add" className="btn btn-success btn-block">
        <i className="fas fa-plus"></i> Class
      </Link>
      <Link to="/offer/add" className="btn btn-info btn-block">
        <i className="fas fa-plus"></i> Offer
      </Link>
    </>
  );
}

export default Sidebar;
