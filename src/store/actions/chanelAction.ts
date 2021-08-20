import * as actions from "@store/actionTypes/chanelType";

type payloadType = {
  body?: any;
};

export const getChanelRevent = (payload: payloadType) => {
  return { type: actions.getChanelRecent, payload: payload };
};

export const addChanel = (payload: payloadType) => {
  return { type: actions.addChanel, payload: payload.body };
};

export const getChanel = (payload: payloadType) => {
  return { type: actions.getChanel, payload: payload.body };
};

export const getMessages = (payload: payloadType) => {
  return { type: actions.getMessages, payload: payload.body };
};

export const joinChanel = (payload: payloadType) => {
  return { type: actions.joinChanel, payload: payload.body };
};

export const leaveChanel = (payload: payloadType) => {
  return { type: actions.leaveChanel, payload: payload.body };
};

export const sendMessage = (payload: payloadType) => {
  return { type: actions.sendMessage, payload: payload };
};

export const reciveMessage = (payload: payloadType) => {
  return { type: actions.recieveMessage, payload: payload.body };
};
