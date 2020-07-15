import React from "react";
import spinner from "./spinner.gif";

function Spinner() {
  return (
    <div className="mt-3">
      <img
        src={spinner}
        alt="Loading.."
        style={{ width: "100px", margin: "auto", display: "block" }}
      />
    </div>
  );
}

export default Spinner;
