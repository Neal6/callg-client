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

export const joinChanel = (payload: payloadType) => {
  return { type: actions.joinChanel, payload: payload.body };
};

export const leaveChanel = (payload: payloadType) => {
  return { type: actions.leaveChanel, payload: payload.body };
};
