import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import ImageWithDefault from "@components/ImageWithDefault/ImageWithDefault";
import "./friendAddItem.scss";
import DotOnline from "@components/DotOnline/DotOnline";
import * as userAction from "@store/actions/userActions";

type PropTypes = {
  user: any;
};

const FriendAddItem = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { requestFriendList } = useSelector((state: any) => state.auth);
  const { user } = props;
  const { avatar, fullName, id, isOnline } = user;

  const onRequestFriend = () => {
    dispatch(userAction.requestFriend({ body: { user: id } }));
  };

  return (
    <div className="friend-add-item-wrap">
      <div className="friend-add-item">
        <Link to={`${process.env.REACT_APP_ROUTE_PROFILE}/${id}`}>
          <div className="friend-add-item-avatar">
            <ImageWithDefault
              src={avatar}
              className="friend-add-item-avatar-image"
            />
            <DotOnline
              isOnline={isOnline}
              className="friend-add-item-avatar-status"
            />
          </div>
        </Link>

        <div className="friend-add-item-info">
          <div className="friend-add-item-name-wrap">
            <Link to={`${process.env.REACT_APP_ROUTE_PROFILE}/${id}`}>
              <div className="friend-add-item-name">{fullName}</div>
            </Link>
            <div
              className={`friend-add-item-status ${
                isOnline ? "friend-add-item-status--active" : ""
              }`}
            >
              {isOnline ? "Trực tuyến" : "Ngoại tuyến"}
            </div>
          </div>
          <div className="friend-add-item-info-id">ID: {id}</div>
        </div>
        <div className="friend-add-item-contact">
          <Tooltip placement="top" title={"Nhắn tin"}>
            <div className="friend-add-item-message">
              <svg
                className="icon-35-fSh"
                aria-hidden="false"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z"
                ></path>
              </svg>
            </div>
          </Tooltip>
          {!requestFriendList.includes(id) && (
            <Tooltip placement="top" title={"Thêm bạn bè"}>
              <div className="friend-add-item-add" onClick={onRequestFriend}>
                <FaUserPlus />
              </div>
            </Tooltip>
          )}
          {requestFriendList.includes(id) && (
            <Tooltip placement="top" title={"Đang chờ đồng ý"}>
              <div
                className="friend-add-item-add friend-add-item-add-accept"
                onClick={onRequestFriend}
              >
                <FaUserCheck />
              </div>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendAddItem;
