import { all, fork } from "redux-saga/effects";

import authSaga from "@sagas/authSaga";
import socketSaga from "@sagas/socketSaga";
import userSaga from "@sagas/userSaga";

function* rootSaga() {
  yield all([fork(authSaga),fork(socketSaga),fork(userSaga)]);
}

export default rootSaga;
