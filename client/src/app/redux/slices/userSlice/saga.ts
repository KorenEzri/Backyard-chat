import { loginWithToken } from 'network/auth/login';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { userActions as actions } from '.';

function* sagaLoginWithToken() {
  loginWithToken();
}

export function* userSaga() {
  yield takeLatest(actions.loginWithTokenAction.type, sagaLoginWithToken);
}
