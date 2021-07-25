import React, { forwardRef } from "react";
import "@components/InputTextBasic/inputTextBasic.scss";

type PropTypes = {
  name?: string;
  placeholder?: string;
  value?: any;
  autoFocus?: boolean;
  className?: string;
};

const InputTextBasic = forwardRef((props: PropTypes, ref: any) => {
  const { className, ...rest } = props;

  return (
    <input
      className={`input-text-basic ${className}`}
      ref={ref}
      type="text"
      {...rest}
    />
  );
});

export default InputTextBasic;
