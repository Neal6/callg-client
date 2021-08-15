//@ts-nocheck

import { takeLatest, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import * as userType from "@store/actionTypes/userType";
import * as chanelType from "@store/actionTypes/chanelType";
import * as userService from "@services/userService";
import * as socketService from "@services/socketService";
import ToastFriend from "@components/ToastFriend/ToastFriend";

function* updateUser(action: any) {
  try {
    const res = yield userService.unFriend(action.payload);

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
    const page = action.payload.body.page;
    const res = yield userService.searchUser(action.payload);

    yield put({
      type: userType.searchUserSuccess,
      payload: {
        users: res.data,
        page,
      },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: userType.searchUserFail,
    });
  }
}

function* getFriend(action: any) {
  yield put({
    type: userType.getFriendStart,
  });
  try {
    const page = action.payload.body.page;
    const res = yield userService.getFriend(action.payload);
    yield put({
      type: userType.getFriendSuccess,
      payload: {
        users: res.data,
        page,
      },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: userType.getFriendFail,
    });
  }
}

function* getFriendOnline(action: any) {
  yield put({
    type: userType.getFriendOnlineStart,
  });
  try {
    const page = action.payload.body.page;
    const res = yield userService.getFriendOnline(action.payload);
    yield put({
      type: userType.getFriendOnlineSuccess,
      payload: {
        users: res.data,
        page,
      },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: userType.getFriendOnlineFail,
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

function* rejectFriend(action: any) {
  try {
    const res = yield userService.rejectFriend(action.payload);
    socketService.rejectFriend(action.payload.body.user);
    yield put({
      type: userType.rejectFriendSuccess,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: userType.rejectFriendFail,
    });
  }
}

function* cancelRequestFriend(action: any) {
  try {
    const res = yield userService.cancelRequestFriend(action.payload);
    socketService.cancelRequestFriend(action.payload.body.user);
    yield put({
      type: userType.cancelRequestFriendSuccess,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: userType.cancelRequestFriendFail,
    });
  }
}

function* getRequestFriend(action: any) {
  yield put({
    type: userType.getRequestFriendStart,
  });
  try {
    const page = action.payload.body.page;
    const res = yield userService.getRequestFriend(action.payload);
    yield put({
      type: userType.getRequestFriendSuccess,
      payload: {
        users: res.data,
        page,
      },
    });
  } catch (error) {
    yield put({
      type: userType.getRequestFriendFail,
    });
  }
}

function* getReceiveRequestFriend(action: any) {
  yield put({
    type: userType.getReceiveRequestFriendStart,
  });
  try {
    const page = action.payload.body.page;
    const res = yield userService.getReceiveRequestFriend(action.payload);

    yield put({
      type: userType.getReceiveRequestFriendSuccess,
      payload: {
        users: res.data,
        page,
      },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: userType.getReceiveRequestFriendFail,
    });
  }
}

function* acceptFriend(action: any) {
  try {
    const res = yield userService.acceptFriend(action.payload);
    toast(ToastFriend, {
      updateId: {
        ...action.payload.body,
        message: `và bạn đã trở thành bạn bè của nhau.`,
      },
    });
    socketService.acceptFriend({
      user: action.payload.body.user,
      chanel: res.data.chanel,
    });
    yield put({
      type: userType.acceptFriendSuccess,
      payload: res.data.user,
    });
    yield put({
      type: chanelType.addChanel,
      payload: res.data.chanel,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: userType.acceptFriendFail,
    });
  }
}

function* unFriend(action: any) {
  try {
    const res = yield userService.unFriend(action.payload);
    toast(ToastFriend, {
      updateId: {
        ...action.payload.body,
        message: `và bạn đã chấm dứt bạn bè với nhau.`,
      },
    });
    socketService.unFriend(action.payload.body.user);
    yield put({
      type: userType.unFriendSuccess,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: userType.unFriendFail,
    });
  }
}

function* userSaga() {
  yield takeLatest(userType.updateUser, updateUser);
  yield takeLatest(userType.getUser, getUser);
  yield takeLatest(userType.searchUser, searchUser);
  yield takeLatest(userType.getFriend, getFriend);
  yield takeLatest(userType.getFriendOnline, getFriendOnline);
  yield takeLatest(userType.getRequestFriend, getRequestFriend);
  yield takeLatest(userType.getReceiveRequestFriend, getReceiveRequestFriend);
  yield takeLatest(userType.requestFriend, requestFriend);
  yield takeLatest(userType.rejectFriend, rejectFriend);
  yield takeLatest(userType.cancelRequestFriend, cancelRequestFriend);
  yield takeLatest(userType.acceptFriend, acceptFriend);
  yield takeLatest(userType.unFriend, unFriend);
}

export default userSaga;
