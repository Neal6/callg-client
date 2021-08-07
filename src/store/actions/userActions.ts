import * as actions from "@store/actionTypes/userType";

type payloadType = {
  body?: any;
  userId?: string;
};

export const updateUser = (payload: payloadType) => {
  return {
    type: actions.updateUser,
    payload,
  };
};

export const getUser = (payload: payloadType) => {
  return {
    type: actions.getUser,
    payload,
  };
};

export const searchUser = (payload: payloadType) => {
  return {
    type: actions.searchUser,
    payload,
  };
};

export const requestFriend = (payload: payloadType) => {
  return {
    type: actions.requestFriend,
    payload,
  };
};

export const cleanUser = () => {
  return {
    type: actions.cleanUser,
  };
};
