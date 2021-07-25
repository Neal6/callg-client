import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import copy from "copy-to-clipboard";
import { message } from "antd";
import { FiCamera } from "react-icons/fi";

import ButtonBasic from "@components/ButtonBasic/ButtonBasic";
import "./meView.scss";
import LineBreak from "@components/LineBreak/LineBreak";
import ModalCropImage from "@components/ModalCropImage/ModalCropImage";

type PropTypes = {
  onChangeTab: any;
};

const MeView = (props: PropTypes) => {
  const { fullName, avatar, _id } = useSelector((state: any) => state.auth);
  const { onChangeTab } = props;
  const [openCrop, setOpenCrop] = useState<boolean>(false);
  const [imageSelected, setImageSelected] = useState<any>();
  const [imageChanged, setImageChanged] = useState<any>();
  const avatarSelectRef = useRef<any>();

  const onShowCrop = () => {
    setOpenCrop(true);
  };
  const onHideCrop = () => {
    setOpenCrop(false);
  };

  const onCropDone = (croppedImage: any) => {
    setImageChanged(croppedImage);
    setOpenCrop(false);
  };

  const onSelectAvatar = async (e: any) => {
    let imageDataUrl = await readFile(e.target.files[0]);
    setImageSelected(imageDataUrl);
    setOpenCrop(true);
    avatarSelectRef.current.value = null;
  };

  const readFile = (file: any) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <div className="me-form-view">
        <div className="me-avatar">
          <img alt="" src={imageChanged || avatar} />
          <label htmlFor="file-avatar" className="me-avatar-change">
            <span>Thay Avatar</span>
            <FiCamera className="me-avatar-change-icon" />
            <input
              id="file-avatar"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={onSelectAvatar}
              ref={avatarSelectRef}
            />
          </label>
        </div>
        <div className="me-name">{fullName}</div>
        <div
          className="me-id"
          onClick={() => {
            copy(_id);
            message.success(`Đã sao chép ID: ${_id}`);
          }}
        >
          ID: {_id}
        </div>
        <ButtonBasic
          className="me-button-edit"
          onClick={() => {
            onChangeTab("edit");
          }}
        >
          Cập nhật
        </ButtonBasic>
        <LineBreak />
        <ButtonBasic
          className="me-button-change-password"
          onClick={() => {
            onChangeTab("password");
          }}
        >
          Đổi mật khẩu
        </ButtonBasic>
      </div>
      <ModalCropImage
        visible={openCrop}
        onCancel={onHideCrop}
        onCropDone={onCropDone}
        image={imageSelected}
      />
    </>
  );
};

export default MeView;
