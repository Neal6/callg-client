//@ts-nocheck

import { takeLatest, put, takeEvery, select } from "redux-saga/effects";

import * as chanelType from "@store/actionTypes/chanelType";
import * as authType from "@store/actionTypes/authType";
import * as chanelService from "@services/chanelService";
import * as socketService from "@services/socketService";
import * as authAction from "@store/actions/authActions";

function* getChanelRecent(action: any) {
  yield put({
    type: chanelType.getChanelRecentStart,
  });
  try {
    const res = yield chanelService.getChanelRecent(action.payload);
    yield put({
      type: chanelType.getChanelRecentSuccess,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: chanelType.getChanelRecentFail,
    });
  }
}

function* getChanel(action: any) {
  yield put({
    type: chanelType.getChanelStart,
  });
  try {
    const res = yield chanelService.getChanel(action.payload);
    yield put({
      type: chanelType.getChanelSuccess,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: chanelType.getChanelFail,
    });
  }
}

function* getChanelMemberJoin(action: any) {
  yield put({
    type: chanelType.getChanelMemberJoinStart,
  });
  try {
    const res = yield chanelService.getChanelMemberJoin(action.payload.body);
    if (res.data.status === "pending") {
      const meId = yield select((state: any) => state.auth._id);
      socketService.addUnknownChanel({
        members: res.data.members.filter((mem: any) => mem._id != meId),
        chanel: res.data._id,
      });
      yield put({
        type: authType.addChanel,
        payload: { chanel: res.data._id },
      });
    }
    const history = yield select((state: any) => state.app.history);
    history.push(`${process.env.REACT_APP_ROUTE_CHANEL}/${res.data._id}`);
  } catch (error) {
    console.log(error);
    yield put({
      type: chanelType.getChanelMemberJoinFail,
    });
  }
}

function* sendMessage(action: any) {
  yield put({
    type: chanelType.sendMessageStart,
  });
  try {
    const res = yield chanelService.sendMessage(action.payload.body);
    socketService.sendMessage(res.data);

    // seen message
    yield put({
      type: authType.seenMessageSuccess,
      payload: { body: { chanelId: res.data.chanelId } },
    });
    yield put({
      type: chanelType.sendMessageSuccess,
      payload: { message: res.data, key: action.payload.key },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: chanelType.sendMessageFail,
    });
  }
}

function* updateMessage(action: any) {
  yield put({
    type: chanelType.updateMessageStart,
  });
  try {
    const res = yield chanelService.updateMessage(action.payload.body);
    socketService.updateMessage(res.data);
    yield put({
      type: chanelType.updateMessageSuccess,
      payload: { message: res.data, key: action.payload.key },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: chanelType.updateMessageFail,
    });
  }
}

function* deleteMessage(action: any) {
  try {
    const res = yield chanelService.deleteMessage(action.payload.body);
    socketService.deleteMessage(action.payload.body);
  } catch (error) {
    console.log(error);
    yield put({
      type: chanelType.deleteMessageFail,
    });
  }
}

function* getMessages(action: any) {
  yield put({
    type: chanelType.getMessagesStart,
  });
  try {
    const res = yield chanelService.getMessages(action.payload);
    yield put({
      type: chanelType.getMessagesSuccess,
      payload: { messages: res.data, pageSize: action.payload.pageSize },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: chanelType.getMessagesFail,
    });
  }
}

function* getMessagesMore(action: any) {
  yield put({
    type: chanelType.getMessagesMoreStart,
  });
  try {
    const res = yield chanelService.getMessages(action.payload);
    yield put({
      type: chanelType.getMessagesMoreSuccess,
      payload: { messages: res.data, pageSize: action.payload.pageSize },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: chanelType.getMessagesMoreFail,
    });
  }
}

function* socketSaga() {
  yield takeLatest(chanelType.getChanelRecent, getChanelRecent);
  yield takeLatest(chanelType.getChanel, getChanel);
  yield takeEvery(chanelType.sendMessage, sendMessage);
  yield takeEvery(chanelType.updateMessage, updateMessage);
  yield takeEvery(chanelType.deleteMessage, deleteMessage);
  yield takeLatest(chanelType.getMessages, getMessages);
  yield takeLatest(chanelType.getMessagesMore, getMessagesMore);
  yield takeLatest(chanelType.getChanelMemberJoin, getChanelMemberJoin);
}

export default socketSaga;
