import * as actions from "@store/actionTypes/socketType";

export const socketConnect = (payload: any) => {
    return {
      type: actions.socketConnect,
      payload,
    };
  };