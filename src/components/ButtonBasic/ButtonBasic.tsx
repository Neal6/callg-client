import React from "react";

import "./buttonBasic.scss";

type PropTypes = {
  children?: any;
  style?: any;
  onClick?: any;
  className?: string;
  disabled?: boolean;
};

const ButtonBasic = (props: PropTypes) => {
  const { className, style, children, ...rest } = props;
  return (
    <button
      type="button"
      className={`button-basic ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonBasic;
