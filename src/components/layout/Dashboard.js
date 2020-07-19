import React from "react";
import Courses from "../courses/Courses";
import Sidebar from "../layout/Sidebar";

function Dashboard() {
  return (
    <div className="row">
      <div className="col-md-10 mb-5">
        <div className="row">
          <div className="col-md-6">
            <h2>
              <i className="fas fa-graduation-cap"></i> Courses
            </h2>
          </div>
        </div>
        <Courses />
      </div>
      <div className="col-md-2">
        <br />
        <br />
        <Sidebar />
      </div>
    </div>
  );
}
export default Dashboard;
