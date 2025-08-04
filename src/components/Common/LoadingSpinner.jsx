import React from "react";
import "../../styles/components/LoadingSpinner.css";

const LoadingSpinner = ({ size = "md" }) => {
  return (
    <div className={`loading-spinner-container ${size}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
