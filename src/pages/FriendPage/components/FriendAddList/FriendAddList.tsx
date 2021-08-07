import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";

import "./friendAddList.scss";
import * as userType from "@store/actionTypes/userType";
import * as userAction from "@store/actions/userActions";
import FriendAddItem from "../FriendAddItem/FriendAddItem";
import emptyAddImage from "@assets/images/svg/empty-add.svg";

const FriendAddList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.user.users);
  const loadingSearchUser = useSelector(
    (state: any) => state.loading[userType.searchUser]
  );

  useEffect(() => {
    return () => {
      dispatch(userAction.cleanUser());
    };
  }, []);

  return (
    <div className="friend-add-list">
      {loadingSearchUser ? (
        <div className="friend-add-list-loading">
          <Skeleton height={50} count={5} style={{ marginTop: 12 }} />
        </div>
      ) : (
        <>
          {users.length > 0 && (
            <div className="friend-add-list-title">Kết quả tìm kiếm</div>
          )}
          {users.map((user: any) => (
            <FriendAddItem key={user.id} user={user} />
          ))}
          {users.length === 0 && loadingSearchUser === false && (
            <>
              <div className="friend-add-list-empty">
                <img
                  className="friend-add-list-empty-image"
                  alt=""
                  src={emptyAddImage}
                />
                <p className="friend-add-list-empty-text">
                  Không tìm thấy người bạn nào. Hãy tìm kiếm thêm bạn bè đi
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FriendAddList;
