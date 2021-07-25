//@ts-nocheck

import { takeLatest, put } from "redux-saga/effects";

import * as socketType from "@store/actionTypes/socketType";
import * as socketService from "@services/socketService";

function* socketConnect(action: any) {
  const {socketId,userId,socket} = action.payload;
  try {
    const res = yield socketService.socketConnect({socketId,userId});
    yield put({
      type: socketType.socketConnectSuccess,
      payload: socket,
    });
  } catch (error) {

  }
}


function* socketSaga() {
  yield takeLatest(socketType.socketConnect, socketConnect);
}

export default socketSaga;
