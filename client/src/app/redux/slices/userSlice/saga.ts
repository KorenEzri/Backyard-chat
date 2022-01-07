import { logger } from 'logger';
import { loginWithToken } from 'network/auth/login';
import { call, put } from 'redux-saga/effects';
import { userActions } from '.';

export function* sagaLoginWithToken() {
  try {
    const res = yield call(loginWithToken);

    yield put(userActions.loginSuccess(res));
  } catch ({ message }) {
    logger.error(message);
  }
}
