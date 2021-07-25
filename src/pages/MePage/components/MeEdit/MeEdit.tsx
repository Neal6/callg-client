import React from "react";
import { useSelector } from "react-redux";

import InputTextBasic from "@components/InputTextBasic/InputTextBasic";
import TextAreaBasic from "@components/TextAreaBasic/TextAreaBasic";
import "./meEdit.scss";
import ButtonBasic from "@components/ButtonBasic/ButtonBasic";

const MeEdit = () => {
  const {
    firstName,
    lastName,
    fullName,
    avatar,
    _id,
    email,
    phone,
    introduce,
  } = useSelector((state: any) => state.auth);
  return (
    <div className="me-form-edit">
      <div className="me-form-edit-title">Thông tin cá nhân</div>
      <div className="me-form-edit-item">
        <span className="me-form-edit-item-label">Tên</span>
        <InputTextBasic
          value={firstName}
          placeholder={firstName ? "" : "Chưa cập nhật"}
        />
      </div>
      <div className="me-form-edit-item">
        <span className="me-form-edit-item-label">Tên đệm</span>
        <InputTextBasic
          value={lastName}
          placeholder={lastName ? "" : "Chưa cập nhật"}
        />
      </div>
      <div className="me-form-edit-item">
        <span className="me-form-edit-item-label">Email</span>
        <InputTextBasic
          value={email}
          placeholder={email ? "" : "Chưa cập nhật"}
        />
      </div>
      <div className="me-form-edit-item">
        <span className="me-form-edit-item-label">Số điện thoại</span>
        <InputTextBasic
          value={phone}
          placeholder={phone ? "" : "Chưa cập nhật"}
        />
      </div>
      <div className="me-form-edit-item me-form-edit-item--full">
        <span className="me-form-edit-item-label">Giới thiệu</span>
        <TextAreaBasic
          // value={introduce}
          autoSize={{ minRows: 4, maxRows: 6 }}
          placeholder={introduce ? "" : "Chưa cập nhật"}
        />
      </div>
      <div className="me-form-edit-buttons">
        <ButtonBasic className="me-form-edit-reset">Cài lại</ButtonBasic>
        <ButtonBasic className="me-form-edit-submit">Lưu thay đổi</ButtonBasic>
      </div>
    </div>
  );
};

export default MeEdit;
