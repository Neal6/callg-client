import React, { useRef, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { GoChevronDown } from "react-icons/go";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Avatar } from "antd";

import "./chanelContent.scss";
import emptyChanel from "@assets/images/svg/empty-online.svg";
import * as chanelAction from "@store/actions/chanelAction";
import * as chanelType from "@store/actionTypes/chanelType";
import * as authAction from "@store/actions/authActions";
import Message from "@components/Message/Message";

const ChanelContent = () => {
  const dispatch = useDispatch();
  const errorGetChanel = useSelector(
    (state: any) => state.chanel.errorGetChanel
  );
  const loadingGetMessages = useSelector(
    (state: any) => state.loading[chanelType.getMessages]
  );
  const loadingGetMessagesMore = useSelector(
    (state: any) => state.loading[chanelType.getMessagesMore]
  );
  const loadingGetChanel = useSelector(
    (state: any) => state.loading[chanelType.getChanel]
  );
  const loadingsendMessage = useSelector(
    (state: any) => state.loading[chanelType.sendMessage]
  );
  const messages = useSelector((state: any) => state.chanel.messages);
  const { members, loadMore } = useSelector(
    (state: any) => state.chanel.currentChanel
  );
  const meId = useSelector((state: any) => state.auth._id);
  const notSeenChanels = useSelector((state: any) => state.auth.notSeenChanels);
  const [pageSize, setPageSize] = useState<number>(50);
  const [isNewMessage, setIsNewMessage] = useState<boolean>(false);
  const [initScrollBottom, setInitScrollBottom] = useState<boolean>(false);
  const messageCount = useRef<number>(0);
  const isScrollRef = useRef<any>(false);
  const scrollRef = useRef<any>();
  const loadMoreRef = useRef<boolean>(false);
  const bodyMessageRef = useRef<any>();
  const lastScrollTopRef = useRef<any>(0);
  const { id } = useParams<any>();

  // detect height change
  useEffect(() => {
    const resize_ob: any = new ResizeObserver(function (entries: any) {
      if (!isScrollRef.current) {
        scrollToBottom();
      }
    });
    if (loadingGetMessages === false && initScrollBottom) {
      //@ts-ignore
      resize_ob?.observe(document?.getElementById("chanel-content-wrap"));
    }

    return () => {
      //@ts-ignore
      resize_ob.disconnect();
    };
  }, [loadingGetMessages, initScrollBottom]);

  useEffect(() => {
    setInitScrollBottom(false);
    dispatch(
      chanelAction.getMessages({
        body: { chanelId: id, dateBefore: moment().toISOString(), pageSize },
      })
    );

    return () => {
      dispatch(chanelAction.clearCurrentChanel());
    };
  }, [id]);

  useEffect(() => {
    if (loadingGetMessagesMore === true) {
      loadMoreRef.current = true;
    }
  }, [loadingGetMessagesMore]);

  const scrollToBottom = () => {
    document
      ?.getElementById("chanel-content-message-scroll-bottom")
      ?.scrollIntoView();
  };

  useEffect(() => {
    const onRightClick = (e: any) => {
      if (
        e.target.className.includes("message-content-text") ||
        e.target.className.includes("message-attachment") ||
        e.target.className.includes("message-content-embeds")
      ) {
      } else {
        e.preventDefault();
      }
    };
    if (loadingGetMessages === false || initScrollBottom) {
      scrollRef?.current?.addEventListener("contextmenu", onRightClick);
    }
    return () => {
      scrollRef?.current?.removeEventListener("contextmenu", onRightClick);
    };
  }, [loadingGetMessages, id]);

  useEffect(() => {
    if (loadingGetMessages === false) {
      seenMessage();
      new Promise((resolve) => {
        scrollToBottom();
        const checkScrollEnd = setInterval(() => {
          if (
            scrollRef.current.offsetHeight + scrollRef.current.scrollTop >=
            scrollRef.current.scrollHeight
          ) {
            clearInterval(checkScrollEnd);
            resolve(null);
          } else {
            scrollToBottom();
          }
        }, 100);
      }).then(() => {
        setInitScrollBottom(true);
      });
    }
  }, [loadingGetMessages]);
  useEffect(() => {
    if (loadingGetMessages === false || initScrollBottom) {
      scrollRef.current.addEventListener("click", onClickBodyMessage);
    }
    return () => {
      scrollRef?.current?.removeEventListener("click", onClickBodyMessage);
    };
  }, [loadingGetMessages, id, initScrollBottom, notSeenChanels]);

  useEffect(() => {
    if (loadingGetMessages === false) {
      scrollRef.current.addEventListener("scroll", onScroll);
    }
    return () => {
      lastScrollTopRef.current = 0;
      scrollRef?.current?.removeEventListener("scroll", onScroll);
    };
  }, [
    loadingGetMessages,
    loadingGetMessagesMore,
    loadMore,
    isNewMessage,
    id,
    initScrollBottom,
  ]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1] || {};
    if (
      initScrollBottom &&
      !loadMoreRef.current &&
      messageCount.current <= messages.length
    ) {
      onScrollBottomCondition();
    }
    if (loadMoreRef.current) {
      setTimeout(() => {
        loadMoreRef.current = false;
      }, 0);
    }
    if (
      initScrollBottom &&
      !loadMoreRef.current &&
      isScrollRef.current &&
      lastMessage.sender !== meId
    ) {
      setIsNewMessage(true);
    }
    messageCount.current = messages.length;
  }, [messages.length, initScrollBottom]);

  const onScroll = () => {
    if (
      scrollRef.current.scrollHeight -
        scrollRef.current.scrollTop -
        scrollRef.current.offsetHeight <=
        0 &&
      isScrollRef.current
    ) {
      isScrollRef.current = false;
      if (isNewMessage) {
        seenMessage();
      }
    } else if (
      scrollRef.current.scrollHeight -
        scrollRef.current.scrollTop -
        scrollRef.current.offsetHeight >
        0 &&
      !isScrollRef.current
    ) {
      isScrollRef.current = true;
    }

    // handle loadmore
    if (
      loadMore &&
      (scrollRef.current.scrollTop === 0 ||
        scrollRef.current.scrollTop <= 200) &&
      !loadingGetMessagesMore &&
      messages.length >= pageSize &&
      scrollRef.current.scrollTop < lastScrollTopRef.current
    ) {
      dispatch(
        chanelAction.getMessagesMore({
          body: { chanelId: id, dateBefore: messages[0].createdAt, pageSize },
        })
      );
    }
    lastScrollTopRef.current = scrollRef.current.scrollTop;
  };

  const seenMessage = () => {
    setIsNewMessage(false);
    if (notSeenChanels.find((ch: any) => ch.chanel == id)) {
      dispatch(
        authAction.seenMessage({
          body: { chanelId: id },
        })
      );
    }
  };

  const onClickBodyMessage = () => {
    seenMessage();
  };

  const onScrollBottomCondition = () => {
    const lastMessage = messages[messages.length - 1] || {};
    const isScrollTopBottom =
      (lastMessage.sender === meId || !isScrollRef.current) &&
      !loadMoreRef.current &&
      scrollRef.current.offsetHeight + scrollRef.current.scrollTop <
        scrollRef.current.scrollHeight;
    if (isScrollTopBottom) {
      scrollToBottom();
    }
  };

  const renderMessage = () => {
    return messages.map((mes: any, index: number, arr: any) => (
      <Message
        key={mes._id}
        message={mes}
        members={members}
        withAvatar={mes.sender !== messages[index - 1]?.sender}
        onScrollToBottom={onScrollBottomCondition}
        lastMessage={index === arr.length - 1}
      />
    ));
  };

  const onClickNewMessage = () => {
    scrollToBottom();
    seenMessage();
  };
  return (
    <div className="chanel-content-wrap" id="chanel-content-wrap">
      {loadingGetMessagesMore === true && (
        <div className="chanel-content-load-more">
          <AiOutlineLoading3Quarters className="chanel-content-load-more-icon" />
        </div>
      )}

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
                ref={bodyMessageRef}
              >
                {renderMessage()}

                <div id="chanel-content-message-scroll-bottom"></div>
              </div>
            )}
          </>
        )}
      </div>
      {isNewMessage && (
        <div className="chanel-content-new-message" onClick={onClickNewMessage}>
          {notSeenChanels?.find((ch: any) => ch.chanel == id)?.count || ""} tin
          nhắn mới <GoChevronDown />
        </div>
      )}
    </div>
  );
};

export default ChanelContent;
