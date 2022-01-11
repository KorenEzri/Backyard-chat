import { Server } from "socket.io";
import Logger from "../../logger/logger";
import Channel from "../../mongo/schemas/channel";
import Message from "../../mongo/schemas/message";
import User from "../../mongo/schemas/user";
import { IChannel, IMessage } from "../../types";

const updateActiveChannelMembers = async (
  activeMembers: { isActive: boolean; userId: string }[],
  channelId: string
) => {
  await Channel.findOneAndUpdate(
    { _id: channelId },
    { activeMembers: activeMembers.filter((m) => m.isActive === true) }
  );
};

const updateUnreadMessagesForMembers = async ({ _id, members }: IChannel) => {
  await User.updateMany(
    { _id: { $in: members } },
    {
      unreadChannels: _id,
    },
    { multi: true }
  );
};

const updateChannelMembers = async (channel: IChannel) => {
  const { activeMembers, _id } = channel;
  await updateActiveChannelMembers(activeMembers, _id);
  await updateUnreadMessagesForMembers(channel);
};

export const onMessage = async (
  io: Server,
  message: Partial<IMessage>,
  onFinished: any
) => {
  try {
    const { channelId } = message;
    if (!channelId) return;

    const newMessage = new Message({ ...message });

    const savedMessage = await (
      await newMessage.save()
    ).populate({ path: "from", select: "username" });

    io.emit("messageSent", savedMessage);

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

    await updateChannelMembers(channel);
  } catch ({ message }) {
    Logger.error(message);
  } finally {
    if (onFinished) {
      onFinished();
    }
  }
};
