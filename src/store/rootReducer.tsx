import { combineReducers } from "redux";

import { logout } from "@store/actionTypes/authType";
import appReducer from "@store/reducers/appReducer";
import authReducer from "@store/reducers/authReducer";
import loadingReducer from "@store/reducers/loadingReducer";
import socketReducer from "@store/reducers/socketReducer";

const combineReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  loading: loadingReducer,
  socketIo: socketReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === logout) {
    state = {
      app: {
        splashLoading: false,
        redirectAuthUrl: state.app.redirectAuthUrl,
      },
      auth: {
        isLogin: false,
        errorLoginMessage: "",
        errorRegisterMessage: "",
      },
    };
  }

  return combineReducer(state, action);
};

export default rootReducer;
