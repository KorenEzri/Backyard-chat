import { IMessage } from './message';
import { IUser } from './user';

export interface IChannel {
  channelName: string;
  messages: IMessage[];
  members: string[] | Partial<IUser[]>;
  activeMembers: { userId: string; isActive: string }[];
  createdBy: string;
  updatedAt: Date;
  createdAt: Date;
  _id: string;
}
