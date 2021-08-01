import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "antd";
import { BsCameraVideoFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { MdNotificationsActive } from "react-icons/md";
import { FiMessageCircle } from "react-icons/fi";
import { RiSettings5Fill } from "react-icons/ri";
import { IoLogoXing } from "react-icons/io";
import { IoFileTrayOutline, IoPeopleCircle } from "react-icons/io5";
import { IoMdWifi } from "react-icons/io";

import "@layouts/leftLayout.scss";

interface PropsType {}

const LeftLayout = (props: PropsType) => {
  const location = useLocation();
  const [focusSearch, setFocusSearch] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string>("");

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  const handleFocusSearch = () => {
    setFocusSearch(true);
  };

  const handleBlurSearch = () => {
    setFocusSearch(false);
  };

  return (
    <div className="left-layout">
      <div className="left-layout-function">
        <Tooltip placement="right" title={"Trang chủ"}>
          <Link
            to={`${process.env.REACT_APP_ROUTE_HOME}`}
            className="left-layout-logo left-layout-function-item left-layout-function-item--active"
          >
            <IoLogoXing className="left-layout-function-item-icon " />
          </Link>
        </Tooltip>
        <Tooltip placement="right" title={"Tin nhắn"}>
          <Link
            to={`${process.env.REACT_APP_ROUTE_PROFILE}/60fcc0499667ae3cd8f32fa1`}
          >
            <div className="left-layout-function-item ">
              <FiMessageCircle className="left-layout-function-item-icon " />
            </div>
          </Link>
        </Tooltip>
        <Tooltip placement="right" title={"Gọi nhóm"}>
          <Link
            to={`${process.env.REACT_APP_ROUTE_PROFILE}/60fcc0799667ae3cd8f32fa5`}
          >
            <div className="left-layout-function-item ">
              <BsCameraVideoFill className="left-layout-function-item-icon" />
            </div>
          </Link>
        </Tooltip>
        <Tooltip placement="right" title={"Bạn bè"}>
          <Link to={`${process.env.REACT_APP_ROUTE_PROFILE}/123`}>
            <div className="left-layout-function-item">
              <HiUserGroup className="left-layout-function-item-icon" />
            </div>
          </Link>
        </Tooltip>
        <Tooltip placement="right" title={"Thông báo"}>
          <div className="left-layout-function-item">
            <MdNotificationsActive className="left-layout-function-item-icon" />
          </div>
        </Tooltip>
        <Tooltip placement="right" title={"Cài đặt"}>
          <div className="left-layout-function-item left-layout-function-item--end">
            <RiSettings5Fill className="left-layout-function-item-icon" />
          </div>
        </Tooltip>
      </div>
      <div className="left-layout-chat">
        <div
          className={`left-layout-chat-search ${
            focusSearch ? "left-layout-chat-search--active" : ""
          }`}
        >
          <input
            type="text"
            name="search-friend"
            className={`search-input ${
              focusSearch ? "search-input--active" : ""
            }`}
            placeholder="Tìm kiếm tên"
            onFocus={handleFocusSearch}
            onBlur={handleBlurSearch}
            autoComplete="new-password"
          />
          {focusSearch && (
            <div className="header-search-result">
              <div className="header-search-result__header">
                <p className="header-search-result__title">Tìm kiếm gần đây</p>
                <p className="header-search-result__history">Lịch sử</p>
              </div>
              <div className="header-search-list"></div>
              <div className="header-search-empty">
                <IoFileTrayOutline className="header-search-empty__icon" />
                <p className="header-search-empty__text">Không có dữ liệu</p>
              </div>
            </div>
          )}
        </div>
        <div className="left-layout-chat-menu">
          <Link to={`${process.env.REACT_APP_ROUTE_FRIEND}`}>
            <div
              className={`left-layout-chat-menu-item ${
                activeMenu.includes(`${process.env.REACT_APP_ROUTE_FRIEND}`)
                  ? "left-layout-chat-menu-item--active"
                  : ""
              }`}
            >
              <IoPeopleCircle className="left-layout-chat-menu-item-icon" />
              Bạn bè
            </div>
          </Link>
          <div className="left-layout-chat-menu-item ">
            <IoMdWifi className="left-layout-chat-menu-item-icon" />
            Hoạt động quanh đây
          </div>
        </div>
        <div className="left-layout-chat-friend">
          <div className="left-layout-chat-friend-header">
            <div className="left-layout-chat-friend-title">
              Tin nhắn cá nhân
            </div>
            <RiSettings5Fill className="left-layout-chat-friend-setting" />
          </div>
          <div className="left-layout-chat-friend-list">
            <div className="left-layout-chat-friend-list-item left-layout-chat-friend-list-item--active">
              <div className="left-layout-chat-friend-list-item-avatar">
                <img
                  alt=""
                  src={
                    "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1731613373894844&height=50&width=50&ext=1629769034&hash=AeShBTuW6-FmbInehAE"
                  }
                />
              </div>
              <div className="left-layout-chat-friend-list-item-info">
                <div className="left-layout-chat-friend-list-item-name">
                  Nam Nguyen
                </div>
                <div className="left-layout-chat-friend-list-item-last-message">
                  Mai đi uống nước không bro
                </div>
              </div>
            </div>
            <div className="left-layout-chat-friend-list-item">
              <div className="left-layout-chat-friend-list-item-avatar">
                <img
                  alt=""
                  src={
                    "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1731613373894844&height=50&width=50&ext=1629769034&hash=AeShBTuW6-FmbInehAE"
                  }
                />
              </div>
              <div className="left-layout-chat-friend-list-item-info">
                <div className="left-layout-chat-friend-list-item-name">
                  Nam Nguyen
                </div>
                <div className="left-layout-chat-friend-list-item-last-message">
                  Bạn: 8h
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="left-layout-chat-group">
          <div className="left-layout-chat-group-header">
            <div className="left-layout-chat-group-title">Tin nhắn nhóm</div>
            <RiSettings5Fill className="left-layout-chat-group-setting" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftLayout;
