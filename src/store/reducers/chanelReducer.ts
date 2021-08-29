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
      return {
        ...state,
        currentChanel: { ...state.currentChanel, ...action.payload },
        errorGetChanel: false,
      };
    }

    case actions.getChanelFail: {
      return { ...state, errorGetChanel: true };
    }

    case actions.getMessagesSuccess: {
      const { messages, pageSize } = action.payload;
      return {
        ...state,
        currentChanel: {
          ...state.currentChanel,
          loadMore: messages.length === pageSize,
        },
        messages: messages,
      };
    }

    case actions.getMessagesMoreSuccess: {
      const { messages, pageSize } = action.payload;
      return {
        ...state,
        currentChanel: {
          ...state.currentChanel,
          loadMore: messages.length === pageSize,
        },
        messages: [...messages, ...state.messages],
      };
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

      const chanelIndex = state.chanelList.findIndex(
        (chanel: any) => chanel.id == action.payload.message.chanelId
      );
      const newChanelList = state.chanelList;
      if (chanelIndex > -1) {
        const chanelDetail = state.chanelList[chanelIndex];
        newChanelList.splice(chanelIndex, 1);
        newChanelList.unshift({
          ...chanelDetail,
          lastMessage: action.payload.message,
        });
      }

      return {
        ...state,
        chanelList: [...newChanelList],
        messages: [...newMessages],
      };
    }

    case actions.recieveMessage: {
      const { body, chanelReive } = action.payload;
      const chanelIndex = state.chanelList.findIndex(
        (chanel: any) => chanel.id == body.chanelId
      );
      const newChanelList = state.chanelList;
      if (chanelIndex > -1) {
        const chanelDetail = state.chanelList[chanelIndex];
        newChanelList.splice(chanelIndex, 1);
        newChanelList.unshift({ ...chanelDetail, lastMessage: body });
      } else if (chanelReive.id) {
        newChanelList.unshift(chanelReive);
      }
      return {
        ...state,
        chanelList: [...newChanelList],
        messages: [...state.messages, body],
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

    case actions.typingMessage: {
      const { chanelId, user } = action.payload;
      const indexTypingCurrent =
        (state.currentChanel._id == chanelId &&
          state.currentChanel.typingMember &&
          state.currentChanel.typingMember.findIndex(
            (mem: any) => mem.id == user.id
          )) ||
        -2;
      const newTypingMem = state.currentChanel.typingMember || [];
      if (indexTypingCurrent == -1) {
        newTypingMem.push(user);
      }

      //chanel list
      const indexChanelList = state.chanelList.findIndex(
        (chanel: any) => chanel.id == chanelId
      );
      const newChanelList = state.chanelList;
      if (indexChanelList > -1) {
        const indexTypingChanelList =
          state.chanelList[indexChanelList].typingMember?.findIndex(
            (mem: any) => mem.id == user.id
          ) || -1;
        if (indexTypingChanelList == -1) {
          newChanelList[indexChanelList].typingMember = [
            ...(newChanelList[indexChanelList].typingMember || []),
            user,
          ];
        }
      }
      return {
        ...state,
        chanelList: [...newChanelList],
        currentChanel: {
          ...state.currentChanel,
          typingMember: [...newTypingMem],
        },
      };
    }

    case actions.stopTypingMessage: {
      const { chanelId, user } = action.payload;
      const indexTypingCurrent =
        state.currentChanel._id == chanelId &&
        state.currentChanel.typingMember &&
        state.currentChanel.typingMember.findIndex(
          (mem: any) => mem.id == user.id
        );
      const newTypingMem = state.currentChanel.typingMember || [];
      if (indexTypingCurrent > -1) {
        newTypingMem.splice(indexTypingCurrent, 1);
      }

      // chanel list
      const indexChanelList = state.chanelList.findIndex(
        (chanel: any) => chanel.id == chanelId
      );
      const newChanelList = state.chanelList;
      if (indexChanelList > -1) {
        const indexTypingChanelList = state.chanelList[
          indexChanelList
        ].typingMember?.findIndex((mem: any) => mem.id == user.id);
        if (indexTypingChanelList > -1) {
          newChanelList[indexChanelList].typingMember.splice(
            indexTypingChanelList,
            1
          );
        }
      }

      return {
        ...state,
        chanelList: [...newChanelList],
        currentChanel: {
          ...state.currentChanel,
          typingMember: [...newTypingMem],
        },
      };
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
    case actions.clearCurrentChanel: {
      return {
        ...state,
        currentChanel: {},
        messages: [],
        errorGetChanel: false,
      };
    }
    default:
      return state;
  }
};

export default chanelReducer;
