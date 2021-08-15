import React from "react";
import { useSelector } from "react-redux";
import { FaAngleDown } from "react-icons/fa";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";

import "@components/UserAvatarHeader/userAvatarHeader.scss";
import ImageWithDefault from "@components/ImageWithDefault/ImageWithDefault";
import DropdownMenu from "@components/DropdownMenu/DropdownMenu";

const UserAvatarHeader = () => {
  const { avatar, fullName } = useSelector((state: any) => state.auth);

  const menu = (
    <DropdownMenu>
      <div className="user-avatar-header-menu">
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
        <div className="user-avatar-header-menu-divider" />
        <div className="item-disabled">Tài khoản</div>
        <Link to={`${process.env.REACT_APP_ROUTE_ME}`}>
          <div className="user-avatar-header-menu-item">Thông tin cá nhân</div>
        </Link>
        <Link to={`${process.env.REACT_APP_ROUTE_ME}`}>
          <div className="user-avatar-header-menu-item">Cài đặt</div>
        </Link>
        <div className="user-avatar-header-menu-divider" />
        <Link to={`${process.env.REACT_APP_ROUTE_LOGOUT}`}>
          <div className="user-avatar-header-menu-item">Đăng xuất</div>
        </Link>
      </div>
    </DropdownMenu>
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
