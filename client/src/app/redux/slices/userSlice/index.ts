import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'boilerplate-utils/@reduxjs/toolkit';
import {
  useInjectReducer,
  useInjectSaga,
} from 'boilerplate-utils/redux-injectors';
import { loginWithToken } from 'network/auth/login';
import { IUser } from 'types';
import { userSaga } from './saga';
import { UserState } from './types';

export const initialState: UserState = {
  loadingAuth: true,
  user: {} as IUser,
  isSignedIn: false,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginWithTokenAction() {},
    // loginWithTokenAction(state, action: PayloadAction<any>) {
    //   loginWithToken();
    // },
  },
});

export const { actions: userActions } = slice;

export const useUserSlice = () => {
  // useInjectReducer({ key: slice.name, reducer: slice.reducer });
  // useInjectSaga({ key: slice.name, saga: userSaga });
  return { actions: slice.actions };
};

export const userReducer = slice.reducer;
