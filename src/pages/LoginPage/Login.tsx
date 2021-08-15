import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "@pages/LoginPage/login.scss";
import LoginCard from "@pages/LoginPage/components/loginCard/LoginCard";
import * as authType from "@store/actionTypes/authType";
import loadingImage from "@assets/images/others/loadingLogin.jpg";

const Login = () => {
  const history = useHistory();
  const isLogin = useSelector((state: any) => state.auth.isLogin);
  const loadingLogin = useSelector(
    (state: any) => state.loading[authType.login]
  );

  useEffect(() => {
    if (isLogin) {
      history.goBack();
    }
  }, []);
  return (
    <div className="login-wrap">
      {/* <div className="login-logo">
        <img src={Logo} alt="" />
      </div> */}
      {(loadingLogin === true || isLogin) && (
        <div className="login-loading">
          <img className="login-loading-image" src={loadingImage} alt="" />
          <p className="login-loading-text">Chờ một chút nhé !!!</p>
        </div>
      )}
      <LoginCard />
      <div className="login-policy">
        <span>Chính sách Riêng tư</span>
        <span className="login-policy__dot">&middot;</span>
        <span>Điều khoản dịch vụ</span>
      </div>
      <div className="login-address-footer">
        CallG © 2021, Số 1 Ngõ 22 Lưu Xá Đức Giang Hoài Đức Hà Nội
      </div>
    </div>
  );
};

export default Login;
