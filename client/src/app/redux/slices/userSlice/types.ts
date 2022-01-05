import { IUser } from 'types';

/* --- STATE --- */
export interface UserState {
  loadingAuth: boolean;
  user: IUser;
  isSignedIn: boolean;
}
