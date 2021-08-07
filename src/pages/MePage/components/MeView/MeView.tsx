import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import copy from "copy-to-clipboard";
import { message } from "antd";
import { FiCamera } from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";
import { HiCheck } from "react-icons/hi";

import "./meView.scss";
import ButtonBasic from "@components/ButtonBasic/ButtonBasic";
import LineBreak from "@components/LineBreak/LineBreak";
import ModalCropImage from "@components/ModalCropImage/ModalCropImage";
import * as authAction from "@store/actions/authActions";
import * as authType from "@store/actionTypes/authType";
import * as loadingAction from "@store/actions/loadingAction";
import ImageWithDefault from "@components/ImageWithDefault/ImageWithDefault";

type PropTypes = {
  onChangeTab: any;
  tab: string;
};

const MeView = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { fullName, avatar, _id } = useSelector((state: any) => state.auth);
  const loadingUpdateAvatar = useSelector(
    (state: any) => state.loading[authType.updateAvatar]
  );
  const { onChangeTab, tab } = props;
  const [openCrop, setOpenCrop] = useState<boolean>(false);
  const [imageSelected, setImageSelected] = useState<any>();
  const [imageChanged, setImageChanged] = useState<any>();
  const avatarSelectRef = useRef<any>();

  useEffect(() => {
    return () => {
      dispatch(loadingAction.loadingClean([authType.updateAvatar]));
    };
  }, []);

  useEffect(() => {
    if (loadingUpdateAvatar === false) {
      setImageChanged(null);
    }
  }, [loadingUpdateAvatar]);

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

  const onUpdateAvatar = () => {
    dispatch(
      authAction.updateAvatar({
        userId: _id,
        body: {
          newAvatar: imageChanged,
        },
      })
    );
  };

  return (
    <>
      <div className="me-form-view">
        <div className="me-avatar">
          <ImageWithDefault src={imageChanged || avatar} />
          <label htmlFor="file-avatar" className="me-avatar-change">
            <span>Đổi Avatar</span>
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
        {imageChanged && (
          <div className="me-buttons-update-avatar">
            <ButtonBasic
              className="me-button-prev-avatar"
              onClick={() => {
                setImageChanged(null);
              }}
            >
              <IoMdTrash />
            </ButtonBasic>
            <ButtonBasic
              className="me-button-change-avatar"
              onClick={onUpdateAvatar}
            >
              <HiCheck />
            </ButtonBasic>
          </div>
        )}

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
        <LineBreak />
        <div className="me-view-menu">
          <div
            className={`me-view-menu-item ${
              tab === "edit" ? "me-view-menu-item--active" : ""
            } `}
            onClick={() => {
              onChangeTab("edit");
            }}
          >
            Thông tin cá nhân
          </div>
          <div
            className={`me-view-menu-item ${
              tab === "password" ? "me-view-menu-item--active" : ""
            } `}
            onClick={() => {
              onChangeTab("password");
            }}
          >
            Đổi mật khẩu
          </div>
        </div>
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
