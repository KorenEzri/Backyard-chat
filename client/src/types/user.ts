import { IChannel } from './channel';
import { ValueOf } from './common';
import { FriendRequestsStatusEnum } from './friends';

export type UserRole = 'admin' | 'user';

export interface IUser {
  firstName: string;
  lastName: string;
  _id: string;
  isActive: boolean;
  lastConnected: Date;
  updatedAt: Date;
  createdAt: Date;
  avatar: string;
  socketId: string;
  email: string;
  username: string;
  role: UserRole;
  blocked: IUser[] | string[];
  friends: IFriend[];
  isVerified: boolean;
  channels: IChannel[];
  friendRequests: IFriendRequest[];
}

export interface IFriendRequest {
  from: string;
  to: string;
  _id: string;
  status: ValueOf<FriendRequestsStatusEnum>;
}
export type IFriend = Omit<
  IUser,
  | 'friends'
  | 'blocked'
  | 'email'
  | 'isVerified'
  | 'role'
  | 'updatedAt'
  | 'friendRequests'
>;
