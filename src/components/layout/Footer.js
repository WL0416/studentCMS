import React from "react";

const Footer = () => {
  return (
    <footer
      className="page-footer font-small bg-dark"
      style={{ position: "fixed", left: "0", bottom: "0", width: "100%" }}
    >
      <div className="footer-copyright text-center py-3 text-white">
        Contact{" "}
        <a
          href="https://www.linkedin.com/in/wei-li-439546126"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wei Li
        </a>{" "}
        for more assistance.
      </div>
    </footer>
  );
};

export default Footer;
