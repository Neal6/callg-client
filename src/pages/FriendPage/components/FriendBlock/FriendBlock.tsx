import React from "react";

import "./friendBlock.scss";
import emptyBlockImage from "@assets/images/svg/empty-block.svg";

const FriendBlock = () => {
  return (
    <div className="friend-block-empty">
      <img className="friend-block-empty-image" alt="" src={emptyBlockImage} />
      <p className="friend-block-empty-text">
        Không có ai bị chặn cả. Bạn thật là hòa đồng
      </p>
    </div>
  );
};

export default FriendBlock;
