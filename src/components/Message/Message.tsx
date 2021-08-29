import React, { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import moment from "moment";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsReplyFill } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";
import Linkify from "react-linkify";

import "./message.scss";
import ImageWithDefault from "@components/ImageWithDefault/ImageWithDefault";
import ImageCheckError from "@components/ImageCheckError/ImageCheckError";

type PropTypes = {
  message: any;
  members: any;
  withAvatar: boolean;
  onScrollToBottom: any;
  lastMessage: boolean;
};

const Message = (props: PropTypes) => {
  const { content, sender, createdAt, key, embeds } = props.message;
  const { withAvatar, members, onScrollToBottom, lastMessage } = props;
  const {
    _id: meId,
    avatar,
    fullName,
  } = useSelector((state: any) => state.auth);
  const senderDetail =
    meId === sender
      ? { id: meId, avatar, name: fullName }
      : members?.find((mem: any) => mem.id === sender) || {};
  const textRef = useRef<any>();

  const onLoadImage = (error: boolean) => {
    if (lastMessage) {
      onScrollToBottom();
    }
  };

  return (
    <>
      {useMemo(
        () => (
          <div className="message-wrap">
            <div
              className={`message ${
                meId === sender ? "message--right" : "message--left"
              }`}
            >
              {meId !== sender && (
                <div className="message-avatar">
                  {withAvatar && (
                    <Tooltip
                      placement={meId === sender ? "bottomRight" : "bottomLeft"}
                      title={senderDetail.name}
                    >
                      <Link
                        to={`${process.env.REACT_APP_ROUTE_PROFILE}/${sender}`}
                      >
                        <ImageWithDefault
                          className="message-avatar-image"
                          src={senderDetail.avatar}
                        />
                      </Link>
                    </Tooltip>
                  )}
                </div>
              )}

              {content && (
                <div
                  className={`message-content-wrap ${
                    meId === sender
                      ? "message-content-wrap--right"
                      : "message-content-wrap--left"
                  } ${key ? "message-content-wrap--preview" : ""} ${
                    embeds?.url ? "message-content-wrap--embeds" : ""
                  } `}
                >
                  <div className="message-content-text" ref={textRef}>
                    <div className="message-content-text-value">
                      <Linkify
                        componentDecorator={(
                          decoratedHref,
                          decoratedText,
                          key
                        ) => (
                          <a
                            target="blank"
                            className="linkify"
                            href={decoratedHref}
                            key={key}
                          >
                            {decoratedText}
                          </a>
                        )}
                      >
                        {content.trim()}
                      </Linkify>
                    </div>
                  </div>
                  {embeds?.url && (
                    <a href={embeds.url} target="_blank">
                      <div className="message-content-embeds">
                        <ImageCheckError
                          onLoad={onLoadImage}
                          className="message-content-embeds-image"
                          src={embeds.images[0]}
                          imageReplace={
                            embeds.favicons[0] ||
                            embeds.favicons[1] ||
                            embeds.favicons[2]
                          }
                          alt={embeds.description}
                        />
                        <div className="message-content-embeds-detail">
                          <div className="message-content-embeds-title">
                            {embeds.title}
                          </div>
                          <div className="message-content-embeds-name">
                            {embeds.siteName}
                          </div>
                          <div className="message-content-embeds-domain">
                            <ImageCheckError
                              className="message-content-embeds-favicon"
                              src={embeds.favicons[0]}
                            />
                            <span className="message-content-embeds-url">
                              {embeds?.url?.split("//")[1]?.split("/")[0]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  )}
                </div>
              )}

              <div className="message-menu-wrap">
                {!key && (
                  <div
                    className={`message-menu  ${
                      meId === sender
                        ? "message-menu--right"
                        : "message-menu--left"
                    }`}
                  >
                    <Tooltip placement="top" title={"Trả lời"}>
                      <div className="message-menu-icon">
                        <BsReplyFill
                          className={`${
                            meId === sender
                              ? "message-menu-icon-rep-right"
                              : "message-menu-icon-rep-left"
                          }`}
                        />
                      </div>
                    </Tooltip>
                    {meId === sender && (
                      <Tooltip placement="top" title={"Chỉnh sửa"}>
                        <div className="message-menu-icon">
                          <HiOutlinePencil />
                        </div>
                      </Tooltip>
                    )}
                    <Tooltip placement="top" title={"Mục khác"}>
                      <div className="message-menu-icon">
                        <BiDotsVerticalRounded />
                      </div>
                    </Tooltip>

                    <div
                      className={`message-time ${
                        meId === sender
                          ? "message-time--right"
                          : "message-time--left"
                      }`}
                    >
                      {moment(createdAt).format("HH:mm")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ),
        [props.message, withAvatar]
      )}
    </>
  );
};

export default Message;
