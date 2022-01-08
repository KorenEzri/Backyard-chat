import { Document } from "mongoose";

export interface IMessage {
  to: string;
  from: string;
  channelId: string;
  message: string;
  updatedAt: Date;
  createdAt: Date;
  _id: string;
}

export interface IMessageDoc extends Document, Omit<IMessage, "_id"> {}
