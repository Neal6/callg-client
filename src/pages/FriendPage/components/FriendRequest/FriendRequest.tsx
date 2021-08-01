import React from "react";

import "./friendRequest.scss";
import emptyRequestImage from "@assets/images/svg/empty-request.svg";

const FriendRequest = () => {
  return (
    <div className="friend-request-empty">
      <img
        className="friend-request-empty-image"
        alt=""
        src={emptyRequestImage}
      />
      <p className="friend-request-empty-text">
        Không có ai gửi lời kết bạn cả. Cô đơn quá (-_-)
      </p>
    </div>
  );
};

export default FriendRequest;
