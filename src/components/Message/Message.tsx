import React, { useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip, Dropdown } from "antd";
import moment from "moment";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsReplyFill } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";
import { CgTrash } from "react-icons/cg";
import Linkify from "react-linkify";

import "./message.scss";
import ImageWithDefault from "@components/ImageWithDefault/ImageWithDefault";
import ImageCheckError from "@components/ImageCheckError/ImageCheckError";
import MessageAttachment from "@components/MessageAttchment/MessageAttachment";
import * as chanelAction from "@store/actions/chanelAction";
import DropdownMenu from "@components/DropdownMenu/DropdownMenu";

type PropTypes = {
  message: any;
  members: any;
  withAvatar: boolean;
  onScrollToBottom: any;
  lastMessage: boolean;
};

const Message = (props: PropTypes) => {
  const dispatch = useDispatch();
  const {
    content,
    sender,
    createdAt,
    key,
    embeds,
    attachments,
    _id,
    chanelId,
  } = props.message;
  const { withAvatar, members, onScrollToBottom, lastMessage } = props;
  const {
    _id: meId,
    avatar,
    fullName,
  } = useSelector((state: any) => state.auth);
  const [visibleDropdownOther, setVisibleDropdownOther] =
    useState<boolean>(false);
  const senderDetail =
    meId === sender
      ? { _id: meId, avatar, name: fullName }
      : members?.find((mem: any) => mem._id === sender) || {};
  const textRef = useRef<any>();

  const onLoadImage = (error: boolean) => {
    if (lastMessage) {
      onScrollToBottom();
    }
  };

  const onEditMessage = () => {
    dispatch(chanelAction.editMessage({ body: props.message }));
  };

  const onDeleteMessage = () => {
    dispatch(chanelAction.deleteMessage({ body: { _id, chanelId } }));
  };

  const menuOther = (
    <DropdownMenu arrow={true}>
      {meId == sender && (
        <div
          className="message-dropdown-menu-other-item message-dropdown-menu-other-item--delete"
          onClick={onDeleteMessage}
        >
          <CgTrash /> Xóa tin nhắn
        </div>
      )}
    </DropdownMenu>
  );

  const onDropdownOtherChange = (visible: boolean) => {
    setVisibleDropdownOther(visible);
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

              <div
                className={`message-content-wrap ${
                  meId === sender
                    ? "message-content-wrap--right"
                    : "message-content-wrap--left"
                } ${key ? "message-content-wrap--preview" : ""} ${
                  embeds?.url ? "message-content-wrap--embeds" : ""
                } `}
              >
                {content && (
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
                )}

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
                        isLazy={false}
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
                {attachments && attachments.length > 0 && (
                  <MessageAttachment
                    attachments={attachments}
                    isMe={meId === sender}
                  />
                )}
              </div>

              <div
                className={`message-menu-wrap ${
                  visibleDropdownOther ? "message-menu-wrap--visible" : ""
                } `}
              >
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
                        <div
                          className="message-menu-icon"
                          onClick={onEditMessage}
                        >
                          <HiOutlinePencil />
                        </div>
                      </Tooltip>
                    )}
                    <Dropdown
                      overlay={menuOther}
                      trigger={["click"]}
                      placement="bottomRight"
                      arrow
                      onVisibleChange={onDropdownOtherChange}
                    >
                      <Tooltip placement="top" title={"Mục khác"}>
                        <div className="message-menu-icon">
                          <BiDotsVerticalRounded />
                        </div>
                      </Tooltip>
                    </Dropdown>

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
        [props.message, withAvatar, visibleDropdownOther]
      )}
    </>
  );
};

export default Message;
