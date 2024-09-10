import React from "react";
import { loadingSpinner } from "../images";

const Loading = () => {
  return (
    <div className="flex justify-center items-center fixed inset-0 z-50">
      <img src={loadingSpinner} alt="loading-spinner" />
    </div>
  );
};

export default Loading;
