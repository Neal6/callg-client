import { AnyAction } from "redux";

import * as actions from "@store/actionTypes/chanelType";

type appTypes = {
  chanelList: any;
};

const initState: appTypes = {
  chanelList: [],
};

const chanelReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case actions.addChanel: {
      const indexChanel = state.chanelList.findIndex(
        (chanel: any) => chanel.id === action.payload.id
      );
      if (indexChanel < 0) {
        return { ...state, chanelList: [action.payload, ...state.chanelList] };
      } else {
        return state;
      }
    }
    case actions.getChanelRecentSuccess: {
      return {
        ...state,
        chanelList: action.payload,
      };
    }
    case actions.joinChanel: {
      const { chanel, user } = action.payload;
      const indexChanel = state.chanelList.findIndex(
        (ch: any) => ch.id === chanel
      );
      if (indexChanel > -1) {
        let newChanelList = state.chanelList;
        const indexMemberJoin = state.chanelList[
          indexChanel
        ].memberJoin.indexOf(user._id);
        if (indexMemberJoin < 0) {
          newChanelList.splice(indexChanel, 1, {
            ...state.chanelList[indexChanel],
            memberJoin: [...state.chanelList[indexChanel].memberJoin, user._id],
          });
        }
        return {
          ...state,
          chanelList: [...newChanelList],
        };
      } else {
        return state;
      }
    }
    case actions.leaveChanel: {
      const { chanel, user } = action.payload;
      const indexChanel = state.chanelList.findIndex(
        (ch: any) => ch.id === chanel
      );
      if (indexChanel > -1) {
        let newChanelList = state.chanelList;
        const indexMemberJoin = state.chanelList[
          indexChanel
        ].memberJoin.indexOf(user._id);
        if (indexMemberJoin > -1) {
          let newMemberJoin = state.chanelList[indexChanel].memberJoin;
          newMemberJoin.splice(indexMemberJoin, 1);
          newChanelList.splice(indexChanel, 1, {
            ...state.chanelList[indexChanel],
            memberJoin: [...newMemberJoin],
          });
        }
        return {
          ...state,
          chanelList: [...newChanelList],
        };
      } else {
        return state;
      }
    }
    case actions.getChanelRecentSuccess: {
      return {
        ...state,
        chanelList: action.payload,
      };
    }
    default:
      return state;
  }
};

export default chanelReducer;
