import React, { useMemo } from "react";
import ReactPlayer from "react-player";
import { BsFileEarmarkText } from "react-icons/bs";
import {
  RiFileExcel2Fill,
  RiFileWord2Fill,
  RiFilePpt2Fill,
} from "react-icons/ri";
import { saveAs } from "file-saver";
import AudioPlayer from "react-h5-audio-player";

import "./messageAttachment.scss";
import ImageCheckError from "@components/ImageCheckError/ImageCheckError";

type PropTypes = {
  attachments: any;
  isMe: boolean;
};

const MessageAttachment = (props: PropTypes) => {
  const { attachments, isMe } = props;

  const imageAtt = attachments.filter((att: any) => att.type.includes("image"));
  const videoAtt = attachments.filter((att: any) => att.type.includes("video"));
  const audioAtt = attachments.filter((att: any) => att.type.includes("audio"));
  const otherAtt = attachments.filter(
    (att: any) =>
      !att.type.includes("image") &&
      !att.type.includes("video") &&
      !att.type.includes("audio")
  );

  const onDownloadOtherFile = (url: string, name: string) => () => {
    saveAs(url, name);
  };

  return (
    <>
      {useMemo(
        () => (
          <div className="message-attachment-wrap">
            {imageAtt.length > 0 && (
              <div
                className={`message-attachment-image ${
                  isMe
                    ? "message-attachment-image--right"
                    : "message-attachment-image--left"
                } `}
              >
                {imageAtt.map((img: any) => (
                  <ImageCheckError
                    className={`message-attachment-image-item message-attachment-image-item-${
                      imageAtt.length === 1
                        ? "1"
                        : imageAtt.length === 2
                        ? "2"
                        : "3"
                    }`}
                    isLazy={true}
                    src={img.url}
                    key={img.url}
                    styleReplace={{
                      height:
                        imageAtt.length === 1
                          ? Math.ceil(
                              (img.dimension?.height * 372) /
                                img.dimension?.width
                            ) || 0
                          : imageAtt.length === 2
                          ? 186
                          : 124,
                      width:
                        imageAtt.length === 1
                          ? 372
                          : imageAtt.length === 2
                          ? 186
                          : 124,
                    }}
                  />
                ))}
              </div>
            )}
            {videoAtt.length > 0 && (
              <div
                className={`message-attachment-video ${
                  isMe
                    ? "message-attachment-video--right"
                    : "message-attachment-video--left"
                } `}
              >
                {videoAtt.map((video: any) => (
                  <ReactPlayer
                    key={video.url}
                    className="message-attachment-video-item"
                    url={video.url}
                    controls
                    width={372}
                    height={Math.ceil(
                      (video.dimension?.height * 372) / video.dimension?.width
                    )}
                  />
                ))}
              </div>
            )}
            {otherAtt.length > 0 && (
              <div
                className={`message-attachment-other ${
                  isMe
                    ? "message-attachment-other--right"
                    : "message-attachment-other--left"
                } `}
              >
                {otherAtt.map((file: any) => (
                  <div
                    className="message-attachment-file-item"
                    key={file.url || file.key}
                    style={{ marginBottom: otherAtt.length > 1 ? 4 : 0 }}
                    onClick={onDownloadOtherFile(file.url, file.name)}
                  >
                    {(file.type.includes("sheet") && (
                      <RiFileExcel2Fill className="message-attachment-file-item-icon message-attachment-file-item-icon--excel" />
                    )) ||
                      (file.type.includes("word") && (
                        <RiFileWord2Fill className="message-attachment-file-item-icon message-attachment-file-item-icon--word" />
                      )) ||
                      (file.type.includes("powerpoint") && (
                        <RiFilePpt2Fill className="message-attachment-file-item-icon message-attachment-file-item-icon--ppt" />
                      )) || (
                        <BsFileEarmarkText className="message-attachment-file-item-icon" />
                      )}

                    <div className="message-attachment-file-item-name">
                      {file.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {audioAtt.length > 0 && (
              <div
                className={`message-attachment-audio ${
                  isMe
                    ? "message-attachment-audio--right"
                    : "message-attachment-audio--left"
                } `}
              >
                <AudioPlayer
                  src={audioAtt[0].url}
                  showJumpControls={false}
                  layout="horizontal-reverse"
                  defaultCurrentTime={"00:00"}
                  defaultDuration={"00:00"}
                  timeFormat="mm:ss"
                />
              </div>
            )}
          </div>
        ),
        [attachments]
      )}
    </>
  );
};

export default MessageAttachment;
