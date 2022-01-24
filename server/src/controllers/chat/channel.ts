import { IChannel } from "./../../types/channel";
import Channel from "../../mongo/schemas/channel";
import { ChatRequest, ChatResponse } from "./../../types/chat";
import Logger from "../../logger/logger";
import { createError } from "../../errors";

export const getChannelId = async (req: ChatRequest, res: ChatResponse) => {
  const { channelName } = req.body;

  if (!channelName) {
    return createError("error occurred", 500);
  }

  try {
    const channelId = await Channel.findOne({ channelName }).select("_id");

    res.json({ _id: channelId?._id });
  } catch ({ message }) {
    Logger.error(`${message}, at ${__filename}:18`);

    return createError(`${message}`, 500);
  }
};

export const getParticipants = async (req: ChatRequest, res: ChatResponse) => {
  const { channel } = req.body;

  if (!channel) {
    return createError("error occurred", 500);
  }

  let participantList: IChannel;

  try {
    try {
      participantList = await Channel.findOne({
        _id: channel,
      })
        .populate({
          path: "members",
          select:
            "username friends avatar firstName lastName role isActive color",
          populate: {
            path: "friends",
            select: "username _id",
          },
        })
        .lean();
    } catch (error) {
      participantList = await Channel.findOne({ channelName: channel })
        .populate({
          path: "members",
          select: "username friends avatar firstName lastName role isActive",
          populate: {
            path: "friends",
            select: "username _id",
          },
        })
        .lean();
    }

    if (!participantList || !participantList.members.length) {
      return;
    }

    res.json({ participants: participantList.members });
  } catch ({ message }) {
    Logger.error(`${message}, at ${__filename}:107`);
    return createError(`${message}`, 500);
  }
};
