import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'boilerplate-utils/@reduxjs/toolkit';
import { IUser } from 'types';
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
    loginSuccess(state, action: PayloadAction<IUser>) {
      const { payload } = action;

      if (payload._id) {
        const newState = {
          user: payload,
          isSignedIn: true,
          loadingAuth: false,
        };

        Object.assign(state, newState);
      }
    },
  },
});

export const { actions: userActions } = slice;

export const useUserSlice = () => {
  return { actions: slice.actions };
};

export const userReducer = slice.reducer;
