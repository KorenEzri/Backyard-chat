import { Document } from "mongoose";
import { IMessage } from ".";

export interface IChannel {
  channelName: string;
  messages: IMessage[];
  createdBy: string;
  updatedAt: Date;
  createdAt: Date;
  _id: string;
}

export interface IChannelDoc extends Document, Omit<IChannel, "_id"> {}
