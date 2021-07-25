import React from "react";
import { IoMdApps } from "react-icons/io";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";

import "@components/HeaderMenuApp/headerMenuApp.scss";

const HeaderMenuApp = () => {
  const menu = (
    <Menu className="header-menu-app">
      <Link to="/" className="header-menu-app__item">
        <img alt="" src="https://img.icons8.com/color/48/4a90e2/trello.png" />
        <span className="header-menu-app__text">Dự án</span>
      </Link>
      <Link to="/" className="header-menu-app__item">
        <img
          alt=""
          src="https://img.icons8.com/cute-clipart/48/4a90e2/task.png"
        />
        <span className="header-menu-app__text">Vấn đề</span>
      </Link>
      <Link to="/" className="header-menu-app__item">
        <img
          alt=""
          src="https://img.icons8.com/fluent/48/4a90e2/dashboard-layout.png"
        />
        <span className="header-menu-app__text">Thống kê</span>
      </Link>
      <Link to="/" className="header-menu-app__item">
        <img alt="" src="https://img.icons8.com/nolan/48/area-chart.png" />
        <span className="header-menu-app__text">Thời gian làm việc</span>
      </Link>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomCenter">
      <div className="header-wrap-app">
        <IoMdApps className="header-app-icon" />
      </div>
    </Dropdown>
  );
};

export default HeaderMenuApp;
