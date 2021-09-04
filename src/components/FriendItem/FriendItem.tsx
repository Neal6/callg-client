import React from "react";
import { Link } from "react-router-dom";
import { Tooltip, Dropdown } from "antd";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import ImageWithDefault from "@components/ImageWithDefault/ImageWithDefault";
import "./friendItem.scss";
import DotOnline from "@components/DotOnline/DotOnline";
import * as userAction from "@store/actions/userActions";
import * as chanelAction from "@store/actions/chanelAction";
import DropdownMenu from "@components/DropdownMenu/DropdownMenu";

type PropTypes = {
  user: any;
};

const FriendItem = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { requestFriend, receiveRequestFriend, friends } = useSelector(
    (state: any) => state.auth
  );
  const { user } = props;
  const { avatar, fullName, _id, isOnline } = user;

  const onRequestFriend = () => {
    dispatch(userAction.requestFriend({ body: { user: _id } }));
  };

  const onCancelRequest = () => {
    dispatch(userAction.cancelRequestFriend({ body: { user: _id } }));
  };

  const onRejectRequest = () => {
    dispatch(userAction.rejectFriend({ body: { user: _id } }));
  };

  const onAcceptFriend = () => {
    dispatch(
      userAction.acceptFriend({ body: { user: _id, avatar, fullName } })
    );
  };

  const onUnfriend = () => {
    dispatch(userAction.unFriend({ body: { user: _id, avatar, fullName } }));
  };

  const menuAccept = (
    <DropdownMenu arrow>
      <div
        className="friend-add-item-add-accept-cancel"
        onClick={onCancelRequest}
      >
        Hủy lời mời
      </div>
    </DropdownMenu>
  );

  const menuConfirm = (
    <DropdownMenu arrow>
      <div
        className="friend-add-item-add-confirm-cancel"
        onClick={onRejectRequest}
      >
        Từ chối
      </div>
    </DropdownMenu>
  );

  const menu = (
    <DropdownMenu arrow={true}>
      <div className="friend-add-item-dropdown-menu">
        <div className="friend-add-item-dropdown-item " onClick={() => {}}>
          Yêu thích
        </div>
        <div className="friend-add-item-dropdown-item " onClick={() => {}}>
          Ẩn thông tin
        </div>
        <div
          className="friend-add-item-dropdown-item friend-add-item-dropdown-unfriend"
          onClick={onUnfriend}
        >
          Hủy bạn bè
        </div>
      </div>
    </DropdownMenu>
  );

  const onClickMessage = () => {
    dispatch(chanelAction.getChanelMemberJoin({ body: { members: [_id] } }));
  };

  return (
    <div className="friend-add-item-wrap">
      <div className="friend-add-item">
        <Link to={`${process.env.REACT_APP_ROUTE_PROFILE}/${_id}`}>
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
            <Link to={`${process.env.REACT_APP_ROUTE_PROFILE}/${_id}`}>
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
          <div className="friend-add-item-info-id">ID: {_id}</div>
        </div>
        <div className="friend-add-item-contact">
          <Tooltip placement="top" title={"Nhắn tin"}>
            <div className="friend-add-item-message" onClick={onClickMessage}>
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
          {friends.includes(_id) && (
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomRight"
              arrow
            >
              <Tooltip placement="top" title={"Mục khác"}>
                <div className="friend-add-item-other">
                  <BiDotsVerticalRounded />
                </div>
              </Tooltip>
            </Dropdown>
          )}
          {!requestFriend.includes(_id) && !friends.includes(_id) && (
            <Tooltip placement="top" title={"Thêm bạn bè"}>
              <div className="friend-add-item-add" onClick={onRequestFriend}>
                <FaUserPlus />
              </div>
            </Tooltip>
          )}
          {requestFriend.includes(_id) && (
            <Dropdown overlay={menuAccept} placement="bottomCenter" arrow>
              <Tooltip placement="top" title={"Đang chờ đồng ý"}>
                <div className="friend-add-item-add friend-add-item-add-accept">
                  <FaUserCheck />
                </div>
              </Tooltip>
            </Dropdown>
          )}
          {receiveRequestFriend.includes(_id) && (
            <Dropdown overlay={menuConfirm} placement="bottomCenter" arrow>
              <div
                className="friend-add-item-add-confirm"
                onClick={onAcceptFriend}
              >
                Chấp nhận
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendItem;
