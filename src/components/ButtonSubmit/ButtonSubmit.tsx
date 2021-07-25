import React from "react";

import "@components/ButtonSubmit/buttonSubmit.scss";

type PropTypes = {
  children?: any;
  style?: any;
  className?: string;
  disabled?: boolean;
};

const ButtonSubmit = (props: PropTypes) => {
  const { className, style, children, ...rest } = props;
  return (
    <button
      className={`button-submit ${className}`}
      type="submit"
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonSubmit;
