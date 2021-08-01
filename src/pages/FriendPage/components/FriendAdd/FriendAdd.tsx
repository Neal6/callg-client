import React from "react";

import "./friendAdd.scss";
import emptyAddImage from "@assets/images/svg/empty-add.svg";

const FriendAdd = () => {
  return (
    <div className="wrap-friend-add">
      <div className="friend-add-big-title">THÊM BẠN</div>
      <div className="friend-add-sub-title">
        Bạn có thể thêm bạn bè bằng CallG Id của họ. Với tìm kiếm bằng tên không
        phân biệt chữ Hoa và chữ Thường!
      </div>
      <div className="friend-add-search"></div>
      <div className="friend-add-list"></div>
      <div className="friend-add-empty">
        <img className="friend-add-empty-image" alt="" src={emptyAddImage} />
        <p className="friend-add-empty-text">
          Không tìm thấy người bạn nào. Hãy tìm kiếm thêm bạn bè đi
        </p>
      </div>
    </div>
  );
};

export default FriendAdd;
