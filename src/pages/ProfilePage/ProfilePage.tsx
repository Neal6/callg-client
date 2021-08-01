import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Tooltip, message } from "antd";
import copy from "copy-to-clipboard";
import { BsThreeDotsVertical } from "react-icons/bs";

import "./profilePage.scss";
import * as userAction from "@store/actions/userActions";
import * as userType from "@store/actionTypes/userType";
import ButtonBasic from "@components/ButtonBasic/ButtonBasic";
import { convertLoadingState } from "@utils/validate";
import defaultAvatar from "@assets/images/others/defaultAvatar.png";

type paramTypes = {
  id: string;
};

const ProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams<paramTypes>();
  const meId = useSelector((state: any) => state.auth._id);
  const getUserLoading = useSelector((state: any) =>
    convertLoadingState(state.loading[userType.getUser])
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
  }, [id]);

  return (
    <div className="wrap-profile">
      {errorGetUser ? (
        <div>Không tìm thấy người này</div>
      ) : (
        <>
          {getUserLoading ? (
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
                    <img
                      src={avatar || defaultAvatar}
                      alt=""
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
                  <ButtonBasic>Yêu cầu kết bạn</ButtonBasic>
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
