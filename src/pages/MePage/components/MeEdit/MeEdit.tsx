import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import InputTextBasic from "@components/InputTextBasic/InputTextBasic";
import TextAreaBasic from "@components/TextAreaBasic/TextAreaBasic";
import "./meEdit.scss";
import ButtonBasic from "@components/ButtonBasic/ButtonBasic";
import ButtonSubmit from "@components/ButtonSubmit/ButtonSubmit";
import TextErrorValidate from "@components/TextErrorValidate/TextErrorValidate";
import * as authAction from "@store/actions/authActions";
import * as appAction from "@store/actions/appActions";
import * as authType from "@store/actionTypes/authType";
import * as loadingAction from "@store/actions/loadingAction";
import { convertLoadingState } from "@utils/validate";

type formTypes = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  introduce: string;
};

const MeEdit = () => {
  const dispatch = useDispatch();
  const { firstName, lastName, email, phone, introduce, _id } = useSelector(
    (state: any) => state.auth
  );
  const loadingUpdateProfile = useSelector((state: any) =>
    convertLoadingState(state.loading[authType.updateProfile])
  );
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<formTypes>();

  useEffect(() => {
    reset({
      firstName,
      lastName,
      email,
      phone,
      introduce,
    });
  }, []);

  useEffect(() => {
    return () => {
      dispatch(loadingAction.loadingClean([authType.updateProfile]));
    };
  }, []);

  useEffect(() => {
    if (isDirty) {
      dispatch(appAction.showPrompt());
    } else {
      dispatch(appAction.hidePrompt());
    }
  }, [isDirty]);

  useEffect(() => {
    if (!loadingUpdateProfile) {
      reset({
        firstName,
        lastName,
        email,
        phone,
        introduce,
      });
    }
  }, [loadingUpdateProfile]);

  const onSubmit = (data: any) => {
    dispatch(
      authAction.updateProfile({
        userId: _id,
        body: {
          ...data,
          fullName: `${data.firstName} ${data.lastName}`,
        },
      })
    );
    dispatch(appAction.hidePrompt());
  };

  const onReset = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="me-form-edit">
        <div className="me-form-edit-title">Thông tin cá nhân</div>
        <div className="me-form-edit-item">
          <span className="me-form-edit-item-label">Tên</span>
          <InputTextBasic
            {...register("firstName")}
            placeholder={firstName ? "" : "Chưa cập nhật"}
          />
        </div>
        <div className="me-form-edit-item">
          <span className="me-form-edit-item-label">Tên đệm</span>
          <InputTextBasic
            {...register("lastName")}
            placeholder={lastName ? "" : "Chưa cập nhật"}
          />
        </div>
        <div className="me-form-edit-item">
          <span className="me-form-edit-item-label">Email</span>
          <InputTextBasic
            {...register("email", {
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            placeholder={email ? "" : "Chưa cập nhật"}
          />
          {errors.email?.type === "pattern" && (
            <TextErrorValidate>
              Tài khoản phải có định dạng email
            </TextErrorValidate>
          )}
        </div>
        <div className="me-form-edit-item">
          <span className="me-form-edit-item-label">Số điện thoại</span>
          <InputTextBasic
            {...register("phone")}
            placeholder={phone ? "" : "Chưa cập nhật"}
          />
        </div>
        <div className="me-form-edit-item me-form-edit-item--full">
          <span className="me-form-edit-item-label">Giới thiệu</span>
          <Controller
            render={({ field }) => (
              <TextAreaBasic
                autoSize={{ minRows: 4, maxRows: 6 }}
                placeholder={introduce ? "" : "Chưa cập nhật"}
                {...field}
              />
            )}
            name="introduce"
            control={control}
          />
        </div>
        <div className="me-form-edit-buttons">
          <ButtonBasic className="me-form-edit-reset" onClick={onReset}>
            Đặt lại
          </ButtonBasic>
          <ButtonSubmit className="me-form-edit-submit">
            Lưu thay đổi
          </ButtonSubmit>
        </div>
      </div>
    </form>
  );
};

export default MeEdit;
