import React from "react";
import { Input } from "antd";

import "./textAreaBasic.scss";

type PropTypes = {
  style?: any;
  className?: string;
  placeholder?: string;
  showCount?: boolean;
  maxLength?: number;
  rows?: number;
  autoSize?: any;
  value?: string;
};

const TextAreaBasic = React.forwardRef((props: PropTypes, ref: any) => {
  const { className, style, value, ...rest } = props;

  return (
    <Input.TextArea
      className={`text-area-basic ${className}`}
      style={style}
      value={value}
      bordered={false}
      {...rest}
    />
  );
});

export default TextAreaBasic;
