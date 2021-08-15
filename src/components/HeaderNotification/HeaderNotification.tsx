import React from "react";
import { Menu, Dropdown } from "antd";
import { MdNotificationsActive } from "react-icons/md";

import "@components/HeaderNotification/headerNotification.scss";
import DropdownMenu from "@components/DropdownMenu/DropdownMenu";

const HeaderNotification = () => {
  const menu = <DropdownMenu>ok con de</DropdownMenu>;

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomCenter">
      <div className="header-wrap-noti">
        <MdNotificationsActive className="header-noti-icon" />
      </div>
    </Dropdown>
  );
};

export default HeaderNotification;
