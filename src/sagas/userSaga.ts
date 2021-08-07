//@ts-nocheck

import { takeLatest, put, select } from "redux-saga/effects";

import * as userType from "@store/actionTypes/userType";
import * as userService from "@services/userService";
import * as socketService from "@services/socketService";

function* updateUser(action: any) {
  try {
    const res = yield userService.updateUser(action.payload);

    yield put({
      type: userType.updateUserSuccess,
      payload: res.data,
    });
  } catch (error) {}
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

function* searchUser(action: any) {
  yield put({
    type: userType.searchUserStart,
  });
  try {
    const res = yield userService.searchUser(action.payload);
    const socket = yield select((state: any) => state.socketIo.socket);
    let checkConnect = yield new Promise((resolve) => {
      socket.emit(
        "connect-check",
        res.data.map((r) => r.id),
        (data) => {
          resolve(data);
        }
      );
    });
    yield put({
      type: userType.searchUserSuccess,
      payload: res.data.map((r) => ({ ...r, isOnline: !!checkConnect[r.id] })),
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: userType.searchUserFail,
    });
  }
}

function* requestFriend(action: any) {
  try {
    const res = yield userService.requestFriend(action.payload);
    socketService.requestFriend(action.payload.body.user);
    yield put({
      type: userType.requestFriendSuccess,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: userType.requestFriendFail,
    });
  }
}

function* userSaga() {
  yield takeLatest(userType.updateUser, updateUser);
  yield takeLatest(userType.getUser, getUser);
  yield takeLatest(userType.searchUser, searchUser);
  yield takeLatest(userType.requestFriend, requestFriend);
}

export default userSaga;
