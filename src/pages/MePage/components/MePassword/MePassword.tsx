import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import "./mePassword.scss";
import ButtonBasic from "@components/ButtonBasic/ButtonBasic";
import InputTextBasic from "@components/InputTextBasic/InputTextBasic";
import ButtonSubmit from "@components/ButtonSubmit/ButtonSubmit";
import * as authAction from "@store/actions/authActions";
import * as authType from "@store/actionTypes/authType";
import * as loadingAction from "@store/actions/loadingAction";
import { convertLoadingState } from "@utils/validate";

type formTypes = {
  newPassword: string;
  confirmPassword: string;
};

const MePassword = () => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state: any) => state.auth);
  const loadingUpdateProfile = useSelector((state: any) =>
    convertLoadingState(state.loading[authType.updateProfile])
  );
  const { register, handleSubmit, reset } = useForm<formTypes>();

  useEffect(() => {
    return () => {
      dispatch(loadingAction.loadingClean([authType.updateProfile]));
    };
  }, []);

  useEffect(() => {
    if (!loadingUpdateProfile) {
    }
  }, [loadingUpdateProfile]);

  const onSubmit = (data: any) => {
    dispatch(
      authAction.updateProfile({
        userId: _id,
        body: data,
      })
    );
  };

  const onReset = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="me-form-password">
        <div className="me-form-password-title">Đổi mật khẩu</div>
        <div className="me-form-password-item">
          <span className="me-form-password-item-label">Mật khẩu mới</span>
          <InputTextBasic {...register("newPassword")} />
        </div>
        <div className="me-form-password-item">
          <span className="me-form-password-item-label">Nhập lại mật khẩu</span>
          <InputTextBasic {...register("confirmPassword")} />
        </div>
        <div className="me-form-password-buttons">
          <ButtonBasic className="me-form-password-reset" onClick={onReset}>
            Đặt lại
          </ButtonBasic>
          <ButtonSubmit className="me-form-password-submit">
            Đổi mật khẩu
          </ButtonSubmit>
        </div>
      </div>
    </form>
  );
};

export default MePassword;
