//@ts-nocheck

import { takeLatest, put, takeEvery, select } from "redux-saga/effects";

import * as chanelType from "@store/actionTypes/chanelType";
import * as authType from "@store/actionTypes/authType";
import * as chanelService from "@services/chanelService";
import * as socketService from "@services/socketService";

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
        members: res.data.members.filter((mem: any) => mem.id != meId),
        chanel: res.data._id,
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
    yield put({
      type: authType.sendMessage,
      payload: { message: res.data },
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
  yield takeLatest(chanelType.getMessages, getMessages);
  yield takeLatest(chanelType.getMessagesMore, getMessagesMore);
  yield takeLatest(chanelType.getChanelMemberJoin, getChanelMemberJoin);
}

export default socketSaga;
