import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "./friendPage.scss";
import PrivateRoute from "@routes/PrivateRoute";
import FriendOnline from "@pages/FriendPage/components/FriendOnline/FriendOnline";
import FriendAll from "@pages/FriendPage/components/FriendAll/FridndAll";
import FriendRequest from "@pages/FriendPage/components/FriendRequest/FriendRequest";
import FriendBlock from "@pages/FriendPage/components/FriendBlock/FriendBlock";
import FriendAdd from "@pages/FriendPage/components/FriendAdd/FriendAdd";
import FriendReviceRequest from "@pages/FriendPage/components/FriendReceiveRequest/FriendReviceRequest";

const FriendPage = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<string>("");

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  return (
    <div className="wrap-friend-page">
      <div className="friend-page-header">
        <Link to={`${process.env.REACT_APP_ROUTE_FRIEND}`}>
          <div
            className={`friend-page-header-item ${
              activeMenu === process.env.REACT_APP_ROUTE_FRIEND
                ? "friend-page-header-item--active"
                : ""
            }`}
          >
            Trực tuyến
          </div>
        </Link>
        <Link to={`${process.env.REACT_APP_ROUTE_FRIEND_ALL}`}>
          <div
            className={`friend-page-header-item ${
              activeMenu === process.env.REACT_APP_ROUTE_FRIEND_ALL
                ? "friend-page-header-item--active"
                : ""
            }`}
          >
            Tất cả
          </div>
        </Link>
        <Link to={`${process.env.REACT_APP_ROUTE_FRIEND_REQUEST}`}>
          <div
            className={`friend-page-header-item ${
              activeMenu === process.env.REACT_APP_ROUTE_FRIEND_REQUEST
                ? "friend-page-header-item--active"
                : ""
            }`}
          >
            Yêu cầu kết bạn
          </div>
        </Link>
        <Link to={`${process.env.REACT_APP_ROUTE_FRIEND_RECEIVE}`}>
          <div
            className={`friend-page-header-item ${
              activeMenu === process.env.REACT_APP_ROUTE_FRIEND_RECEIVE
                ? "friend-page-header-item--active"
                : ""
            }`}
          >
            Lời mời kết bạn
          </div>
        </Link>
        <Link to={`${process.env.REACT_APP_ROUTE_FRIEND_BLOCK}`}>
          <div
            className={`friend-page-header-item ${
              activeMenu === process.env.REACT_APP_ROUTE_FRIEND_BLOCK
                ? "friend-page-header-item--active"
                : ""
            }`}
          >
            Chặn
          </div>
        </Link>
        <Link to={`${process.env.REACT_APP_ROUTE_FRIEND_ADD}`}>
          <div
            className={`friend-page-header-item friend-page-header-item-add`}
          >
            Kết bạn
          </div>
        </Link>
      </div>
      <div className="friend-page-header-section">
        <PrivateRoute
          path={`${process.env.REACT_APP_ROUTE_FRIEND}`}
          exact
          component={FriendOnline}
        />
        <PrivateRoute
          path={`${process.env.REACT_APP_ROUTE_FRIEND_ALL}`}
          exact
          component={FriendAll}
        />
        <PrivateRoute
          path={`${process.env.REACT_APP_ROUTE_FRIEND_REQUEST}`}
          exact
          component={FriendRequest}
        />
        <PrivateRoute
          path={`${process.env.REACT_APP_ROUTE_FRIEND_RECEIVE}`}
          exact
          component={FriendReviceRequest}
        />
        <PrivateRoute
          path={`${process.env.REACT_APP_ROUTE_FRIEND_BLOCK}`}
          exact
          component={FriendBlock}
        />
        <PrivateRoute
          path={`${process.env.REACT_APP_ROUTE_FRIEND_ADD}`}
          exact
          component={FriendAdd}
        />
      </div>
    </div>
  );
};

export default FriendPage;
