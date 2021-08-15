import { all, fork } from "redux-saga/effects";

import authSaga from "@sagas/authSaga";
import socketSaga from "@sagas/socketSaga";
import userSaga from "@sagas/userSaga";
import chanelSaga from "@sagas/chanelSaga";

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(socketSaga),
    fork(userSaga),
    fork(chanelSaga),
  ]);
}

export default rootSaga;
