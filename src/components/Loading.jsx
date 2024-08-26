import React from "react";
import { loadingSpinner } from "../images";

const Loading = () => {
  return (
    <div className="absolute left-[45%] top-[25%] ">
      <img src={loadingSpinner} alt="loading-spinner" />
    </div>
  );
};

export default Loading;
