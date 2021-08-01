//@ts-nocheck

import { takeLatest, put } from "redux-saga/effects";

import * as userType from "@store/actionTypes/userType";
import * as userService from "@services/userService";

function* updateUser(action: any) {
  try {
    const res = yield userService.updateUser(action.payload);
    yield put({
      type: userType.updateUserSuccess,
      payload: res.data,
    });
  } catch (error) {

  }
}

function* getUser(action: any) {
  yield put({
    type: userType.getUserStart,
  });
  try {
    const res = yield userService.getUser(action.payload);
    yield put({
      type: userType.getUserSuccess,
      payload: res.data,
    });
  } catch (error) {
    yield put({
      type: userType.getUserFail,
    });
  }
}


function* userSaga() {
  yield takeLatest(userType.updateUser, updateUser);
  yield takeLatest(userType.getUser, getUser);
}

export default userSaga;
