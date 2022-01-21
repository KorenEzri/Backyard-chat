import { Server } from "socket.io";
import Logger from "../../logger/logger";
import Message from "../../mongo/schemas/message";
import { IMessage } from "../../types";
import Channel from "../../mongo/schemas/channel";
import User from "../../mongo/schemas/user";
import { createError } from "../../errors";

const updateChannelOnMessage = async (
  channelId: string,
  savedMessage: Partial<IMessage>
) => {
  try {
    const channel = await Channel.findOneAndUpdate(
      { _id: channelId },
      { $push: { messages: savedMessage._id } },
      { new: true }
    )
      .populate({
        path: "messages",
        select: "from",
        populate: {
          path: "from",
          select: "username",
        },
      })
      .lean();

    if (!channel) {
      Logger.error(`Could not perform "findOneAndUpdate" at ${__filename}:30`);
      return;
    }

    const { activeMembers, _id, members } = channel;

    await Channel.findOneAndUpdate(
      { _id: channelId },
      {
        activeMembers: activeMembers.filter((m) => m.isActive === true),
      }
    );

    await User.updateMany(
      { _id: { $in: members }, isActive: false },
      { unreadChannels: _id, multi: true }
    );
  } catch ({ message }) {
    console.log(`${message}, at ${__filename}:48`);
  }
};

export const onMessage = async (
  io: Server,
  message: Partial<IMessage>,
  onFinished: any
) => {
  if (!message?.message?.length) {
    return;
  }
  try {
    const { channelId } = message;

    if (!channelId) {
      return createError(`Invalid user input at ${__filename}:60`, 401);
    }

    const newMessage = new Message(message);

    const savedMessage = await (
      await newMessage.save()
    ).populate({ path: "from", select: "username" });

    io.emit("messageSent", savedMessage);

    await updateChannelOnMessage(channelId, savedMessage);
  } catch ({ message }) {
    Logger.error(`${message}, at ${__filename}:73`);
  } finally {
    if (onFinished) {
      onFinished();
    }
  }
};
