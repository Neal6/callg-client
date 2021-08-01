import * as actions from "@store/actionTypes/appType";

export const splashLoadingDone =()=> {
 return {type: actions.splashLoadingDone}
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
export const initHistoryRouter = (history:any) => {
  return {
    type: actions.initHistoryRouter,
    payload:history
  };
};
