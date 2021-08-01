import React from "react";

import "./friendAll.scss";
import emptyOnlineImage from "@assets/images/svg/empty-online.svg";

const FriendAll = () => {
  return (
    <div className="friend-all-empty">
      <img className="friend-all-empty-image" alt="" src={emptyOnlineImage} />
      <p className="friend-all-empty-text">Chả có ai để nhắn tin cả (=_=)</p>
    </div>
  );
};

export default FriendAll;
