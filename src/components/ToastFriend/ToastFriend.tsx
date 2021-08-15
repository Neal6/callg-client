import React from "react";
import ImageWithDefault from "@components/ImageWithDefault/ImageWithDefault";
import moment from "moment";

import store from "@store/store";

import "./toastFriend.scss";

const ToastFriend = ({ closeToast, toastProps }: any) => {
  const history = store.getState().app.history;
  const user = toastProps.updateId;
  const { avatar, fullName, message, _id } = user;
  return (
    <div>
      <h3 className="toast-friend-title">Thông báo mới</h3>
      <div
        className="toast-friend"
        onClick={() =>
          history.push(`${process.env.REACT_APP_ROUTE_PROFILE}/${_id}`)
        }
      >
        <ImageWithDefault src={avatar} className="toast-friend-avatar" />
        <div className="toast-friend-content">
          <div className="toast-friend-message">
            <span className="toast-friend-message-name">{fullName}</span>{" "}
            <span className="toast-friend-message-text">{message}</span>
          </div>
          <div className="toast-friend-time">{moment().format("LLLL")}</div>
        </div>
      </div>
    </div>
  );
};

export default ToastFriend;
