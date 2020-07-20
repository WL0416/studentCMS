import React from "react";
import Courses from "../courses/Courses";
import Sidebar from "../layout/Sidebar";
import { Col, Row } from "react-bootstrap";

function Dashboard() {
  return (
    <Row>
      <div className="col-md-10 mb-5">
        <Row>
          <Col md={6}>
            <h2>
              <i className="fas fa-graduation-cap"></i> Courses
            </h2>
          </Col>
        </Row>
        <Courses />
      </div>
      <Col md={2}>
        <br />
        <br />
        <Sidebar />
      </Col>
    </Row>
  );
}
export default Dashboard;
