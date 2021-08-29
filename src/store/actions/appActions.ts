import * as actions from "@store/actionTypes/appType";

type payloadModalGlobal = {
  title: string;
  content: any;
};

export const splashLoadingDone = () => {
  return { type: actions.splashLoadingDone };
};
export const redirectAuthUrl = (pathname: string) => {
  return {
    type: actions.redirectAuthUrl,
    payload: {
      pathname,
    },
  };
};
export const showPrompt = () => {
  return {
    type: actions.promptShow,
  };
};
export const hidePrompt = () => {
  return {
    type: actions.promptHide,
  };
};
export const initHistoryRouter = (history: any) => {
  return {
    type: actions.initHistoryRouter,
    payload: history,
  };
};

export const playSoundMessage = () => {
  return {
    type: actions.playSoundMessage,
  };
};

export const stopSoundMessage = () => {
  return {
    type: actions.stopSoundMessage,
  };
};

export const showModalGlobal = (payload: payloadModalGlobal) => {
  return {
    type: actions.showModalGlobal,
    payload,
  };
};

export const hideModalGlobal = () => {
  return {
    type: actions.hideModalGlobal,
  };
};
