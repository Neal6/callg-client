import React from "react";
import { Menu } from "antd";

import "./dropdownMenu.scss";

type PropTypes = {
  children: any;
  arrow?: boolean;
};

const DropdownMenu = (props: PropTypes) => {
  const { children, arrow, ...rest } = props;
  return (
    <div
      {...rest}
      className={`dropdown-menu  ${!!arrow ? "dropdown-menu-arrow" : ""} `}
    >
      {children}
    </div>
  );
};

export default DropdownMenu;
