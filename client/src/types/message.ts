export interface IFromObj {
  _id: string;
  username: string;
}
export interface IMessage {
  to: string;
  from: IFromObj | string;
  message: string;
  channelId: string;
  createdAt: Date;
  color: string;
  updatedAt: Date;
  _id: string;
}
