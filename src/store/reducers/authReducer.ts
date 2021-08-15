import { AnyAction } from "redux";

import * as authType from "@store/actionTypes/authType";
import * as userType from "@store/actionTypes/userType";

type authTypes = {
  isLogin: boolean;
  errorLoginMessage: string;
  errorRegisterMessage: string;
  receiveRequestFriend: any;
  requestFriend: any;
  friends: any;
  chanels: any;
};

const initState: authTypes = {
  isLogin: false,
  receiveRequestFriend: [],
  requestFriend: [],
  friends: [],
  chanels: [],
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
    case userType.rejectFriendSuccess:
      return { ...state, ...action.payload };
    case userType.cancelRequestFriendSuccess:
      return { ...state, ...action.payload };
    case userType.acceptFriendSuccess:
      return { ...state, ...action.payload };
    case userType.unFriendSuccess:
      return { ...state, ...action.payload };
    case authType.receiveRequestFriend:
      return {
        ...state,
        receiveRequestFriend: [...state.receiveRequestFriend, action.payload],
      };
    case authType.rejectRequestFriend: {
      const indexRequest = state.requestFriend.findIndex(
        (req: any) => req === action.payload
      );
      let newRequestFriend = state.requestFriend;
      newRequestFriend.splice(indexRequest, 1);
      return {
        ...state,
        requestFriend: [...newRequestFriend],
      };
    }
    case authType.cancelRequestFriend: {
      const indexReceive = state.receiveRequestFriend.findIndex(
        (req: any) => req === action.payload
      );
      let newReceiveRequestFriend = state.receiveRequestFriend;
      newReceiveRequestFriend.splice(indexReceive, 1);
      return {
        ...state,
        receiveRequestFriend: [...newReceiveRequestFriend],
      };
    }
    case authType.acceptFriend: {
      const indexRequest = state.requestFriend.findIndex(
        (req: any) => req === action.payload
      );
      let newRequestFriend = state.requestFriend;
      newRequestFriend.splice(indexRequest, 1);
      const indexReceive = state.receiveRequestFriend.findIndex(
        (req: any) => req === action.payload
      );
      let newReceiveRequestFriend = state.receiveRequestFriend;
      newReceiveRequestFriend.splice(indexReceive, 1);
      const indexChanel = state.chanels.findIndex(
        (req: any) => req === action.payload.chanel
      );
      let newChanels = state.chanels;
      newChanels.splice(indexChanel, 1);
      return {
        ...state,
        requestFriend: [...newRequestFriend],
        receiveRequestFriend: [...newReceiveRequestFriend],
        friends: [...state.friends, action.payload.friend],
        chanels: [action.payload.chanel, ...newChanels],
      };
    }

    case authType.unFriend: {
      const indexFriend = state.friends.findIndex(
        (fre: any) => fre === action.payload
      );
      let newFriends = state.friends;
      newFriends.splice(indexFriend, 1);
      return {
        ...state,
        friends: [...newFriends],
      };
    }

    default:
      return state;
  }
};

export default authReducer;
