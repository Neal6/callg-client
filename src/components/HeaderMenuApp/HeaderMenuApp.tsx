import React from "react";
import { IoMdApps } from "react-icons/io";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";

import "@components/HeaderMenuApp/headerMenuApp.scss";
import DropdownMenu from "@components/DropdownMenu/DropdownMenu";

const HeaderMenuApp = () => {
  const menu = <DropdownMenu>ok con be</DropdownMenu>;

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomCenter">
      <div className="header-wrap-app">
        <IoMdApps className="header-app-icon" />
      </div>
    </Dropdown>
  );
};

export default HeaderMenuApp;
