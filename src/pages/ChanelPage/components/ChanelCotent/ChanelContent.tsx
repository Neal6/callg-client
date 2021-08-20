import React, { useRef, useEffect, useState, useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import "./chanelContent.scss";
import emptyChanel from "@assets/images/svg/empty-online.svg";
import * as chanelAction from "@store/actions/chanelAction";
import * as chanelType from "@store/actionTypes/chanelType";
import Message from "@components/Message/Message";

const ChanelContent = () => {
  const dispatch = useDispatch();
  const errorGetChanel = useSelector(
    (state: any) => state.chanel.errorGetChanel
  );
  const loadingGetMessages = useSelector(
    (state: any) => state.loading[chanelType.getMessages]
  );
  const loadingGetChanel = useSelector(
    (state: any) => state.loading[chanelType.getChanel]
  );
  const loadingsendMessage = useSelector(
    (state: any) => state.loading[chanelType.sendMessage]
  );
  const messages = useSelector((state: any) => state.chanel.messages);
  const { members } = useSelector((state: any) => state.chanel.currentChanel);
  const meId = useSelector((state: any) => state.auth._id);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [initScrollBottom, setInitScrollBottom] = useState<boolean>(false);
  const isScrollRef = useRef<any>(false);
  const scrollRef = useRef<any>();
  const { id } = useParams<any>();
  useEffect(() => {
    dispatch(
      chanelAction.getMessages({ body: { chanelId: id, page, pageSize } })
    );
    return () => {
      setInitScrollBottom(false);
    };
  }, [id]);

  const scrollToBottom = () => {
    document
      ?.getElementById("chanel-content-message-scroll-bottom")
      ?.scrollIntoView();
  };

  useEffect(() => {
    const onScroll = () => {
      if (
        scrollRef.current.scrollHeight -
          scrollRef.current.scrollTop -
          scrollRef.current.offsetHeight <=
          300 &&
        isScrollRef.current
      ) {
        isScrollRef.current = false;
      } else if (
        scrollRef.current.scrollHeight -
          scrollRef.current.scrollTop -
          scrollRef.current.offsetHeight >=
          300 &&
        !isScrollRef.current
      ) {
        isScrollRef.current = true;
      }
    };
    scrollRef.current.addEventListener("scroll", onScroll);
    if (loadingGetMessages === false) {
      scrollToBottom();
      setInitScrollBottom(true);
    }
    return () => {
      scrollRef?.current?.removeEventListener("scroll", onScroll);
    };
  }, [loadingGetMessages]);

  // listen scroll to bottom
  useEffect(() => {
    onScrollBottomCondition();
  }, [messages.length]);

  const onScrollBottomCondition = () => {
    const lastMessage = messages[messages.length - 1] || {};
    const isScrollTopBottom =
      lastMessage.sender === meId || !isScrollRef.current;

    if (isScrollTopBottom) {
      scrollToBottom();
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    }
  };

  const renderMessage = () => {
    return messages.map((mes: any, index: number) => (
      <Message
        key={mes._id}
        message={mes}
        members={members}
        withAvatar={mes.sender !== messages[index - 1]?.sender}
        onScrollToBottom={onScrollBottomCondition}
      />
    ));
  };

  return (
    <div className="chanel-content" ref={scrollRef}>
      {errorGetChanel ? (
        <div className="chanel-content-not-found">
          <img src={emptyChanel} alt="" />
        </div>
      ) : (
        <>
          {loadingGetMessages === true || loadingGetChanel === true ? (
            <div className="chanel-content-skeleton-wrap">
              <div className="chanel-content-skeleton chanel-content-skeleton--left">
                <Skeleton circle={true} height={50} width={50} />
                <div className="chanel-content-skeleton-message ">
                  <Skeleton height={120} width={300} />
                </div>
              </div>
              <div className="chanel-content-skeleton chanel-content-skeleton--right">
                <div className="chanel-content-skeleton-message chanel-content-skeleton-message-no-avatar">
                  <Skeleton height={50} width={500} />
                </div>
              </div>
              <div className="chanel-content-skeleton chanel-content-skeleton--right">
                <div className="chanel-content-skeleton-message chanel-content-skeleton-message-no-avatar">
                  <Skeleton height={50} width={400} />
                </div>
              </div>
              <div className="chanel-content-skeleton chanel-content-skeleton--right">
                <Skeleton circle={true} height={50} width={50} />
                <div className="chanel-content-skeleton-message ">
                  <Skeleton height={90} width={300} />
                </div>
              </div>
              <div className="chanel-content-skeleton chanel-content-skeleton--left">
                <div className="chanel-content-skeleton-message chanel-content-skeleton-message-no-avatar ">
                  <Skeleton height={50} width={400} />
                </div>
              </div>
              <div className="chanel-content-skeleton chanel-content-skeleton--left">
                <Skeleton circle={true} height={50} width={50} />
                <div className="chanel-content-skeleton-message ">
                  <Skeleton height={50} width={200} />
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`chanel-content-message-wrap ${
                initScrollBottom ? "chanel-content-message-wrap--active" : ""
              } `}
            >
              {renderMessage()}
              <div id="chanel-content-message-scroll-bottom"></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChanelContent;
