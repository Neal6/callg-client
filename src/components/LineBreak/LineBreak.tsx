import React from "react";

import "./lineBreak.scss";

type PropTypes = {
  style?: any;
  className?: string;
};

const LineBreak = (props: PropTypes) => {
  const { className, style, ...rest } = props;

  return (
    <div className={`line-break ${className}`} style={style} {...rest}></div>
  );
};

export default LineBreak;
