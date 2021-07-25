import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "@pages/RegisterPage/components/registerCard/registerCard.scss";
import InputTextBasic from "@components/InputTextBasic/InputTextBasic";
import InputPassword from "@components/InputPassword/InputPassword";
import ButtonSubmit from "@components/ButtonSubmit/ButtonSubmit";
import TextErrorValidate from "@components/TextErrorValidate/TextErrorValidate";
import * as actionAuth from "@store/actions/authActions";
import * as actionAuthType from "@store/actionTypes/authType";
import TextError from "@components/TextError/TextError";

const RegisterCard = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const loadingRegister = useSelector(
    (state: any) => state.loading[actionAuthType.register]
  );
  const { errorRegisterMessage } = useSelector((state: any) => state.auth);

  const onRegister = (data: any) => {
    dispatch(actionAuth.register({ data }));
  };

  return (
    <div className="register-card">
      <p className="register-card__title">Đăng ký</p>
      <TextError>{errorRegisterMessage}</TextError>
      <form onSubmit={handleSubmit(onRegister)} style={{ width: "100%" }}>
        <InputTextBasic
          name="username"
          placeholder="abc@gmail.com"
          ref={register({
            required: true,
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          autoFocus={true}
          className="register-card__input-username"
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
          name="password"
          placeholder="Mật khẩu"
          ref={register({ required: true })}
          className="register-card__input-password"
        />
        {errors.password?.type === "required" && (
          <TextErrorValidate>Mật khẩu không được để trống</TextErrorValidate>
        )}
        <ButtonSubmit
          style={{ width: "100%", marginTop: "1rem" }}
          disabled={loadingRegister}
        >
          {loadingRegister ? "Loading..." : "Đăng ký"}
        </ButtonSubmit>
      </form>
      <div className="register-card__hr-line"></div>
      <Link className="register-card__register" to="/login">
        Đã có tài khoản
      </Link>
    </div>
  );
};

export default RegisterCard;
