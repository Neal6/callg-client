import { AnyAction } from "redux";
import * as userType from "@store/actionTypes/userType";

type socketTypes = {
  profile: any;
  users: any;
  errorGetUser: boolean;
  errorSearchUser: boolean;
};

const initState: socketTypes = {
  profile: {},
  users: [],
  errorGetUser: false,
  errorSearchUser: false,
};

const userReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case userType.getUserSuccess:
      return { ...state, profile: action.payload, errorGetUser: false };
    case userType.getUserFail:
      return { ...state, errorGetUser: true };
    case userType.searchUserSuccess:
      return { ...state, users: action.payload, errorSearchUser: false };
    case userType.cleanUser:
      return initState;
    default:
      return state;
  }
};

export default userReducer;
