import { IMessage } from './message';

export interface IChannel {
  channelName: string;
  messages: IMessage[];
  createdBy: string;
  updatedAt: Date;
  createdAt: Date;
  _id: string;
}
