import React from "react";
import { useSelector } from "react-redux";
import { FaAngleDown } from "react-icons/fa";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";

import "@components/UserAvatarHeader/userAvatarHeader.scss";
import ImageWithDefault from "@components/ImageWithDefault/ImageWithDefault";

const UserAvatarHeader = () => {
  const { avatar, fullName } = useSelector((state: any) => state.auth);

  const menu = (
    <Menu className="user-avatar-header-menu">
      <Menu.Item key="0">
        <Link
          to={`${process.env.REACT_APP_ROUTE_ME}`}
          className="user-dropdown"
        >
          <ImageWithDefault src={avatar} className="user-dropdown__avatar" />
          <div>
            <span className="user-dropdown__name">{fullName}</span>
            <span className="user-dropdown__small-text">Thông tin cá nhân</span>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className="item-disabled" disabled>
        Tài khoản
      </Menu.Item>
      <Menu.Item>
        <Link to={`${process.env.REACT_APP_ROUTE_ME}`}> Thông tin cá nhân</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`${process.env.REACT_APP_ROUTE_ME}`}> Cài đặt</Link>
      </Menu.Item>
      <Menu.Divider />

      <Menu.Item key="3">
        <Link to={`${process.env.REACT_APP_ROUTE_LOGOUT}`}>Đăng xuất</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
      <div className="user-avatar-header">
        <ImageWithDefault src={avatar} className="avatar" />
        <FaAngleDown style={{ marginTop: 4, marginLeft: 4 }} />
      </div>
    </Dropdown>
  );
};

export default UserAvatarHeader;
