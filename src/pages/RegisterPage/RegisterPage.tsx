import "@pages/RegisterPage/registerPage.scss";
import RegisterCard from "@pages/RegisterPage/components/registerCard/RegisterCard";
import Logo from "@assets/images/logos/logo-icon.png";

const RegisterPage = () => {
  return (
    <div className="register-wrap">
      {/* <div className="register-logo">
        <img src={Logo} alt="" />
      </div> */}
      <RegisterCard />
      <div className="register-policy">
        <span>Chính sách Riêng tư</span>
        <span className="register-policy__dot">&middot;</span>
        <span>Điều khoản dịch vụ</span>
      </div>
      <div className="register-address-footer">
        Task Manage © 2021, Số 1 Ngõ 22 Lưu Xá Đức Giang Hoài Đức Hà Nội
      </div>
    </div>
  );
};
export default RegisterPage;
