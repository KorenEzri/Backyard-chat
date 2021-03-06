// import { IUserDoc } from "../../types";
import mongoose, { Schema } from "mongoose";
import { IUserDoc } from "../../types";

const userDbSchema: Schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: false },
    username: {
      type: String,
      required: true,
      trim: true,
      validate: (e: string) => e.length > 5,
      index: true,
      unique: true,
    },
    blocked: {
      default: [],
      ref: "User",
      type: [mongoose.Schema.Types.ObjectId],
    },
    friends: {
      default: [],
      ref: "User",
      type: [mongoose.Schema.Types.ObjectId],
    },
    channels: {
      default: [],
      ref: "Channel",
      type: [mongoose.Schema.Types.ObjectId],
    },
    unreadChannels: {
      default: [],
      ref: "Channel",
      type: [mongoose.Schema.Types.ObjectId],
    },
    color: { type: String },
    lastConnected: { type: Date, default: new Date() },
    socketId: { type: String },
    avatar: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    role: { type: String, default: "user", enum: ["admin", "user"] },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userDbSchema.set("toJSON", {
  transform: (_: any, returnedObject: any) => {
    delete returnedObject.__v;
  },
});

const User = mongoose.model<IUserDoc>("User", userDbSchema);

export default User;
