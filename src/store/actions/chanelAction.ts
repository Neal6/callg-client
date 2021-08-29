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

export const getChanelMemberJoin = (payload: payloadType) => {
  return { type: actions.getChanelMemberJoin, payload: payload };
};

export const getMessages = (payload: payloadType) => {
  return { type: actions.getMessages, payload: payload.body };
};

export const getMessagesMore = (payload: payloadType) => {
  return { type: actions.getMessagesMore, payload: payload.body };
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
  return { type: actions.recieveMessage, payload: payload };
};

export const typingMessage = (payload: payloadType) => {
  return { type: actions.typingMessage, payload: payload.body };
};

export const stopTypingMessage = (payload: payloadType) => {
  return { type: actions.stopTypingMessage, payload: payload.body };
};

export const clearCurrentChanel = () => {
  return { type: actions.clearCurrentChanel };
};
