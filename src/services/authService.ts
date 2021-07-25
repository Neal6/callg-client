import apiGlobal from "@configs/apiGlobal";
import * as authUrl from "@constants/apiUrl/auth";

export const login = (data: any) => {
  return apiGlobal.post(authUrl.login, data);
};

export const loginWithToken = () => {
  return apiGlobal.post(authUrl.loginWithToken);
};

export const register = (data: any) => {
  return apiGlobal.post(authUrl.register, data);
};

export const loginWithGoogle = (data: any) => {
  return apiGlobal.post(authUrl.loginWithGoogle, data);
};

export const loginWithMicrosoft = (data: any) => {
  return apiGlobal.post(authUrl.loginWithMicrosoft, data);
};

export const loginWithGithub = (data: any) => {
  return apiGlobal.post(authUrl.loginWithGithub, data);
};

export const loginWithFacebook = (data: any) => {
  return apiGlobal.post(authUrl.loginWithFacebook, data);
};
