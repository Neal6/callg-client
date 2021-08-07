import { AnyAction } from "redux";

import * as authType from "@store/actionTypes/authType";
import * as userType from "@store/actionTypes/userType";

type authTypes = {
  isLogin: boolean;
  errorLoginMessage: string;
  errorRegisterMessage: string;
};

const initState: authTypes = {
  isLogin: false,
  errorLoginMessage: "",
  errorRegisterMessage: "",
};

const authReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case authType.loginSuccess: {
      return {
        ...state,
        isLogin: true,
        errorLoginMessage: "",
        ...action.payload,
      };
    }
    case authType.loginFail: {
      return {
        ...state,
        errorLoginMessage: action.payload.message,
      };
    }
    case authType.registerSuccess: {
      return {
        ...state,
        isLogin: true,
        errorRegisterMessage: "",
        ...action.payload,
      };
    }
    case authType.registerFail: {
      return {
        ...state,
        errorRegisterMessage: action.payload.message,
      };
    }

    case authType.loginWithGoogleSuccess: {
      return {
        ...state,
        isLogin: true,
        errorLoginMessage: "",
        ...action.payload,
      };
    }
    case authType.loginWithMicrosoftSuccess: {
      return {
        ...state,
        isLogin: true,
        errorLoginMessage: "",
        ...action.payload,
      };
    }
    case authType.loginWithGithubSuccess: {
      return {
        ...state,
        isLogin: true,
        errorLoginMessage: "",
        ...action.payload,
      };
    }
    case authType.loginWithFacebookSuccess: {
      return {
        ...state,
        isLogin: true,
        errorLoginMessage: "",
        ...action.payload,
      };
    }
    case authType.updateProfileSuccess: {
      return {
        ...state,
        errorLoginMessage: "",
        ...action.payload,
      };
    }
    case authType.updateAvatarSuccess: {
      return {
        ...state,
        errorLoginMessage: "",
        ...action.payload,
      };
    }
    case userType.requestFriendSuccess:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default authReducer;
