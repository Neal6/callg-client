import { AnyAction } from "redux";

import * as actions from "@store/actionTypes/appType";

type appTypes = {
  splashLoading: boolean;
  history:any;
  loadingGlobal:boolean;
  redirectAuthUrl: string;
  prompt:boolean
};

const initState: appTypes = {
  splashLoading: true,
  history:{},
  loadingGlobal:false,
  prompt:false,
  redirectAuthUrl: "/"
};

const appReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case actions.splashLoadingDone:
      return { ...state, splashLoading: false };
    case actions.initHistoryRouter:
      return { ...state, history: action.payload };
    case actions.redirectAuthUrl:
      return { ...state, redirectAuthUrl: action.payload.pathname };
    case actions.loadingGlobalStart:
      return { ...state, loadingGlobal: true };
    case actions.loadingGlobalDone:
      return { ...state, loadingGlobal: false };
    case actions.promptShow:
      return { ...state, prompt: true };
    case actions.promptHide:
      return { ...state, prompt: false };
    default:
      return state;
  }
};

export default appReducer;
