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

export const getFriend = (payload: payloadType) => {
  return {
    type: actions.getFriend,
    payload,
  };
};

export const getFriendOnline = (payload: payloadType) => {
  return {
    type: actions.getFriendOnline,
    payload,
  };
};

export const getRequestFriend = (payload: payloadType) => {
  return {
    type: actions.getRequestFriend,
    payload,
  };
};

export const getReceiveRequestFriend = (payload: payloadType) => {
  return {
    type: actions.getReceiveRequestFriend,
    payload,
  };
};

export const requestFriend = (payload: payloadType) => {
  return {
    type: actions.requestFriend,
    payload,
  };
};

export const rejectFriend = (payload: payloadType) => {
  return {
    type: actions.rejectFriend,
    payload,
  };
};

export const cancelRequestFriend = (payload: payloadType) => {
  return {
    type: actions.cancelRequestFriend,
    payload,
  };
};

export const acceptFriend = (payload: payloadType) => {
  return {
    type: actions.acceptFriend,
    payload,
  };
};

export const unFriend = (payload: payloadType) => {
  return {
    type: actions.unFriend,
    payload,
  };
};

export const friendOnline = (payload: payloadType) => {
  return {
    type: actions.friendOnline,
    payload,
  };
};

export const friendOffline = (payload: payloadType) => {
  return {
    type: actions.friendOffline,
    payload,
  };
};

export const cleanUser = () => {
  return {
    type: actions.cleanUser,
  };
};
