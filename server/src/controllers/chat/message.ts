import { createError } from "../../errors";
import Logger from "../../logger/logger";
import Channel from "../../mongo/schemas/channel";
import Message from "../../mongo/schemas/message";
import { ChatRequest, ChatResponse, IChannel } from "../../types";

export const getAllMessages = async (req: ChatRequest, res: ChatResponse) => {
  const { channel } = req.body;

  if (!channel) {
    return createError("error occurred", 500);
  }

  let channelMessages: IChannel;

  try {
    try {
      channelMessages = await Message.find({
        channel,
      })
        .populate({ path: "from", select: "username color" })
        .lean();
    } catch (error) {
      Logger.error(
        "Could not find messages with channelId, falling back to channel name"
      );

      channelMessages = await Channel.findOne({ channelName: channel })
        .populate({
          path: "messages",
          select: "-to -channelId -updateAt",
          populate: {
            path: "from",
            select: "username color",
          },
        })
        .lean();

      const allUsers = channelMessages.messages
        .map((m) => {
          return {
            username: (m.from as any).username,
            color: (m.from as any).color,
            _id: (m.from as any)._id,
          };
        })
        .filter(
          (value, index, self) =>
            index === self.findIndex((t) => t._id === value._id)
        );

      channelMessages.messages?.forEach(
        (m) =>
          ((m as any).from = allUsers.find(
            (u) => u._id === (m as any).from._id
          ))
      );

      res.json({ messages: channelMessages?.messages || [] });
    }

    res.json({ messages: channelMessages || [] });
  } catch ({ message }) {
    Logger.error(`${message}, at ${__filename}:107`);
    return createError(`${message}`, 500);
  }
};
