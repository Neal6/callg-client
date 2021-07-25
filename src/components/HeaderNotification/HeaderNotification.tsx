import React from "react";
import { Menu, Dropdown } from "antd";
import { MdNotificationsActive } from "react-icons/md";

import "@components/HeaderNotification/headerNotification.scss";

const HeaderNotification = () => {
  const menu = <Menu className="header-noti-dropdown">ok con de</Menu>;

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomCenter">
      <div className="header-wrap-noti">
        <MdNotificationsActive className="header-noti-icon" />
      </div>
    </Dropdown>
  );
};

export default HeaderNotification;
