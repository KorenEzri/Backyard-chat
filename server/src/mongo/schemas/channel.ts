import { IChannelDoc } from "../../types";
import mongoose, { Schema } from "mongoose";

const channelDbSchema: Schema = new mongoose.Schema(
  {
    channelName: { type: String, required: true, unique: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    members: {
      default: [],
      ref: "User",
      type: [mongoose.Schema.Types.ObjectId],
    },
    activeMembers: {
      default: [],
      userId: { type: [mongoose.Schema.Types.ObjectId] },
      isActive: Boolean,
    },
    messages: {
      default: [],
      ref: "Message",
      type: [mongoose.Schema.Types.ObjectId],
    },
  },
  { timestamps: true }
);

channelDbSchema.set("toJSON", {
  transform: (_: any, returnedObject: any) => {
    delete returnedObject.__v;
  },
});

const Channel = mongoose.model<IChannelDoc>("Channel", channelDbSchema);
export default Channel;
