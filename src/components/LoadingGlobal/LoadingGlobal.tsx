import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

import "./loadingGlobal.scss";

const LoadingGlobal = () => {
  return (
    <div className="loading-global">
      <div className="loading-icon">
        <PuffLoader size={50} />
      </div>
    </div>
  );
};

export default LoadingGlobal;
