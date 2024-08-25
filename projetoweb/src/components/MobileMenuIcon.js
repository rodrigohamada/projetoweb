import React from "react";
import "../styles/MobileMenuIcon.css";

const MobileMenuIcon = ({ onClick, isOpen }) => {
  return (
    <div className={`mobile-menu-icon ${isOpen ? "open" : ""}`} onClick={onClick}>
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </div>
  );
};

export default MobileMenuIcon;
