import React from "react";
import { useSelector } from "react-redux";

import "./chanelLayoutItem.scss";
import ImageWithDefault from "@components/ImageWithDefault/ImageWithDefault";
import DotOnline from "@components/DotOnline/DotOnline";

type PropTypes = {
  chanel: any;
};

const ChanelLayoutItem = (props: PropTypes) => {
  const meId = useSelector((state: any) => state.auth._id);
  const { members, id, memberJoin } = props.chanel;
  const memberFriend = members.filter((mem: any) => mem.id !== meId)[0];
  return (
    <div className="chanel-layout-item ">
      <div className="chanel-layout-item-avatar">
        <ImageWithDefault src={memberFriend?.avatar} />
        <DotOnline
          className="chanel-layout-item-dot-status"
          isOnline={memberJoin.filter((mem: string) => mem !== meId).length > 0}
        />
      </div>
      <div className="chanel-layout-item-info">
        <div className="chanel-layout-item-name">{memberFriend?.name}</div>
        <div className="chanel-layout-item-last-message">
          Mai đi uống nước không bro
        </div>
      </div>
    </div>
  );
};

export default ChanelLayoutItem;
