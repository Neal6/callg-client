import React from "react";

import "./dotOnline.scss";

type PropTypes = {
  isOnline: boolean;
  className?: string;
};

const DotOnline = (props: PropTypes) => {
  const { isOnline, ...rest } = props;
  return (
    <div {...rest}>
      {isOnline ? (
        <div className="dot-online-wrap">
          <div className="dot-online"></div>
        </div>
      ) : (
        <div className="dot-offline-wrap">
          <div className="dot-offline"></div>
        </div>
      )}
    </div>
  );
};

export default DotOnline;
