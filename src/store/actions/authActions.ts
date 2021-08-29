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

export const updateProfile = (payload: any) => {
  return {
    type: actions.updateProfile,
    payload,
  };
};

export const updateAvatar = (payload: any) => {
  return {
    type: actions.updateAvatar,
    payload,
  };
};

export const receiveRequestFriend = (payload: any) => {
  return {
    type: actions.receiveRequestFriend,
    payload,
  };
};

export const rejectRequestFriend = (payload: any) => {
  return {
    type: actions.rejectRequestFriend,
    payload,
  };
};

export const cancelRequestFriend = (payload: any) => {
  return {
    type: actions.cancelRequestFriend,
    payload,
  };
};

export const acceptFriend = (payload: any) => {
  return {
    type: actions.acceptFriend,
    payload,
  };
};

export const unFriend = (payload: any) => {
  return {
    type: actions.unFriend,
    payload,
  };
};

export const receiveMessage = (payload: any) => {
  return {
    type: actions.receiveMessage,
    payload,
  };
};

export const seenMessage = (payload: any) => {
  return {
    type: actions.seenMessage,
    payload,
  };
};

export const addChanel = (payload: any) => {
  return {
    type: actions.addChanel,
    payload,
  };
};
