//@ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import { Input, Tooltip, Dropdown } from "antd";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiPlusCircle } from "react-icons/hi";
import { IoImage, IoSend } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";
import { MdGif } from "react-icons/md";
import { TiAttachment, TiMicrophone } from "react-icons/ti";
import { BsCameraVideoFill } from "react-icons/bs";
import { BiSmile } from "react-icons/bi";
import { Picker } from "emoji-mart-virtualized";

import "./chanelForm.scss";
import DropdownMenu from "@components/DropdownMenu/DropdownMenu";
import useOnClickOutside from "@hooks/useOnClickOutside";
import * as appAction from "@store/actions/appActions";
import * as chanelType from "@store/actionTypes/chanelType";
import * as chanelAction from "@store/actions/chanelAction";

type formTypes = {
  message: string;
};

const ChanelForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams<any>();
  const errorGetChanel = useSelector(
    (state: any) => state.chanel.errorGetChanel
  );
  const loadingGetChanel = useSelector(
    (state: any) => state.loading[chanelType.getChanel]
  );
  const { members } = useSelector((state: any) => state.chanel.currentChanel);
  const meId = useSelector((state: any) => state.auth._id);
  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
    formState: { errors, isDirty },
  } = useForm<formTypes>();
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<any>(0);
  const emojiRef = useRef<any>();
  const inputTextRef = useRef<any>();
  useOnClickOutside(emojiRef, () => {
    if (showEmoji) {
      setShowEmoji(false);
    }
  });

  useEffect(() => {
    reset({
      message: "",
    });
  }, []);

  useEffect(() => {
    if (isDirty) {
      dispatch(appAction.showPrompt());
    } else {
      dispatch(appAction.hidePrompt());
    }
  }, [isDirty]);

  const menuLeft = (
    <DropdownMenu arrow={true}>
      <div className="chanel-form-menu-left-dropdown">
        <Tooltip placement="top" title={"Ảnh hoặc Video"}>
          <IoImage className="chanel-form-menu-left-dropdown-icon" />
        </Tooltip>
        <Tooltip placement="top" title={"Tag tên"}>
          <FaHashtag
            className="chanel-form-menu-left-dropdown-icon"
            style={{ padding: 8 }}
          />
        </Tooltip>
        <Tooltip placement="top" title={"Tệp GIF"}>
          <MdGif className="chanel-form-menu-left-dropdown-icon" />
        </Tooltip>
        <Tooltip placement="top" title={"Tệp tin đính kèm"}>
          <TiAttachment className="chanel-form-menu-left-dropdown-icon" />
        </Tooltip>
        <Tooltip placement="top" title={"Cuộc gọi trực tiếp"}>
          <BsCameraVideoFill className="chanel-form-menu-left-dropdown-icon" />
        </Tooltip>
        <Tooltip placement="top" title={"Gửi tin nhắn thoại"}>
          <TiMicrophone className="chanel-form-menu-left-dropdown-icon" />
        </Tooltip>
      </div>
    </DropdownMenu>
  );

  const onToggleEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  const onKeyDown = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
    setCursorPosition(e.target.selectionStart + 1);
  };

  const onClick = (e: any) => {
    if (typeof e.target === "object" && e.target !== null) {
      setCursorPosition(e.target.selectionStart);
    }
  };

  const onSubmit = (data: any) => {
    if (isDirty) {
      reset();
      dispatch(
        chanelAction.sendMessage({
          body: {
            sender: meId,
            chanelId: id,
            content: data.message,
            attachments: [],
            reactions: [],
          },
          key: new Date().getTime(),
        })
      );
    }
  };

  const onSelectEmoji = (emoji: any) => {
    const message = getValues("message");
    const textCursorStart = message.substring(0, cursorPosition);
    const textCursorEnd = message.substring(cursorPosition);
    const newMessage = textCursorStart + emoji.native + textCursorEnd;
    setValue("message", newMessage, { shouldDirty: true });
    setShowEmoji(false);
    setCursorPosition(cursorPosition + 2);
  };

  return (
    <>
      {!errorGetChanel && loadingGetChanel === false && (
        <form onSubmit={handleSubmit(onSubmit)} className="chanel-form">
          <div className="chanel-form-menu-left">
            <Dropdown
              overlay={menuLeft}
              trigger={["click"]}
              placement="topLeft"
              arrow
            >
              <Tooltip placement="left" title={"Mục khác"}>
                <HiPlusCircle className="chanel-form-menu-left-icon" />
              </Tooltip>
            </Dropdown>
          </div>
          <Controller
            render={({ field }) => (
              <Input.TextArea
                {...field}
                bordered={false}
                onKeyDown={onKeyDown}
                autoSize={{ maxRows: 10 }}
                className="chanel-form-text"
                placeholder={`Hãy nhắn tới ${
                  members.filter((mem: any) => mem.id !== meId)[0]?.name
                }`}
                ref={inputTextRef}
                onClick={onClick}
              />
            )}
            name="message"
            control={control}
          />

          <div className="chanel-form-menu-right">
            <button className="chanel-form-menu-right-send" type="submit">
              <IoSend
                className={`chanel-form-menu-right-icon ${
                  !isDirty ? "chanel-form-menu-right-icon--disabled" : ""
                }`}
              />
            </button>
            <div className="chanel-form-menu-right-emoji">
              <BiSmile
                className="chanel-form-menu-right-icon"
                onClick={onToggleEmoji}
              />
              <div
                ref={emojiRef}
                className={`chanel-form-menu-right-emoji-picker ${
                  !showEmoji ? "chanel-form-menu-right-emoji-picker--hide" : ""
                }`}
              >
                <Picker
                  set={"facebook"}
                  showPreview={false}
                  showSkinTones={false}
                  onSelect={onSelectEmoji}
                  color="#000"
                  i18n={{
                    search: "Search",
                    clear: "Clear", // Accessible label on "clear" button
                    notfound: "No Emoji Found",
                    skintext: "Choose your default skin tone",
                    categories: {
                      search: "Search Results",
                      recent: "Frequently Used",
                      //@ts-ignore
                      smileys: "Smileys & Emotion",
                      people: "People & Body",
                      nature: "Animals & Nature",
                      foods: "Food & Drink",
                      activity: "Activity",
                      places: "Travel & Places",
                      objects: "Objects",
                      symbols: "Symbols",
                      flags: "Flags",
                      custom: "Custom",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ChanelForm;
