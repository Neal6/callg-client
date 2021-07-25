import React from "react";

import "@components/TextError/textError.scss";

type PropTypes = {
  children?: string;
  className?: string;
};

const TextError = (props: PropTypes) => {
  const { children, className } = props;
  return <div className={`text-error ${className}`}>{children}</div>;
};

export default TextError;
