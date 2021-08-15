//@ts-nocheck

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { CgArrowsExchangeAlt } from "react-icons/cg";

import "@pages/LoginPage/components/loginCard/loginCard.scss";
import InputTextBasic from "@components/InputTextBasic/InputTextBasic";
import InputPassword from "@components/InputPassword/InputPassword";
import ButtonSubmit from "@components/ButtonSubmit/ButtonSubmit";
import GoogleIcon from "@assets/images/icons/google-icon.png";
import MicrosoftIcon from "@assets/images/icons/microsoft-icon.png";
import GithubIcon from "@assets/images/icons/github-icon.png";
import FacebookIcon from "@assets/images/icons/facebook-icon.png";
import TextErrorValidate from "@components/TextErrorValidate/TextErrorValidate";
import * as actionAuth from "@store/actions/authActions";
import * as actionAuthType from "@store/actionTypes/authType";
import TextError from "@components/TextError/TextError";
import AzureAuthenticationContext from "@configs/azureAuthenticationContext";
import { loginWithGithub } from "@configs/loginWithGithub";
import { loginWithFacebook } from "@configs/loginWithFacebook";

interface IFormLogin {
  username: string;
  password: string;
}

const LoginCard = () => {
  const dispatch = useDispatch();
  const loadingLogin = useSelector(
    (state: any) => state.loading[actionAuthType.login]
  );
  const { errorLoginMessage } = useSelector((state: any) => state.auth);
  const [googleAuth, setGoogleAuth] = useState<any>();

  const authenticationModule: AzureAuthenticationContext =
    new AzureAuthenticationContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>();

  useEffect(() => {
    if (gapi) {
      gapi.load("auth2", () => {
        const auth2 = gapi.auth2.init({
          client_id:
            "289758838668-4r50lv7n2oifn4pmicpnvd0p728gk755.apps.googleusercontent.com",
        });
        setGoogleAuth(auth2);
      });
    }
  }, []);

  const onLogin = (data: any) => {
    dispatch(actionAuth.login({ data }));
  };

  const onLoginGoogle = async () => {
    try {
      const googleUser = await googleAuth.signIn({
        prompt: "select_account",
        ux_mode: "popup",
      });
      if (googleUser) {
        const basicUser = jwt_decode(googleUser.getAuthResponse().id_token);
        dispatch(
          actionAuth.loginWithGoogle({
            firstName: basicUser.given_name,
            lastName: basicUser.family_name,
            fullName: basicUser.name,
            avatar: basicUser.picture,
            email: basicUser.email,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onLoginMicrosoft =
    (method: string): any =>
    () => {
      const ua = window.navigator.userAgent;
      const msie = ua.indexOf("MSIE ");
      const msie11 = ua.indexOf("Trident/");
      const isIE = msie > 0 || msie11 > 0;

      const typeName = "loginPopup";
      const logInType = isIE ? "loginRedirect" : typeName;

      // Azure Login
      authenticationModule.login(logInType, (microsoftUser: any) => {
        if (microsoftUser) {
          const firstName = microsoftUser.name.split(" ").slice(1).join(" ");
          const lastName = microsoftUser.name.split(" ")[0];
          const fullName = `${firstName} ${lastName}`;
          dispatch(
            actionAuth.loginWithMicrosoft({
              firstName,
              lastName,
              fullName,
              username: microsoftUser.username,
              email: microsoftUser.idTokenClaims.email,
            })
          );
        }
      });
    };

  const onLoginGithub = async () => {
    const res = await loginWithGithub({
      client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
      scope: "read:user",
    });
    dispatch(
      actionAuth.loginWithGithub({
        code: res.code,
        client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
        client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
      })
    );
  };

  const onLoginFacebook = async () => {
    const res = await loginWithFacebook({
      client_id: process.env.REACT_APP_FACEBOOK_CLIENT_ID,
      redirect_uri: "http://localhost:8002/login",
    });
    dispatch(
      actionAuth.loginWithFacebook({
        code: res.code,
        client_id: process.env.REACT_APP_FACEBOOK_CLIENT_ID,
        client_secret: process.env.REACT_APP_FACEBOOK_CLIENT_SECRET,
        redirect_uri: "http://localhost:8002/login",
      })
    );
  };

  return (
    <div className="login-card">
      <div className="login-card-oauth">
        <p className="login-card__title">Đăng nhập nhanh</p>
        <p className="login-card-sub-title">
          Tham gia nhanh bằng các tài khoản mạng xã hội khác
        </p>
        <div
          className="login-card-with"
          id="login-google"
          onClick={onLoginGoogle}
        >
          <img src={GoogleIcon} alt="" />
          <span>Đăng nhập bằng Google</span>
        </div>
        <div className="login-card-with" onClick={onLoginFacebook}>
          <img src={FacebookIcon} alt="" />
          <span>Đăng nhập bằng Facebook</span>
        </div>
        <div
          className="login-card-with"
          onClick={onLoginMicrosoft("loginPopup")}
        >
          <img src={MicrosoftIcon} alt="" />
          <span>Tiếp tục với Microsoft</span>
        </div>

        <div className="login-card-with" onClick={onLoginGithub}>
          <img src={GithubIcon} alt="" />
          <span>Tiếp tục với Github</span>
        </div>
      </div>
      <div className="login-card-line-center">
        <div className="login-card-line-button-icon">
          <CgArrowsExchangeAlt className="login-card-line-icon" />
        </div>
      </div>
      <form className="login-card-form" onSubmit={handleSubmit(onLogin)}>
        <p className="login-card-form-title">Email</p>
        <p className="login-card-form-sub-title">
          Sử dụng tài khoản email để đăng nhập
        </p>
        <TextError>{errorLoginMessage}</TextError>
        <InputTextBasic
          placeholder="abc@gmail.com"
          {...register("username", {
            required: true,
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          autoFocus={true}
          className="login-card__input-username"
        />
        {errors.username?.type === "required" && (
          <TextErrorValidate>Tài khoản không được để trống</TextErrorValidate>
        )}
        {errors.username?.type === "pattern" && (
          <TextErrorValidate>
            Tài khoản phải có định dạng email
          </TextErrorValidate>
        )}
        <InputPassword
          placeholder="Mật khẩu"
          {...register("password", { required: true })}
          className="login-card__input-password"
        />
        {errors.password?.type === "required" && (
          <TextErrorValidate>Mật khẩu không được để trống</TextErrorValidate>
        )}
        <ButtonSubmit disabled={loadingLogin} className="login-form-submit">
          {loadingLogin ? "Loading..." : "Đăng Nhập"}
        </ButtonSubmit>
        <Link className="login-card__register" to="/register">
          Chưa có tài khoản?
        </Link>
      </form>
    </div>
  );
};

export default LoginCard;
