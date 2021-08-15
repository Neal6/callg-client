import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

import "./friendRequest.scss";
import emptyRequestImage from "@assets/images/svg/empty-request.svg";
import * as userAction from "@store/actions/userActions";
import * as userType from "@store/actionTypes/userType";
import FriendItem from "@components/FriendItem/FriendItem";

const FriendRequest = () => {
  const dispatch = useDispatch();
  const loadingGetRequestFriend = useSelector(
    (state: any) => state.loading[userType.getRequestFriend]
  );
  const users = useSelector((state: any) => state.user.users);
  const [page, setPage] = useState<Number>(1);
  const [pageSize, setPageSize] = useState<Number>(10);

  useEffect(() => {
    dispatch(userAction.getRequestFriend({ body: { page, pageSize } }));
    return () => {
      dispatch(userAction.cleanUser());
    };
  }, []);
  console.log(users);
  return (
    <div className="wrap-friend-request">
      {loadingGetRequestFriend === true ? (
        <div>
          <Skeleton height={100} style={{ marginTop: 12 }} />
          <Skeleton height={50} style={{ marginTop: 12 }} />
          <Skeleton height={50} style={{ marginTop: 12 }} />
        </div>
      ) : (
        <>
          {users.length > 0 && (
            <div className="friend-request-list">
              <div className="friend-request-list-title">
                Danh sách yêu cầu kết bạn
              </div>
              {users.map((user: any) => (
                <FriendItem key={user._id} user={{ ...user, id: user._id }} />
              ))}
            </div>
          )}

          {users.length === 0 && (
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
          )}
        </>
      )}
    </div>
  );
};

export default FriendRequest;
