import React from "react";

import "@components/TextErrorValidate/textErrorValidate.scss";

type PropTypes = {
  children?: string;
  className?: string;
};

const TextErrorValidate = (props: PropTypes) => {
  const { children, className } = props;
  return <div className={`text-error-validate ${className}`}>{children}</div>;
};

export default TextErrorValidate;
