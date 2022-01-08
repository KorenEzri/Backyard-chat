export interface IMessage {
  to: string;
  from: string;
  message: string;
  channelId: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}
