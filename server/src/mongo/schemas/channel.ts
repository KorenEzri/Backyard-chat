import { IChannelDoc } from "../../types";
import mongoose, { Schema } from "mongoose";

const channelDbSchema: Schema = new mongoose.Schema(
  {
    channelName: { type: String },
    createdBy: { ref: "User", type: mongoose.Schema.Types.ObjectId },
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
