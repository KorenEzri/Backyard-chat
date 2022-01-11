import { Document } from "mongoose";
import { IChannel } from ".";

export type Lang = "en" | "he";
export type UserRole = "admin" | "user";

export interface IName {
  firstName: string;
  lastName: string;
}

export interface IUnreadChannel {
  channelName: string;
  channelId: string;
  messages: number;
  earliestMessageId: string;
}

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
  unreadChannels: string[];
  blocked: IUser[] | string[];
  friends: IUser[] | string[];
  isVerified: boolean;
  channels: IChannel[];
  password?: string;
}

export type IUserKeys = keyof IUser;

type UserDocCompose = Omit<IUser, "_id">;

export interface IUserDoc extends Document, UserDocCompose {}
