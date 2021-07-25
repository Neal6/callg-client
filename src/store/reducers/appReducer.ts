import { AnyAction } from "redux";

import * as actions from "@store/actionTypes/appType";

type appTypes = {
  splashLoading: boolean;
  redirectAuthUrl: string;
};

const initState: appTypes = {
  splashLoading: true,
  redirectAuthUrl: "/",
};

const appReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case actions.splashLoadingDone:
      return { ...state, splashLoading: false };
    case actions.redirectAuthUrl:
      return { ...state, redirectAuthUrl: action.payload.pathname };
    default:
      return state;
  }
};

export default appReducer;
