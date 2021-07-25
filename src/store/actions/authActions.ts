import * as actions from "@store/actionTypes/authType";

export const login = (payload: any) => {
  return {
    type: actions.login,
    payload,
  };
};

export const loginWithToken = () => {
  return {
    type: actions.loginWithToken,
  };
};

export const register = (payload: any) => {
  return {
    type: actions.register,
    payload,
  };
};

export const loginWithGoogle = (payload: any) => {
  return {
    type: actions.loginWithGoogle,
    payload,
  };
};

export const loginWithMicrosoft = (payload: any) => {
  return {
    type: actions.loginWithMicrosoft,
    payload,
  };
};

export const loginWithGithub = (payload: any) => {
  return {
    type: actions.loginWithGithub,
    payload,
  };
};
export const loginWithFacebook = (payload: any) => {
  return {
    type: actions.loginWithFacebook,
    payload,
  };
};

export const logout = () => {
  return {
    type: actions.logout,
  };
};
