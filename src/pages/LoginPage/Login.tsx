import React from "react";

import "@pages/LoginPage/login.scss";
import LoginCard from "@pages/LoginPage/components/loginCard/LoginCard";
import Logo from "@assets/images/logos/logo-icon.png";

const Login = () => {
  return (
    <div className="login-wrap">
      {/* <div className="login-logo">
        <img src={Logo} alt="" />
      </div> */}
      <LoginCard />
      <div className="login-policy">
        <span>Chính sách Riêng tư</span>
        <span className="login-policy__dot">&middot;</span>
        <span>Điều khoản dịch vụ</span>
      </div>
      <div className="login-address-footer">
        Task Manage © 2021, Số 1 Ngõ 22 Lưu Xá Đức Giang Hoài Đức Hà Nội
      </div>
    </div>
  );
};

export default Login;
