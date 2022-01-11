import Logger from "../../logger/logger";
import Channel from "../../mongo/schemas/channel";
import User from "../../mongo/schemas/user";
import { IChannel, InitialSocket } from "../../types";

interface CreateChannelPayload {
  channelName: string;
  socketId: string;
}

const updateActiveMembersForChannel = async (
  channelId: string,
  socketId: string
) => {
  await Channel.updateOne(
    { _id: channelId },
    {
      $addToSet: {
        members: socketId,
        activeMembers: { userId: socketId, isActive: true },
      },
    }
  );
};

const updateUnreadChannelsForUser = async (
  channelId: string,
  socketId: string
) => {
  await User.findOneAndUpdate(
    { _id: socketId },
    {
      $addToSet: { channels: channelId },
    },
    {
      $pull: { unreadChannels: { channelId } },
    } // imhere
  );
};

export const joinedChannel = async (
  socket: InitialSocket,
  { channelId, socketId }: { channelId: string; socketId: string }
) => {
  if (!channelId) {
    return;
    //TODO error response
  }

  try {
    socket.join(channelId);
    socket.emit("setActiveChannel", { channelId });

    await updateActiveMembersForChannel(channelId, socketId);
    await updateUnreadChannelsForUser(channelId, socketId);
  } catch ({ message }) {
    Logger.error(`${message} at ${__filename}:42`);
  }
};

export const leftChannel = async (
  socket: InitialSocket,
  { channelId, socketId }: { channelId: string; socketId: string }
) => {
  if (!channelId) {
    return;
    //TODO error response
  }

  try {
    await Channel.updateOne(
      { _id: channelId },
      { $pull: { activeMembers: { userId: socketId } } }
    );

    socket.leave(channelId);
  } catch ({ message }) {
    Logger.error(`${message} at ${__filename}:63`);
  }
};

export const leftAllChannels = async (
  socket: InitialSocket,
  { socketId }: { socketId: string }
) => {
  try {
    await Channel.updateMany({
      $pull: { activeMembers: { userId: socketId } },
    });

    socket.rooms.forEach((room) => socket.leave(room));
  } catch ({ message }) {
    Logger.error(message);
  }
};

export const createOrJoinChannel = async (
  socket: InitialSocket,
  { channelName, socketId }: CreateChannelPayload,
  onFinished: any
) => {
  try {
    const doesChannelExist = await Channel.findOne({
      channelName,
    });

    if (doesChannelExist) {
      await joinedChannel(socket, {
        channelId: doesChannelExist._id,
        socketId,
      });
      return;
    }

    const channelPayload: Partial<IChannel> = {
      channelName,
      createdBy: socketId,
      members: [socketId],
      activeMembers: [{ userId: socketId, isActive: true }],
    };

    const newChannel = new Channel(channelPayload);

    await newChannel.save();

    socket.join(newChannel._id);

    socket.emit("setActiveChannel", { channelId: newChannel._id });
  } catch ({ message }) {
    Logger.error(message);
  } finally {
    if (onFinished) {
      onFinished();
    }
  }
};
