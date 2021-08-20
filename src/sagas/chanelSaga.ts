//@ts-nocheck

import { takeLatest, put, takeEvery } from "redux-saga/effects";

import * as chanelType from "@store/actionTypes/chanelType";
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

function* sendMessage(action: any) {
  yield put({
    type: chanelType.sendMessageStart,
  });
  try {
    const res = yield chanelService.sendMessage(action.payload.body);
    socketService.sendMessage(res.data);
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
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: chanelType.getMessagesFail,
    });
  }
}

function* socketSaga() {
  yield takeLatest(chanelType.getChanelRecent, getChanelRecent);
  yield takeLatest(chanelType.getChanel, getChanel);
  yield takeEvery(chanelType.sendMessage, sendMessage);
  yield takeLatest(chanelType.getMessages, getMessages);
}

export default socketSaga;
