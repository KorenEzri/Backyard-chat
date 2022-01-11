import { IMessage } from './message';

export interface IChannel {
  channelName: string;
  messages: IMessage[];
  members: string[];
  activeMembers: { userId: string; isActive: string }[];
  createdBy: string;
  updatedAt: Date;
  createdAt: Date;
  _id: string;
}
