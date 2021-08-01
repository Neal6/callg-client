import React from "react";

import "./friendOnline.scss";
import emptyOnlineImage from "@assets/images/svg/empty-online.svg";

const FriendOnline = () => {
  return (
    <div className="friend-online-empty">
      <img
        className="friend-online-empty-image"
        alt=""
        src={emptyOnlineImage}
      />
      <p className="friend-online-empty-text">Chả có ai để nhắn tin cả (=_=)</p>
    </div>
  );
};

export default FriendOnline;
