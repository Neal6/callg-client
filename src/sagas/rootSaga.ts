import { all, fork } from "redux-saga/effects";

import authSaga from "@sagas/authSaga";
import socketSaga from "@sagas/socketSaga";

function* rootSaga() {
  yield all([fork(authSaga),fork(socketSaga)]);
}

export default rootSaga;
