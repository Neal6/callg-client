import React from "react";

import "./mePassword.scss";
import ButtonBasic from "@components/ButtonBasic/ButtonBasic";
import InputTextBasic from "@components/InputTextBasic/InputTextBasic";

const MePassword = () => {
  return (
    <div className="me-form-password">
      <div className="me-form-password-title">Đổi mật khẩu</div>
      <div className="me-form-password-item">
        <span className="me-form-password-item-label">Mật khẩu mới</span>
        <InputTextBasic />
      </div>
      <div className="me-form-password-item">
        <span className="me-form-password-item-label">Nhập lại mật khẩu</span>
        <InputTextBasic />
      </div>
      <div className="me-form-password-buttons">
        <ButtonBasic className="me-form-password-reset">Cài lại</ButtonBasic>
        <ButtonBasic className="me-form-password-submit">
          Đổi mật khẩu
        </ButtonBasic>
      </div>
    </div>
  );
};

export default MePassword;
