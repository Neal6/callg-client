import * as actions from "@store/actionTypes/appType";

export const splashLoadingDone = {
  type: actions.splashLoadingDone,
};
export const redirectAuthUrl = (pathname: string) => {
  return {
    type: actions.redirectAuthUrl,
    payload: {
      pathname,
    },
  };
};
