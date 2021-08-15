import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Tooltip, Badge } from "antd";
import { BsCameraVideoFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { MdNotificationsActive } from "react-icons/md";
import { FiMessageCircle } from "react-icons/fi";
import { RiSettings5Fill } from "react-icons/ri";
import { IoLogoXing } from "react-icons/io";

import "./leftLayout.scss";
import ChanelLayout from "@layouts/LeftLayout/ChanelLayout/ChanelLayout";

interface PropsType {}

const LeftLayout = (props: PropsType) => {
  const receiveRequestFriend = useSelector(
    (state: any) => state.auth.receiveRequestFriend
  );

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
            className="left-layout-function-item "
          >
            <FiMessageCircle className="left-layout-function-item-icon " />
          </Link>
        </Tooltip>
        <Tooltip placement="right" title={"Gọi nhóm"}>
          <Link
            to={`${process.env.REACT_APP_ROUTE_PROFILE}/60fcc0799667ae3cd8f32fa5`}
            className="left-layout-function-item "
          >
            <BsCameraVideoFill className="left-layout-function-item-icon" />
          </Link>
        </Tooltip>
        <Tooltip placement="right" title={"Bạn bè"}>
          <Link
            to={`${process.env.REACT_APP_ROUTE_FRIEND_RECEIVE}`}
            className="left-layout-function-item"
          >
            <Badge count={receiveRequestFriend?.length || 0} overflowCount={9}>
              <HiUserGroup className="left-layout-function-item-icon" />
            </Badge>
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
      <ChanelLayout />
    </div>
  );
};

export default LeftLayout;
