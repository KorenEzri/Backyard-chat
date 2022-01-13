import * as mongoose from "mongoose";
import { IUser } from "./../user";
import { IChannel } from "..";

type MongooseActionType = mongoose.AnyKeys<mongoose._UpdateQueryDef<Document>> &
  mongoose.AnyObject;

export interface MongooseUpdateObj {
  model?: mongoose.UpdateQuery<Partial<IChannel | IUser>>;
  action?: MongooseActionType;
}
