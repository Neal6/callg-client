import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router";
import { CgPhone, CgBoard } from "react-icons/cg";
import { BsCameraVideoFill } from "react-icons/bs";
import { TiUserAdd } from "react-icons/ti";
import { Tooltip } from "antd";

import "./chanelHeader.scss";
import * as chanelAction from "@store/actions/chanelAction";
import * as chanelType from "@store/actionTypes/chanelType";
import ImageWithDefault from "@components/ImageWithDefault/ImageWithDefault";
import DotOnline from "@components/DotOnline/DotOnline";

const ChanelHeader = () => {
  const dispatch = useDispatch();
  const { id } = useParams<any>();
  const loadingGetChanel = useSelector(
    (state: any) => state.loading[chanelType.getChanel]
  );
  const errorGetChanel = useSelector(
    (state: any) => state.chanel.errorGetChanel
  );
  const { _id: meId, avatar } = useSelector((state: any) => state.auth);
  const { members, memberJoin } = useSelector(
    (state: any) => state.chanel.currentChanel
  );
  const memberOthor = members?.filter((mem: any) => mem.id !== meId)[0] || {};
  const isOnline =
    memberJoin?.filter((mem: any) => mem !== meId)?.length > 0 || false;
  useEffect(() => {
    dispatch(chanelAction.getChanel({ body: id }));
  }, [id]);

  return (
    <div className="chanel-header">
      {loadingGetChanel === true ? (
        <div className="chanel-header-skeleton">
          <div className="chanel-header-skeleton-left">
            <Skeleton width={36} height={36} circle={true} />
            <div style={{ marginLeft: 8 }}>
              <Skeleton width={100} height={20} />
            </div>
          </div>
          <div className="chanel-header-skeleton-right">
            <div style={{ marginLeft: 8 }}>
              <Skeleton width={50} height={30} />
            </div>
            <div style={{ marginLeft: 8 }}>
              <Skeleton width={50} height={30} />
            </div>
            <div style={{ marginLeft: 8 }}>
              <Skeleton width={50} height={30} />
            </div>
            <div style={{ marginLeft: 8 }}>
              <Skeleton width={50} height={30} />
            </div>
          </div>
        </div>
      ) : (
        <>
          {errorGetChanel ? (
            <div>Không tìm thấy kênh chat này</div>
          ) : (
            <>
              <div className="chanel-header-member">
                <div className="chanel-header-member-info">
                  <ImageWithDefault
                    className="chanel-header-member-info-avatar"
                    src={memberOthor.avatar}
                  />
                  <DotOnline
                    className="chanel-header-member-info-dot"
                    isOnline={isOnline}
                  />
                </div>
                <div
                  className={`chanel-header-member-status ${
                    isOnline ? "chanel-header-member-status--active" : ""
                  } `}
                >
                  {isOnline ? "Trực tuyến" : "Ngoại tuyến"}
                </div>
              </div>
              <div className="chanel-header-menu">
                <Tooltip placement="bottom" title={"Bắt Đầu Cuộc Gọi Thoại"}>
                  <CgPhone className="chanel-header-menu-icon" />
                </Tooltip>
                <Tooltip placement="bottom" title={"Bắt Đầu Cuộc Gọi Video"}>
                  <BsCameraVideoFill className="chanel-header-menu-icon" />
                </Tooltip>
                <Tooltip placement="bottom" title={"Tạo Nhóm"}>
                  <TiUserAdd className="chanel-header-menu-icon" />
                </Tooltip>
                <Tooltip placement="bottom" title={"Mở Rộng"}>
                  <CgBoard className="chanel-header-menu-icon" />
                </Tooltip>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ChanelHeader;
