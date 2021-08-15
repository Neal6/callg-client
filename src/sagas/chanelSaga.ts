//@ts-nocheck

import { takeLatest, put } from "redux-saga/effects";

import * as chanelType from "@store/actionTypes/chanelType";
import * as chanelService from "@services/chanelService";

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

function* socketSaga() {
  yield takeLatest(chanelType.getChanelRecent, getChanelRecent);
}

export default socketSaga;
