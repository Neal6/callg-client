import { combineReducers } from "redux";

import { logout } from "@store/actionTypes/authType";
import appReducer from "@store/reducers/appReducer";
import authReducer from "@store/reducers/authReducer";
import loadingReducer from "@store/reducers/loadingReducer";
import socketReducer from "@store/reducers/socketReducer";
import userReducer from "@store/reducers/userReducer";
import chanelReducer from "@store/reducers/chanelReducer";

const combineReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  socketIo: socketReducer,
  user: userReducer,
  chanel: chanelReducer,
  loading: loadingReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === logout) {
    state = {
      app: {
        ...state.app,
        splashLoading: false,
        redirectAuthUrl: "/",
        loadingGlobal: false,
        prompt: false,
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
