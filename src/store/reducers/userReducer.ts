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
    case userType.searchUserSuccess: {
      if (action.payload.page == 1) {
        return {
          ...state,
          users: action.payload.users,
          errorSearchUser: false,
        };
      } else {
        return {
          ...state,
          users: [...state.users, ...action.payload.users],
          errorSearchUser: false,
        };
      }
    }
    case userType.getFriendSuccess: {
      if (action.payload.page == 1) {
        return {
          ...state,
          users: action.payload.users,
        };
      } else {
        return {
          ...state,
          users: [...state.users, ...action.payload.users],
        };
      }
    }
    case userType.getFriendOnlineSuccess: {
      if (action.payload.page == 1) {
        return {
          ...state,
          users: action.payload.users,
        };
      } else {
        return {
          ...state,
          users: [...state.users, ...action.payload.users],
        };
      }
    }
    case userType.getRequestFriendSuccess: {
      if (action.payload.page == 1) {
        return {
          ...state,
          users: action.payload.users,
          errorSearchUser: false,
        };
      } else {
        return {
          ...state,
          users: [...state.users, ...action.payload.users],
          errorSearchUser: false,
        };
      }
    }
    case userType.getReceiveRequestFriendSuccess: {
      if (action.payload.page == 1) {
        return {
          ...state,
          users: action.payload.users,
          errorSearchUser: false,
        };
      } else {
        return {
          ...state,
          users: [...state.users, ...action.payload.users],
          errorSearchUser: false,
        };
      }
    }

    case userType.friendOnline: {
      const indexUser = state.users.findIndex(
        (user: any) => user.id === action.payload.body.id
      );
      if (indexUser > -1) {
        const newUsers = state.users;
        newUsers.splice(indexUser, 1, {
          ...state.users[indexUser],
          isOnline: true,
        });
        return {
          ...state,
          users: [...newUsers],
        };
      } else {
        const isPageOnline =
          window.location.pathname === process.env.REACT_APP_ROUTE_FRIEND;
        if (isPageOnline) {
          return {
            ...state,
            users: [{ ...action.payload.body, isOnline: true }, ...state.users],
          };
        }
        return state;
      }
    }

    case userType.friendOffline: {
      const indexUser = state.users.findIndex(
        (user: any) => user.id === action.payload.body.id
      );
      if (indexUser > -1) {
        const newUsers = state.users;
        const isPageOnline =
          window.location.pathname === process.env.REACT_APP_ROUTE_FRIEND;
        if (isPageOnline) {
          newUsers.splice(indexUser, 1);
        } else {
          newUsers.splice(indexUser, 1, {
            ...state.users[indexUser],
            isOnline: false,
          });
        }

        return {
          ...state,
          users: [...newUsers],
        };
      } else {
        return state;
      }
    }

    case userType.cleanUser:
      return initState;
    default:
      return state;
  }
};

export default userReducer;
