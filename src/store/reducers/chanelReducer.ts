import { AnyAction } from "redux";

import * as actions from "@store/actionTypes/chanelType";

type appTypes = {
  chanelList: any;
  currentChanel: any;
  messages: any;
  errorGetChanel: boolean;
};

const initState: appTypes = {
  chanelList: [],
  currentChanel: {},
  messages: [],
  errorGetChanel: false,
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

    case actions.getChanelSuccess: {
      return { ...state, currentChanel: action.payload, errorGetChanel: false };
    }

    case actions.getChanelFail: {
      return { ...state, errorGetChanel: true };
    }

    case actions.getMessagesSuccess: {
      return { ...state, messages: action.payload };
    }

    case actions.getChanelRecentSuccess: {
      return {
        ...state,
        chanelList: action.payload,
      };
    }

    case actions.sendMessage: {
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            ...action.payload.body,
            key: action.payload.key,
            _id: new Date().getTime(),
          },
        ],
      };
    }

    case actions.sendMessageSuccess: {
      const messagePreview = state.messages.findIndex(
        (mes: any) => mes.key === action.payload.key
      );
      const newMessages = state.messages;
      newMessages.splice(messagePreview, 1, action.payload.message);
      return {
        ...state,
        messages: [...newMessages],
      };
    }

    case actions.recieveMessage: {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    }

    case actions.joinChanel: {
      const { chanel, user } = action.payload;
      const indexChanel = state.chanelList.findIndex(
        (ch: any) => ch.id === chanel
      );
      const currentChanelFocus = state.currentChanel._id === chanel;
      const newMemberCurrentChanel = currentChanelFocus
        ? {
            ...state.currentChanel,
            memberJoin: [
              ...state.currentChanel.memberJoin.filter(
                (mem: any) => mem === user._id
              ),
              user._id,
            ],
          }
        : state.currentChanel;
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
          currentChanel: newMemberCurrentChanel,
        };
      } else {
        return {
          ...state,
          currentChanel: newMemberCurrentChanel,
        };
      }
    }
    case actions.leaveChanel: {
      const { chanel, user } = action.payload;
      const indexChanel = state.chanelList.findIndex(
        (ch: any) => ch.id === chanel
      );
      const currentChanelFocus = state.currentChanel._id === chanel;
      const newMemberCurrentChanel = currentChanelFocus
        ? {
            ...state.currentChanel,
            memberJoin: state.currentChanel.memberJoin.filter(
              (mem: any) => mem !== user._id
            ),
          }
        : state.currentChanel;
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
          currentChanel: newMemberCurrentChanel,
        };
      } else {
        return {
          ...state,
          currentChanel: newMemberCurrentChanel,
        };
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
