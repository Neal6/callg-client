import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

import "./friendOnline.scss";
import emptyOnlineImage from "@assets/images/svg/empty-online.svg";
import * as userAction from "@store/actions/userActions";
import * as userType from "@store/actionTypes/userType";
import FriendItem from "@components/FriendItem/FriendItem";

const FriendOnline = () => {
  const dispatch = useDispatch();
  const loadingGetFriendOnline = useSelector(
    (state: any) => state.loading[userType.getFriendOnline]
  );
  const users = useSelector((state: any) => state.user.users);
  const [page, setPage] = useState<Number>(1);
  const [pageSize, setPageSize] = useState<Number>(10);

  useEffect(() => {
    dispatch(
      userAction.getFriendOnline({ body: { query: "", page, pageSize } })
    );
    return () => {
      dispatch(userAction.cleanUser());
    };
  }, []);
  return (
    <div className="wrap-friend-all">
      {loadingGetFriendOnline === true ? (
        <div>
          <Skeleton height={100} style={{ marginTop: 12 }} />
          <Skeleton height={50} style={{ marginTop: 12 }} />
          <Skeleton height={50} style={{ marginTop: 12 }} />
        </div>
      ) : (
        <>
          {users.length > 0 && (
            <div className="friend-all-list">
              <div className="friend-all-list-title">Danh sách bạn bè</div>
              {users.map((user: any) => (
                <FriendItem key={user._id} user={user} />
              ))}
            </div>
          )}

          {users.length === 0 && (
            <div className="friend-online-empty">
              <img
                className="friend-online-empty-image"
                alt=""
                src={emptyOnlineImage}
              />
              <p className="friend-online-empty-text">
                Chả có ai để nhắn tin cả (=_=)
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FriendOnline;
