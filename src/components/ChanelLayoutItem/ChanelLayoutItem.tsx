import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "antd";

import "./chanelLayoutItem.scss";
import ImageWithDefault from "@components/ImageWithDefault/ImageWithDefault";
import DotOnline from "@components/DotOnline/DotOnline";
import * as chanelAction from "@store/actions/chanelAction";

type PropTypes = {
  chanel: any;
};

const ChanelLayoutItem = (props: PropTypes) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const meId = useSelector((state: any) => state.auth._id);
  const notSeenChanels = useSelector(
    (state: any) => state.auth.notSeenChanels || []
  );
  const { members, _id, memberJoin, lastMessage, typingMember } = props.chanel;
  const memberFriend = members.filter((mem: any) => mem._id !== meId)[0];

  const chanelNotSeen = notSeenChanels.find((item: any) => item.chanel == _id);

  return (
    <Link to={`${process.env.REACT_APP_ROUTE_CHANEL}/${_id}`}>
      <div
        className={`chanel-layout-item ${
          location.pathname.includes(_id) ? "chanel-layout-item--active" : ""
        } `}
      >
        <div className="chanel-layout-item-avatar">
          <ImageWithDefault src={memberFriend?.avatar} />
          <DotOnline
            className="chanel-layout-item-dot-status"
            isOnline={
              memberJoin.filter((mem: string) => mem !== meId).length > 0
            }
          />
        </div>
        <div className="chanel-layout-item-info">
          <div
            className={`chanel-layout-item-name ${
              chanelNotSeen ? "chanel-layout-item-name--no-seen" : ""
            } `}
          >
            {memberFriend?.name}
          </div>
          <div
            className={`chanel-layout-item-last-message ${
              chanelNotSeen ? "chanel-layout-item-last-message--no-seen" : ""
            }`}
          >
            {typingMember?.length > 0 ? (
              <div className="dot-typing"></div>
            ) : (
              <span>
                {lastMessage?._id
                  ? lastMessage.sender === meId
                    ? `Bạn: ${
                        lastMessage.attachments.length > 0
                          ? "gửi một tệp tin"
                          : lastMessage.content
                      }`
                    : lastMessage.attachments.length > 0
                    ? "gửi một tệp tin"
                    : lastMessage.content
                  : "Hãy bắt đầu cuộc trò chuyện"}
              </span>
            )}
          </div>
        </div>
        {chanelNotSeen && (
          <div className="chanel-layout-item-not-seen">
            <div className="chanel-layout-item-not-seen-count">
              {chanelNotSeen?.count &&
                (chanelNotSeen.count > 9 ? "9+" : chanelNotSeen.count)}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ChanelLayoutItem;
