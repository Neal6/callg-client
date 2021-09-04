import React from "react";

import "./dropdownMenu.scss";

type PropTypes = {
  children: any;
  arrow?: boolean;
};

const DropdownMenu = (props: PropTypes) => {
  const { children, arrow, ...rest } = props;
  //@ts-ignore
  const { onClick, mode, focusable, selectable, prefixCls } = rest;
  return (
    <div
      onClick={onClick}
      //@ts-ignore
      mode={mode}
      prefixcls={prefixCls}
      selectable={selectable.toString()}
      focusable={focusable}
      className={`dropdown-menu  ${!!arrow ? "dropdown-menu-arrow" : ""} `}
    >
      {children}
    </div>
  );
};

export default DropdownMenu;
