import React from "react";
import { useSelector } from "react-redux";

import "@pages/RegisterPage/registerPage.scss";
import RegisterCard from "@pages/RegisterPage/components/registerCard/RegisterCard";
import * as authType from "@store/actionTypes/authType";
import loadingImage from "@assets/images/others/loadingLogin.jpg";

const RegisterPage = () => {
  const loadingRegister = useSelector(
    (state: any) => state.loading[authType.register]
  );
  return (
    <div className="register-wrap">
      {/* <div className="register-logo">
        <img src={Logo} alt="" />
      </div> */}
      {loadingRegister === true && (
        <div className="register-loading">
          <img className="register-loading-image" src={loadingImage} alt="" />
          <p className="register-loading-text">Chờ một chút nhé !!!</p>
        </div>
      )}
      <RegisterCard />
      <div className="register-policy">
        <span>Chính sách Riêng tư</span>
        <span className="register-policy__dot">&middot;</span>
        <span>Điều khoản dịch vụ</span>
      </div>
      <div className="register-address-footer">
        CallG © 2021, Số 1 Ngõ 22 Lưu Xá Đức Giang Hoài Đức Hà Nội
      </div>
    </div>
  );
};
export default RegisterPage;
