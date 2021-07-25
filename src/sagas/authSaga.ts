//@ts-nocheck

import { takeLatest, put } from "redux-saga/effects";

import * as actionAuthType from "@store/actionTypes/authType";
import * as authService from "@services/authService";
import * as localStorage from "@utils/localStorage";

function* login(action: any) {
  yield put({ type: actionAuthType.loginStart });
  try {
    const loginRes = yield authService.login(action.payload.data);
    yield put({
      type: actionAuthType.loginSuccess,
      payload: loginRes.data.user,
    });
    localStorage.setItem("access_token", loginRes.data.user.access_token);
    localStorage.setItem("refresh_token", loginRes.data.user.refresh_token);
  } catch (error) {
    yield put({
      type: actionAuthType.loginFail,
      payload: { message: error.response.data.message },
    });
  }
}

function* loginWithToken(action: any) {
  try {
    const loginRes = yield authService.loginWithToken();
    yield put({
      type: actionAuthType.loginSuccess,
      payload: loginRes.data.user,
    });
  } catch (error) {}
}

function* register(action: any) {
  yield put({ type: actionAuthType.registerStart });
  try {
    const registerRes = yield authService.register(action.payload.data);
    yield put({
      type: actionAuthType.registerSuccess,
      payload: registerRes.data.user,
    });
    localStorage.setItem("access_token", registerRes.data.user.access_token);
    localStorage.setItem("refresh_token", registerRes.data.user.refresh_token);
  } catch (error) {
    yield put({
      type: actionAuthType.registerFail,
      payload: { message: error.response.data.message },
    });
  }
}

function* loginWithGoogle(action: any) {
  try {
    const loginRes = yield authService.loginWithGoogle(action.payload);
    yield put({
      type: actionAuthType.loginWithGoogleSuccess,
      payload: loginRes.data.user,
    });
    localStorage.setItem("access_token", loginRes.data.user.access_token);
    localStorage.setItem("refresh_token", loginRes.data.user.refresh_token);
  } catch (error) {}
}

function* loginWithMicrosoft(action: any) {
  try {
    const loginRes = yield authService.loginWithMicrosoft(action.payload);
    yield put({
      type: actionAuthType.loginWithMicrosoftSuccess,
      payload: loginRes.data.user,
    });
    localStorage.setItem("access_token", loginRes.data.user.access_token);
    localStorage.setItem("refresh_token", loginRes.data.user.refresh_token);
  } catch (error) {}
}

function* loginWithGithub(action: any) {
  try {
    const loginRes = yield authService.loginWithGithub(action.payload);
    yield put({
      type: actionAuthType.loginWithGithubSuccess,
      payload: loginRes.data.user,
    });
    localStorage.setItem("access_token", loginRes.data.user.access_token);
    localStorage.setItem("refresh_token", loginRes.data.user.refresh_token);
  } catch (error) {}
}

function* loginWithFacebook(action: any) {
  try {
    const loginRes = yield authService.loginWithFacebook(action.payload);
    yield put({
      type: actionAuthType.loginWithFacebookSuccess,
      payload: loginRes.data.user,
    });
    localStorage.setItem("access_token", loginRes.data.user.access_token);
    localStorage.setItem("refresh_token", loginRes.data.user.refresh_token);
  } catch (error) {}
}

function* authSaga() {
  yield takeLatest(actionAuthType.login, login);
  yield takeLatest(actionAuthType.loginWithToken, loginWithToken);
  yield takeLatest(actionAuthType.register, register);
  yield takeLatest(actionAuthType.loginWithGoogle, loginWithGoogle);
  yield takeLatest(actionAuthType.loginWithMicrosoft, loginWithMicrosoft);
  yield takeLatest(actionAuthType.loginWithGithub, loginWithGithub);
  yield takeLatest(actionAuthType.loginWithFacebook, loginWithFacebook);
}

export default authSaga;
