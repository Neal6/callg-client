import React from "react";
import ImageWithDefault from "@components/ImageWithDefault/ImageWithDefault";
import moment from "moment";

import "./toastFriend.scss";

const ToastFriend = ({ closeToast, toastProps }: any) => {
  const user = toastProps.updateId;
  const { avatar, fullName, message } = user;
  console.log(user);
  return (
    <div className="toast-friend">
      <ImageWithDefault src={avatar} className="toast-friend-avatar" />
      <div className="toast-friend-content">
        <div className="toast-friend-message">
          <span className="toast-friend-message-name">{fullName}</span>{" "}
          <span className="toast-friend-message-text">{message}</span>
        </div>
        <div className="toast-friend-time">{moment().format("LLLL")}</div>
      </div>
    </div>
  );
};

export default ToastFriend;
