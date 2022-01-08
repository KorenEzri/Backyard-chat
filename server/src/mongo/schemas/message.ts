import { IMessageDoc } from "../../types";
import mongoose, { Schema } from "mongoose";

const messageDbSchema: Schema = new mongoose.Schema(
  {
    to: { ref: "User", type: mongoose.Schema.Types.ObjectId },
    from: { ref: "User", type: mongoose.Schema.Types.ObjectId },
    channelId: { type: mongoose.Schema.Types.ObjectId },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

messageDbSchema.set("toJSON", {
  transform: (_: any, returnedObject: any) => {
    delete returnedObject.__v;
  },
});

const Message = mongoose.model<IMessageDoc>("Message", messageDbSchema);
export default Message;
