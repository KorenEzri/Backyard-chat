import Logger from "../../logger/logger";
import Channel from "../../mongo/schemas/channel";
import { IChannel, InitialSocket } from "../../types";

interface CreateChannelPayload {
  channelName: string;
  userId: string;
}

export const joinedChannel = async (
  socket: InitialSocket,
  channelId: string
) => {
  if (!channelId) {
    return;
  } //TODO error response

  socket.join(channelId);
};

export const leftChannel = async (socket: InitialSocket, channelId: string) => {
  if (!channelId) {
    return;
  } //TODO error response

  socket.leave(channelId);
};

export const createChannel = async (
  socket: InitialSocket,
  { channelName, userId }: CreateChannelPayload
) => {
  try {
    const doesChannelExist = await Channel.findOne({
      channelName,
      createdBy: userId,
    });

    if (doesChannelExist) {
      await joinedChannel(socket, doesChannelExist._id);
      return;
    }

    const channelPayload: Partial<IChannel> = {
      channelName,
      createdBy: userId,
    };

    const newChannel = new Channel(channelPayload);

    await newChannel.save();
  } catch ({ message }) {
    Logger.error(message);
  }
};
