import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Tooltip, message, Dropdown } from "antd";
import copy from "copy-to-clipboard";
import { BsThreeDotsVertical } from "react-icons/bs";

import "./profilePage.scss";
import * as userAction from "@store/actions/userActions";
import * as userType from "@store/actionTypes/userType";
import ButtonBasic from "@components/ButtonBasic/ButtonBasic";
import emptyUserImage from "@assets/images/svg/empty-online.svg";
import ImageWithDefault from "@components/ImageWithDefault/ImageWithDefault";
import DropdownMenu from "@components/DropdownMenu/DropdownMenu";

type paramTypes = {
  id: string;
};

const ProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams<paramTypes>();
  const {
    _id: meId,
    friends,
    requestFriend,
    receiveRequestFriend,
  } = useSelector((state: any) => state.auth);
  const getUserLoading = useSelector(
    (state: any) => state.loading[userType.getUser]
  );
  const { avatar, fullName, introduce, _id } = useSelector(
    (state: any) => state.user.profile
  );
  const errorGetUser = useSelector((state: any) => state.user.errorGetUser);

  useEffect(() => {
    if (meId === id) {
      history.push(`${process.env.REACT_APP_ROUTE_ME}`);
    } else {
      dispatch(userAction.getUser({ userId: id }));
    }

    // clean data
    return () => {
      dispatch(userAction.cleanUser());
    };
  }, []);

  const onRequestFriend = () => {
    dispatch(userAction.requestFriend({ body: { user: id } }));
  };

  const onRejectRequest = () => {
    dispatch(userAction.rejectFriend({ body: { user: id } }));
  };

  const onCancelRequest = () => {
    dispatch(userAction.cancelRequestFriend({ body: { user: id } }));
  };

  const onAcceptFriend = () => {
    dispatch(userAction.acceptFriend({ body: { user: id, avatar, fullName } }));
  };

  const onUnfriend = () => {
    dispatch(userAction.unFriend({ body: { user: id, avatar, fullName } }));
  };

  const menuConfirm = (
    <DropdownMenu arrow>
      <div
        className="profile-header-friend-accept-cancel"
        onClick={onRejectRequest}
      >
        Hủy lời mời
      </div>
    </DropdownMenu>
  );

  const menuAccept = (
    <DropdownMenu arrow>
      <div
        className="profile-header-friend-accept-cancel"
        onClick={onCancelRequest}
      >
        Hủy lời mời
      </div>
    </DropdownMenu>
  );

  const menuFriend = (
    <DropdownMenu arrow>
      <div className="profile-header-friend-dropdown-menu">
        <div
          className="profile-header-friend-dropdown-item "
          onClick={() => {}}
        >
          Yêu thích
        </div>
        <div
          className="profile-header-friend-dropdown-item "
          onClick={() => {}}
        >
          Ẩn thông tin
        </div>
        <div
          className="profile-header-friend-dropdown-item profile-header-friend-dropdown-unfriend"
          onClick={onUnfriend}
        >
          Hủy bạn bè
        </div>
      </div>
    </DropdownMenu>
  );

  return (
    <div className="wrap-profile">
      {errorGetUser ? (
        <div className="profile-empty">
          <img alt="" src={emptyUserImage} />
          <p>Không tìm thấy người dùng này</p>
        </div>
      ) : (
        <>
          {getUserLoading === true ? (
            <>
              {/* <Skeleton height={150} style={{ marginBottom: 24 }} />
            <Skeleton height={30} />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton /> */}
            </>
          ) : (
            <div className="profile">
              <div className="profile-banner"></div>
              <div className="profile-header">
                <div className="profile-info">
                  <div className="profile-avatar">
                    <ImageWithDefault
                      src={avatar}
                      className="profile-avatar-image"
                    />
                  </div>
                  <div className="profile-info-right">
                    <div className="profile-name">{fullName}</div>
                    <Tooltip title="Sao chép" placement="right">
                      <div
                        className="profile-id"
                        onClick={() => {
                          copy(_id);
                          message.success(`Đã sao chép ID: ${_id}`);
                        }}
                      >
                        (#{_id})
                      </div>
                    </Tooltip>
                  </div>
                </div>
                <div className="profile-header-menu">
                  {!requestFriend.includes(_id) && !friends.includes(_id) && (
                    <ButtonBasic
                      className="profile-header-friend-request"
                      onClick={onRequestFriend}
                    >
                      Yêu cầu kết bạn
                    </ButtonBasic>
                  )}
                  {requestFriend.includes(_id) && !friends.includes(_id) && (
                    <Dropdown
                      overlay={menuAccept}
                      placement="bottomCenter"
                      arrow
                    >
                      <ButtonBasic
                        className="profile-header-friend-request"
                        onClick={onRequestFriend}
                      >
                        Chờ đồng ý
                      </ButtonBasic>
                    </Dropdown>
                  )}
                  {receiveRequestFriend.includes(_id) && (
                    <Dropdown
                      overlay={menuConfirm}
                      placement="bottomCenter"
                      arrow
                    >
                      <ButtonBasic
                        className="profile-header-friend-accept"
                        onClick={onAcceptFriend}
                      >
                        Đồng ý kết bạn
                      </ButtonBasic>
                    </Dropdown>
                  )}
                  {friends.includes(_id) && (
                    <Dropdown
                      overlay={menuFriend}
                      trigger={["click"]}
                      placement="bottomRight"
                      arrow
                    >
                      <ButtonBasic className="profile-header-friend-dropdown">
                        Bạn bè
                      </ButtonBasic>
                    </Dropdown>
                  )}
                  <div className="profile-header-setting">
                    <BsThreeDotsVertical className="profile-header-setting-icon" />
                  </div>
                </div>
              </div>
              <div className="profile-body">
                <div className="profile-body-item">
                  <div className="profile-body-item-title">Email</div>
                  <div className="profile-body-item-value">***</div>
                </div>
                <div className="profile-body-item">
                  <div className="profile-body-item-title">Điện thoại</div>
                  <div className="profile-body-item-value">***</div>
                </div>
                <div className="profile-body-item ">
                  <div className="profile-body-item-title">Giới thiệu</div>
                  <div className="profile-body-item-value">{introduce}</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
