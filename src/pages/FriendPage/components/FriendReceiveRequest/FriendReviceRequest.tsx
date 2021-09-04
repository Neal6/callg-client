import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

import "./friendReceiveRequest.scss";
import emptyBlockImage from "@assets/images/svg/empty-block.svg";
import * as userAction from "@store/actions/userActions";
import * as userType from "@store/actionTypes/userType";
import FriendItem from "@components/FriendItem/FriendItem";

const FriendReviceRequest = () => {
  const dispatch = useDispatch();
  const loadingGetRequestFriend = useSelector(
    (state: any) => state.loading[userType.getReceiveRequestFriend]
  );
  const users = useSelector((state: any) => state.user.users);
  const [page, setPage] = useState<Number>(1);
  const [pageSize, setPageSize] = useState<Number>(10);

  useEffect(() => {
    dispatch(userAction.getReceiveRequestFriend({ body: { page, pageSize } }));
    return () => {
      dispatch(userAction.cleanUser());
    };
  }, []);
  return (
    <div className="friend-receive-request-wrap">
      {loadingGetRequestFriend === true ? (
        <div>
          <Skeleton height={100} style={{ marginTop: 12 }} />
          <Skeleton height={50} style={{ marginTop: 12 }} />
          <Skeleton height={50} style={{ marginTop: 12 }} />
        </div>
      ) : (
        <>
          {users.length > 0 && (
            <div className="friend-receive-request-list">
              <div className="friend-receive-request-list-title">
                Danh sách lời mời kết bạn
              </div>
              {users.map((user: any) => (
                <FriendItem key={user._id} user={user} />
              ))}
            </div>
          )}

          {users.length === 0 && (
            <div className="friend-receive-request-empty">
              <img
                className="friend-receive-request-empty-image"
                alt=""
                src={emptyBlockImage}
              />
              <p className="friend-receive-request-empty-text">
                Không có lời mời kết bạn nào cả
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FriendReviceRequest;
