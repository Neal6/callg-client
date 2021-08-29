//@ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import { Input, Tooltip, Dropdown } from "antd";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiPlusCircle } from "react-icons/hi";
import { IoImage, IoSend, IoClose } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";
import { MdGif } from "react-icons/md";
import { BsFileEarmarkText } from "react-icons/bs";
import { TiAttachment, TiMicrophone, TiMediaPause } from "react-icons/ti";
import { CgSmileMouthOpen } from "react-icons/cg";
import { Picker } from "emoji-mart-virtualized";
import AudioPlayer from "react-h5-audio-player";
import ReactPlayer from "react-player";

import "./chanelForm.scss";
import DropdownMenu from "@components/DropdownMenu/DropdownMenu";
import useOnClickOutside from "@hooks/useOnClickOutside";
import * as chanelAction from "@store/actions/chanelAction";
import * as appActions from "@store/actions/appActions";
import * as socketService from "@services/socketService";
import * as fileConvert from "@utils/fileConvert";

type formTypes = {
  message: string;
  attachments: any;
};

const ChanelForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams<any>();
  const errorGetChanel = useSelector(
    (state: any) => state.chanel.errorGetChanel
  );

  const {
    _id: meId,
    avatar,
    fullName,
  } = useSelector((state: any) => state.auth);
  const {
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
    formState: { errors, isDirty },
  } = useForm<formTypes>({
    defaultValues: {
      message: "",
      attachments: null,
    },
  });
  const typingMember = useSelector(
    (state: any) => state.chanel.currentChanel.typingMember
  );
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [isVoiceRecord, setIsVoiceRecord] = useState<boolean>(false);
  const [timeRecord, setTimeRecord] = useState<number>(0);
  const [recordUrl, setRecordUrl] = useState<string>("");
  const [filePreview, setFilePreview] = useState<any>([]);

  const emojiRef = useRef<any>();
  const cursorPositionRef = useRef<any>();
  const inputTextRef = useRef<any>();
  const recordTimeRef = useRef<any>();
  const recordRef = useRef<any>();

  useOnClickOutside(emojiRef, () => {
    if (showEmoji) {
      setShowEmoji(false);
    }
  });

  useEffect(() => {
    reset({
      message: "",
      attachments: null,
    });
  }, [id]);

  useEffect(() => {
    if (isDirty) {
      socketService.typingMessage({
        chanelId: id,
        user: { id: meId, avatar: avatar, name: fullName },
      });
    } else {
      socketService.stopTypingMessage({
        chanelId: id,
        user: { id: meId, avatar: avatar, name: fullName },
      });
    }
  }, [isDirty, id]);

  const onVoiceMessage = async () => {
    if (navigator.mediaDevices) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        recordRef.current = mediaRecorder;
        setIsVoiceRecord(true);
        mediaRecorder.start();
        recordTimeRef.current = setInterval(() => {
          setTimeRecord((prevState) => prevState + 1);
        }, 1000);

        mediaRecorder.ondataavailable = async function (e) {
          const audioURL = window.URL.createObjectURL(e.data);
          setRecordUrl(audioURL);
          const base64 = await fileConvert.toBase64(e.data);
          setValue(
            "attachments",
            [
              {
                type: e.data.type,
                size: e.data.size,
                base64,
              },
            ],
            { shouldDirty: true }
          );
        };
      } catch (error) {
        console.log(error);
      }
    }
  };

  const clearInputFile = () => {
    document.getElementById("chanel-form-file-image").value = "";
    document.getElementById("chanel-form-file-gif").value = "";
    document.getElementById("chanel-form-file").value = "";

    if (!/safari/i.test(navigator.userAgent)) {
      document.getElementById("chanel-form-file-image").type = "";
      document.getElementById("chanel-form-file-image").type = "file";

      document.getElementById("chanel-form-file-gif").type = "";
      document.getElementById("chanel-form-file-gif").type = "file";

      document.getElementById("chanel-form-file").type = "";
      document.getElementById("chanel-form-file").type = "file";
    }
  };

  const onChangeFileImport = async (e) => {
    try {
      const files = Array.from(e.target.files);
      const filterSizeFiles = files.filter(
        (f: any) => f.size < 5 * 1025 * 1024
      );
      if (filterSizeFiles.length < files.length) {
        dispatch(
          appActions.showModalGlobal({
            title: "Lỗi",
            content: <div>Tệp tin không được quá 5MB</div>,
          })
        );
      }
      const filesBase64 = await Promise.all(
        filterSizeFiles.map((file) => fileConvert.toBase64(file))
      );

      const filePreviewMap = [
        ...filePreview,
        ...filterSizeFiles.map((file: any, index: number) => ({
          key: new Date().getTime() + file.name,
          name: file.name,
          size: file.size,
          type: file.type,
          base64: filesBase64[index],
          url:
            file.type.includes("image") || file.type.includes("video")
              ? URL.createObjectURL(file)
              : "",
        })),
      ];

      setFilePreview(filePreviewMap);
      setValue("attachments", filePreviewMap, { shouldDirty: true });
      clearInputFile();
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveFileImport = (file: any) => () => {
    const filePreviewFilter = filePreview.filter((f) => f.key !== file);
    setFilePreview(filePreviewFilter);
    setValue(
      "attachments",
      filePreviewFilter.length > 0 ? filePreviewFilter : null,
      { shouldDirty: true }
    );
  };

  const menuLeft = (
    <DropdownMenu arrow={true}>
      <div className="chanel-form-menu-left-dropdown">
        <Tooltip placement="top" title={"Ảnh hoặc Video (nhỏ hơn 5MB)"}>
          <div className="chanel-form-menu-left-dropdown-item">
            <label htmlFor="chanel-form-file-image">
              <IoImage className="chanel-form-menu-left-dropdown-icon" />
            </label>
            <input
              multiple
              accept="image/jpeg, image/png, image/jpg, video/*"
              type="file"
              id="chanel-form-file-image"
              hidden
              onChange={onChangeFileImport}
            />
          </div>
        </Tooltip>
        <Tooltip placement="top" title={"Tag tên"}>
          <div className="chanel-form-menu-left-dropdown-item">
            <FaHashtag
              className="chanel-form-menu-left-dropdown-icon"
              style={{ padding: 8 }}
            />
          </div>
        </Tooltip>
        <Tooltip placement="top" title={"Tệp GIF"}>
          <div className="chanel-form-menu-left-dropdown-item">
            <label htmlFor="chanel-form-file-gif">
              <MdGif className="chanel-form-menu-left-dropdown-icon" />
            </label>
            <input
              multiple
              type="file"
              accept="image/gif, image/webp"
              id="chanel-form-file-gif"
              onChange={onChangeFileImport}
              hidden
            />
          </div>
        </Tooltip>
        <Tooltip placement="top" title={"Tệp tin đính kèm"}>
          <div className="chanel-form-menu-left-dropdown-item">
            <label htmlFor="chanel-form-file">
              <TiAttachment className="chanel-form-menu-left-dropdown-icon" />
            </label>
            <input
              type="file"
              id="chanel-form-file"
              multiple
              accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
              text/plain, application/pdf, .csv"
              onChange={onChangeFileImport}
              hidden
            />
          </div>
        </Tooltip>
        {/* <Tooltip placement="top" title={"Cuộc gọi trực tiếp"}>
          <div className="chanel-form-menu-left-dropdown-item">
            <BsCameraVideoFill className="chanel-form-menu-left-dropdown-icon" />
          </div>
        </Tooltip> */}
        <Tooltip placement="top" title={"Gửi tin nhắn thoại"}>
          <div className="chanel-form-menu-left-dropdown-item">
            <TiMicrophone
              className="chanel-form-menu-left-dropdown-icon"
              onClick={onVoiceMessage}
            />
          </div>
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
    cursorPositionRef.current = e.target.selectionStart + 1;
  };

  const onClick = (e: any) => {
    if (typeof e.target === "object" && e.target !== null) {
      cursorPositionRef.current = e.target.selectionStart;
    }
  };

  const onSubmit = (data: any) => {
    if (isDirty) {
      reset();
      resetRecord();
      setFilePreview([]);
      dispatch(
        chanelAction.sendMessage({
          body: {
            sender: meId,
            chanelId: id,
            content: data.message,
            attachments: data.attachments || [],
            reactions: [],
          },
          key: new Date().getTime(),
        })
      );
    }
  };

  const onSelectEmoji = (emoji: any) => {
    const message = getValues("message");
    const textCursorStart = message.substring(0, cursorPositionRef.current);
    const textCursorEnd = message.substring(cursorPositionRef.current);
    const newMessage = textCursorStart + emoji.native + textCursorEnd;
    setValue("message", newMessage, { shouldDirty: true });
    setShowEmoji(false);
    cursorPositionRef.current = cursorPositionRef.current + 2;
  };

  const renderTimeRecord = (time: number) => {
    let date = new Date(0);
    date.setSeconds(time);
    return date.toISOString().substr(14, 5);
  };

  const onStopRecord = () => {
    removeIconRecord();
    recordRef.current.stop();
    recordRef.current = null;
    clearInterval(recordTimeRef.current);
  };

  const resetRecord = () => {
    removeIconRecord();
    recordRef.current?.stop();
    recordRef.current = null;
    clearInterval(recordTimeRef.current);
    setTimeRecord(0);
    setIsVoiceRecord(false);
    setRecordUrl("");
    setValue("attachments", filePreview, { shouldDirty: true });
  };

  const removeIconRecord = () => {
    if (recordRef.current) {
      recordRef.current.stream.getAudioTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  return (
    <>
      {!errorGetChanel && (
        <form onSubmit={handleSubmit(onSubmit)} className="chanel-form">
          {isVoiceRecord ? (
            <div className="chanel-form-voice">
              <div className="chanel-form-voice-close" onClick={resetRecord}>
                <IoClose />
              </div>
              {recordUrl ? (
                <AudioPlayer
                  src={recordUrl}
                  preload="metadata"
                  showJumpControls={false}
                  showDownloadProgress={true}
                  showFilledProgress={false}
                  autoPlayAfterSrcChange={false}
                  layout="horizontal-reverse"
                  showFilledVolume={true}
                  hasDefaultKeyBindings={false}
                  customAdditionalControls={[]}
                  defaultCurrentTime={"00:00"}
                  defaultDuration={renderTimeRecord(timeRecord)}
                  timeFormat="mm:ss"
                />
              ) : (
                <div className="chanel-form-voice-audio-view">
                  <div
                    className="chanel-form-voice-audio-view-stop"
                    onClick={onStopRecord}
                  >
                    <TiMediaPause />
                  </div>

                  <div className="chanel-form-voice-audio-view-time">
                    {renderTimeRecord(timeRecord)}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {filePreview.length > 0 && (
                <div className="chanel-form-file-preivew">
                  {filePreview.map((file: any) => (
                    <div
                      className={`chanel-form-file-preivew-item ${
                        file.type.includes("video")
                          ? "chanel-form-file-preivew-item--video"
                          : ""
                      }`}
                      key={file.key}
                    >
                      {file.type.includes("image") && (
                        <img src={file.url} alt={file.name} />
                      )}
                      {file.type.includes("video") && (
                        <video height="60" src={file.url} />
                      )}
                      {!file.type.includes("image") &&
                        !file.type.includes("video") && (
                          <div className="chanel-form-file-preivew-item-file">
                            <BsFileEarmarkText className="chanel-form-file-preivew-item-file-icon" />
                            <div className="chanel-form-file-preivew-item-file-name">
                              {file.name}
                            </div>
                          </div>
                        )}
                      <div
                        className="chanel-form-file-preivew-item-close"
                        onClick={onRemoveFileImport(file.key)}
                      >
                        <IoClose />
                      </div>
                    </div>
                  ))}
                </div>
              )}

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
                    placeholder={`Hãy nhắn gì đó`}
                    ref={inputTextRef}
                    onClick={onClick}
                  />
                )}
                name="message"
                control={control}
              />
            </>
          )}

          <div className="chanel-form-menu-right">
            <button className="chanel-form-menu-right-send" type="submit">
              <IoSend
                className={`chanel-form-menu-right-icon ${
                  !isDirty ? "chanel-form-menu-right-icon--disabled" : ""
                }`}
              />
            </button>
            {!isVoiceRecord && (
              <div className="chanel-form-menu-right-emoji">
                <CgSmileMouthOpen
                  className="chanel-form-menu-right-icon"
                  onClick={onToggleEmoji}
                />
                <div
                  ref={emojiRef}
                  className={`chanel-form-menu-right-emoji-picker ${
                    !showEmoji
                      ? "chanel-form-menu-right-emoji-picker--hide"
                      : ""
                  }`}
                >
                  <Picker
                    set={"facebook"}
                    showPreview={false}
                    showSkinTones={false}
                    onSelect={onSelectEmoji}
                    color="#000"
                    emojiSize={28}
                    perLine={8}
                    i18n={{
                      categories: {
                        recent: "Gần đây",
                        smileys: "Mặt cười và biểu cảm",
                        people: "Người và cơ thể",
                        nature: "Động vật và thiên nhiên",
                        foods: "Đồ ăn và Nước uống",
                        activity: "Hoạt động",
                        places: "Đi lại và du lịch",
                        objects: "Đồ vật",
                        symbols: "Biểu tượng",
                        flags: "Cờ",
                      },
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </form>
      )}
      <div className="chanel-typing">
        {typingMember?.length > 0 && (
          <div className="chanel-typing-info">
            {typingMember.map((mem: any, index: number) => (
              <div key={mem.id}>
                <img
                  className="chanel-typing-info-avatar"
                  src={mem.avatar}
                  alt=""
                />
                <span className="chanel-typing-info-name">
                  {mem.name}
                  {index !== typingMember.length - 1 ? ", " : " "}
                </span>
              </div>
            ))}
            <span className="chanel-typing-info-text">đang nhập</span>

            <div className="dot-typing"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(ChanelForm);
