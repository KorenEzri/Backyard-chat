import Logger from "../../logger/logger";
import Channel from "../../mongo/schemas/channel";
import User from "../../mongo/schemas/user";
import { CreateChannelPayload, IChannel, InitialSocket } from "../../types";

const updateUsersOnChannelJoin = async (
  channelId: string,
  socketId: string
) => {
  try {
    await Channel.updateOne(
      { _id: channelId },
      {
        $addToSet: {
          members: socketId,
          activeMembers: { userId: socketId, isActive: true },
        },
      }
    );
  } catch ({ message }) {
    Logger.error(`${message}, at ${__filename}:20`);
  }

  try {
    const newUser = await User.findOneAndUpdate(
      { _id: socketId },
      {
        $addToSet: {
          channels: channelId,
        },
        new: true,
      }
    );

    if (!newUser) {
      Logger.error(
        `Could not update channels for user at ${__filename}:29, id: ${socketId}`
      );
      return;
    }

    const unreadChannels = newUser?.unreadChannels;

    unreadChannels.splice(
      newUser.unreadChannels.findIndex((c) => c === channelId)
    );

    await User.updateOne({ _id: newUser._id }, { unreadChannels });
  } catch ({ message }) {
    Logger.error(`${message}, at ${__filename}:26`);
  }
};

export const onChannelJoin = async (
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

    await updateUsersOnChannelJoin(channelId, socketId);
  } catch ({ message }) {
    Logger.error(`${message} at ${__filename}:42`);
  }
};

export const onChannelLeave = async (
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
      {
        $pull: { activeMembers: { userId: socketId } },
      }
    );

    socket.leave(channelId);
  } catch ({ message }) {
    Logger.error(`${message} at ${__filename}:95`);
  }
};

export const leaveAllChannels = async (
  socket: InitialSocket,
  { socketId }: { socketId: string }
) => {
  try {
    await Channel.updateMany({
      $pull: { activeMembers: { userId: socketId } },
    });

    socket.rooms.forEach((room) => socket.leave(room));
  } catch ({ message }) {
    Logger.error(`${message} at ${__filename}:109`);
  }
};

export const createOrJoinChannel = async (
  socket: InitialSocket,
  { channelName, socketId }: CreateChannelPayload,
  onFinished: any
) => {
  try {
    const doesChannelExist = await Channel.findOne({
      identity: { channelName },
      calledFrom: __filename,
    });

    if (doesChannelExist) {
      await onChannelJoin(socket, {
        channelId: doesChannelExist._id,
        socketId,
      });
      return;
    }
  } catch ({ message }) {
    Logger.error(`${message}, at ${__filename}:132`);
  }
  try {
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

    if (onFinished) {
      onFinished();
    }
  } catch ({ message }) {
    Logger.error(`${message}, at ${__filename}:151`);
  }
};
