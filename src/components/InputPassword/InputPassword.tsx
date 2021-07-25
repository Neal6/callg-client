import React, { forwardRef } from "react";

import "@components/InputPassword/inputPassword.scss";

type PropTypes = {
  name?: string;
  placeholder?: string;
  value?: any;
  autofocus?: boolean;
  className?: string;
};

const InputPassword = forwardRef((props: PropTypes, ref: any) => {
  const { className, ...rest } = props;
  return (
    <input
      className={`input-password ${className}`}
      ref={ref}
      type="password"
      {...rest}
    />
  );
});

export default InputPassword;
